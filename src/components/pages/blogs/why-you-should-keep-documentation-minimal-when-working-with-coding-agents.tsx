import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";
import { CodeBlock } from "../../blogs/code-block";
import { InlineCode } from "../../blogs/inline-code";

const heroImg =
  "/why-you-should-keep-documentation-minimal-when-working-with-coding-agents/hero.png";

const getUserCommentCode = `// Returns null when the user does not exist.
async function getUser(id: string): Promise<User> {
  const user = await repository.findById(id);
  if (!user) throw new UserNotFoundError(id);
  return user;
}`;

const inlinePermissionCheckCode = `// Check whether the user can edit the project.
if (user.id === project.ownerId || user.role === "admin") {
  // ...
}`;

const namedPermissionCheckCode = `function canEditProject(user: User, project: Project): boolean {
  return user.id === project.ownerId || user.role === "admin";
}
if (canEditProject(user, project)) {
  // ...
}`;

const idempotencyCommentCode = `// This provider has no idempotency support. After a timeout,
// check the request status before retrying to avoid duplicates.`;

const mediumUrl =
  "https://medium.com/@yu.cao20041208/why-you-should-keep-documentation-minimal-when-working-with-coding-agents-030488ecadfa";

export function WhyYouShouldKeepDocumentationMinimalWhenWorkingWithCodingAgents() {
  return (
    <>
      <title>
        Why You Should Keep Documentation Minimal When Working with Coding
        Agents
      </title>
      <meta
        name="description"
        content="Stale docs mislead coding agents after refactors. Keep behavior in code, reserve prose for constraints agents cannot infer, and update explanations when behavior changes."
      />
      <meta
        property="og:title"
        content="Why You Should Keep Documentation Minimal When Working with Coding Agents"
      />
      <meta
        property="og:description"
        content="Stale docs mislead coding agents after refactors. Keep behavior in code, reserve prose for constraints agents cannot infer, and update explanations when behavior changes."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/why-you-should-keep-documentation-minimal-when-working-with-coding-agents"
      />
      <BlogLayout>
        <BlogHeader
          title="Why You Should Keep Documentation Minimal When Working with Coding Agents"
          date="September 20, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Why You Should Keep Documentation Minimal When Working with Coding Agents Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            Clear code reduces what needs explaining. The explanations you keep
            need to evolve with it.
          </p>
          <p className="mb-4">
            You ask a coding agent to change a feature. It updates the
            implementation, adjusts a test, and everything looks good.
            Somewhere else in the repository, a paragraph still describes how
            the feature used to work.
          </p>
          <p className="mb-4">The next task starts with that paragraph.</p>
          <p className="mb-4">
            This is one of my concerns with agentic programming: an agent can
            change the code while leaving behind explanations that will mislead
            a later agent — or itself in a future session. In a large project,
            the relevant documentation might be several directories away from
            the code being edited.
          </p>
          <p className="mb-4">
            We put comments and documentation in a repository to help someone
            understand it. When those explanations fall behind, they create
            another version of the system that the reader has to reconcile with
            the implementation.
          </p>
          <p className="mb-4">
            I think this gives us another reason to make code explain itself
            wherever possible, and to be more deliberate about the
            documentation we maintain.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            How a helpful explanation becomes misleading
          </h2>
          <p className="mb-4">
            Consider a hypothetical application that originally stores a user’s
            selected filters in local storage. Its README says:
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-gray-100 dark:bg-gray-800 py-2 mb-4">
            Selected filters are stored in local storage and restored when the
            page loads.
          </blockquote>
          <p className="mb-4">
            Later, you ask an agent to make filtered views shareable. The
            implementation changes: filters now come from URL parameters, and
            the link contains what another browser needs to recreate the view.
          </p>
          <p className="mb-4">The feature works. The README stays the same.</p>
          <p className="mb-4">
            A week later, another task asks the agent to fix a problem with
            restoring filters. If it uses the README to orient itself, it may
            investigate the old storage mechanism or propose adding it back.
            That could introduce two competing sources of state into a feature
            that was meant to have one.
          </p>
          <p className="mb-4">
            An agent that checks the documentation against the code can catch
            the discrepancy. But catching it now requires additional
            investigation. A description meant to save time has become
            something to debug.
          </p>
          <p className="mb-4">
            The same problem can appear in a single comment:
          </p>
          <CodeBlock language="typescript" code={getUserCommentCode} />
          <p className="mb-4">
            A caller written around that comment might handle a null result and
            miss the actual failure path. The type signature and implementation
            provide evidence that the comment is wrong, but the repository
            shouldn&apos;t require its reader to resolve that disagreement in
            the first place.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            A code change can leave the explanation behind
          </h2>
          <p className="mb-4">
            The issue is easy to create when a task is scoped to a particular
            behavior. “Make this view shareable” points directly toward the
            implementation. It doesn’t necessarily lead to a search for every
            sentence describing how the old view worked.
          </p>
          <p className="mb-4">
            An agent may update those references on its own. I don’t want to
            rely on that happening consistently, especially when the
            descriptions are scattered across comments, setup guides, and
            architecture documents.
          </p>
          <p className="mb-4">
            There is also a feedback loop to watch for. An outdated explanation
            informs a change; the agent then writes a new explanation based on
            that interpretation. The repository can accumulate several
            consistent descriptions of the wrong assumption.
          </p>
          <p className="mb-4">
            Adding more context won’t necessarily solve that. If the context
            contradicts itself, someone still has to determine which parts are
            current and which parts describe intended behavior that the code may
            have broken.
          </p>
          <p className="mb-4">
            That last distinction matters. The implementation isn’t
            automatically correct just because it is executable. Sometimes the
            documentation captures a requirement, and the new code is the
            regression. A disagreement should prompt investigation before either
            side is rewritten to match the other.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Make behavior readable in the code
          </h2>
          <p className="mb-4">
            My starting point is to reduce the amount of behavior that needs a
            separate prose explanation.
          </p>
          <p className="mb-4">For example:</p>
          <CodeBlock language="typescript" code={inlinePermissionCheckCode} />
          <p className="mb-4">The intent can live in a named function:</p>
          <CodeBlock language="typescript" code={namedPermissionCheckCode} />
          <p className="mb-4">
            Now the call site communicates the purpose, and the rule has a clear
            place to inspect and change. A meaningful name does work that
            otherwise falls to a comment.
          </p>
          <p className="mb-4">
            Explicit types help in a similar way. A return type that
            distinguishes success from failure gives callers something the type
            checker can enforce. A prose description of that same distinction
            depends on someone remembering to maintain it.
          </p>
          <p className="mb-4">
            Focused tests can capture examples of expected behavior, too. A test
            named{" "}
            <InlineCode>rejects edits from non-members</InlineCode> provides an
            expectation that can be checked when the implementation changes.
          </p>
          <p className="mb-4">
            Names, types, and tests can still be wrong. They need review. Their
            advantage is that they participate more directly in development:
            they are used at call sites, checked by tooling, or exercised when
            tests run. A paragraph in an unrelated file can remain untouched
            through many changes.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Keep the explanations the code cannot provide
          </h2>
          <p className="mb-4">
            I still want comments that explain constraints or decisions a
            reader couldn’t reasonably infer from the implementation.
          </p>
          <p className="mb-4">
            Imagine an integration with an external service that does not support
            idempotency keys. A useful comment might say:
          </p>
          <CodeBlock language="typescript" code={idempotencyCommentCode} />
          <p className="mb-4">
            That explanation helps the next developer understand why an
            automatic retry would be a mistake. Deleting it in the name of clean
            code would lose valuable context.
          </p>
          <p className="mb-4">
            The same applies to architecture documents. A module can reveal how
            a queue is implemented without explaining why the team introduced
            it, which ordering guarantees matter, or what operational constraint
            shaped the design.
          </p>
          <p className="mb-4">
            The distinction I find useful is whether the explanation adds
            information. A comment translating the next three lines into
            English has a maintenance cost with little benefit. A comment
            preserving a non-obvious constraint can prevent someone from making
            a seemingly reasonable but incorrect change.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            How I keep documentation small and close to the code
          </h2>
          <p className="mb-4">
            In my personal projects and at work, I try to minimize standalone
            documentation files. For the projects I work on, a few high-level
            READMEs covering setup and development instructions are usually
            enough to get someone oriented: how to run the application, which
            configuration it needs, and how to work on it.
          </p>
          <p className="mb-4">
            I try to keep detailed explanations to a minimum, too. When a detail
            genuinely needs explaining, I prefer to put that explanation next
            to the relevant code. A constraint on retries belongs beside the
            retry logic. A surprising transformation deserves a short
            explanation where the transformation happens.
          </p>
          <p className="mb-4">
            Proximity matters because it makes the explanation visible at the
            moment someone changes the behavior. A developer or agent editing a
            function has a better opportunity to notice its comment than a
            paragraph buried in a separate document. Keeping them together also
            makes it easier to review the implementation and its explanation
            in the same diff.
          </p>
          <p className="mb-4">
            That doesn’t guarantee the comment stays accurate. It reduces the
            distance between the change and the reminder to update it. My
            preference is to keep fewer explanations, make each one useful, and
            place it where it is most likely to be maintained.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Remind the agent to finish the documentation work
          </h2>
          <p className="mb-4">
            I also use an <InlineCode>agent.md</InlineCode> file to give the
            agent project instructions, including reminders to update
            documentation when it changes the code. In my experience, agents
            tend to forget that step unless I explicitly include it in the task
            or their instructions.
          </p>
          <p className="mb-4">The reminder can be straightforward:</p>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-gray-100 dark:bg-gray-800 py-2 mb-4">
            When changing behavior, check the related comments and documentation.
            Update or remove explanations that have become inaccurate. Keep
            necessary implementation details close to the code, and avoid
            creating new documentation files that repeat what the code already
            makes clear.
          </blockquote>
          <p className="mb-4">
            For a specific task, I can make that instruction more focused. In
            the filters example, a prompt could include:
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-gray-100 dark:bg-gray-800 py-2 mb-4">
            After changing filter persistence, search for comments and
            documentation describing where filters are stored and how they are
            restored. Update references affected by this change. Flag conflicting
            requirements rather than silently choosing between them.
          </blockquote>
          <p className="mb-4">
            That gives the agent a concrete subject to investigate. It is more
            useful than a broad request to “update the docs,” which can produce
            extra prose without finding the stale explanation that matters.
          </p>
          <p className="mb-4">
            The review can stay proportional to the change. A rename may only
            affect nearby references. Moving state from local storage to the
            URL deserves a check of the sharing, persistence, and
            initialization explanations.
          </p>
          <p className="mb-4">
            The agent instructions need the same discipline. I want that file to
            hold durable project rules and useful navigation. Filling it with a
            detailed inventory of implementation choices would create another
            document to keep synchronized after every refactor. When a detail
            already has a clear home, I prefer to point to it.
          </p>
          <p className="mb-4">
            For my own projects, the goal is to make the code carry the behavior
            clearly, then use documentation for the context that remains:
            intent, constraints, setup, and decisions. When that behavior
            changes, reviewing its explanations should be part of finishing the
            work.
          </p>
          <p className="mb-4">
            Before adding another comment for an agent to read, I want to ask:
            what will this explanation teach it, and what will make us revisit
            it when it stops being true?
          </p>
        </article>
        <BlogFooter url={mediumUrl} />
      </BlogLayout>
    </>
  );
}
