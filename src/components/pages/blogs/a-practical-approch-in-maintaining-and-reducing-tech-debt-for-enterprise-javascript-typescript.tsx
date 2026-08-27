import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg =
  "/a-practical-approch-in-maintaining-and-reducing-tech-debt-for-enterprise-javascript-typescript/hero.jpeg";

const knipCommand = `npx knip`;

const dateLibExample = `// lib/date.ts
export function formatDate() {
  // some code
  parseDate()
  // some more code
}

export function parseDate() {}`;

const knipWorkflow = `Knip
  ↓
Candidate list
  ↓
Human / LLM analysis
  ↓
Remove confirmed dead code
  ↓
Tests + CI`;

const dynamicImport = `const module = await import(\`./plugins/\${pluginName}.ts\`);`;

const knipLlmPrompt = `Review this Knip report.

For every unused file or dependency:
1. Determine whether it is actually safe to remove.
2. Look for dynamic imports, framework conventions, generated code,
   configuration references, or other reasons it could be a false positive.
3. Group findings into:
   - safe to remove
   - probably safe
   - needs investigation
   - likely false positive

Do not modify the repository.`;

const dynamicPluginPath = `src/plugins/foo.ts`;

const functionAnalysisFlow = `Find function
    ↓
Ask TypeScript for references
    ↓
Check whether meaningful references exist
    ↓
Produce candidate list`;

const reactLifecycleExample = `class MyComponent extends React.Component {
  componentDidUpdate() {
    // ...
  }
}`;

const paymentDirectory = `payment/
├── PaymentService.ts
├── PaymentValidator.ts
├── PaymentFormatter.ts
├── PaymentTypes.ts
└── PaymentUtils.ts`;

const paymentChain = `PaymentService
    ↓
PaymentValidator
    ↓
PaymentUtils
    ↓
PaymentFormatter`;

const ponytailAudit = `/ponytail-audit`;

const ponytailAuditPayment = `/ponytail-audit audit the payment processing section of the app.`;

const ponytailAuditAuth = `/ponytail-audit audit the authentication system.`;

const ponytailAuditDashboard = `/ponytail-audit audit the member dashboard.`;

const ponytailAuditNotifications = `/ponytail-audit audit the notification system.`;

const dryPrompt = `Go through the app and look for:
- unnecessary duplication
- opportunities to reuse existing utilities
- unnecessary abstractions
- unused code
- suspicious code
- potential bugs

Do not make changes yet.
Give me a ranked list of findings with file paths
and explain why each finding matters.`;

const dryPromptPayment = `Go through the payment processing feature and look for:
- unnecessary duplication
- opportunities to reuse existing utilities
- unnecessary abstractions
- unused code
- suspicious code
- potential bugs

Do not make changes yet.
Give me a ranked list of findings with file paths
and explain why each finding matters.`;

const retryRequest = `Add retry logic to this API call.`;

const utilsRetry = `utils/retry.ts`;

const libRequest = `lib/request.ts`;

const folderStructure = `src/
├── components/
├── hooks/
├── utils/
├── lib/
├── services/
├── api/
└── types/`;

const unfinishedWork = `new components
new API endpoints
new types
new dependencies
new configuration`;

const prettierFlow = `git commit
    ↓
Husky
    ↓
Prettier
    ↓
Consistent formatting`;

const preCommitScript = `#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "\${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

staged_files="$(git diff --cached --name-only --diff-filter=ACM || true)"
if [ -z "$staged_files" ]; then
  exit 0
fi

paths=()
while IFS= read -r file; do
  [ -z "$file" ] && continue
  paths+=("$file")
done <<EOF
$staged_files
EOF

if [ "\${#paths[@]}" -eq 0 ]; then
  exit 0
fi

npx prettier --write --ignore-unknown "\${paths[@]}"
for file in "\${paths[@]}"; do
  [ -e "$file" ] && git add "$file"
done`;

