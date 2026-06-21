import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg =
  "/understanding-side-effect-imports-in-javascript/hero.webp";

export function UnderstandingSideEffectImportsInJavascript() {
  return (
    <>
      <title>Understanding Side-Effect Imports in JavaScript</title>
      <meta
        name="description"
        content="Side-effect imports run code when a module is evaluated — without importing any exports. Learn when they're useful, real-world examples like polyfills and analytics, and why to use them carefully."
      />
      <meta
        property="og:title"
        content="Understanding Side-Effect Imports in JavaScript"
      />
      <meta
        property="og:description"
        content="Side-effect imports run code when a module is evaluated — without importing any exports. Learn when they're useful, real-world examples like polyfills and analytics, and why to use them carefully."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/understanding-side-effect-imports-in-javascript"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Understanding Side-Effect Imports in JavaScript"
          date="June 21, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Understanding Side-Effect Imports in JavaScript Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            JavaScript modules are often thought of as containers for functions,
            classes, and constants that we explicitly import and use. However,
            there is another pattern that appears frequently in real-world
            applications: side-effect imports.
          </p>
          <CodeBlock language="javascript" code={`import "./analytics.js";`} />
          <p className="mb-4">
            At first glance, this looks strange. We're importing a file but not
            importing anything from it. So why does it exist?
          </p>
          <p className="mb-4">
            Let's dive into what side-effect imports are, when they are useful,
            and why they should be used carefully.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            What Is a Side-Effect Import?
          </h2>
          <p className="mb-4">
            A side-effect import imports a module solely for the code that runs
            when the module is evaluated.
          </p>
          <p className="mb-4">For example:</p>
          <CodeBlock
            language="javascript"
            code={`// logger.js
console.log("Logger initialized");

// app.js
import "./logger.js";

console.log("App started");`}
          />
          <p className="mb-4">Output:</p>
          <CodeBlock
            language="text"
            code={`Logger initialized
App started`}
          />
          <p className="mb-4">
            Even though <InlineCode>logger.js</InlineCode> exports nothing,
            importing it causes its top-level code to execute.
          </p>
          <p className="mb-4">
            The import exists for the module's side effects, not for any exported
            values.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Pure vs Impure Modules
          </h2>
          <p className="mb-4">
            The idea is similar to pure vs impure functions.
          </p>

          <h3 className="font-serif text-2xl font-semibold mt-8 mb-3 tracking-tight">
            Pure Function
          </h3>
          <p className="mb-4">A pure function:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Produces the same output for the same input</li>
            <li>Does not modify external state</li>
            <li>Has no observable side effects</li>
          </ul>
          <CodeBlock
            language="javascript"
            code={`function add(a, b) {
  return a + b;
}`}
          />

          <h3 className="font-serif text-2xl font-semibold mt-8 mb-3 tracking-tight">
            Impure Function
          </h3>
          <p className="mb-4">An impure function affects the outside world:</p>
          <CodeBlock
            language="javascript"
            code={`function logMessage(msg) {
  console.log(msg);
}`}
          />
          <p className="mb-4">
            It performs a side effect by writing to the console.
          </p>

          <h3 className="font-serif text-2xl font-semibold mt-8 mb-3 tracking-tight">
            Pure Module
          </h3>
          <p className="mb-4">
            A pure module mainly exports values without changing anything
            globally:
          </p>
          <CodeBlock
            language="javascript"
            code={`// math.js
export function add(a, b) {
  return a + b;
}`}
          />
          <p className="mb-4">
            Importing this module does not alter application state.
          </p>

          <h3 className="font-serif text-2xl font-semibold mt-8 mb-3 tracking-tight">
            Impure Module
          </h3>
          <p className="mb-4">
            An impure module performs actions during initialization:
          </p>
          <CodeBlock
            language="javascript"
            code={`// setup.js
window.appVersion = "1.0";
console.log("Application initialized");`}
          />
          <p className="mb-4">
            Importing this file immediately changes global state.
          </p>
          <CodeBlock language="javascript" code={`import "./setup.js";`} />
          <p className="mb-4">This is a side-effect import.</p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            A Simple Example
          </h2>
          <p className="mb-4">
            Suppose you want every network request to include a custom header.
          </p>
          <CodeBlock
            language="javascript"
            code={`// api-setup.js
fetch = ((originalFetch) => {
  return (...args) => {
    const [url, options = {}] = args;
    options.headers = {
      ...options.headers,
      "X-App-Version": "1.0",
    };
    return originalFetch(url, options);
  };
})(fetch);`}
          />
          <p className="mb-4">Then:</p>
          <CodeBlock language="javascript" code={`import "./api-setup.js";`} />
          <p className="mb-4">
            The module modifies global behavior once during startup. Every
            subsequent <InlineCode>fetch()</InlineCode> call now automatically
            includes the header.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Real-World Example: Polyfills
          </h2>
          <p className="mb-4">
            One of the most common uses of side-effect imports is loading
            polyfills.
          </p>
          <CodeBlock language="javascript" code={`import "core-js/stable";`} />
          <p className="mb-4">
            The module patches built-in JavaScript objects and adds missing
            browser functionality.
          </p>
          <p className="mb-4">After importing:</p>
          <CodeBlock
            language="javascript"
            code={`Array.prototype.flat();
Promise.allSettled();`}
          />
          <p className="mb-4">
            may become available even in older environments.
          </p>
          <p className="mb-4">
            Nothing is imported into a variable because the purpose is simply to
            modify the runtime environment.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Real-World Example: Analytics Initialization
          </h2>
          <CodeBlock
            language="javascript"
            code={`// analytics.js
analytics.initialize({
  apiKey: "abc123",
});

analytics.track("application_started");`}
          />
          <CodeBlock language="javascript" code={`import "./analytics.js";`} />
          <p className="mb-4">
            The application imports the module once during startup so analytics
            is configured automatically.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Drawbacks
          </h2>
          <p className="mb-4">
            While convenient, side-effect imports have a few downsides:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Hidden behavior — the import statement doesn't reveal what the
              module changes.
            </li>
            <li>
              Order dependencies — some side effects must run before other
              modules.
            </li>
            <li>
              Harder testing — global state changes can leak between tests.
            </li>
            <li>
              Reduced maintainability — developers often need to inspect the
              module to understand its impact.
            </li>
          </ul>
          <p className="mb-4">
            As a rule of thumb, prefer explicit exports and function calls when
            possible, and reserve side-effect imports for initialization tasks
            that naturally occur once at application startup.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Conclusion
          </h2>
          <p className="mb-4">
            Side-effect imports are a powerful feature of JavaScript modules.
            They allow code to run simply by importing a file, making them ideal
            for polyfills, configuration, and framework initialization.
          </p>
          <p className="mb-4">
            However, they also make behavior less explicit, introduce ordering
            concerns, and can make code harder to reason about. Just as pure
            functions are generally easier to understand than impure functions,
            pure modules are usually easier to maintain than modules that
            perform hidden work during initialization.
          </p>
          <p className="mb-4">
            Use side-effect imports intentionally and sparingly. When you do use
            them, make sure their purpose is obvious and well-documented.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            References
          </h2>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <a
                href="https://stackoverflow.com/questions/41127479/es6-import-for-side-effects-meaning"
                target="_blank"
                rel="noopener noreferrer"
              >
                Stack Overflow discussion on ES6 side-effect imports
              </a>
            </li>
            <li>
              <a
                href="https://262.ecma-international.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                ECMAScript Modules Specification
              </a>
            </li>
            <li>
              <a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules"
                target="_blank"
                rel="noopener noreferrer"
              >
                MDN JavaScript Modules Documentation
              </a>
            </li>
          </ul>

          <BlogFooter url="https://medium.com/@yu.cao20041208/understanding-side-effect-imports-in-javascript-d49f413a1f89" />
        </article>
      </div>
    </>
  );
}
