import { InlineCode } from "../../blogs/inline-code";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg =
  "/explore-chrome-incognito-mode-from-a-storage-cookie-caching-perspective/hero.png";
const observationsImg =
  "/explore-chrome-incognito-mode-from-a-storage-cookie-caching-perspective/observations.png";

export function ExploreChromeIncognitoModeFromAStorageCookieCachingPerspective() {
  return (
    <>
      <title>
        Explore Chrome Incognito Mode from a storage & cookie & caching
        perspective
      </title>
      <meta
        name="description"
        content="Incognito mode is session isolation, not zero caching. A test suite across 11 scenarios reveals how Chrome shares cookies, storage, and HTTP cache within incognito sessions — and clears them when the last window closes."
      />
      <meta
        property="og:title"
        content="Explore Chrome Incognito Mode from a storage & cookie & caching perspective"
      />
      <meta
        property="og:description"
        content="Incognito mode is session isolation, not zero caching. A test suite across 11 scenarios reveals how Chrome shares cookies, storage, and HTTP cache within incognito sessions — and clears them when the last window closes."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/explore-chrome-incognito-mode-from-a-storage-cookie-caching-perspective"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Explore Chrome Incognito Mode from a storage & cookie & caching perspective"
          date="July 23, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Chrome incognito mode storage and caching overview diagram"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Incognito Is Not “No Cache”
          </h2>
          <p className="mb-4">
            Incognito mode is often thought of as an empty browser session. That
            is not quite right.
          </p>
          <p className="mb-4">
            Chrome's incognito mode has its own temporary browser state. While an
            incognito session is active, its tabs and windows can share cookies,
            storage, service workers, Cache API entries, and HTTP cache entries.
            That state is isolated from the normal Chrome profile and disappears
            when the last incognito window closes.
          </p>
          <p className="mb-4">
            The key distinction is <strong>session isolation</strong>, not{" "}
            <strong>zero caching</strong>.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            How the test works
          </h2>
          <p className="mb-4">
            The test uses a small local test suite that writes and reads different
            types of browser state, including:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Web Storage and cookies, including{" "}
              <InlineCode>HttpOnly</InlineCode> cookies
            </li>
            <li>
              <InlineCode>sessionStorage</InlineCode>
            </li>
            <li>IndexedDB and OPFS</li>
            <li>Service-worker registrations and Cache API entries</li>
            <li>
              HTTP-cached script and <InlineCode>fetch()</InlineCode> responses
            </li>
          </ul>
          <p className="mb-4">
            Each scenario has a <strong>write probe</strong> and a{" "}
            <strong>read probe</strong>. The write probe stores data in a source
            context, while the read probe runs in a target context to check
            whether that data is still available.
          </p>
          <p className="mb-4">
            The scenarios cover different combinations of normal tabs, incognito
            tabs and windows, reloads, browser restarts, and closing the last
            incognito window:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-3">
            <li>
              <strong>S01 — Same normal tab: soft reload</strong> — Write: normal
              tab · Read: same tab after soft reload (
              <InlineCode>Cmd+R</InlineCode> / <InlineCode>Ctrl+R</InlineCode>)
              · Tests whether all storage types and HTTP cache survive.
            </li>
            <li>
              <strong>S02 — Another normal tab</strong> — Write: normal tab A ·
              Read: new normal tab B · Tests shared vs. per-tab storage.
            </li>
            <li>
              <strong>S03 — Incognito while normal is open</strong> — Write:
              normal tab · Read: new incognito window · Tests isolation from the
              normal profile.
            </li>
            <li>
              <strong>S04 — Another incognito tab</strong> — Write: incognito tab
              A · Read: new incognito tab B · Tests sharing within an incognito
              session.
            </li>
            <li>
              <strong>S05 — Another incognito window</strong> — Write: incognito
              window A · Read: window B while A remains open · Tests whether one
              session spans multiple windows.
            </li>
            <li>
              <strong>S06 — New incognito after all windows close</strong> —
              Write: incognito window · Read: fresh incognito window · Tests
              whether session data is wiped.
            </li>
            <li>
              <strong>S07 — Restart → incognito</strong> — Write: normal tab ·
              Read: incognito window after restarting Chrome · Tests whether
              normal data leaks into incognito.
            </li>
            <li>
              <strong>S08 — Incognito → normal</strong> — Write: incognito tab ·
              Read: normal tab · Tests isolation in the reverse direction.
            </li>
            <li>
              <strong>S09 — Restart → normal</strong> — Write: normal tab · Read:
              normal tab after restarting Chrome · Tests whether normal-profile
              state persists.
            </li>
            <li>
              <strong>S10 — Same normal tab: hard reload</strong> — Write: normal
              tab · Read: same tab after hard reload (
              <InlineCode>Cmd+Shift+R</InlineCode> /{" "}
              <InlineCode>Ctrl+Shift+R</InlineCode>) · Tests storage persistence
              and HTTP-cache bypass.
            </li>
            <li>
              <strong>S11 — Same incognito tab: hard reload</strong> — Write:
              incognito tab · Read: same tab after hard reload · Tests the same
              behavior within an incognito session.
            </li>
          </ul>
          <p className="mb-4">
            The complete test process and result is available on{" "}
            <a
              href="https://github.com/YuDavidCao/incognito-exploration"
              className="underline hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Observations
          </h2>
          <img
            src={observationsImg}
            alt="Test results matrix for Chrome incognito storage and caching scenarios"
            className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
            loading="lazy"
          />
          <p className="mb-4">A couple takeaways:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>Normal tabs share persistent state.</strong>
            </li>
            <li>
              <strong>Incognito tabs and windows share temporary state.</strong>
            </li>
            <li>
              <InlineCode>sessionStorage</InlineCode> remains specific to a
              browsing tab.
            </li>
            <li>
              Normal and incognito contexts do not share storage or HTTP cache.
            </li>
            <li>
              Closing the last incognito window clears the temporary incognito
              state.
            </li>
            <li>
              A hard reload bypasses the HTTP cache but does not clear site
              storage or Cache API data.
            </li>
          </ul>
          <p className="mb-4">
            The most important observation is that incognito is{" "}
            <strong>not</strong> a collection of completely isolated tabs.
            Multiple incognito tabs and windows can share state as long as the
            incognito session is still alive.
          </p>
          <p className="mb-4">
            The session boundary is the important part: once the final incognito
            window closes, a later incognito session starts without the state
            created by the previous one.
          </p>
          <p className="mb-4">So the useful mental model is:</p>
          <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-4 dark:border-gray-600">
            Incognito is a separate temporary browser profile, not a browser with
            caching disabled
          </blockquote>
          <p className="mb-4">
            That distinction matters when debugging stale pages, testing
            authentication flows, and designing privacy-sensitive features.
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/explore-chrome-incognito-mode-from-a-storage-cookie-caching-perspective-19ba0941e216" />
      </div>
    </>
  );
}