const enterprisePipeline = `Enterprise JS/TS Repository
                              │
              ┌───────────────┴───────────────┐
              │                               │
        Static analysis                  AI analysis
              │                               │
       ┌──────┼──────┐                  ┌─────┴─────┐
       │      │      │                  │           │
     Knip   TS LSP  Linting          Global      Feature
       │      │      │               audit       audit
       │      │      │                  │           │
       └──────┴──────┴──────────────────┴───────────┘
                              │
                       Candidate findings
                              │
                       Human verification
                              │
                        Delete / simplify
                              │
                     Tests + CI validation
                              │
                        Clean codebase`;

export function PracticalApprochMaintainingReducingTechDebt() {
  return (
    <>
      <title>
        A Practical Approch in Maintaining and Reducing Tech Debt for Enterprise
        JavaScript/TypeScript Applications
      </title>
      <meta
        name="description"
        content="A practical pipeline for reducing tech debt in enterprise JS/TS codebases using Knip, TypeScript LSP analysis, CI automation, and scoped LLM audits."
      />
      <meta
        property="og:title"
        content="A Practical Approch in Maintaining and Reducing Tech Debt for Enterprise JavaScript/TypeScript Applications"
      />
      <meta
        property="og:description"
        content="A practical pipeline for reducing tech debt in enterprise JS/TS codebases using Knip, TypeScript LSP analysis, CI automation, and scoped LLM audits."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/a-practical-approch-in-maintaining-and-reducing-tech-debt-for-enterprise-javascript-typescript"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="A Practical Approch in Maintaining and Reducing Tech Debt for Enterprise JavaScript/TypeScript Applications"
          date="August 27, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Maintaining and Reducing Tech Debt for Enterprise JavaScript/TypeScript Applications"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            Tech debt is inevitable in a large software project.
          </p>
          <p className="mb-4">
            The problem is not that a codebase has technical debt. The problem
            is when technical debt accumulates faster than the team can
            understand or remove it. In an enterprise JavaScript/TypeScript
            application, this can happen surprisingly quickly: a feature gets
            removed but its dependencies remain, an old component is no longer
            referenced, a CSS file survives after its component is deleted, a
            half-finished migration leaves two implementations behind, or
            developers keep adding abstractions because the existing ones are
            difficult to find.
          </p>
          <p className="mb-4">
            The result is a codebase that gets progressively harder to modify.
          </p>
          <p className="mb-4">
            This article describes a practical approach I have found useful for
            keeping a large JS/TS codebase healthy. The core idea is simple:
          </p>
          <p className="mb-4">
            Continuously identify things that can be deleted, automate the easy
            parts, and use LLMs for the parts that require understanding the
            architecture.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Knip is an excellent first pass
          </h2>
          <p className="mb-4">
            The first thing I would add to a large JS/TS repository is{" "}
            <a
              href="https://knip.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sepia dark:text-dark-sepia underline"
            >
              Knip
            </a>
            .
          </p>
          <p className="mb-4">
            It can analyze project files, dependencies, exports, and other
            aspects of a JavaScript/TypeScript project. Its analysis is based on
            the project&apos;s entry points, project patterns, imports,
            configuration, and various heuristics.
          </p>
          <p className="mb-4">
            For example, a typical workflow might look like:
          </p>
          <CodeBlock language="bash" code={knipCommand} />
          <p className="mb-4">
            The important part isn&apos;t blindly deleting everything it
            reports.
          </p>
          <p className="mb-4">
            When looking at the output of a codebase analysis tool such as Knip,
            it outputs a variety of different findings.
          </p>
          <p className="mb-4">However, not all errors are made equal.</p>
          <p className="mb-4">
            In a large application,{" "}
            <strong>Unused files</strong> and{" "}
            <strong>Unused dependencies</strong> are the things to focus on
            because they represent things that are often completely unnecessary.
          </p>
          <p className="mb-4">
            An unused file is an entire piece of code that nobody needs. An
            unused dependency is something the project is paying the complexity
            cost of maintaining despite not actually using it. Unused
            dependencies can also affect installation time, tooling, upgrades,
            security scanning, and potentially production bundles. Knip
            specifically supports detecting unused dependencies and unused files
            across JavaScript and TypeScript projects.
          </p>
          <p className="mb-4">
            In contrast, Knip can also flag unused exports, which often means
            you would:
          </p>
          <CodeBlock language="typescript" code={dateLibExample} />
          <p className="mb-4">
            and only <InlineCode>formatDate()</InlineCode> is currently used.
          </p>
          <p className="mb-4">
            Knip may tell you that the <InlineCode>parseDate</InlineCode>{" "}
            function does not need the export. But that doesn&apos;t necessarily
            mean they should be removed. The file may intentionally serve as a
            utility module, or the exports may constitute an internal API that
            developers expect to use later.
          </p>
          <p className="mb-4">
            Similarly, a type file may intentionally export a large collection
            of types. This is why I wouldn&apos;t treat &ldquo;unused
            export&rdquo; as equivalent to &ldquo;dead code.&rdquo;
          </p>
          <p className="mb-4">
            The same principle applies to duplicate exports. Having two ways to
            export something is usually less dangerous than having an entire
            unused dependency or an abandoned file sitting in the repository.
          </p>
          <p className="mb-4">
            Knip can also produce many false positives, so instead of deleting
            everything it flags, do:
          </p>
          <CodeBlock language="text" code={knipWorkflow} />
          <p className="mb-4">
            Knip is a <strong>candidate generator</strong>, not an oracle.
            Dynamic imports are one example:
          </p>
          <CodeBlock language="typescript" code={dynamicImport} />
          <p className="mb-4">
            A static analyzer like Knip is not able to detect the reference for
            this type of syntax.
          </p>
          <p className="mb-4">
            There can also be framework conventions, generated code,
            configuration-driven references, test infrastructure, build tooling,
            and other forms of indirection.
          </p>
          <p className="mb-4">
            Knip itself documents several categories of situations that can cause
            unused-dependency reports to be misleading, including dynamic or
            conditional dependencies and unrecognized references.
          </p>
          <p className="mb-4">This is where AI becomes particularly useful.</p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Feed the Knip output to an LLM
          </h2>
          <p className="mb-4">One of the most useful combinations is:</p>
          <p className="mb-4">
            <strong>static analysis + LLM reasoning.</strong>
          </p>
          <p className="mb-4">
            A static analyzer is very good at producing a large candidate set.
          </p>
          <p className="mb-4">
            An LLM is better at looking at a particular candidate and asking:
          </p>
          <p className="mb-4 italic">
            &ldquo;Does this actually make sense given how this application
            works?&rdquo;
          </p>
          <p className="mb-4">
            For example, you can give an LLM a Knip report and ask:
          </p>
          <CodeBlock language="text" code={knipLlmPrompt} />
          <p className="mb-4">
            This is much more useful than simply asking an LLM:
          </p>
          <p className="mb-4 italic">
            &ldquo;Find unused code.&rdquo;
          </p>
          <p className="mb-4">
            The analyzer has already done the mechanical work. The LLM can spend
            its context window on reasoning.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Put Knip in CI
          </h2>
          <p className="mb-4">
            Once you have cleaned up the existing backlog, the next problem is
            preventing it from coming back.
          </p>
          <p className="mb-4">Knip can become part of CI.</p>
          <p className="mb-4">
            For example, you might run it on every pull request if the repository
            is small enough, or use a less aggressive policy for a very large
            enterprise repository.
          </p>
          <p className="mb-4">
            False positives should be explicitly configured rather than
            repeatedly rediscovered.
          </p>
          <p className="mb-4">
            Knip provides configuration mechanisms for ignoring specific issues
            while continuing to analyze the relevant files.
          </p>
          <p className="mb-4">That gives you a useful principle:</p>
          <p className="mb-4">
            If something is intentionally unused, make the intention explicit.
          </p>
          <p className="mb-4">
            For example, instead of having everyone remember that:
          </p>
          <CodeBlock language="text" code={dynamicPluginPath} />
          <p className="mb-4">
            is dynamically loaded somewhere, document that in your{" "}
            <InlineCode>knip.json</InlineCode>.
          </p>
          <p className="mb-4">
            Another thing I would add is a time gap before flagging newly unused
            files or dependencies as technical debt.
          </p>
          <p className="mb-4">
            In a large project, something that appears unused today may have been
            introduced by a recent PR as part of work that is still being built
            out or will be used by a follow-up change.
          </p>
          <p className="mb-4">
            I&apos;d suggest a gap somewhere between{" "}
            <strong>2 weeks and 3 months</strong>, depending on the project and
            development cycle, before escalating a finding as something that
            should be removed.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Don&apos;t necessarily run the full cleanup every PR
          </h2>
          <p className="mb-4">There is also a question of cadence.</p>
          <p className="mb-4">
            A full repository-wide cleanup does not necessarily need to run on
            every pull request, because this can quickly become overbearing to
            maintain and look over.
          </p>
          <p className="mb-4">
            For a very large enterprise repository, I would consider having a
            scheduled GitHub Actions job run monthly, quarterly, or at whatever
            cadence makes sense for the organization.
          </p>
          <p className="mb-4">The workflow can:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Run Knip.</li>
            <li>Collect the results.</li>
            <li>Compare them against known exceptions.</li>
            <li>Create or update a GitHub issue.</li>
            <li>Assign the cleanup to the team that owns the area.</li>
          </ol>
          <p className="mb-4">
            This turns technical debt from an amorphous problem into a recurring
            maintenance task, which is much more actionable than finding 200
            seemingly unused files that nobody knows anything about years later.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Knip doesn&apos;t find every unused function
          </h2>
          <p className="mb-4">There is an important limitation here.</p>
          <p className="mb-4">
            Knip is excellent at repository-level relationships, but you should
            not expect it to answer:
          </p>
          <p className="mb-4 italic">
            &ldquo;Is this individual function inside this file unused?&rdquo;
          </p>
          <p className="mb-4">For that, you need another layer of analysis.</p>
          <p className="mb-4">
            I previously wrote a small tool for this purpose:{" "}
            <a
              href="https://github.com/YuDavidCao/unused-function-detection-ts"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sepia dark:text-dark-sepia underline"
            >
              unused-function-detection-ts
            </a>
            .
          </p>
          <p className="mb-4">
            The approach uses the TypeScript Language Service to look up
            references to function implementations.
          </p>
          <p className="mb-4">The general idea is:</p>
          <CodeBlock language="text" code={functionAnalysisFlow} />
          <p className="mb-4">
            I also wrote about this problem in an{" "}
            <a
              href="/blog/create-an-unused-function-detection-script-using-the-typescript-compiler-and-lsp-api"
              className="text-sepia dark:text-dark-sepia underline"
            >
              earlier post
            </a>
            .
          </p>
          <p className="mb-4">
            This can produce a surprisingly useful list, but again, it
            isn&apos;t perfect. Of course, it can still produce false positives.
          </p>
          <p className="mb-4">Consider:</p>
          <CodeBlock language="tsx" code={reactLifecycleExample} />
          <p className="mb-4">
            React calls it through the framework&apos;s lifecycle mechanism.
          </p>
          <p className="mb-4">So the goal isn&apos;t:</p>
          <p className="mb-4 italic">
            &ldquo;Find every unused function with 100% accuracy.&rdquo;
          </p>
          <p className="mb-4">The goal is:</p>
          <p className="mb-4">
            Produce a sufficiently accurate list that a developer or LLM can
            review and remove the obvious cases.
          </p>
          <p className="mb-4">
            That distinction matters a lot for automated tech-debt tooling.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The harder problem: files that reference each other
          </h2>
          <p className="mb-4">
            Static dependency analysis has a fundamental limitation.
          </p>
          <p className="mb-4">Imagine this directory:</p>
          <CodeBlock language="text" code={paymentDirectory} />
          <p className="mb-4">
            Suppose none of those files are referenced by the rest of the
            application.
          </p>
          <p className="mb-4">But they all reference each other:</p>
          <CodeBlock language="text" code={paymentChain} />
          <p className="mb-4">
            This problem is especially common in enterprise codebases because
            ownership and context are often fragmented across teams. A subsystem
            can remain in the repository simply because nobody knows whether
            another team, product, customer configuration, or upcoming project
            still depends on it.
          </p>
          <p className="mb-4">
            From the perspective of a local dependency graph, everything looks
            alive.
          </p>
          <p className="mb-4">
            From the perspective of the application, the entire directory is
            dead.
          </p>
          <p className="mb-4">
            This is where repository-level reasoning becomes much more useful.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Use LLMs for architectural dead code
          </h2>
          <p className="mb-4">
            LLMs can reason about things that conventional static analysis
            struggles with:
          </p>
          <p className="mb-4 italic">
            &ldquo;Why does this entire subsystem exist?&rdquo;
          </p>
          <p className="mb-4">
            For the past few months, I&apos;ve been using{" "}
            <a
              href="https://github.com/DietrichGebert/ponytail"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sepia dark:text-dark-sepia underline"
            >
              Ponytail
            </a>
            .
          </p>
          <p className="mb-4">
            Ponytail is an AI coding skill designed around aggressively
            questioning unnecessary code and complexity. Its{" "}
            <InlineCode>ponytail-audit</InlineCode> skill performs a
            repository-wide audit (by default) and produces a ranked list of
            things that could potentially be deleted, simplified, or replaced.
          </p>
          <p className="mb-4">
            In practice, I&apos;ve found this particularly useful for finding
            things that are technically connected but don&apos;t actually
            contribute to the application anymore.
          </p>
          <p className="mb-4">For example:</p>
          <CodeBlock language="text" code={ponytailAudit} />
          <p className="mb-4">
            can ask the agent to audit the repository broadly.
          </p>
          <p className="mb-4">
            But there is an important scalability problem.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Don&apos;t ask an LLM to understand your entire 500,000-line
            repository
          </h2>
          <p className="mb-4">
            LLMs have context limits, and even when an agent can navigate a huge
            repository, the quality of reasoning tends to degrade as the amount
            of unrelated code increases.
          </p>
          <p className="mb-4">
            In my experience, Ponytail with Claude Opus has been reasonably
            effective for repositories around the ~30,000 LOC range.
          </p>
          <p className="mb-4">Beyond that, I would rather reduce the scope.</p>
          <p className="mb-4">Instead of:</p>
          <CodeBlock language="text" code={ponytailAudit} />
          <p className="mb-4">try something like:</p>
          <CodeBlock language="text" code={ponytailAuditPayment} />
          <p className="mb-4">Now the model has a much more manageable problem.</p>
          <p className="mb-4">You can apply the same strategy to:</p>
          <CodeBlock language="text" code={ponytailAuditAuth} />
          <p className="mb-4">or:</p>
          <CodeBlock language="text" code={ponytailAuditDashboard} />
          <p className="mb-4">or:</p>
          <CodeBlock language="text" code={ponytailAuditNotifications} />
          <p className="mb-4">
            This is an important pattern for AI-assisted maintenance:
          </p>
          <p className="mb-4">
            When the repository is too large for reliable global reasoning,
            partition the architecture into meaningful domains.
          </p>
          <p className="mb-4">
            Ponytail&apos;s audit skill is specifically designed to scan a
            codebase for over-engineering and prioritize candidates for deletion
            rather than automatically modifying the code.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            LLMs are also useful for finding DRY opportunities
          </h2>
          <p className="mb-4">
            Dead code isn&apos;t the only form of technical debt.
          </p>
          <p className="mb-4">Another useful prompt is simply:</p>
          <CodeBlock language="text" code={dryPrompt} />
          <p className="mb-4">For a specific feature:</p>
          <CodeBlock language="text" code={dryPromptPayment} />
          <p className="mb-4">
            This works particularly well because the LLM is not being asked to
            solve everything.
          </p>
          <p className="mb-4">
            It is being asked to <strong>look for things</strong>.
          </p>
          <p className="mb-4">
            That distinction makes the output easier to review.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Give AI agents a bias toward reuse
          </h2>
          <p className="mb-4">
            One of the more subtle ways technical debt accumulates with
            AI-assisted development is through <strong>reinvention</strong>.
          </p>
          <p className="mb-4">A developer asks an AI agent to implement:</p>
          <CodeBlock language="text" code={retryRequest} />
          <p className="mb-4">The agent may create:</p>
          <CodeBlock language="text" code={utilsRetry} />
          <p className="mb-4">But perhaps the repository already has:</p>
          <CodeBlock language="text" code={libRequest} />
          <p className="mb-4">with retry handling.</p>
          <p className="mb-4">The AI simply didn&apos;t know it existed.</p>
          <p className="mb-4">
            This is why repository organization matters more in the age of LLM
            coding agents, not less.
          </p>
          <p className="mb-4">
            Ponytail&apos;s broader philosophy is essentially that the best code
            is often the code you don&apos;t write, and its skills explicitly
            encourage deletion, reuse, and avoiding unnecessary abstractions.
          </p>
          <p className="mb-4">
            A similar principle should be embedded into your own AI coding
            workflow:
          </p>
          <p className="mb-4">
            Before creating something new, search for an existing
            implementation.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Folder structure is an AI optimization
          </h2>
          <p className="mb-4">
            Logical folder structure is often discussed as a human readability
            concern.
          </p>
          <p className="mb-4">I think that undersells it.</p>
          <p className="mb-4">
            It is also an <strong>LLM usability concern</strong>.
          </p>
          <p className="mb-4">Consider:</p>
          <CodeBlock language="text" code={folderStructure} />
          <p className="mb-4">
            versus a codebase where related functionality is scattered across
            dozens of unrelated directories.
          </p>
          <p className="mb-4">
            If an agent needs HTTP request logic and can easily discover:
          </p>
          <CodeBlock language="text" code={libRequest} />
          <p className="mb-4">
            it is much less likely to create another request helper.
          </p>
          <p className="mb-4">
            The same is true for humans. Folder structure therefore becomes part
            of your technical-debt prevention strategy.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Prevent unfinished work from becoming permanent
          </h2>
          <p className="mb-4">
            One of the biggest sources of technical debt is not bad code.
          </p>
          <p className="mb-4">
            It&apos;s <strong>unfinished work</strong>. A feature gets started;
            then priorities change; the feature is abandoned. But the repository
            still contains:
          </p>
          <CodeBlock language="text" code={unfinishedWork} />
          <p className="mb-4">
            Some of it is partially wired into the application. Some of it
            isn&apos;t.
          </p>
          <p className="mb-4">
            Six months later, nobody remembers what it was supposed to do.
          </p>
          <p className="mb-4">
            This is particularly dangerous in large organizations because
            unfinished projects can look legitimate simply because there is a lot
            of code associated with them.
          </p>
          <p className="mb-4">A good rule is:</p>
          <p className="mb-4">
            Don&apos;t let unfinished features silently become permanent
            residents of the main codebase.
          </p>
          <p className="mb-4 italic">
            &ldquo;Maybe we&apos;ll finish this later&rdquo; is one of the most
            expensive sentences in software engineering.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Formatting is technical debt prevention too
          </h2>
          <p className="mb-4">
            Formatting may seem unrelated to technical debt, but consistency
            matters.
          </p>
          <p className="mb-4">
            A repository where every developer formats code differently gradually
            becomes harder to read and review.
          </p>
          <p className="mb-4">
            This is why I like having Prettier enforced through a Husky
            pre-commit hook.
          </p>
          <p className="mb-4">For example:</p>
          <CodeBlock language="text" code={prettierFlow} />
          <p className="mb-4">
            This isn&apos;t about making code prettier for its own sake.
          </p>
          <p className="mb-4">
            It reduces the amount of irrelevant variation in the codebase.
          </p>
          <p className="mb-4">That has downstream benefits:</p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>smaller diffs</li>
            <li>easier code review</li>
            <li>fewer formatting arguments</li>
            <li>more consistent generated code</li>
            <li>easier LLM analysis</li>
            <li>easier automated transformations</li>
          </ul>
          <p className="mb-4">
            The same principle applies to linting and type checking.
          </p>
          <p className="mb-4">
            The less cognitive noise the repository contains, the easier it is
            for both humans and tools to reason about it.
          </p>
          <p className="mb-4">
            Here&apos;s a simple pre-commit script that performs Prettier
            formatting on staged files.
          </p>
          <CodeBlock language="bash" code={preCommitScript} />

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            A practical enterprise tech-debt pipeline
          </h2>
          <p className="mb-4">
            Putting all of this together, I would think about maintenance as
            several layers.
          </p>
          <CodeBlock language="text" code={enterprisePipeline} />
          <p className="mb-4">
            The important part is that these tools have <strong>different jobs</strong>.
            No single tool is going to understand the entire repository. The goal
            is to combine several imperfect tools whose weaknesses complement
            each other.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The most important distinction: detection vs. judgment
          </h2>
          <p className="mb-4">
            There is a temptation to build a magical tool that says:
          </p>
          <p className="mb-4 italic">
            &ldquo;These 47 files are dead. Delete them.&rdquo;
          </p>
          <p className="mb-4">I don&apos;t think that is the right goal.</p>
          <p className="mb-4">Instead, build a system that says:</p>
          <p className="mb-4 italic">
            &ldquo;These 47 things are suspicious. Here is why.&rdquo;
          </p>
          <p className="mb-4">
            Then let humans and LLMs investigate the candidates.
          </p>
          <p className="mb-4">
            Static analysis is deterministic and scalable. LLMs are flexible but
            probabilistic. Humans are expensive but ultimately responsible for
            understanding product context.
          </p>
          <p className="mb-4">
            The combination is much more powerful than any one of them.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Final thoughts
          </h2>
          <p className="mb-4">
            Enterprise codebases don&apos;t become difficult to maintain because
            someone wrote one bad function.
          </p>
          <p className="mb-4">
            They become difficult because thousands of small decisions
            accumulate:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-1">
            <li>an unused dependency here</li>
            <li>an abandoned component there</li>
            <li>a duplicate helper</li>
            <li>an old CSS file</li>
            <li>a half-finished feature</li>
            <li>an unnecessary abstraction</li>
            <li>a second implementation of something that already existed</li>
            <li>a temporary workaround that becomes permanent</li>
          </ul>
          <p className="mb-4">
            Individually, none of these seems important.
          </p>
          <p className="mb-4">
            Together, they create a codebase where every change becomes harder
            than it needs to be.
          </p>
          <p className="mb-4">
            The solution is not a giant quarterly &ldquo;rewrite.&rdquo;
          </p>
          <p className="mb-4">It is a continuous cleanup loop:</p>
          <p className="mb-4">
            Detect → Analyze → Delete → Verify → Automate → Repeat.
          </p>
          <p className="mb-4">
            Use deterministic tools like Knip for the mechanical work. Use
            TypeScript&apos;s language tooling for deeper reference analysis. Use
            linting and formatting automation to keep code consistent. Use LLMs
            for the questions that require understanding rather than simple
            dependency graphs. And when the repository becomes too large for
            reliable global AI reasoning, audit one architectural domain at a
            time.
          </p>
          <p className="mb-4">
            Most importantly, make deletion a normal engineering activity.
          </p>
          <p className="mb-4">
            A big part of a healthy enterprise codebase isn&apos;t one that
            contains the most functionality, but instead is the one that
            contains only the functionality the organization still needs.
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/a-practical-approch-in-maintaining-and-reducing-tech-debt-for-enterprise-javascript-typescript-f4f771b5f554" />
      </div>
    </>
  );
}
