import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";

const title = "Known Unknowns Got Cheap. Unknown Unknowns Didn't.";

const route = "known-unknowns-got-cheap-unknown-unknowns-didnt";
const imgBase = `/${route}`;
const heroImg = `${imgBase}/hero.png`;

const description =
  "AI made known unknowns cheap to answer. Unknown unknowns still cost you, because you can't prompt for something you don't know exists.";

const h2ClassName = "font-serif text-3xl font-bold mt-10 mb-4 tracking-tight";
const listClassName = "list-disc pl-6 mb-4 space-y-2";

function Figure({ src, alt, caption }: { src: string; alt: string; caption: string }) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        className="w-full rounded-lg shadow dark:shadow-gray-800"
        loading="lazy"
      />
      <figcaption className="mt-3 text-center text-sm italic text-tx-secondary dark:text-tx-tertiary">
        {caption}
      </figcaption>
    </figure>
  );
}

export function KnownUnknownsGotCheapUnknownUnknownsDidnt() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link rel="canonical" href={`https://yudavidcao.github.io/blog/${route}`} />
      <BlogLayout>
        <BlogHeader
          title={title}
          date="November 24, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="A lamp lights up known knowns; around it, faint labels of known unknowns; beyond, nearly invisible unknown unknowns"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            <em>
              AI redefined known knowns, known unknowns and unknown unknowns.
              Knowing what exists now matters more than knowing how to build it.
            </em>
          </p>
          <p className="mb-4">
            Say you did some freelance work last year and now you're filing
            taxes. You open a chat with an AI and ask how to report the income.
            It tells you. The answer is correct, clear and fast.
          </p>
          <p className="mb-4">
            What it probably won't tell you is that some of what you spent on
            that work could have been deducted. You didn't ask about
            deductions, because you didn't know they were a thing. Nothing in
            your prompt pointed there, so nothing in the answer did either.
          </p>
          <p className="mb-4">That gap is what this post is about.</p>

          <h2 className={h2ClassName}>The three boxes</h2>
          <p className="mb-4">
            There's an old way of sorting what you know, made famous by{" "}
            <a href="https://en.wikipedia.org/wiki/There_are_unknown_unknowns">
              a 2002 Pentagon press briefing
            </a>
            . Known knowns are things you know. Known unknowns are things you
            know you don't know. Unknown unknowns are things you don't even know
            you don't know.
          </p>
          <p className="mb-4">
            Before AI, using anything new had a familiar cost. Whether it was a
            technology, a tax rule or a legal right, you had to know what it is,
            what it does, how it does it and why it does it. Then you had to
            actually carry it out. That last step was the expensive one. In
            software, "how exactly to implement it in code" took years of
            experience.
          </p>
          <p className="mb-4">
            AI took most of that last step away. If you know what something is
            and what it does, AI can do most of the implementation. It can also
            explain the how and the why on the spot. Those still matter, and
            I'll come back to them, but you no longer need them to get started.
          </p>
          <p className="mb-4">
            What's left is the first part: knowing what it is and what it does.
            Knowing it exists at all.
          </p>

          <h2 className={h2ClassName}>The boxes, redefined</h2>
          <p className="mb-4">So here's how I'd define the three boxes now.</p>
          <ul className={listClassName}>
            <li>
              <strong>Known knowns</strong> are things you understand well
              enough to act on without asking anyone, AI included.
            </li>
            <li>
              <strong>Known unknowns</strong> are things you know exist but
              don't really understand. They're now one prompt away.
            </li>
            <li>
              <strong>Unknown unknowns</strong> are things you don't know exist.
              AI can't help with these, because you never ask.
            </li>
          </ul>
          <Figure
            src={`${imgBase}/tiers.png`}
            alt="Three rows. Known knowns: act in seconds. Known unknowns: minutes to hours each, one prompt away. Unknown unknowns: never, because you don't ask."
            caption="AI made the step from the middle row to the top row nearly free. It did nothing for the bottom row."
          />
          <p className="mb-4">
            The middle box is where AI changed the most. Going from "I've heard
            of this" to "it's working" used to take weeks. Now it can take an
            afternoon. The bottom box hasn't changed at all.
          </p>

          <h2 className={h2ClassName}>The website that worked</h2>
          <p className="mb-4">
            Here's the software version. You build a full-stack website for a
            client, almost entirely by prompting. AI gives you what you asked
            for. The requirements are done and everything works.
          </p>
          <p className="mb-4">
            It won't do more than that. Nobody asked for monitoring, so there's
            no monitoring. When something breaks in production, you find out
            from the client.
          </p>
          <p className="mb-4">Now picture three versions of you:</p>
          <ul className={listClassName}>
            <li>
              You've never heard of monitoring. It doesn't get built, and you
              don't know anything is missing.
            </li>
            <li>
              You know monitoring is a thing but not what's out there. You ask
              AI, read through the options, compare them and pick one. It works,
              but it takes a while.
            </li>
            <li>
              You know monitoring, and you know you can plug in services like
              Sentry for errors and Mixpanel for product analytics. You tell AI
              exactly that, and it's done in an hour.
            </li>
          </ul>
          <p className="mb-4">
            Same AI, same codebase. The difference in what got shipped comes
            from what you knew was possible.
          </p>
          <p className="mb-4">
            I wrote before that{" "}
            <a href="/blog/ai-solves-the-problem-you-describe-not-the-one-you-have">
              AI solves the problem you describe, not the one you have
            </a>
            . That post was about describing the problem wrong. This one is
            about the problems you never describe at all.
          </p>

          <h2 className={h2ClassName}>"Just ask AI what's missing"</h2>
          <p className="mb-4">
            The obvious reply is to ask AI what you're missing. "What do you
            think would be good to add to this project?"
          </p>
          <p className="mb-4">
            It can work. It just isn't very effective, for three reasons.
          </p>
          <p className="mb-4">
            <strong>The answer is generic.</strong> You'll get a list of fifteen
            things that apply to most projects. AI doesn't know your client's
            business, their budget, what keeps them up at night or who their
            users are. Giving it all of that context, especially the business
            side, is close to impossible. So it can't tell you which three items
            on the list actually matter.
          </p>
          <p className="mb-4">
            <strong>You can't judge the list.</strong> If monitoring shows up as
            item nine and you've never heard of it, it's just another line. In{" "}
            <a href="/blog/common-problems-with-vibe-coding-and-how-to-avoid-them">
              Common Problems with Vibe Coding
            </a>{" "}
            I wrote that AI doesn't always know what it doesn't know. The same
            goes for the person prompting it, and a list doesn't fix that.
            Pranab Ghosh{" "}
            <a href="https://pkghosh.wordpress.com/2025/07/19/known-known-known-unknown-and-unknown-unknown-for-llm-users/">
              used the same three boxes to sort LLM users
            </a>{" "}
            by how well they can judge what the model gives them. The less you
            know about a topic, the less you can check what AI says about it.
          </p>
          <p className="mb-4">
            <strong>You have to think to ask.</strong> Anthropic's own{" "}
            <a href="https://claude.com/blog/a-field-guide-to-claude-fable-finding-your-unknowns">
              field guide on finding your unknowns
            </a>{" "}
            recommends a "blind spot pass": before you start, ask Claude what you
            haven't considered. It's good advice and I'd follow it. But it only
            helps if you know to run it, and it only covers the task you framed.
            A blind spot pass on "ship this client website" might well catch
            monitoring. It will never bring up a tax deduction, because you were
            asking about a website.
          </p>
          <p className="mb-4">
            Broad prompts about your whole situation have the same catch. "I
            freelanced this year and I'm filing taxes, what should I know?"
            would probably surface deductions. Some people go further and{" "}
            <a href="https://www.meplusmachine.com/p/how-to-get-exactly-what-you-want-even-when-you-don-t-know-what-to-ask">
              have AI interview them
            </a>{" "}
            before a task, to pull out what they forgot to say. Both work. But
            most everyday prompts look nothing like that. Writing one means
            you're already exploring on purpose, and that habit is exactly what
            this post is arguing for.
          </p>

          <h2 className={h2ClassName}>Known unknowns are cheap, not free</h2>
          <p className="mb-4">This is the part I think matters most.</p>
          <p className="mb-4">
            AI made each known unknown cheap to resolve. Cheap isn't free.
            Asking, reading the answer, comparing options and deciding still
            takes twenty minutes to an hour.
          </p>
          <p className="mb-4">
            And there are a lot of them. Take that client website again.
            Monitoring is one. So are rate limiting, backups (and checking that
            restores work), SEO and social preview tags, accessibility, caching,
            feature flags, CI and analytics consent. A real project has dozens.
            A life has hundreds: leases, insurance, job offers, taxes, medical
            bills.
          </p>
          <p className="mb-4">
            You don't have time to ask about all of them, on every project,
            every time.
          </p>
          <p className="mb-4">
            There's a worse problem hiding in there.{" "}
            <strong>
              A known unknown you forget to ask about at the right moment is
              effectively an unknown unknown.
            </strong>{" "}
            You might know monitoring exists. If it doesn't cross your mind on
            ship day, it doesn't get built, and the result is the same as never
            having heard of it.
          </p>
          <Figure
            src={`${imgBase}/forgotten.png`}
            alt="Four lanes leading to ship day. A known known and a remembered known unknown end with monitoring added. A forgotten known unknown and an unknown unknown both end with no monitoring."
            caption="Knowing something exists only helps if it comes to mind when you need it."
          />
          <p className="mb-4">
            Things you understand well don't have this problem. They come to
            mind on their own, because they're part of how you think about the
            work. That's what moving something from a known unknown to a known
            known gets you. You stop needing to remember to ask.
          </p>

          <h2 className={h2ClassName}>So is depth still worth it?</h2>
          <p className="mb-4">
            This is where "how it does it" and "why it does it" come back.
          </p>
          <p className="mb-4">
            I think of depth as a time-saving decision. If you use something
            every day, going deep pays off. If you use something once a year,
            knowing it exists and asking when it comes up is usually enough.
          </p>
          <p className="mb-4">When you do go deep, it pays off at three points:</p>
          <ul className={listClassName}>
            <li>
              <strong>Before the prompt:</strong> you know which context matters
              and what's missing. In the cron job example from{" "}
              <a href="/blog/ai-solves-the-problem-you-describe-not-the-one-you-have">
                AI Solves the Problem You Describe
              </a>
              , a teammate asked for "a cron job that clears the Redis cache
              every five minutes." Someone with depth in caching would have asked
              for something else: prices stay stale after an admin edits them, so
              clear the cache when the data changes. Same AI, better question.
            </li>
            <li>
              <strong>Instead of the prompt:</strong> you skip the round trip to
              AI and make the call on the spot.
            </li>
            <li>
              <strong>After the prompt:</strong> you notice when an answer is
              off.
            </li>
          </ul>
          <p className="mb-4">
            The first point also explains why "just ask AI what's missing" falls
            short. You can only give AI the context you know is relevant, and
            depth is what tells you what's relevant.
          </p>
          <p className="mb-4">
            My prediction is that depth gets narrower for most people. It won't
            disappear, because everyone still has something they use every day.
            Each person will just go deep on fewer things and stay broad on many
            more.
          </p>
          <p className="mb-4">
            The exception is anything where a wrong answer is expensive: taxes,
            health, contracts, production systems. There you want enough depth
            to catch a bad answer even if you rarely deal with it. You don't need
            enough to do the work yourself. You need enough to notice when
            something sounds wrong.
          </p>
          <p className="mb-4">
            Knowing the subject isn't always enough, either. To check an answer,
            you also need the context it depends on: your full financial picture
            for taxes, your medical history for a diagnosis. AI only sees the
            part you typed in, so catching what it missed is up to you.
          </p>
          <Figure
            src={`${imgBase}/depth.png`}
            alt="A chart of how often you run into something against the cost of a slow or wrong answer, with a diagonal from known unknown to known known. Unknown unknowns are off the chart."
            caption="Go deep where you run into something often or where a wrong answer is expensive. Everywhere else, knowing it exists is enough."
          />
          <p className="mb-4">
            Notice what's missing from that chart. Unknown unknowns don't appear
            on it at all. You can't place something on a map you don't know
            exists, and that's the whole problem.
          </p>

          <h2 className={h2ClassName}>How to shrink your unknown unknowns</h2>
          <p className="mb-4">
            If the bottleneck is knowing what exists, the fix is breadth. Some
            habits that help:
          </p>
          <ul className={listClassName}>
            <li>
              Read postmortems and production-readiness checklists in your field.
              They're lists of things other people learned the hard way.
            </li>
            <li>
              Look at how mature projects are put together and note what they
              have that yours doesn't. For a website, that might be a status
              page, error tracking or a backup policy.
            </li>
            <li>
              Skim changelogs, "awesome" lists and newsletters for breadth.
              You're collecting names, not learning tools.
            </li>
            <li>
              Talk to people a few years ahead of you and ask what they wish
              they'd known earlier.
            </li>
            <li>
              Ask AI about your whole situation, not just the task. "What would a
              senior engineer flag before this goes to a paying client?" "What do
              people in my situation usually miss?" And run the blind spot pass
              before you start.
            </li>
            <li>
              Keep a short list of things you've heard of but don't understand.
              When one keeps coming up, that's your cue to go deep on it.
            </li>
          </ul>
          <p className="mb-4">
            None of this is specific to software. Read a renter's guide before
            you sign a lease. Skim a list of common tax deductions before you
            file. Ask a friend who negotiated a job offer what they asked for. It
            doesn't need to go deep. You just need to know enough that the
            question occurs to you.
          </p>

          <h2 className={h2ClassName}>The short version</h2>
          <p className="mb-4">
            AI will answer nearly any question you ask, quickly and mostly well.
            It can't ask the question for you.
          </p>
          <p className="mb-4">
            So the gap between people is moving. It used to be about who could
            build things. Now it's more about who knows what's worth building,
            and who remembers to ask at the right moment.
          </p>
        </article>
      </BlogLayout>
    </>
  );
}
