import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";

const title = "I Played Telephone With AI-Generated Requirements";

const heroImg = "/i-played-telephone-with-ai-generated-requirements/hero.png";

const mediumUrl =
  "https://medium.com/@yu.cao20041208/i-played-telephone-with-ai-generated-requirements-11d98fca349d";

const repoUrl = "https://github.com/YuDavidCao/requirements-telephone";

const description =
  "I passed a 29-word request through three rounds of AI and got 50 tickets built on a guess. Sending the original cut the drift in half.";

const h2ClassName = "font-serif text-3xl font-bold mt-10 mb-4 tracking-tight";
const h3ClassName = "font-serif text-2xl font-bold mt-8 mb-4 tracking-tight";
const listClassName = "list-disc pl-6 mb-4 space-y-2";
const orderedListClassName = "list-decimal pl-6 mb-4 space-y-2";

export function IPlayedTelephoneWithAiGeneratedRequirements() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/i-played-telephone-with-ai-generated-requirements"
      />
      <BlogLayout>
        <BlogHeader
          title={title}
          date="November 17, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="A 29-word request passed through three AI robots, growing into longer docs and a pile of about 50 tickets"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            <em>
              I passed a 29-word request through three rounds of AI. It came out
              as 50 tickets built on a guess, while the clue that would have
              fixed it sat in the original sentence.
            </em>
          </p>
          <p className="mb-4">
            More and more often, I get AI-generated requirements sent over
            without the prompt that produced them. Someone had a need, asked an
            AI to turn it into a technical spec, and forwarded the result.
            Sometimes the next person pastes that spec into their own AI chat,
            and so on down the line.
          </p>
          <p className="mb-4">
            I’ve written before that{" "}
            <a href="/blog/ai-solves-the-problem-you-describe-not-the-one-you-have">
              AI solves the problem you describe, not the one you have
            </a>
            : whatever goes in decides what comes out. So what happens when the
            input is another AI’s output? My guess was that each hop treats its
            input as ground truth, fills the gaps with assumptions, and hands
            those assumptions to the next hop as requirements.
          </p>
          <p className="mb-4">
            That’s easy to claim. I wanted to measure it. The scripts, every
            raw output and the numbers are in{" "}
            <a href={repoUrl}>requirements-telephone</a> on GitHub.
          </p>

          <h2 className={h2ClassName}>The setup</h2>
          <p className="mb-4">
            I started with a request for something new, the kind a
            non-technical manager at a retail company might send:
          </p>
          <blockquote className="mb-4">
            <p>
              We have 40 retail stores. Regional managers need a dashboard that
              shows each store’s sales in real time, so we can spot
              underperforming stores in our Monday morning meeting.
            </p>
          </blockquote>
          <p className="mb-4">
            Read it closely and there’s already a hint in there. “Real time” is
            what they said. “Monday morning meeting” is what they actually
            need: numbers that are correct by Monday morning.
          </p>
          <p className="mb-4">
            Then I wrote down the context an engineer on the team would know
            and the manager wouldn’t:
          </p>
          <blockquote className="mb-4">
            <p>
              Sales data comes from our point-of-sale vendor as a CSV export
              once a night. There is no live API. The engineering team is two
              people.
            </p>
          </blockquote>
          <p className="mb-4">
            With that context, the right answer is small: a scheduled job that
            loads last night’s CSV and a simple dashboard. Without it, “real
            time” invites live data pipelines that the data source can’t even
            feed.
          </p>
          <p className="mb-4">
            None of the AI rounds saw the engineer’s context, except the
            control. I wasn’t testing whether the model could guess it, because
            it can’t. I was testing what the chain does with the gap.
          </p>

          <h2 className={h2ClassName}>Three chains</h2>
          <p className="mb-4">
            Every step ran in a fresh chat with no tools, so nothing carried
            over except what was pasted in. I used Claude Sonnet 5.5 and ran
            everything five times.
          </p>
          <p className="mb-4">
            If a hop had only asked questions instead of producing a document,
            the plan was to record them and reply, “I don’t have those details.
            Make your best assumptions and continue.” It never came to that.
          </p>
          <p className="mb-4">
            <strong>Chain A: forwarded without the original.</strong> This is
            what usually happens.
          </p>
          <ol className={orderedListClassName}>
            <li>
              <strong>Hop 1, the manager:</strong> the request, plus “Create a
              technical implementation doc for the backend team.”
            </li>
            <li>
              <strong>Hop 2, the backend lead:</strong> only the hop 1 output,
              plus “Turn this into a detailed technical design: architecture,
              data model and APIs.”
            </li>
            <li>
              <strong>Hop 3, the engineer:</strong> only the hop 2 output, plus
              “Break this into tickets with acceptance criteria.”
            </li>
          </ol>
          <p className="mb-4">
            Hop 1 is the important one. The manager isn’t asking for
            requirements, they’re asking for the <em>how</em>. That’s the risky
            part: someone without the engineering context using AI to make
            engineering decisions, and handing those decisions to the people
            who do have the context.
          </p>
          <p className="mb-4">
            <strong>Chain B: the original travels with it.</strong> It starts
            from the same hop 1 document. Hops 2 and 3 get the same prompts,
            but each also gets the manager’s request at the top: “Original
            request: …”. It’s the simplest fix I could think of.
          </p>
          <p className="mb-4">
            <strong>Control: someone with context.</strong> The request plus
            the engineer’s context, with the same hop 1 prompt.
          </p>

          <h2 className={h2ClassName}>What I measured</h2>
          <ul className={listClassName}>
            <li>
              <strong>Length:</strong> word count and ticket count at each hop.
            </li>
            <li>
              <strong>Invented requirements:</strong> concrete things in the
              final tickets that weren’t in, or directly implied by, the
              original request, such as a specific technology, number, deadline
              or feature. A fresh model counted these with a fixed rubric, and I
              spot-checked its lists.
            </li>
            <li>
              <strong>Confidence creep:</strong> whether hedged ideas turned
              into hard requirements.
            </li>
            <li>
              <strong>The data source:</strong> what each chain assumed about
              where the sales data comes from.
            </li>
            <li>
              <strong>Questions:</strong> whether any hop stopped to ask.
            </li>
            <li>
              <strong>Reverse test:</strong> I pasted only the final tickets
              into a fresh chat and asked what the original request was.
            </li>
          </ul>

          <h2 className={h2ClassName}>Results</h2>

          <h3 className={h3ClassName}>Hop 1 was smarter than I expected</h3>
          <p className="mb-4">
            I went in expecting Kafka. I didn’t get Kafka.
          </p>
          <p className="mb-4">
            In all five runs, hop 1 read the Monday meeting and pushed back on
            “real time.” It set a target of data that’s one to five minutes old
            and explicitly ruled out heavy streaming tools for 40 stores. Every
            run also listed the right open question: which point-of-sale system
            do the stores use, and how does the data come out of it?
          </p>
          <p className="mb-4">
            So the model saw the gap. Then it answered it anyway. Every hop 1
            doc assumed the stores’ systems could send data live or be checked
            every few minutes, because that’s what a five-minute target needs.
            The nightly file came up only as a fallback.
          </p>

          <h3 className={h3ClassName}>It grows</h3>
          <p className="mb-4">The original request was 29 words.</p>
          <ul className={listClassName}>
            <li>
              <strong>Chain A:</strong> 29 → 2,105 → 4,888 → 3,069 words,
              ending with about 50 tickets (37 to 56 across runs).
            </li>
            <li>
              <strong>Chain B:</strong> 29 → 2,105 → 864 → 1,441 words, ending
              with about 23 tickets (17 to 28).
            </li>
            <li>
              <strong>Control:</strong> one 1,680-word doc.
            </li>
          </ul>

          <h3 className={h3ClassName}>It invents</h3>
          <p className="mb-4">
            On average, Chain A’s final tickets contained{" "}
            <strong>98 requirements</strong> that weren’t in the original
            request (72 to 140 across runs). Chain B’s contained{" "}
            <strong>42</strong> (34 to 50).
          </p>
          <p className="mb-4">
            Some of the things Chain A’s tickets specified for a dashboard
            reviewed once a week:
          </p>
          <ul className={listClassName}>
            <li>A signed live-data endpoint taking batches of up to 500 events</li>
            <li>A live update stream to the browser with a 25-second keepalive</li>
            <li>
              An API response target of 300 milliseconds at the 95th percentile
            </li>
            <li>
              99.5% availability during business hours and a one-hour recovery
              target
            </li>
            <li>A load test at 500 events per second with 200 connected clients</li>
          </ul>
          <p className="mb-4">
            None of these is a bad idea in a vacuum. All of them are answers to
            questions the manager never asked.
          </p>

          <h3 className={h3ClassName}>It gets more certain</h3>
          <p className="mb-4">
            Here’s one thread from a single run. In hop 1, the doc said stores
            could either push data or be checked on a schedule, and “the
            ingestion approach depends heavily on this.”
          </p>
          <p className="mb-4">
            By hop 3, that open question had become a ticket: “Per-store
            polling runs every 60-120 s with jitter and a concurrency cap of 8.”
          </p>
          <p className="mb-4">
            The uncertainty was gone. Nobody resolved it. It just got rewritten
            until it sounded decided.
          </p>

          <h3 className={h3ClassName}>
            The open question survives, as one ticket out of fifty
          </h3>
          <p className="mb-4">
            In all five Chain A runs, the very first ticket was some version of
            “resolve the open questions.” So the question did make it to the
            end.
          </p>
          <p className="mb-4">
            But it sat on top of roughly 50 other tickets that had already
            assumed the answer. All five runs ended with tickets to build live
            data collection: endpoints for stores to push sales, workers that
            check each store every one to two minutes, or both. If the engineer
            resolves ticket one correctly, most of the other tickets are wrong.
          </p>

          <h3 className={h3ClassName}>The control built the right thing</h3>
          <p className="mb-4">
            With the two sentences of engineering context, all five control
            runs designed a nightly batch job and said plainly that “real time”
            wasn’t possible with this data source and wasn’t needed for a
            Monday meeting. One run’s summary:
          </p>
          <blockquote className="mb-4">
            <p>
              <strong>
                Key decision: build a nightly batch pipeline, not a real-time
                one.
              </strong>
            </p>
          </blockquote>
          <p className="mb-4">
            Two of the five went further and suggested using an off-the-shelf
            dashboard tool instead of building a custom frontend, because the
            team is two people.
          </p>
          <p className="mb-4">
            Same model, same prompt, two extra sentences. That’s the whole
            difference.
          </p>

          <h3 className={h3ClassName}>Nobody asked</h3>
          <p className="mb-4">
            Across 30 document-writing steps, not one stopped to ask a question
            before writing. They all put their questions in an “Open questions”
            section and carried on with an assumed answer. That’s exactly what
            makes a forwarded doc dangerous: the questions are there, but the
            doc doesn’t wait for the answers.
          </p>

          <h3 className={h3ClassName}>Working backwards</h3>
          <p className="mb-4">
            When a fresh chat read Chain B’s final tickets and guessed the
            original request, all five guesses were close, and all five
            mentioned the Monday meeting. One was nearly word for word:
          </p>
          <blockquote className="mb-4">
            <p>
              Build a dashboard for our regional managers that shows each of our
              40 stores’ sales in near real time, so they can spot
              underperforming stores in the Monday morning meeting.
            </p>
          </blockquote>
          <p className="mb-4">
            Chain A’s guesses mentioned the Monday meeting in only two of five
            runs. Instead, they described what the tickets had grown into:
            sales against targets and peers, region-based access,
            reconciliation, monitoring, and in one case “an optional real-time
            update stream.”
          </p>

          <h2 className={h2ClassName}>
            What carrying the original fixed, and what it didn’t
          </h2>
          <p className="mb-4">
            Something I didn’t plan for happened in Chain B. In all five runs,
            hop 2 didn’t rewrite the doc. With the original request sitting
            next to it, the model treated the doc as a draft and{" "}
            <em>reviewed</em> it against the request instead. That’s part of
            why Chain B is so much shorter.
          </p>
          <p className="mb-4">
            And the reviews caught real things. One flagged that the Monday
            meeting wasn’t served by the date ranges the doc offered: on a
            Monday morning, “this week” covers a few hours. The fix it
            suggested was to make last week the default view. Chain A never had
            a chance to notice that, because the Monday meeting had already
            been paraphrased away.
          </p>
          <p className="mb-4">
            So carrying the original cut the invented requirements by more than
            half, kept the real goal visible, and turned the next person (or
            model) into a reviewer instead of an elaborator.
          </p>
          <p className="mb-4">
            What it didn’t do is find the nightly CSV. Chain B kept the data
            source as an open question and named it as the main blocker, but it
            couldn’t know the answer, because nobody in the chain had it. Only
            the control, where someone who knew the system added two sentences,
            got to the simple fix.
          </p>
          <p className="mb-4">
            That’s the point. The original request keeps the chain honest about{" "}
            <em>what</em> was asked. It can’t supply context that nobody in the
            chain had.
          </p>

          <h2 className={h2ClassName}>Caveats</h2>
          <ul className={listClassName}>
            <li>
              This is one scenario, one model and five runs. A different request
              might drift less, or more.
            </li>
            <li>
              The chain was scripted. Real people edit between hops and might
              catch some drift, or add some of their own.
            </li>
            <li>
              A model counted the invented requirements. I spot-checked its
              lists, but the exact numbers are rough. The gap between the chains
              is the reliable part.
            </li>
            <li>
              I didn’t ask Chain B’s hop 2 for a review. It chose to review,
              which makes its word count less comparable to Chain A’s.
            </li>
            <li>
              I picked a request where the key constraint is invisible to the
              person asking. Plenty of requirements aren’t like that, but in my
              experience the ones that go wrong usually are.
            </li>
          </ul>

          <h2 className={h2ClassName}>Try it yourself</h2>
          <p className="mb-4">
            One run is nine chats, and any chat model will do. If you’d rather
            script it, the <a href={repoUrl}>repo</a> has the exact prompts and
            a runner for the Claude Code CLI. Or pick a real request from your
            own work, write down the context only you know, and run Chain A,
            Chain B and the control with the prompts above. If your results look
            different from mine, I’d like to hear about it.
          </p>
        </article>
        <BlogFooter url={mediumUrl} />
      </BlogLayout>
    </>
  );
}
