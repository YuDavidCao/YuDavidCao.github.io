import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";
import { CodeBlock } from "../../blogs/code-block";
import { InlineCode } from "../../blogs/inline-code";

const heroImg =
  "/five-small-claude-code-mods-that-changed-how-i-work-with-ai-agents/hero.png";

const mediumUrl =
  "https://medium.com/@yu.cao20041208/five-small-claude-code-mods-that-changed-how-i-work-with-ai-agents-e6c7059a5d61";

const description =
  "Popup and voice alerts, a prompt enhancer, a detail slider, an assumptions tracker, and a context window bar: five small Claude Code mods, each one row above the prompt box.";

const bandPatternCode = `on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
  const { Box, Text } = $.ui.resolve(e)
  // keep the bands beneath instead of replacing them
  const below = await next(e)
  return (
    <Box flexDirection="column">
      <Box gap={1}>
        <Box width={7} flexShrink={0}>
          <Text dimColor>Detail</Text>
        </Box>
        {/* this mod's own content */}
      </Box>
      {below}
    </Box>
  )
})`;

const decisionAlertCode = `// Tools whose own dialog asks the person to choose
const DECISION_TOOLS = ['AskUserQuestion', 'ExitPlanMode']

on('tool.call', { tool: 'AskUserQuestion' }, async ($, e, next) => {
  startDecisionAlert($)
  return next(e)
})

// Every other ask is a permission prompt
on('classic.PermissionRequest', async ($, e, next) => {
  if (!DECISION_TOOLS.includes(e.tool_name)) startDecisionAlert($)
  return next(e)
})`;

const composeCode = `on('prompt.compose', async ($, e, next) => {
  const { sections } = await next(e)
  const text = guidance(await read($, level))
  return {
    sections: [...sections, { id: 'detail-slider:level', text, scope: 'session' }],
  }
})`;

const fixPromptExample = `You assumed: "Used 30s as the request timeout". That assumption is wrong.
What I want instead: 10s, with one retry
Fix only the part of your last work that rests on it, and keep everything else as it is.
These assumptions are right, keep them:
- Put the client in src/lib/api.ts`;

const handoffCode = `const BRIEF_PROMPT = [
  'Write a handoff brief so a fresh session can pick up this work with no other context.',
  'Markdown, under 300 words, with exactly these headings:',
  'Goal, Current state, Decisions made, Files touched, Next steps.',
  'Facts only; no preamble, no sign-off.',
].join(' ')

export async function handoff($) {
  const brief = await $.model.fork({ prompt: BRIEF_PROMPT })
  if (!brief.isAnswered) {
    $.ui.toast(\`Handoff not written (\${brief.reason}); the session is untouched.\`)
    return
  }
  await $.command.run({ command: 'clear' })
  await $.prompt.submit({
    text: \`Handoff from the previous session. Continue from here.\\n\\n\${brief.text}\`,
  })
}`;

const h2ClassName =
  "font-serif text-3xl font-bold mt-10 mb-4 tracking-tight";
const listClassName = "list-disc pl-6 mb-4 space-y-2";
const orderedListClassName = "list-decimal pl-6 mb-4 space-y-2";

