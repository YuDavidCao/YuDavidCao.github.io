import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";

const title = "AI Solves the Problem You Describe, Not the One You Have";

const heroImg = "/ai-solves-the-problem-you-describe-not-the-one-you-have/hero.png";

const mediumUrl =
  "https://medium.com/@yu.cao20041208/ai-solves-the-problem-you-describe-not-the-one-you-have-e2cb52ac9056";

const description =
  "Your AI built exactly what you asked for. Here's how to give it context that's objective, complete and concise so it solves the real problem.";

const h2ClassName = "font-serif text-3xl font-bold mt-10 mb-4 tracking-tight";
const listClassName = "list-disc pl-6 mb-4 space-y-2";

export function AiSolvesTheProblemYouDescribeNotTheOneYouHave() {
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/ai-solves-the-problem-you-describe-not-the-one-you-have"
      />
      <BlogLayout>
        <BlogHeader
          title={title}
          date="November 9, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="A prompt window that leads with the problem, passed to an AI robot that hits a bullseye"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            <em>
              Getting the right requirements and context into the model is
              becoming the core of software engineering.
            </em>
          </p>
          <p className="mb-4">
            A teammate asks an AI agent: “Write a cron job that clears the Redis
            cache every five minutes.”
          </p>
          <p className="mb-4">
            The agent writes it. It’s a good cron job: clean code, sensible
            error handling, even a test. It gets merged.
          </p>
          <p className="mb-4">
            Two weeks later, users are still complaining that prices look wrong
            after an admin changes them. The data is still stale for up to five
            minutes, and the whole cache gets thrown away every five minutes
            whether anything changed or not.
          </p>
          <p className="mb-4">
            The AI did exactly what it was asked. The problem was the question.
          </p>

          <h2 className={h2ClassName}>Good context in, good solution out</h2>
          <p className="mb-4">
            I believe current AI models can produce very good solutions when
            they are given objective and comprehensive context and
            requirements. When they fail, a lot of the time it isn’t because
            the model couldn’t solve the problem. It’s because it was solving a
            different problem from the one we actually had.
          </p>
          <p className="mb-4">
            That changes what the job looks like. More and more of a software
            engineer’s work is going to be making sure the model has the right
            requirements and the right context, and that it doesn’t miss
            anything that matters.
          </p>
          <p className="mb-4">
            To do that well, the input needs to be three things:{" "}
            <strong>objective</strong>, <strong>comprehensive</strong>, and,
            when there is too much to say, <strong>concise</strong>.
          </p>

          <h2 className={h2ClassName}>You are the context bottleneck</h2>
          <p className="mb-4">
            Models can read more text in one go than any person can. Raw
            capacity is not where we have the edge.
          </p>
          <p className="mb-4">
            Our edge is access. Through work and gathering information, we
            build up context that isn’t written down anywhere: the meeting
            where priorities changed, the approach the team tried last year
            that fell over in production, the customer who keeps filing the
            same complaint, the budget nobody wants to say out loud.
          </p>
          <p className="mb-4">
            We process all of that, often without noticing, to get to the
            right answer. The model only gets what we hand it. If the operator
            knows something that affects the decision and doesn’t pass it on,
            the model is solving a smaller, different problem, and it will do
            so confidently.
          </p>

          <h2 className={h2ClassName}>Be objective: give it X, not just Y</h2>
          <p className="mb-4">
            This is where I see most people go wrong, and it’s a classic: the
            XY problem.
          </p>
          <p className="mb-4">
            You want to solve problem X. You decide that Y is the way to do it.
            So you ask for help with Y and never mention X. The person helping
            you does Y correctly, and X stays unsolved.
          </p>
          <p className="mb-4">
            With AI it’s even easier to fall into, because the model often
            won’t push back the way a coworker might. Ask for Y and you will
            get a well-built Y.
          </p>
          <p className="mb-4">Here is the cron job request again:</p>
          <blockquote className="mb-4">
            <p>Write a cron job that clears the Redis cache every 5 minutes.</p>
          </blockquote>
          <p className="mb-4">And here it is with X first and Y as a suggestion:</p>
          <blockquote className="mb-4">
            <p>
              Users see stale prices for several minutes after an admin updates
              them. Prices are cached in Redis. I was thinking about a cron job
              that clears the cache every 5 minutes. Is that the right
              approach, or is there something better?
            </p>
          </blockquote>
          <p className="mb-4">
            Given the second prompt, a model will very likely point out that
            the real fix is to invalidate the cached price when it changes.
            Often Y is wrong, but given X, the AI can spot that.
          </p>
          <p className="mb-4">
            Being objective also means not leading the model. “Isn’t Y the best
            way to do this?” is a question that wants a yes, and models tend to
            agree with the person they’re talking to. If your prompt already
            contains your answer, you will usually get your answer back.
            Describe the problem neutrally, offer your idea as one option, and
            ask for an honest opinion on it.
          </p>

          <h2 className={h2ClassName}>
            Be comprehensive: write down what drives your decision
          </h2>
          <p className="mb-4">
            When we make an engineering decision, we weigh a lot of things,
            usually without listing them:
          </p>
          <ul className={listClassName}>
            <li>Functional requirements</li>
            <li>Performance needs</li>
            <li>Cost</li>
            <li>Ease of use and maintenance</li>
            <li>UI and UX</li>
            <li>Who else depends on this, and what they expect</li>
            <li>Deadlines, and how much risk is acceptable</li>
          </ul>
          <p className="mb-4">
            The model can only weigh the factors it knows about. So the first
            step is to be conscious of how you make the decision yourself. What
            information are you actually using to get to your answer? Then put
            that information in the prompt.
          </p>
          <p className="mb-4">
            If performance is the main concern and you never said so, the model
            may optimize for readability. If the feature has to run on a cheap
            Android phone and you never said so, you may get a design that
            assumes a desktop browser. Neither answer is wrong. They’re answers
            to a different question.
          </p>

          <h2 className={h2ClassName}>Not sure what matters? Ask</h2>
          <p className="mb-4">
            Sometimes you don’t know what information a decision needs. That’s
            fine. You don’t have to figure it out alone. Ask the model first:
          </p>
          <blockquote className="mb-4">
            <p>
              I need to choose a database for a new internal reporting tool.
              Before you recommend anything, what would you need to know to
              make this decision well?
            </p>
          </blockquote>
          <p className="mb-4">
            You’ll usually get a checklist: read and write patterns, data size,
            consistency needs, team experience, hosting constraints. Answer it,
            then ask for the recommendation. This one habit turns a generic
            answer into one that fits your situation.
          </p>

          <h2 className={h2ClassName}>Say what you can’t share</h2>
          <p className="mb-4">
            Some information you can’t give. It’s sensitive, it’s under NDA, or
            you simply don’t have it. Don’t leave it out silently. Tell the
            model it’s missing:
          </p>
          <blockquote className="mb-4">
            <p>
              I can’t share our exact traffic numbers, but assume we’re a small
              startup with a tight infrastructure budget.
            </p>
          </blockquote>
          <p className="mb-4">
            The model will make its best judgment and, more importantly, it
            will know which assumptions it is standing on. Just remember that
            you now own those gaps. Review the output yourself, with the
            information the model never saw.
          </p>

          <h2 className={h2ClassName}>Be concise</h2>
          <p className="mb-4">
            Comprehensive doesn’t mean long. Sometimes it’s impossible to give
            the model everything because there is simply too much information.
            And even when you can, more words don’t automatically mean more
            useful context.
          </p>
          <p className="mb-4">
            You don’t need a 2,000-word essay to say the app needs to run on
            mobile. “Must work on mobile Safari and Chrome, on screens down to
            375px wide” says it in one line, and says it more precisely.
          </p>
          <p className="mb-4">
            The goal is to be complete on the factors that drive the decision,
            and brief in how you state each one. A short list of requirements,
            one line each, usually beats a long story.
          </p>
          <p className="mb-4">
            I wrote more about keeping the context you give coding agents lean
            in{" "}
            <a href="/blog/why-you-should-keep-documentation-minimal-when-working-with-coding-agents">
              Why You Should Keep Documentation Minimal When Working with
              Coding Agents
            </a>
            .
          </p>

          <h2 className={h2ClassName}>
            Less time for misunderstandings to surface
          </h2>
          <p className="mb-4">
            Requirements engineering isn’t new, and neither are bad
            requirements. Human engineers implement them without questioning
            them all the time.
          </p>
          <p className="mb-4">
            What slow implementation did give us was time. Over days or weeks
            of building Y, someone would hit an edge case, ask “wait, why do we
            need this?”, or show a half-finished version to the person who
            asked for it. Each of those moments was a chance for the
            conversation to find its way back to X.
          </p>
          <p className="mb-4">
            When an agent builds Y in minutes, most of those moments never
            happen. The misunderstanding goes straight into a finished feature.
          </p>
          <p className="mb-4">
            Agents can help with this. You can tell them to challenge your
            assumptions before they write any code, and it’s worth doing. But
            they can only question the assumptions they can see, which brings
            us back to context.
          </p>
          <p className="mb-4">
            That’s why I think gathering requirements, and turning them into
            input that gets an AI to produce something useful, is going to be
            the core of the next generation of software engineering. Code is
            getting cheaper. Knowing what to ask for isn’t.
          </p>
        </article>
        <BlogFooter url={mediumUrl} />
      </BlogLayout>
    </>
  );
}
