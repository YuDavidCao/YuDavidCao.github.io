import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";

const heroImg =
  "/artificial-latency-ai-agents-and-the-ux-we-keep-forgetting/hero.png";

const mediumUrl =
  "https://medium.com/@yu.cao20041208/artificial-latency-ai-agents-and-the-ux-we-keep-forgetting-6484e57558c1";

const description =
  "Building software is getting cheaper, but good UX is not automatic. Artificial latency, meaningful loaders, and UX agents that review AI-generated interfaces from the user's perspective.";

const loaderMessages = [
  "Finding the optimal travel route…",
  "Comparing transportation options and costs…",
  "Identifying cost-efficient places to stay…",
  "Checking local events and attractions…",
  "Balancing travel time against your preferences…",
  "Putting together your final itinerary…",
];

const h2ClassName =
  "font-serif text-3xl font-bold mt-10 mb-4 tracking-tight";

export function ArtificialLatencyAiAgentsAndTheUxWeKeepForgetting() {
  return (
    <>
      <title>Artificial Latency, AI Agents, and the UX We Keep Forgetting</title>
      <meta name="description" content={description} />
      <meta
        property="og:title"
        content="Artificial Latency, AI Agents, and the UX We Keep Forgetting"
      />
      <meta property="og:description" content={description} />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/artificial-latency-ai-agents-and-the-ux-we-keep-forgetting"
      />
      <BlogLayout>
        <BlogHeader
          title="Artificial Latency, AI Agents, and the UX We Keep Forgetting"
          date="October 9, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Artificial Latency, AI Agents, and the UX We Keep Forgetting Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            <em>
              From intentional waiting to smarter loaders, and why AI-generated
              interfaces still need better UX.
            </em>
          </p>
          <p className="mb-4">
            We are entering an era where building software is becoming
            remarkably cheap.
          </p>
          <p className="mb-4">
            Give an AI model a description of a product, and it can generate a
            landing page, build a dashboard, wire up an API, and implement a
            reasonably complex workflow. What once took a team days can
            sometimes be prototyped in an afternoon.
          </p>
          <p className="mb-4">
            Yet something interesting is happening: as the cost of building
            software decreases, the importance of designing the experience
            increases.
          </p>
          <p className="mb-4">
            We are getting better at generating interfaces. We are not
            necessarily getting better at making them feel good to use.
          </p>
          <p className="mb-4">
            Sometimes, a better user experience means making a product faster.
            Other times, it means understanding why speed alone isn’t enough.
          </p>

          <h2 className={h2ClassName}>
            1. Artificial Latency: Sometimes, Faster Is Worse
          </h2>
          <p className="mb-4">Imagine you are planning a trip.</p>
          <p className="mb-4">
            You enter your destination, budget, travel dates, and preferences
            into an AI-powered travel planner. You click{" "}
            <em>Find the optimal plan</em>.
          </p>
          <p className="mb-4">
            A tenth of a second later, in the blink of an eye, the application
            presents a beautifully formatted, seven-day itinerary with hotel
            recommendations, transportation options, restaurant suggestions,
            and a detailed budget.
          </p>
          <p className="mb-4">
            Technically, this is impressive. But does it feel impressive?
          </p>
          <p className="mb-4">Maybe not.</p>
          <p className="mb-4">
            You asked the system to solve a complicated problem. You expect it
            to compare options, weigh trade-offs, consider your preferences, and
            assemble a coherent plan. When the result appears almost
            instantaneously, it can feel less like a carefully considered
            recommendation and more like a generic response.
          </p>
          <p className="mb-4">
            The output might be excellent. The problem is that the interaction
            does not communicate the effort behind it.
          </p>
          <p className="mb-4">
            This is where <strong>artificial latency</strong> comes in:
            intentionally introducing a short delay before presenting a result,
            even when the underlying computation could finish sooner.
          </p>
          <p className="mb-4">
            Instead of displaying the itinerary immediately, the application
            might take a few seconds to present a thoughtful transition or
            communicate meaningful progress.
          </p>
          <p className="mb-4">
            The goal isn’t to make every application slower. If someone is
            checking the weather or opening a navigation menu, speed is part of
            the value proposition. Artificial latency is more interesting when a
            task involves complex reasoning, personalization, or decisions that
            users perceive as important.
          </p>
          <p className="mb-4">
            There is also a difference between purposeful waiting and an
            unexplained delay. Making users stare at a blank screen for five
            seconds is frustrating. Using that time to communicate progress can
            make the experience feel more intentional.
          </p>
          <p className="mb-4">
            Of course, artificial latency isn’t a universal solution. A delay
            that feels reassuring to one user might feel manipulative to
            another. It should be tested against the actual experience, not
            added simply to make an application appear more sophisticated.
          </p>
          <p className="mb-4">
            <strong>
              The key takeaway: optimize for perceived quality and user
              confidence, not just raw response time.
            </strong>
          </p>

          <h2 className={h2ClassName}>
            2. If Users Have to Wait, Make the Wait Meaningful
          </h2>
          <p className="mb-4">
            Artificial latency raises another question: what should happen
            while the user waits?
          </p>
          <p className="mb-4">
            Most applications default to a generic loading spinner. It
            communicates one thing: something is happening.
          </p>
          <p className="mb-4">But we have an opportunity to communicate much more.</p>
          <p className="mb-4">
            Consider the same travel planner. Instead of displaying a spinner
            with the word <em>Loading</em>, imagine a loader that cycles through
            messages:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            {loaderMessages.map((message) => (
              <li key={message}>{message}</li>
            ))}
          </ul>
          <p className="mb-4">
            The user gets a glimpse into how the system approaches the problem,
            or at least perceived to get. The progression makes the task feel
            more concrete, and the messages help explain why generating a
            personalized recommendation might take a little time.
          </p>
          <p className="mb-4">
            This is especially useful for AI applications, where the underlying
            process is often invisible.
          </p>
          <p className="mb-4">A few principles are worth keeping in mind:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Be specific.</strong> “Comparing hotel prices” is more
              informative than “Loading.”
            </li>
            <li>
              <strong>Show progression.</strong> Messages should form a coherent
              sequence rather than cycle through unrelated activities.
            </li>
            <li>
              <strong>Don’t overdo it.</strong> If the result is ready, show it.
              Don’t make users wait just to finish an animation.
            </li>
          </ul>
          <p className="mb-4">
            If the application performs several real operations, the loader can
            reflect those milestones. If it doesn’t, a subtle rotating message
            can still provide context, as long as it doesn’t falsely imply that
            each stage represents completed work.
          </p>
          <p className="mb-4">
            A loader is a small component, but it occupies a moment when the
            user is actively waiting for the product to deliver value.
          </p>
          <p className="mb-4">
            <strong>Don’t waste that moment.</strong>
          </p>
          <p className="mb-4">
            And this leads to a broader question: if these small details have
            such a meaningful impact on how a product feels, why are they so
            often missing from AI-generated interfaces?
          </p>

          <h2 className={h2ClassName}>
            3. AI Can Generate a UI. Can It Design the Experience?
          </h2>
          <p className="mb-4">
            Ask an AI model to build a dashboard, and it will usually produce
            something recognizable: a sidebar, a navigation bar, statistics
            cards, and a data table.
          </p>
          <p className="mb-4">It might even look polished.</p>
          <p className="mb-4">
            But spend ten minutes using it, and the problems become apparent.
            The primary action is difficult to find. The empty state offers no
            guidance. Error messages don’t explain how to recover. The mobile
            layout technically works but feels awkward.
          </p>
          <p className="mb-4">
            <strong>
              Generating a UI is not the same as understanding the experience.
            </strong>
          </p>
          <p className="mb-4">
            AI can write a component, run a build, and check whether a button
            works. But these things don’t tell us whether the interface makes
            sense to a real user.
          </p>
          <p className="mb-4">
            This is partly because AI development often focuses on what is
            easiest to specify and verify: whether the code runs, whether the
            page renders, and whether the requested components exist. UX
            requires a different perspective. It asks what the user is trying to
            accomplish, what they expect to happen, and how the product responds
            when things go wrong.
          </p>
          <p className="mb-4">
            As AI makes implementation cheaper, this distinction becomes
            increasingly important. When everyone can generate a polished
            dashboard, the quality of the experience becomes a more meaningful
            differentiator.
          </p>
          <p className="mb-4">
            One potential solution is to introduce a dedicated{" "}
            <strong>UX agent</strong> into the development workflow.
          </p>
          <p className="mb-4">
            While a coding agent builds a feature, a UX agent evaluates it from
            the user’s perspective. It could open the application in a browser,
            attempt common workflows, submit invalid forms, inspect error
            states, and identify confusing interactions.
          </p>
          <p className="mb-4">
            Rather than merely confirming that a financial dashboard works, for
            example, it could ask whether users understand where the data comes
            from, whether estimates are distinguished from reported figures, and
            whether the next action is obvious.
          </p>
          <p className="mb-4">
            The agent could suggest specific improvements and retest the
            experience after the coding agent implements them.
          </p>
          <p className="mb-4">
            Of course, AI agents can still misunderstand user intent. They
            should complement, not replace, usability testing and feedback from
            real users.
          </p>
          <p className="mb-4">
            The important shift is to make UX an explicit part of the
            development loop rather than something we consider after the code is
            finished.
          </p>

          <h2 className={h2ClassName}>
            Building Software Is Getting Cheaper. Making It Worth Using Is Still
            Hard.
          </h2>
          <p className="mb-4">
            Artificial latency might seem like a small design detail. A loader
            might seem even smaller. But both illustrate a broader principle: a
            product is more than the code it executes or the information it
            returns.
          </p>
          <p className="mb-4">
            It is also the experience people have while waiting, deciding,
            navigating, and recovering from mistakes.
          </p>
          <p className="mb-4">
            As AI continues to lower the cost of implementation, we should spend
            more attention on these human details, not less.
          </p>
          <p className="mb-4">
            Sometimes that means resisting the urge to make everything
            instantaneous. Sometimes it means turning an ordinary spinner into a
            meaningful progress experience. And sometimes it means having an AI
            agent challenge an interface that technically works but feels wrong.
          </p>
          <p className="mb-4">
            AI will continue to improve at generating code. That doesn’t make
            good UX automatic.
          </p>
          <p className="mb-4">
            The best AI-powered products won’t necessarily be the ones that
            generate the most code or respond the fastest. They’ll be the ones
            that understand when speed matters, when reassurance matters, and
            when users need more than a technically correct answer.
          </p>
          <p className="mb-4">
            <strong>
              Building software is getting cheaper. Making software worth using
              is still hard.
            </strong>
          </p>
        </article>
        <BlogFooter url={mediumUrl} />
      </BlogLayout>
    </>
  );
}
