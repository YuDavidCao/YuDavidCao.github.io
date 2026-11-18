import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";

const title = "The Dreaded Chain of Requirements";

const heroImg = "/the-dreaded-chain-of-requirements/hero.png";

const mediumUrl =
  "https://medium.com/@yu.cao20041208/the-dreaded-chain-of-requirements-6a1892af8754";

const description =
  "AI specs forwarded without the original request look thorough and sound right, but drift further from the real need at every hand-off.";

const h2ClassName = "font-serif text-3xl font-bold mt-10 mb-4 tracking-tight";
const listClassName = "list-disc pl-6 mb-4 space-y-2";

export function TheDreadedChainOfRequirements() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/the-dreaded-chain-of-requirements"
      />
      <BlogLayout>
        <BlogHeader
          title={title}
          date="November 17, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="A long AI-written implementation plan suggesting Redis and a CDN, with a broken chain link to the original request, which is not attached"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            <em>
              An AI-generated spec forwarded without the prompt behind it looks
              thorough, reads as authoritative, and quietly drifts further from
              the real need at every hop.
            </em>
          </p>
          <p className="mb-4">
            A requirements doc lands in my inbox. It’s about two thousand words
            long, with an Overview, Goals, Non-Goals, Proposed Architecture,
            Phased Rollout and Risks. It looks thorough. I read it twice and I
            still can’t tell what the person actually needs.
          </p>
          <p className="mb-4">So I ask them: what did you type into the AI?</p>
          <p className="mb-4">
            The answer is usually two sentences. And those two sentences are
            what I needed in the first place.
          </p>

          <h2 className={h2ClassName}>Requirements decide the outcome now</h2>
          <p className="mb-4">
            Last week I wrote about how{" "}
            <a href="/blog/ai-solves-the-problem-you-describe-not-the-one-you-have">
              AI solves the problem you describe, not the one you have
            </a>
            . The model builds what it’s told, so whatever goes in decides what
            comes out. As implementation gets faster and cheaper, the
            requirement becomes the part of the work with the most leverage. A
            wrong requirement used to cost a few days before someone noticed.
            Now it can be fully built, tested and merged before anyone asks
            whether it was the right thing to build.
          </p>
          <p className="mb-4">
            That makes the accuracy of the <em>original</em> requirement more
            important than ever.
          </p>
          <p className="mb-4">
            And there’s a habit that works directly against it. More and more
            often, I get AI-generated requirements sent over with no original
            prompt attached. Someone had a need, asked an AI to “turn this into
            a technical spec,” and forwarded the result. The two sentences that
            started it are gone.
          </p>
          <p className="mb-4">This causes three problems.</p>

          <h2 className={h2ClassName}>
            Problem 1: You can’t find the actual need
          </h2>
          <p className="mb-4">
            AI-generated plans are long, evenly formatted, and give everything
            the same weight. Every section of the template gets filled in, so a
            passing thought gets the same heading and the same three bullet
            points as the thing that actually matters.
          </p>
          <p className="mb-4">
            The one sentence that counts, something like “customers keep
            complaining that the order history page takes forever to load,”
            gets paraphrased into “Ensure optimal performance characteristics
            across user-facing surfaces” and buried in section two.
          </p>
          <p className="mb-4">
            The reader now has to reverse-engineer the intent from the output.
            That’s slower than reading the original request, and it’s
            guesswork. You end up asking the sender what they meant, which is
            just the slow way of asking for the prompt.
          </p>

          <h2 className={h2ClassName}>
            Problem 2: It’s often wrong, and it sounds right
          </h2>
          <p className="mb-4">Here’s a realistic example.</p>
          <p className="mb-4">
            A non-technical stakeholder hears that the order history page is
            slow. They ask an AI to write a technical plan to “ensure low
            latency on the order history page.” That’s all the context it gets.
          </p>
          <p className="mb-4">
            With nothing else to go on, the model reaches for the general answer
            to “make it fast”: add a caching layer, put Redis in front of the
            database, serve assets through a CDN, maybe evaluate a managed
            caching service. It’s well organized and it reads like something a
            senior engineer would write.
          </p>
          <p className="mb-4">
            An engineer who knows the system would point somewhere else
            entirely. Orders are sharded by merchant, but this page looks them
            up by customer, so every page load fans out a query to every shard
            and waits for the slowest one. That cross-shard query is the
            latency. A CDN does nothing for a personalized, logged-in page. A
            cache might make it look better for repeat visitors while everyone
            else still waits, and it adds a new class of stale-data bugs. The
            real fix is something like a lookup table keyed by customer, so the
            query hits one shard instead of all of them.
          </p>
          <p className="mb-4">
            The model wasn’t being dumb. It was missing one critical piece of
            context, and the person writing the prompt couldn’t have supplied it
            because they didn’t know it existed. That’s not a knock on
            non-technical people. It’s simply not their job to know how orders
            are sharded.
          </p>
          <p className="mb-4">
            The problem is what the document <em>looks like</em>. It reads as if
            an engineering decision has already been made, by someone who
            considered the options. Nobody with engineering context ever made
            it. Worse, it anchors the reader. An engineer handed a spec that
            says “add Redis caching” may just go and add Redis caching, because
            the decision looks settled.
          </p>

          <h2 className={h2ClassName}>
            Problem 3: It compounds down the chain
          </h2>
          <p className="mb-4">
            It gets worse when the requirement passes through more than one
            pair of hands.
          </p>
          <p className="mb-4">
            A stakeholder turns two sentences into an AI spec. A tech lead
            pastes that spec into an AI to get an implementation plan. An
            engineer pastes the plan into a coding agent to get tickets, or
            code. At every hop, the AI treats its input as ground truth,
            elaborates on it, and fills the gaps with reasonable-sounding
            assumptions. Those assumptions become “requirements” for the next
            hop.
          </p>
          <p className="mb-4">
            It’s the telephone game, except every player adds detail and
            confidence, and nobody along the chain has the original sentence to
            check against. The errors don’t cancel out. They stack.
          </p>
          <p className="mb-4">
            I tested this by passing a 29-word request for a sales dashboard
            through three rounds of AI, each in a fresh chat that only saw the
            previous round’s output. It came out as about 50 tickets with
            roughly 100 requirements nobody asked for, all built on a guess
            about where the data comes from. When the original request traveled
            with each round, that number dropped by more than half. I wrote up
            the full experiment{" "}
            <a href="/blog/i-played-telephone-with-ai-generated-requirements">
              here
            </a>
            .
          </p>

          <h2 className={h2ClassName}>What to do instead</h2>
          <p className="mb-4">
            None of this means you shouldn’t use AI to write requirements. It
            means the original ask has to travel with whatever the AI produced.
          </p>
          <ul className={listClassName}>
            <li>
              <strong>Send the original prompt with the doc.</strong> Paste it
              at the top. It costs nothing and it’s the most useful part.
            </li>
            <li>
              <strong>Label what it is.</strong> “AI-drafted from the request
              below. Not reviewed by engineering.” That one line stops the
              reader from treating it as a decision.
            </li>
            <li>
              <strong>
                If you’re not technical, describe the problem, not the solution.
              </strong>{" "}
              Who complained, about what, how slow, which page. That’s the part
              only you know. Leave the “how” to someone who has the context, or
              ask the AI what an engineer would need to know to solve it, and go
              find those answers.
            </li>
            <li>
              <strong>If you receive one, ask for the source</strong> before you
              act on it.
            </li>
          </ul>

          <h2 className={h2ClassName}>Keep the original</h2>
          <p className="mb-4">
            In a chain of requirements, the original request is the only thing
            that’s actually true. Everything after it is a derivative, and each
            derivative is a bit further away.
          </p>
          <p className="mb-4">
            So don’t punch above your weight. Generating a technical,
            plausible-looking plan feels like you’re helping. But if you didn’t
            have the context to make those decisions, you’ve swapped a short,
            true sentence for a long, confident document that might be wrong,
            and you’ve thrown away the one thing that would let someone else
            catch it.
          </p>
          <p className="mb-4">
            A two-sentence request that’s right beats a two-thousand-word plan
            that isn’t.
          </p>
        </article>
        <BlogFooter url={mediumUrl} />
      </BlogLayout>
    </>
  );
}