export function FiveSmallClaudeCodeModsThatChangedHowIWorkWithAiAgents() {
  return (
    <>
      <title>
        Five Small Claude Code Mods That Changed How I Work With AI Agents
      </title>
      <meta name="description" content={description} />
      <meta
        property="og:title"
        content="Five Small Claude Code Mods That Changed How I Work With AI Agents"
      />
      <meta property="og:description" content={description} />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/five-small-claude-code-mods-that-changed-how-i-work-with-ai-agents"
      />
      <BlogLayout>
        <BlogHeader
          title="Five Small Claude Code Mods That Changed How I Work With AI Agents"
          date="November 6, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Five Claude Code mod bands stacked above the prompt box, with a desktop notification and a speaker icon"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            <em>
              Popup and voice alerts, a prompt enhancer, a detail slider, an
              assumptions tracker, and a context window bar, each one a single
              row above the prompt box.
            </em>
          </p>
          <p className="mb-4">
            Most of my coding now happens in Claude Code. Over time I kept
            running into the same small frictions. None of them was big enough
            to complain about, but together they cost me real time:
          </p>
          <ul className={listClassName}>
            <li>
              I would switch to another window and miss that a session had
              finished, or that it had been waiting on a permission prompt the
              whole time.
            </li>
            <li>
              My first prompt was often vague, so the first turn went to the
              agent guessing.
            </li>
            <li>
              Some days I wanted a two-line answer. Other days I wanted the
              whole mechanism explained.
            </li>
            <li>
              The agent quietly made decisions I never asked for, and I only
              found them in the diff.
            </li>
            <li>
              Long sessions got noticeably worse well before they hit the
              context limit.
            </li>
          </ul>
          <p className="mb-4">
            Claude Code lets you change its own interface and behavior with{" "}
            <strong>mods</strong>: plugins whose hook module registers handlers
            on events like a turn completing, a tool being called, or the area
            above the prompt being drawn. So I wrote one small mod per problem
            and keep them together in a local marketplace I call{" "}
            <InlineCode>c-mods</InlineCode>.
          </p>
          <p className="mb-4">This post walks through the five I use most.</p>

          <h2 className={h2ClassName}>The Shared Pattern: One Row Each</h2>
          <p className="mb-4">
            Every mod adds exactly one row, which I call a band, above the
            prompt box, with a short dim label on the left. Handlers work like
            middleware: each one gets the event and a{" "}
            <InlineCode>next</InlineCode> function. What lets five independent
            mods share the same space is calling <InlineCode>next(e)</InlineCode>{" "}
            first, so whatever the other mods drew comes back, and then putting
            your own row on top of it instead of replacing it.
          </p>
          <CodeBlock language="tsx" code={bandPatternCode} />
          <p className="mb-4">
            No mod knows the others exist, and I can turn any of them off
            without breaking the rest. State lives in small atoms (
            <InlineCode>atom</InlineCode>, <InlineCode>read</InlineCode>,{" "}
            <InlineCode>update</InlineCode>), and a band redraws when its atom
            changes.
          </p>

          <h2 className={h2ClassName}>
            1. Finish and Decision Alerts: Popup and Voice
          </h2>
          <p className="mb-4">
            You start a task, go read something, and come back twenty minutes
            later. The agent finished after two minutes, or it stopped after
            thirty seconds to ask you a question.
          </p>
          <p className="mb-4">
            <strong>The finish alert</strong> is a plain Stop hook in{" "}
            <InlineCode>~/.claude/settings.json</InlineCode>. When a session
            finishes, it uses <InlineCode>osascript</InlineCode> to show a macOS
            notification and <InlineCode>say</InlineCode> to speak
            “Claude Code session on <em>folder</em> finished”. The hook is
            marked async, so it never slows the agent down.
          </p>
          <p className="mb-4">
            The project folder name is in both the popup and the voice. With
            several sessions open, hearing which project finished tells me
            which window to go to without looking.
          </p>
          <p className="mb-4">
            <strong>The decision alert</strong> is the mod. Finishing isn’t the
            only time the agent needs me. It also stops when it asks a
            question, when it presents a plan for approval, and when it needs
            permission to run a tool. The mod hooks all three:
          </p>
          <CodeBlock language="typescript" code={decisionAlertCode} />
          <p className="mb-4">
            <InlineCode>ExitPlanMode</InlineCode> gets the same handler as{" "}
            <InlineCode>AskUserQuestion</InlineCode>. The alert says “Claude Code
            on <em>folder</em> needs your decision”. It is deliberately not
            awaited, so the dialog appears while the voice is still speaking.
          </p>
          <p className="mb-4">
            The band shows “finish and decision alerts on” with a{" "}
            <em>Turn off</em> button. The on/off state is just a file,{" "}
            <InlineCode>~/.claude/finish-alert-off</InlineCode>. I chose a file
            over plugin storage because the Stop hook is a one-line shell
            command, and checking whether a file exists is the cheapest thing a
            shell can do. It also means I can mute alerts from any session, or
            from a terminal with <InlineCode>touch</InlineCode>, and every
            session picks it up on its next turn.
          </p>
          <p className="mb-4">
            The voice is the part I underestimated. A notification is easy to
            miss when you are in a full-screen app. A voice saying “needs your
            decision” is not.
          </p>

          <h2 className={h2ClassName}>
            2. Prompt Enhancer: Fix the Draft Before You Send It
          </h2>
          <p className="mb-4">
            As soon as there is text in the prompt box, a band appears with two
            buttons: <em>Enhance</em> (hotkey <InlineCode>e</InlineCode>, or the{" "}
            <InlineCode>/enhance</InlineCode> command) and <em>Send</em>.
          </p>
          <p className="mb-4">
            Enhance rewrites the draft in place. The rewrite has four jobs:
          </p>
          <ol className={orderedListClassName}>
            <li>
              Name the installed skills that fit the task, by their exact names,
              so Claude loads them right away.
            </li>
            <li>
              Add the details about the current project (stack, folders,
              conventions) that the task touches.
            </li>
            <li>
              List the key decisions Claude should ask me about before starting,
              instead of deciding alone.
            </li>
            <li>Describe what the finished result should look like.</li>
          </ol>
          <p className="mb-4">
            On top of that, it must keep my intent, scope and voice, and must
            not invent requirements I didn’t imply.
          </p>
          <p className="mb-4">
            The third job pays off the most. A vague prompt doesn’t fail
            loudly; the agent just picks something. Making the rewrite list the
            open decisions turns silent guesses into questions.
          </p>
          <p className="mb-4">
            To know the project, the enhancer <strong>forks</strong> the current
            session. The fork already sees the installed skills,{" "}
            <InlineCode>CLAUDE.md</InlineCode> and the conversation so far, so
            the rewrite knows what we have been doing. In a brand-new session
            with nothing to fork, it falls back to a fresh Sonnet call and
            passes the context explicitly: the top-level folder listing, the
            installed skills and commands, and the first 4,000 characters of{" "}
            <InlineCode>CLAUDE.md</InlineCode>.
          </p>
          <p className="mb-4">A few details make it pleasant to use:</p>
          <ul className={listClassName}>
            <li>
              It never overwrites your typing. If you edited the draft while the
              model was working, the rewrite is dropped with a short message.
            </li>
            <li>
              It strips the wrapping models like to add, such as “Here’s the
              rewritten prompt:” or code fences, so what lands in the box is
              ready to send.
            </li>
            <li>
              It only redraws when the box flips between empty and non-empty,
              so typing doesn’t trigger any work.
            </li>
          </ul>
          <p className="mb-4">
            The rewrite goes into the prompt box, not to the agent. You read
            it, change what you want, and send it yourself.
          </p>

          <h2 className={h2ClassName}>
            3. Detail Slider: How Technical Should the Replies Be?
          </h2>
          <p className="mb-4">
            The band is a small slider with five levels. You can drag the knob,
            use the arrow keys, or click − and +:
          </p>
          <ul className={listClassName}>
            <li>
              <strong>Simple:</strong> everyday words, no jargon, an analogy
              where it helps, and the outcome first.
            </li>
            <li>
              <strong>Brief:</strong> the result and the one or two key points
              behind it.
            </li>
            <li>
              <strong>Balanced:</strong> what was done and why, the technical
              details that matter, no exhaustive internals.
            </li>
            <li>
              <strong>Technical:</strong> exact terms, specific files, functions
              and lines, trade-offs and edge cases.
            </li>
            <li>
              <strong>Expert:</strong> internals, complexity and performance,
              alternatives considered and why they lost.
            </li>
          </ul>
          <p className="mb-4">
            The level is saved, so it carries over to new sessions. Under the
            hood, the mod appends one section to the system prompt:
          </p>
          <CodeBlock language="typescript" code={composeCode} />
          <p className="mb-4">
            That section contains the sentence I care about most: the level
            “changes depth and vocabulary only, never correctness or how
            thoroughly you do the work.” Without it, <em>Simple</em> risks
            turning into <em>do less</em>. A message can still override it: if
            I ask for the deep version in a prompt, the prompt wins.
          </p>
          <p className="mb-4">
            There is one trade-off. Because the level lives in the system
            prompt, moving the slider invalidates the prompt cache, and the next
            turn re-reads the conversation uncached once. That is fine for
            something you set now and then, not on every turn.
          </p>

          <h2 className={h2ClassName}>
            4. Assumptions Tracker: Review What the Agent Decided for You
          </h2>
          <p className="mb-4">
            Most of the problems I find in agent-written code aren’t syntax
            errors. They are decisions: a timeout someone had to pick, a file
            placed somewhere, a default, a skipped edge case. None of it was in
            the prompt, all of it is in the diff, and it is easy to miss in a
            few hundred changed lines.
          </p>
          <p className="mb-4">
            After every turn that actually changed something (at least one{" "}
            <InlineCode>Edit</InlineCode>, <InlineCode>Write</InlineCode>,{" "}
            <InlineCode>NotebookEdit</InlineCode> or <InlineCode>Bash</InlineCode>{" "}
            call), the mod takes my last prompt and everything after it, trims
            it to 16,000 characters while keeping the start and the end, and
            asks Haiku at low effort to audit it:
          </p>
          <blockquote className="mb-4">
            <p>
              You audit a coding assistant. From the transcript, list the
              assumptions the assistant made that the user did NOT explicitly
              specify: names, libraries, file locations, defaults, behavior,
              scope, edge cases. Skip anything the user stated.
            </p>
          </blockquote>
          <p className="mb-4">
            The reply is a JSON array of up to eight short strings. A band
            appears, “Claude made 3 assumptions — press 0 to review”, and
            pressing <InlineCode>0</InlineCode> opens a pane that lists each one
            with <em>Right</em> and <em>Wrong</em> buttons and an optional note
            for Claude.
          </p>
          <p className="mb-4">
            <em>Right</em> just checks it off. <em>Wrong</em> immediately sends
            a fix prompt like this one:
          </p>
          <CodeBlock language="text" code={fixPromptExample} />
          <p className="mb-4">
            Including the assumptions I already approved matters. It stops the
            fix from wandering into parts I was happy with.
          </p>
          <p className="mb-4">The rest is about not getting in the way:</p>
          <ul className={listClassName}>
            <li>
              Haiku is enough here. This is classification, not coding, so it
              should be cheap and fast.
            </li>
            <li>
              Fix turns are not audited again. Otherwise the fix would replace
              the list I am still reviewing.
            </li>
            <li>
              Sending a new prompt clears the list. Assumptions are about the
              last task only.
            </li>
            <li>
              Turns that change nothing, like questions and explanations, are
              skipped.
            </li>
          </ul>

          <h2 className={h2ClassName}>
            5. Context Window Bar: Know When to Start Fresh
          </h2>
          <p className="mb-4">
            The band is a ten-cell bar with the percentage and token count next
            to it, for example “▰▰▰▱▱▱▱▱▱▱ 34% · 340k tokens”. Below the
            threshold, it is green and quiet.
          </p>
          <p className="mb-4">
            The reason it exists is context rot: answer quality drops as the
            context fills up, long before the hard limit. Auto-compaction kicks
            in late, and you don’t get to see what it kept.
          </p>
          <p className="mb-4">
            Past the warning threshold (40% by default, configurable; 40–50%
            suits a 1M-token window), the bar turns to the warning color, says
            “quality may start degrading”, and offers two buttons:
          </p>
          <ul className={listClassName}>
            <li>
              <strong>New session with handoff</strong> (hotkey{" "}
              <InlineCode>h</InlineCode>)
            </li>
            <li>
              <strong>Fresh session</strong> (hotkey <InlineCode>f</InlineCode>),
              which just runs <InlineCode>/clear</InlineCode>
            </li>
          </ul>
          <p className="mb-4">The handoff is the interesting one:</p>
          <CodeBlock language="typescript" code={handoffCode} />
          <p className="mb-4">
            A fork of the current session writes the brief, because it still
            has the full context. Then the mod clears and starts the new
            session with the brief as its first message. If writing the brief
            fails, nothing is cleared.
          </p>
          <p className="mb-4">Compared to compaction:</p>
          <ul className={listClassName}>
            <li>I decide when it happens.</li>
            <li>I can read exactly what carried over.</li>
            <li>
              The structure is always the same: goal, current state, decisions,
              files touched, next steps.
            </li>
          </ul>
          <p className="mb-4">
            There are commands for it too. <InlineCode>/handoff</InlineCode>{" "}
            does it on demand, and{" "}
            <InlineCode>/autohandoff [on|off|&lt;percent&gt;]</InlineCode> does it
            automatically. Auto-handoff defaults to 50%, deliberately above the
            40% warning, so I get at least one turn to see the warning and act
            myself. The buttons are hidden while the agent is working.
          </p>

          <h2 className={h2ClassName}>What I Learned Building Them</h2>
          <ul className={listClassName}>
            <li>
              <strong>One problem, one mod, one row.</strong> Small mods are
              easy to reason about and easy to switch off. Because they stack
              through <InlineCode>next(e)</InlineCode>, none of them depends on
              another.
            </li>
            <li>
              <strong>
                Use the cheapest model that can do the side job.
              </strong>{" "}
              The assumption audit runs on Haiku at low effort. The prompt
              rewrite and the handoff use a fork, because they need the
              conversation.
            </li>
            <li>
              <strong>Never overwrite the human.</strong> The enhancer checks
              that the draft didn’t change, the handoff doesn’t clear without a
              brief, and alerts can be muted from anywhere.
            </li>
            <li>
              <strong>Keep the pure logic separate.</strong> Each mod has a
              small file of pure functions (building prompts, parsing model
              replies, drawing the bar) with its own tests. The hook file only
              wires events together.
            </li>
            <li>
              <strong>Where a feature lives matters.</strong> Each of these
              could have been a slash command. Putting them in a band that shows
              up exactly when it is relevant turns something I would have to
              remember into a nudge at the right moment.
            </li>
          </ul>
          <p className="mb-4">
            There are a few more mods in <InlineCode>c-mods</InlineCode>, for
            things like cache cost, colliding parallel sessions and plan
            progress. Those are for another post.
          </p>
          <p className="mb-4">
            The common thread: an agent works best when the human shows up at
            the right moments (when it finishes, when it needs a decision, when
            it guessed, when its context goes stale) and stays out of the way
            the rest of the time.
          </p>
          <p className="mb-4">
            <strong>
              The agent does the work. The mods make sure I show up when it
              matters.
            </strong>
          </p>
        </article>
        <BlogFooter url={mediumUrl} />
      </BlogLayout>
    </>
  );
}
