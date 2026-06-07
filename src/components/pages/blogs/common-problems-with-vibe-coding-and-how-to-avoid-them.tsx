import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg =
  "/common-problems-with-vibe-coding-and-how-to-avoid-them/hero.png";

export function CommonProblemsWithVibeCoding() {
  return (
    <>
      <title>Common Problems with Vibe Coding (and How to Avoid Them)</title>
      <meta
        name="description"
        content="AI-assisted development has dramatically accelerated building apps, but vibe coding introduces real challenges. Here are seven common problems and how to address them."
      />
      <meta
        property="og:title"
        content="Common Problems with Vibe Coding (and How to Avoid Them)"
      />
      <meta
        property="og:description"
        content="AI-assisted development has dramatically accelerated building apps, but vibe coding introduces real challenges. Here are seven common problems and how to address them."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/common-problems-with-vibe-coding-and-how-to-avoid-them"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Common Problems with Vibe Coding (and How to Avoid Them)"
          date="June 6, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Common Problems with Vibe Coding Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            AI-assisted development through tools like Claude Code, Cursor, and
            GitHub Copilot has dramatically accelerated how fast we can build
            applications. But this approach — often called "vibe coding" — comes
            with its own set of challenges that are worth recognizing and
            addressing systematically.
          </p>
          <p className="mb-4">
            These aren't fundamental limitations of AI. They're mostly workflow
            problems. Here are seven of the most common ones I've encountered,
            and how to avoid them.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            1. Duplicated Code Everywhere
          </h2>
          <p className="mb-4">
            AI tends to prioritize immediate functionality over long-term
            architecture. The result is often utility functions scattered across
            a project, with similar logic repeated in multiple places.
          </p>
          <p className="mb-4">
            The fix is to treat refactoring as a separate pass. After getting a
            feature working, ask the AI to identify duplication and consolidate
            shared logic into a dedicated utilities folder. A feature can be
            implemented quickly first, then cleaned up with a second prompt.
            Treating these as two distinct steps makes both easier.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            2. Security Vulnerabilities
          </h2>
          <p className="mb-4">
            AI-generated code can miss authorization checks, create vulnerable
            queries, or skip edge cases in input validation. It doesn't
            deliberately introduce security issues — it just doesn't always know
            what it doesn't know.
          </p>
          <p className="mb-4">
            The solution is a multi-layered review approach. Use AI code
            reviewers like CodeRabbit alongside GitHub's built-in review
            features, linters, and automated test generation. Having multiple AI
            systems review each other's output catches issues that a single-pass
            generation tends to miss.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            3. Generic, "Obviously AI-Generated" Frontends
          </h2>
          <p className="mb-4">
            Left to its own devices, AI produces frontends with predictable
            gradients, purple or magenta themes, and repetitive startup-style
            copy. This happens because AI is trained on a lot of existing design
            patterns, so it defaults to them.
          </p>
          <p className="mb-4">
            Better results come from specific constraints and visual references
            rather than vague directives. Instead of asking for "a clean modern
            UI," describe exactly what you want — the color palette, the font
            style, the layout density. Screenshot-driven prompting and
            design-focused tools help push output in a more distinctive
            direction.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            4. Missing Domain Knowledge in Established Projects
          </h2>
          <p className="mb-4">
            AI understands programming languages well. What it doesn't have is
            context about why specific architectural choices exist in your
            project, which edge cases matter for your particular business, or
            what conventions your team has settled on over time.
          </p>
          <p className="mb-4">
            The best fix is good documentation. Writing a comprehensive{" "}
            <code>CLAUDE.md</code> or <code>Agent.md</code> file that explains
            project architecture, conventions, business rules, and common
            pitfalls makes a significant difference. Strong engineering practices
            benefit both human teammates and AI systems — the investment pays
            double.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            5. Missing Changes During Large Refactors
          </h2>
          <p className="mb-4">
            When doing extensive refactoring, AI may update most files but
            overlook related tests, configuration updates, or type definitions.
            It's good at the main file and forgets the satellite files.
          </p>
          <p className="mb-4">
            Dedicated review passes help here. After a large refactor, ask the
            AI to verify that all expected files were updated. Use global search
            to confirm old references no longer exist. Prompts like "what other
            files would typically need to change after this refactor?" catch
            things that get missed.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            6. Missing Context Across Multiple Codebases
          </h2>
          <p className="mb-4">
            When AI operates inside an isolated folder — frontend only, or
            backend only — it can't ensure consistency between the two sides.
            It may generate a frontend hook that doesn't match the actual API
            response shape, or suggest a backend change without knowing how the
            frontend consumes it.
          </p>
          <p className="mb-4">
            The simplest fix is initializing AI from the project root so it has
            full visibility. Monorepos make this natural — they keep frontend,
            backend, and shared utilities in one place, which improves both
            developer and AI-assisted workflows for the same reason: less context
            switching, more coherence.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            7. The Rapidly Evolving Ecosystem
          </h2>
          <p className="mb-4">
            New AI coding tools get announced constantly, and it's easy to feel
            like you're always behind. Every week there's a new model, a new
            agent framework, a new best practice.
          </p>
          <p className="mb-4">
            The most useful thing here is to follow a small number of trusted
            sources — a few blogs, a few YouTube channels — and prioritize
            hands-on experimentation over passive consumption. Practical
            experience teaches more than reading about the latest announcements.
            You don't need to try everything. You need to build a working
            intuition, and that comes from shipping.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Final Thoughts
          </h2>
          <p className="mb-4">
            Vibe coding is not magic. The challenges above are real, but none of
            them are fundamental limitations of the technology. They're workflow
            problems, and workflow problems have workflow solutions.
          </p>
          <p className="mb-4">
            The developers who get the most out of AI tools are the ones who
            guide, review, and structure the output — not the ones who passively
            accept the first result. The future isn't AI replacing engineers.
            It's engineers who collaborate effectively with capable AI systems
            outpacing those who don't.
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/common-problems-with-vibe-coding-and-how-to-avoid-them-a7e93cc5ead9" />
      </div>
    </>
  );
}
