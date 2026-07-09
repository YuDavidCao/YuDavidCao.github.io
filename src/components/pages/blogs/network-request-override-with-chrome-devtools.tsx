import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/network-request-override-with-chrome-devtools/hero.png";
const networkTabImg = "/network-request-override-with-chrome-devtools/img1.png";
const overrideContentMenuImg =
  "/network-request-override-with-chrome-devtools/img2.png";
const overrideContentResultImg =
  "/network-request-override-with-chrome-devtools/img3.png";
const overrideHeadersMenuImg =
  "/network-request-override-with-chrome-devtools/img4.png";
const showOverrideToggleImg =
  "/network-request-override-with-chrome-devtools/img5.png";
const purpleIndicatorImg =
  "/network-request-override-with-chrome-devtools/img6.png";

export function NetworkRequestOverrideWithChromeDevtools() {
  return (
    <>
      <title>Network Request Override with Chrome DevTools</title>
      <meta
        name="description"
        content="Chrome DevTools lets you intercept network requests and replace their responses locally — a game changer for frontend development, especially on large projects where backend changes are slow or impossible."
      />
      <meta
        property="og:title"
        content="Network Request Override with Chrome DevTools"
      />
      <meta
        property="og:description"
        content="Chrome DevTools lets you intercept network requests and replace their responses locally — a game changer for frontend development, especially on large projects where backend changes are slow or impossible."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/network-request-override-with-chrome-devtools"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Network Request Override with Chrome DevTools"
          date="July 7, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Network Request Override with Chrome DevTools Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            If you've ever wished you could change an API response without
            touching your backend, spinning up a mock server, or editing your
            frontend code, Chrome DevTools has a feature you'll probably love.
          </p>
          <p className="mb-4">
            Buried inside the Network panel are two incredibly useful options:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Override Content</li>
            <li>Override Headers</li>
          </ul>
          <p className="mb-4">
            These let you intercept individual network requests and replace their
            responses directly from your browser.
          </p>
          <p className="mb-4">
            For frontend development, they're absolute game changers.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The Problem
          </h2>
          <p className="mb-4">
            Imagine your frontend depends on an endpoint like:
          </p>
          <CodeBlock language="http" code={`GET /api/profile`} />
          <p className="mb-4">Normally it returns:</p>
          <CodeBlock
            language="json"
            code={`{
  "name": "Alice",
  "isPremium": false
}`}
          />
          <p className="mb-4">But you want to test, for example:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>User roles</li>
            <li>Error responses</li>
            <li>Missing fields</li>
            <li>New backend features that aren't deployed yet</li>
            <li>Edge cases your backend rarely returns</li>
          </ul>
          <p className="mb-4">Traditionally you might need to:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Modify your backend</li>
            <li>Create a mock server</li>
            <li>Use some sort of proxy service</li>
            <li>Use browser extensions</li>
          </ul>
          <p className="mb-4">All of these add friction.</p>
          <p className="mb-4">
            Sometimes you just want:{" "}
            <em>"Pretend this one request returned different data."</em>
          </p>
          <p className="mb-4">Chrome DevTools can do exactly that.</p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Why This Is Even More Valuable on Large Projects
          </h2>
          <p className="mb-4">
            This feature becomes especially valuable when you're working on a
            large engineering project.
          </p>
          <p className="mb-4">
            In a small application, changing the backend or adding a temporary
            mock endpoint is usually straightforward. But in enterprise
            applications, that's often far from reality.
          </p>
          <p className="mb-4">
            You may be working in a codebase with millions of lines of code
            where:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              The frontend and backend live in separate repositories
            </li>
            <li>Backend services are owned by different teams</li>
            <li>
              Spinning up the backend locally takes several minutes — or isn't
              even possible
            </li>
            <li>
              Making a backend change requires navigating an unfamiliar codebase
            </li>
            <li>Rebuilding or redeploying services is slow</li>
          </ul>
          <p className="mb-4">
            Sometimes you don't even have permission to modify the backend.
          </p>
          <p className="mb-4">
            When all you want to do is verify that a new UI state works
            correctly, digging through a massive backend just to change a single
            JSON response becomes a huge context switch.
          </p>
          <p className="mb-4">
            Chrome DevTools' network overrides eliminate that friction.
          </p>
          <p className="mb-4">
            Instead of hunting down where a response is generated, you simply
            intercept the request, edit the JSON, refresh the page, and continue
            building your frontend.
          </p>
          <p className="mb-4">
            You stay focused on the UI without needing to understand — or even
            touch — the backend implementation.
          </p>
          <p className="mb-4">
            For developers working in large, service-oriented codebases, this
            can easily save dozens of minutes every day.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Override Content
          </h2>
          <p className="mb-4">
            Open Chrome DevTools and navigate to the Network tab:
          </p>
          <img
            src={networkTabImg}
            alt="Chrome DevTools Network tab"
            className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
            loading="lazy"
          />
          <p className="mb-4">Find the request you want to modify.</p>
          <p className="mb-4">Right-click it and select:</p>
          <img
            src={overrideContentMenuImg}
            alt="Override Content context menu option"
            className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
            loading="lazy"
          />
          <p className="mb-4">
            The first time you do this, Chrome will ask you to choose a local
            folder where it stores overridden responses.
          </p>
          <p className="mb-4">
            Once enabled, Chrome creates a local copy of that response.
          </p>
          <p className="mb-4">
            For example, in the case from example.com:
          </p>
          <CodeBlock
            language="html"
            code={`<!doctype html>
<html lang="en">
    <head>
        <title>Example Domain</title>
        <link rel="icon" href="data:,">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                background: #eee;
                width: 60vw;
                margin: 15vh auto;
                font-family: system-ui,sans-serif
            }
            h1 {
                font-size: 1.5em
            }
            div {
                opacity: 0.8
            }
            a:link,a:visited {
                color: #348
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Example Domain</h1>
            <p>This domain is for use in documentation examples without needing permission. Avoid use in operations.</p>
            <p>
                <a href="https://iana.org/domains/example">Learn more</a>
            </p>
        </div>
    </body>
</html>`}
          />
          <p className="mb-4">
            And with that you can freely change the content of the response to
            whatever you would like:
          </p>
          <CodeBlock
            language="html"
            code={`<!doctype html>
<html lang="en">
    <head>
        <title>Example Domain</title>
        <link rel="icon" href="data:,">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
            body {
                background: #eee;
                width: 60vw;
                margin: 15vh auto;
                font-family: system-ui,sans-serif
            }
            h1 {
                font-size: 1.5em
            }
            div {
                opacity: 0.8
            }
            a:link,a:visited {
                color: #348
            }
        </style>
    </head>
    <body>
        <div>
            <h1>Override Content</h1>
        </div>
    </body>
</html>`}
          />
          <p className="mb-4">Refresh the page.</p>
          <p className="mb-4">
            Your frontend now receives your modified response instead of what
            the server actually returned.
          </p>
          <img
            src={overrideContentResultImg}
            alt="Example.com page with overridden content"
            className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
            loading="lazy"
          />
          <p className="mb-4">
            And of course this can be applied to any network response — from
            HTML and JavaScript to JSON or other types of data.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Override Response Headers
          </h2>
          <p className="mb-4">There's another useful option nearby.</p>
          <img
            src={overrideHeadersMenuImg}
            alt="Override Headers context menu option"
            className="w-full object-cover rounded-lg mb-6 shadow dark:shadow-gray-800"
            loading="lazy"
          />
          <p className="mb-4">Right-click the request and choose:</p>
          <p className="mb-4">
            <InlineCode>Override Headers</InlineCode>
          </p>
          <p className="mb-4">
            This allows you to modify HTTP response headers without changing the
            server.
          </p>
          <p className="mb-4">Some useful examples include:</p>
          <p className="mb-4">Adding CORS headers:</p>
          <CodeBlock
            language="http"
            code={`Access-Control-Allow-Origin: *`}
          />
          <p className="mb-4">Changing cache behavior:</p>
          <CodeBlock language="http" code={`Cache-Control: no-store`} />
          <p className="mb-4">Testing Content Security Policies:</p>
          <CodeBlock
            language="http"
            code={`Content-Security-Policy`}
          />
          <p className="mb-4">Changing content types:</p>
          <CodeBlock
            language="http"
            code={`Content-Type: application/json`}
          />
          <p className="mb-4">
            Or experimenting with custom headers that your frontend depends on.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Things to Know
          </h2>
          <p className="mb-4">A few extra notes:</p>
          <ol className="list-decimal pl-6 mb-4 space-y-4">
            <li>
              Overrides are local to your machine. They don't affect teammates.
            </li>
            <li>
              They can be enabled and disabled whenever you need them — toggle
              the checkbox under "Show Override" when right-clicking a network
              request.
              <img
                src={showOverrideToggleImg}
                alt="Show Override toggle in Chrome DevTools"
                className="w-full object-cover rounded-lg my-4 shadow dark:shadow-gray-800"
                loading="lazy"
              />
              Think of them as temporary local patches for network traffic.
            </li>
            <li>
              Overridden network requests have a purple indicator as shown
              below:
              <img
                src={purpleIndicatorImg}
                alt="Purple indicator for overridden network requests"
                className="w-full object-cover rounded-lg my-4 shadow dark:shadow-gray-800"
                loading="lazy"
              />
            </li>
            <li>
              When any network requests are overridden, there will be a warning
              sign next to your Network tab.
            </li>
          </ol>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Final Thoughts
          </h2>
          <p className="mb-4">
            The Override Content and Override Headers features are some of the
            most underrated capabilities in Chrome DevTools.
          </p>
          <p className="mb-4">
            They're especially valuable when you're working on large applications
            where the frontend and backend are developed independently, or the
            backend codebase is simply too large and complex to navigate for a
            small UI change.
          </p>
          <p className="mb-4">
            Instead of waiting for backend changes, creating mock servers, or
            sprinkling temporary test code throughout your application, you can
            edit a single network response and immediately see how your UI
            behaves.
          </p>
          <p className="mb-4">Whether you're:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Building new features</li>
            <li>Testing edge cases</li>
            <li>Simulating backend bugs</li>
            <li>
              Or simply trying to unblock yourself while another team finishes
              an API
            </li>
          </ul>
          <p className="mb-4">
            Network overrides are an incredibly powerful tool to have in your
            workflow.
          </p>
          <p className="mb-4">
            The next time you think, "I just need this endpoint to return
            something different," don't reach for a mock server first.
          </p>
          <p className="mb-4">
            Open the Network tab, right-click the request, and let Chrome
            DevTools do the work.
          </p>
        </article>
        <BlogFooter url="https://medium.com/p/4fad776fc2ca" />
      </div>
    </>
  );
}
