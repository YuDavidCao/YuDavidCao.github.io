import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/why-monorepos-make-ai-coding-tools-way-smarter/hero.png";

export function WhyMonoreposMakeAiCodingToolsWaySmarter() {
  return (
    <>
      <title>Why Monorepos Make AI Coding Tools Way Smarter</title>
      <meta
        name="description"
        content="Discover how monorepos enhance AI coding tools by providing full context across your entire codebase, leading to better suggestions and more effective development."
      />
      <meta property="og:title" content="Why Monorepos Make AI Coding Tools Way Smarter" />
      <meta
        property="og:description"
        content="Discover how monorepos enhance AI coding tools by providing full context across your entire codebase, leading to better suggestions and more effective development."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/why-monorepos-make-ai-coding-tools-way-smarter"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Why Monorepos Make AI Coding Tools Way Smarter"
          date="January 27, 2025"
          heroImgSrc={heroImg}
          heroImgAlt="Why Monorepos Make AI Coding Tools Way Smarter Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            Lately I've been using AI coding tools like Cursor and Claude Code, and one thing has become really clear: the way you structure your codebase massively impacts how helpful these tools can be.
          </p>
          <p className="mb-4">
            And the biggest win? <strong>Monorepos</strong>.
          </p>
          
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Context Is Everything
          </h2>
          <p className="mb-4">
            AI tools shine when they understand the bigger picture. But if your project is split into separate repos — one for the frontend, another for the backend — you're basically starving the AI of half the context it needs.
          </p>
          <p className="mb-4">
            Let's say you're in your frontend repo and ask Cursor to write a data-fetching hook. Without backend context, the AI has to guess what your API looks like. It might hallucinate endpoint names or get the data shape wrong.
          </p>
          <p className="mb-4">
            In a monorepo, that problem disappears, as the AI can see:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>The backend routes you've already written</li>
            <li>The types and models those routes return</li>
            <li>The frontend code that consumes them</li>
          </ul>
          <p className="mb-4">
            Suddenly, it's not guessing anymore — it's writing code that actually fits your project.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            What This Looks Like in Practice
          </h2>
          <p className="mb-4">
            Here are some scenarios I've run into:
          </p>
          <p className="mb-4">
            <strong>Frontend hooks with backend context</strong><br />
            Cursor can look at <code>api/user.ts</code> in the backend, then generate a <code>useUser()</code> hook on the frontend that matches the response type perfectly.
          </p>
          <p className="mb-4">
            <strong>Code changes on multiple sides</strong><br />
            Claude can suggest backend changes <em>and</em> update the frontend calls at the same time, because it knows how both sides connect.
          </p>
          <p className="mb-4">
            <strong>Shared utils</strong><br />
            Instead of duplicating or writing a different version of some util functions, the AI pulls from <code>@project/utils</code> or <code>@project/types</code> and keeps everything consistent.
          </p>
          <p className="mb-4">
            It feels less like autocomplete and more like pair-programming with someone who understands the whole codebase.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Why It Matters
          </h2>
          <p className="mb-4">
            The real superpower of AI tools isn't just faster coding — it's how they reduce friction. And the fewer silos your code has, the more they can help.
          </p>
          <p className="mb-4">
            A monorepo gives the AI the same bird's-eye view you have in your head: frontend, backend, and shared logic all connected. That means:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Better suggestions</li>
            <li>Fewer broken API calls</li>
            <li>Easier refactors</li>
            <li>Way less context-switching</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Final Thought
          </h2>
          <p className="mb-4">
            Monorepos have always been nice for things like dependency management and consistent tooling. But with AI in the mix, their value goes way beyond that.
          </p>
          <p className="mb-4">
            If you're serious about getting the most out of Cursor, Claude Code, or whatever AI tool you're using, putting everything in a monorepo is like giving your AI pair programmer X-ray vision into your project.
          </p>
          <p className="mb-4">
            It's not just about organizing code anymore — it's about unlocking the full potential of AI-assisted development.
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/why-monorepos-make-ai-coding-tools-way-smarter-b2ca354a9db9" />
      </div>
    </>
  );
}
