import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";
import { InlineCode } from "../../blogs/inline-code";

const title = "Six Habits That Made Me Faster in Claude Code Desktop";

const heroImg = "/six-habits-that-made-me-faster-in-claude-code-desktop/hero.png";

const mediumUrl =
  "https://medium.com/@yu.cao20041208/six-habits-that-made-me-faster-in-claude-code-desktop-cbcada154a80";

const previousPostUrl =
  "https://medium.com/@yu.cao20041208/five-small-claude-code-mods-that-changed-how-i-work-with-ai-agents-e6c7059a5d61";

const description =
  "Six habits from daily Claude Code Desktop use: repeated prompts as skills, side chats, forking a pinned root chat, naming chats, hotkeys and mods.";

const h2ClassName = "font-serif text-3xl font-bold mt-10 mb-4 tracking-tight";
const listClassName = "list-disc pl-6 mb-4 space-y-2";

export function SixHabitsThatMadeMeFasterInClaudeCodeDesktop() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/six-habits-that-made-me-faster-in-claude-code-desktop"
      />
      <BlogLayout>
        <BlogHeader
          title={title}
          date="November 14, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Claude Code desktop window with a pinned root session and three renamed forks in the sidebar, a side chat panel, and keycaps for Cmd ;, Cmd K and Cmd /"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            <em>
              Turning repeated prompts into skills, side chats, forking from a
              pinned root session, naming chats, hotkeys, and mods.
            </em>
          </p>
          <p className="mb-4">
            For the last few weeks most of my coding has happened in the Code
            tab of the Claude desktop app. Throughout the process, a few habits
            stuck because they kept saving me time, day after day. These are the
            six I’d tell a friend about first.
          </p>

          <h2 className={h2ClassName}>
            1. Ask Claude which of your prompts should be skills
          </h2>
          <p className="mb-4">
            A skill is a packaged set of instructions that Claude loads when a
            task matches it. Once a workflow is a skill, you stop typing it out,
            and Claude follows it the same way every time.
          </p>
          <p className="mb-4">
            The hard part is noticing that you repeat yourself. You don’t feel
            it while it’s happening. You just type the same three sentences of
            setup again because it’s faster than thinking about it.
          </p>
          <p className="mb-4">So every so often I ask Claude to look for me:</p>
          <blockquote className="mb-4">
            Look through the prompts I’ve sent in my recent sessions in this
            project. List the ones I’ve sent more than once, or that follow the
            same pattern, rank them by most repeated. For each, tell me whether
            it could become a skill, what the skill would do, and when it should
            trigger.
          </blockquote>
          <p className="mb-4">
            One example: the most common prompt I sent asks it to commit,
            optionally push, open a PR, and review a commit from Claude. Now,
            this has become one of my most used skills triggered by{" "}
            <InlineCode>/ship</InlineCode>
          </p>
          <p className="mb-4">
            Be proactive about the stuff that makes you more productive.
          </p>

          <h2 className={h2ClassName}>2. Use the side chat (Cmd + ;)</h2>
          <p className="mb-4">
            During a chat session, you can press{" "}
            <InlineCode>Cmd + ;</InlineCode> to open a side chat next to the
            session you're in. The useful part is that it already has that
            session's context, so you don't need to explain anything.
          </p>
          <p className="mb-4">
            I use it when the main thread is working on a change but I happen to
            have a question about its output:
          </p>
          <ul className={listClassName}>
            <li>“Why did you pick this approach over the other one?”</li>
            <li>
              “What does this change actually do? Explain to me in simple
              terms.”
            </li>
            <li>
              “Just to clarify, this change is because of that requirement
              right?”
            </li>
          </ul>
          <p className="mb-4">
            The main session keeps working on the task and its history stays
            focused. Before I found this, I either interrupted the main session
            with side questions or forked a chat just to ask a question. Both
            were worse.
          </p>

          <h2 className={h2ClassName}>3. Pin a root chat and fork from it</h2>
          <p className="mb-4">
            A lot of my projects run for days or weeks. Starting a fresh session
            each time means re-explaining the project. Continuing one long
            session means the context fills up with old work that has nothing
            to do with today’s task.
          </p>
          <p className="mb-4">
            What works for me is a root session per project. In it I load the
            context that every task needs: what the project is, how it’s
            structured, the constraints, and the decisions already made. Then I
            pin it so it stays at the top of the sidebar.
          </p>
          <p className="mb-4">
            When I start a new piece of work, I fork from the root. The fork
            starts with all the shared project context and nothing else. The
            root stays short, because the actual work happens in the forks.
          </p>

          <h2 className={h2ClassName}>4. Don’t get lazy about chat titles</h2>
          <p className="mb-4">
            This one sounds minor until you’re running several sessions at once.
            Forks from the same root start out with the same title of the root’s
            name plus “(fork)”. With three or four of them going, the sidebar
            becomes a row of identical names.
          </p>
          <p className="mb-4">
            So I rename every fork before they get chaotic, after what it’s
            doing: “refresh token bug”, “migration script”, “docs”. It takes
            five seconds. In return, when a session finishes or asks for
            permission, I know exactly which one it is without opening it.
          </p>
          <p className="mb-4">
            This matters most with the root-and-fork setup from the last
            section. The more parallel sessions you run from one root, the more
            the titles are the only thing telling them apart.
          </p>

          <h2 className={h2ClassName}>5. Learn the hotkeys</h2>
          <p className="mb-4">
            The desktop app has keyboard shortcuts for most things you’d
            otherwise click. Using them feels a lot like learning an IDE: slow
            for a week, then you can’t go back. The ones I use most:
          </p>
          <ul className={listClassName}>
            <li>
              <InlineCode>Cmd + N</InlineCode> starts a new session.
            </li>
            <li>
              <InlineCode>Cmd + ;</InlineCode> opens the side chat.
            </li>
            <li>
              <InlineCode>Cmd + K</InlineCode> opens the command palette.
            </li>
            <li>
              <InlineCode>Cmd + B</InlineCode> shows or hides the sidebar.
            </li>
            <li>
              <InlineCode>Cmd + Shift + T</InlineCode> reopens a session you
              just closed.
            </li>
            <li>
              <InlineCode>Cmd + /</InlineCode> shows the list of keyboard
              shortcuts
            </li>
          </ul>
          <p className="mb-4">
            You don’t have to learn them all at once. Next time you catch
            yourself clicking the same button again, check whether it has a
            shortcut. Small savings add up to hours.
          </p>

          <h2 className={h2ClassName}>
            6. Mods, and keep looking for time to save
          </h2>
          <p className="mb-4">
            Mods let you change Claude Code’s own interface and behavior: a row
            above the prompt box, a notification when a session finishes, a
            slash command, a hook that runs when a tool is called. I wrote about
            five of mine in a{" "}
            <a href={previousPostUrl} target="_blank" rel="noopener noreferrer">
              previous post
            </a>
            , so I won’t repeat the details here.
          </p>
          <p className="mb-4">
            The point I want to make is the same one from the first habit. Your
            workflow is different from mine, so my mods may not help you. But
            you almost certainly have your own small frictions: something you
            check by hand after every turn, a message you always type at the
            start of a session, a window you keep switching to just to see if
            something is done.
          </p>
          <p className="mb-4">
            At the end of a day, ask yourself what you did by hand three or more
            times. Or ask Claude: it has seen your sessions and can suggest what
            a mod or a skill could take over. In my experience there is almost
            always something worth automating.
          </p>

          <h2 className={h2ClassName}>Where to start</h2>
          <p className="mb-4">
            If you only try one of these, try the first. Ask Claude which of
            your prompts could be skills. It takes a minute, and the answer
            shows you where your own time is going. That list is also the best
            place to look for your first mod.
          </p>
        </article>
        <BlogFooter url={mediumUrl} />
      </BlogLayout>
    </>
  );
}
