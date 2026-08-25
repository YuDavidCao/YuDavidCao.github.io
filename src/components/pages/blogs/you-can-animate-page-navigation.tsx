import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/you-can-animate-page-navigation/hero.png";

const navLinkCode = `<NavLink to="/timing" viewTransition>
  Timing
</NavLink>`;

const mainCode = `<main style={{ viewTransitionName: 'page' }}>
  <Outlet />
</main>`;

const cssCode = `::view-transition-old(page) {
  animation: 180ms ease-in both slip-out-left;
}

::view-transition-new(page) {
  animation: 380ms cubic-bezier(.16, 1, .3, 1) 60ms both slip-in-right;
}`;

export function YouCanAnimatePageNavigation() {
  return (
    <>
      <title>You Can Animate Page Navigation</title>
      <meta
        name="description"
        content="Page navigation in React SPAs doesn't have to be an instant hard cut. The View Transitions API lets the browser animate between route snapshots with a few lines of CSS — no animation library required."
      />
      <meta property="og:title" content="You Can Animate Page Navigation" />
      <meta
        property="og:description"
        content="Page navigation in React SPAs doesn't have to be an instant hard cut. The View Transitions API lets the browser animate between route snapshots with a few lines of CSS — no animation library required."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/you-can-animate-page-navigation"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="You Can Animate Page Navigation"
          date="August 12, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Animated page navigation demo with sliding tab transitions"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            I've built plenty of React apps with client-side routing. Click a
            link, the URL changes, a new component renders. Fast, fine,
            forgettable.
          </p>
          <p className="mb-4">
            What I <em>didn't</em> realize until recently: that swap doesn't
            have to feel like a hard cut. Page navigation can be animated — the
            old view sliding out while the new one slides in, a tab underline
            gliding to its new spot, the whole thing reading like a native app
            changing screens.
          </p>
          <p className="mb-4">
            Not a full page reload. Not a loading spinner between routes. An
            actual transition between two views inside the same document.
          </p>
          <p className="mb-4">
            That was the surprise. Everything else followed from it.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            What I thought navigation had to feel like
          </h2>
          <p className="mb-4">In my head, there were two options:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>
              <strong>Traditional websites</strong> — the browser loads a whole
              new page. Sometimes there's a flash of white. You lose scroll
              position. It feels like leaving and arriving somewhere new.
            </li>
            <li>
              <strong>Single-page apps</strong> — React Router swaps components
              instantly. Snappy, but also… nothing. One frame you're on
              Overview, the next you're on Settings. The content just{" "}
              <em>appears</em>.
            </li>
          </ol>
          <p className="mb-4">
            I assumed option 2 was the tradeoff. SPAs are fast <em>because</em>{" "}
            there's no transition. If you wanted motion between pages, you'd
            need an animation library, exit states, delayed unmounts — the whole
            Framer Motion choreography. Heavy, fragile, easy to get wrong.
          </p>
          <p className="mb-4">
            Turns out there's a third option I'd completely missed.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The browser can animate between two pages
          </h2>
          <p className="mb-4">
            Modern browsers have a <strong>View Transitions API</strong>. The
            idea is almost embarrassingly simple:
          </p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li>Take a photograph of the current page</li>
            <li>Update the DOM (swap in the new route)</li>
            <li>Take a photograph of the new page</li>
            <li>Animate between the two photographs</li>
          </ol>
          <p className="mb-4">
            The old page doesn't need to stay mounted while it animates out.
            React can unmount it immediately. The browser keeps a snapshot of
            what it looked like and plays the exit animation on <em>that</em>.
            Your components don't track "am I leaving?" — the browser handles
            the visual bridge.
          </p>
          <p className="mb-4">
            That reframed everything for me. Navigation animation isn't a React
            problem. It's a browser capability that React can opt into.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            What it looks like in practice
          </h2>
          <p className="mb-4">
            I built a small demo with three tabs. Click between them and:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>The current page slides out to the left and fades</li>
            <li>The next page enters from the right</li>
            <li>
              Go back to a previous tab and the direction reverses
            </li>
            <li>
              The active tab underline slides to its new position instead of
              disappearing and reappearing
            </li>
          </ul>
          <p className="mb-4">
            It feels like the kind of transition you'd expect in a mobile app —
            but it's just a React SPA with a few lines of CSS.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            React barely changes
          </h2>
          <p className="mb-4">
            Here's the part that still surprises me: <strong>React barely
            changes.</strong> You add one prop to your links. You name a couple
            of elements. CSS does the rest.
          </p>
          <CodeBlock language="tsx" code={navLinkCode} />
          <CodeBlock language="tsx" code={mainCode} />
          <p className="mb-4">
            That's most of the React side.{" "}
            <InlineCode>viewTransition</InlineCode> tells React Router to wrap
            the route change in the browser's transition API.{" "}
            <InlineCode>viewTransitionName: 'page'</InlineCode> tells the
            browser "this is the bit that should animate as a unit."
          </p>
          <p className="mb-4">The animation itself lives in CSS:</p>
          <CodeBlock language="css" code={cssCode} />
          <p className="mb-4">
            <InlineCode>::view-transition-old</InlineCode> is the snapshot of
            the page you're leaving.{" "}
            <InlineCode>::view-transition-new</InlineCode> is the page you're
            arriving at. You style them like any other element — slides, fades,
            whatever you want.
          </p>
          <p className="mb-4">
            No animation library. No <InlineCode>AnimatePresence</InlineCode>.
            No "wait 300ms before unmounting."
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The mental model shift
          </h2>
          <p className="mb-4">
            Before: <em>routing changes content → content appears → done.</em>
          </p>
          <p className="mb-4">
            After: <em>routing changes content → browser holds the old view on
            screen → animates to the new view → done.</em>
          </p>
          <p className="mb-4">
            The DOM update and the visual transition are decoupled. React does
            what it always did — render the new route. The browser fills in the
            motion between old and new.
          </p>
          <p className="mb-4">
            Once I understood that, a lot of things I'd filed under "too hard
            for a web app" moved back onto the table:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Directional slides (forward vs back)</li>
            <li>
              Shared elements that morph between pages (headers, underlines,
              hero images)
            </li>
            <li>
              Cross-fades that don't require both components mounted at once
            </li>
          </ul>
          <p className="mb-4">
            These aren't hacks. They're what the API was designed for.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            A few things worth knowing
          </h2>
          <p className="mb-4">
            <strong>You need the right router setup.</strong> React Router's{" "}
            <InlineCode>viewTransition</InlineCode> prop only works with a data
            router (<InlineCode>createBrowserRouter</InlineCode>). Plain{" "}
            <InlineCode>&lt;BrowserRouter&gt;</InlineCode> silently ignores it
            — I learned that the hard way.
          </p>
          <p className="mb-4">
            <strong>Direction is a nice touch.</strong> Compare tab order before
            and after a click, stash <InlineCode>fwd</InlineCode> or{" "}
            <InlineCode>back</InlineCode> on a data attribute, and flip your CSS
            keyframes. Moving right through tabs feels like moving forward;
            moving left feels like going back. Small detail, big difference in
            how natural it feels.
          </p>
          <p className="mb-4">
            <strong>It degrades gracefully.</strong> Browsers without View
            Transitions just navigate instantly — no broken half-animations. You
            can add a simple enter-only fade for those cases and call it a day.
          </p>
          <p className="mb-4">
            <strong>Reduced motion still matters.</strong> Swap the slide for a
            quick fade when <InlineCode>prefers-reduced-motion</InlineCode> is
            on. The capability is cool; accessibility isn't optional.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Why this matters if you're just discovering it too
          </h2>
          <p className="mb-4">
            If you've only ever seen SPAs as instant swaps, animated navigation
            might not be on your radar at all. It wasn't on mine. I'd see it in
            polished native apps and assume the web version would always feel
            cheaper — a price of using React Router instead of a real screen
            stack.
          </p>
          <p className="mb-4">
            It doesn't have to. The gap between "instant content swap" and
            "screen transition" is smaller than I thought. The browser already
            knows how to animate between two visual states. You're not building
            a transition system from scratch — you're telling it which parts of
            the page to treat as the old and new views.
          </p>
          <p className="mb-4">
            For tabbed layouts, settings panels, onboarding flows, anything
            where the user is moving between related views in the same app shell
            — this is probably the first thing to try before reaching for a
            full animation library.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            TLDR
          </h2>
          <p className="mb-4">
            Page navigation can be animated. Not with a hack, not with a
            heavyweight library — with a native browser API that takes snapshots
            of your old and new UI and lets CSS animate between them.
          </p>
          <p className="mb-4">
            React swaps the route. The browser plays the transition. That's the
            whole trick.
          </p>
          <p className="mb-4">
            If you didn't know this was possible either, hopefully this saves
            you the same "wait, really?" moment I had — and gives you a reason
            to click between your own routes just to watch them move.
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/you-can-animate-page-navigation-ff9cbe9c6d3b" />
      </div>
    </>
  );
}
