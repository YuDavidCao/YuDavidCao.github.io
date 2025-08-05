import { CodeBlock } from "../../blogs/code-block";
import { InlineCode } from "../../blogs/inline-code";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/how-i-learned-git-rebasing-a-real-life-work-scenario/hero.png";

export function HowILearnedGitRebasingARealLifeWorkScenario() {
  return (
    <>
      <title>How I learned git rebasing — a real life work scenario</title>
      <meta
        name="description"
        content="A real-life scenario that demonstrates the value of git rebasing, with practical tips and takeaways for developers."
      />
      <meta
        property="og:title"
        content="How I learned git rebasing — a real life work scenario"
      />
      <meta
        property="og:description"
        content="A real-life scenario that demonstrates the value of git rebasing, with practical tips and takeaways for developers."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/how-i-learned-git-rebasing-a-real-life-work-scenario"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="How I learned git rebasing — a real life work scenario"
          date="Jun 22, 2025"
          heroImgSrc={heroImg}
          heroImgAlt="How I learned git rebasing — a real life work scenario Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            Although I had more or less scanned through some git tutorial and
            searched a few times about rebasing, I often find it difficult to
            fully comprehend the logic and the reason why people actually use
            it, until once during work in a scenario where a rebase saved me
            from the trouble.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Scenario
          </h2>
          <p className="mb-4">
            I had a feature branch <InlineCode>A</InlineCode> that branched off
            from <InlineCode>main</InlineCode> with 3 commits, I believe the
            three commits to be good to merge so I opened a PR and asked for
            review.
          </p>
          <p className="mb-4">
            I've talked with my manager a couple times so I thought that PR
            should be merged without many issues. As a result, I began working
            on another feature that also happens to be kind of urgent, which I
            decided to branch off from <InlineCode>A</InlineCode> and let's just
            call it <InlineCode>B</InlineCode>.
          </p>
          <p className="mb-4">
            After another 3 commits or so completing feature{" "}
            <InlineCode>B</InlineCode>, it turned out that the original 3
            commits on feature <InlineCode>A</InlineCode> needs to change in a
            pretty big way, yet feature <InlineCode>B</InlineCode> need to be
            merged asap.
          </p>
          <CodeBlock
            language="text"
            code={`main  \n └─┬─ A (feature A, needs changes)  \n   │   ├─ Commit A1 (needs to change)  \n   │   ├─ Commit A2 (needs to change)  \n   │   ├─ Commit A3 (needs to change)  \n   │   └─┬─ B (feature B, ready to merge)  \n       │   ├─ Commit B1  \n       │   ├─ Commit B2  \n       │   └─ Commit B3`}
          />
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The Problem
          </h2>
          <p className="mb-4">
            The problem is that if branch <InlineCode>B</InlineCode> got merged
            in, the 3 commits on top of <InlineCode>A</InlineCode> will also be
            merged in which is not ideal. Therefore, I need a way to extract{" "}
            <InlineCode>B1</InlineCode>, <InlineCode>B2</InlineCode>,{" "}
            <InlineCode>B3</InlineCode> and put them on top of{" "}
            <InlineCode>main</InlineCode> instead of on top of{" "}
            <InlineCode>A</InlineCode>.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The Solution
          </h2>
          <p className="mb-4">
            There's actually two ways to do this,{" "}
            <InlineCode>git cherry-pick</InlineCode> and{" "}
            <InlineCode>git rebase</InlineCode>.
          </p>
          <p className="mb-4">
            My intuition told me that this could be a good scenario to practice
            rebase, so after a quick ChatGPT:
          </p>
          <CodeBlock language="bash" code={`git rebase --onto main A`} />
          <p className="mb-4">did the job perfectly.</p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The Takeaway
          </h2>
          <p className="mb-4">
            Technologies are learned through real-life scenario; tutorials are
            cool and all but without the real life practice those knowledge are
            hard to grasp.
          </p>
          <BlogFooter url="https://medium.com/p/b87487889712" />
        </article>
      </div>
    </>
  );
} 