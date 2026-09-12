import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";

const heroImg =
  "/keeping-frontend-and-backend-types-in-sync-with-typescript-magic/hero.png";

const backendTopicsServiceCode = `// backend/src/topics/topics.service.ts
async findAll(): Promise<TopicRow[]> {
  return this.prisma.topic.findMany({ select: TOPIC_SELECT });
}`;

const frontendTypesCode = `// frontend/src/types.ts
export interface TopicRow {
  id: string;
  code: string;
  requiresKey: boolean;
  // ...
}`;

const assertKitCode = `// backend/contract/assert.ts

/** The wire shape of a server value: JSON.stringify turns Date into string. */
export type Jsonify<T> = T extends Date
  ? string
  : T extends (infer U)[]
    ? Jsonify<U>[]
    : T extends object
      ? { [K in keyof T]: Jsonify<T[K]> }
      : T;

/** Invariant (not merely assignable) equality - catches widened optionals. */
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

export type Expect<T extends true> = T;

/** The element type of a service method that resolves to an array. */
export type RowOf<T> = Jsonify<Awaited<T>> extends (infer U)[] ? U : never;

/** The resolved wire shape of a service method. */
export type ResultOf<T> = Jsonify<Awaited<T>>;

/** The row type of a paginated \`{ rows, total }\` service method. */
export type PagedRowOf<T> =
  Jsonify<Awaited<T>> extends { rows: (infer U)[] } ? U : never;`;

const apiContractCode = `// backend/contract/api-contract.ts
import type { Equal, Expect, PagedRowOf, RowOf } from './assert';
import type { TopicsService } from '../src/topics/topics.service';
import type { ContactRequestsService } from '../src/contact-requests/contact-requests.service';
import type { TopicRow, ContactRequestRow } from '../../frontend/src/types';

// GET /topics
export type _Topics = Expect<
  Equal<RowOf<ReturnType<TopicsService['findAll']>>, TopicRow>
>;

// GET /contact-requests (paginated)
export type _ContactRequests = Expect<
  Equal<PagedRowOf<ReturnType<ContactRequestsService['findAll']>>, ContactRequestRow>
>;`;

const topicsAssertionCode = `export type _Topics = Expect<
  Equal<RowOf<ReturnType<TopicsService['findAll']>>, TopicRow>
>;`;

const equalLooseCode = `type Equal<A, B> = A extends B ? (B extends A ? true : false) : false; // too loose`;

const equalStrictCode = `(<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2)`;

const rowOfCode = `export type RowOf<T> = Jsonify<Awaited<T>> extends (infer U)[] ? U : never;`;

const wrongAssertionCode = `// Wrong: misses everything the method does after the query
Equal<Jsonify<TopicSelectResult>, TopicRow>`;

const rightAssertionCode = `// Right: whatever the method actually resolves to
Equal<RowOf<ReturnType<TopicsService['findAll']>>, TopicRow>`;

const tsconfigContractCode = `// backend/tsconfig.contract.json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "noEmit": true,
    "rootDir": "..",              // program spans both packages
    "module": "preserve",
    "moduleResolution": "bundler" // resolve the way the frontend's bundler does
  },
  "include": ["src/**/*", "contract/**/*", "../frontend/src/types.ts"]
}`;

const checkContractScriptCode = `{ "scripts": { "check:contract": "tsc -p tsconfig.contract.json" } }`;

const debugFailureCode = `type P1 = A extends B ? true : false;        // false => server is narrower / has extra
type P2 = B extends A ? true : false;        // false => frontend is wider
type Extra = Exclude<keyof A, keyof B>;      // fields the server sends, frontend lacks
type Missing = Exclude<keyof B, keyof A>;    // fields the frontend invented`;

export function KeepingFrontendAndBackendTypesInSyncWithTypescriptMagic() {
  return (
    <>
      <title>
        Keeping Frontend and Backend Types in Sync with Typescript Magic
      </title>
      <meta
        name="description"
        content="A compile-time contract between NestJS service methods and frontend interfaces — about sixty lines of type-level code, zero runtime cost, and adoptable one endpoint at a time."
      />
      <meta
        property="og:title"
        content="Keeping Frontend and Backend Types in Sync with Typescript Magic"
      />
      <meta
        property="og:description"
        content="A compile-time contract between NestJS service methods and frontend interfaces — about sixty lines of type-level code, zero runtime cost, and adoptable one endpoint at a time."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/keeping-frontend-and-backend-types-in-sync-with-typescript-magic"
      />
      <BlogLayout>
        <BlogHeader
          title="Keeping Frontend and Backend Types in Sync with Typescript Magic"
          date="September 11, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="TypeScript compile-time contract between frontend and backend types"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The bug that has no stack trace
          </h2>
          <p className="mb-4">
            Every full-stack TypeScript app has a seam where types stop being
            checked. Mine looks like this: a NestJS backend with Prisma on one
            side, a React app with a hand-written{" "}
            <InlineCode>types.ts</InlineCode> on the other, JSON in between.
          </p>
          <CodeBlock language="typescript" code={backendTopicsServiceCode} />
          <CodeBlock language="typescript" code={frontendTypesCode} />
          <p className="mb-4">
            Two <InlineCode>TopicRow</InlineCode>s. Same name, no relationship.
            Delete <InlineCode>requiresKey</InlineCode> from{" "}
            <InlineCode>TOPIC_SELECT</InlineCode> and both packages still
            compile, both test suites still pass, and the frontend renders{" "}
            <InlineCode>undefined</InlineCode> as an empty cell forever. Nobody
            notices until a customer does.
          </p>
          <p className="mb-4">
            The usual answers are generate a client from OpenAPI, or share a
            types package. Both are real solutions and both are migrations.
            What I wanted was something I could add to one endpoint on a Tuesday
            afternoon.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Why this got urgent
          </h2>
          <p className="mb-4">
            I've had hand-written response interfaces for two years and mostly
            gotten away with it, because I changed a select maybe once a month
            and I remembered what depended on it.
          </p>
          <p className="mb-4">
            Then I started shipping most of my code through AI agents, and the
            failure rate went vertical. Agents are genuinely good at the
            mechanical part: ask for a new field on an endpoint and you get the
            Prisma migration, the select, the service change, the component.
            What they're bad at is remembering that the type describing that
            payload lives in a <em>different package</em>, three thousand lines
            into a file they never opened.
          </p>
          <p className="mb-4">Three patterns I now see constantly:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>The half-update.</strong> Backend select grows a field,
              the frontend interface doesn't. Component reads{" "}
              <InlineCode>row.newField</InlineCode>, gets undefined, renders
              nothing. No error anywhere.
            </li>
            <li>
              <strong>The confident invention.</strong> Agent needs a field that
              isn't in the payload, declares it on the interface anyway.
              TypeScript now actively lies to every consumer.
            </li>
            <li>
              <strong>The as any escape.</strong> Types don't line up, the fix
              is a cast, the cast survives review because it's one line in a
              400-line diff.
            </li>
          </ul>
          <p className="mb-4">
            None of these are dumb mistakes. They're what you'd expect from a
            worker with no persistent memory and a strong bias toward making the
            file in front of it compile. Which is a decent description of an
            agent, and an uncomfortably good description of me on a Friday.
          </p>
          <p className="mb-4">
            The fix isn't better prompting. It's making the mistake fail the
            build, so it gets caught by a machine that doesn't get tired.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The idea
          </h2>
          <p className="mb-4">
            Don't generate anything. Keep the hand-written interface, and add
            one type-level assertion pinning it to the service method that
            produces it. If the method's return type and the interface ever
            diverge, <InlineCode>tsc</InlineCode> fails.
          </p>
          <p className="mb-4">Two files. Here's the whole assertion kit:</p>
          <CodeBlock language="typescript" code={assertKitCode} />
          <p className="mb-4">And an assertion per endpoint:</p>
          <CodeBlock language="typescript" code={apiContractCode} />
          <p className="mb-4">That's it.</p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The typing magic, explained
          </h2>
          <p className="mb-4">Take one assertion and read it outside-in:</p>
          <CodeBlock language="typescript" code={topicsAssertionCode} />
          <p className="mb-4">
            <strong>Expect</strong> is just{" "}
            <InlineCode>export type Expect&lt;T extends true&gt; = T;</InlineCode>
            . At compile time the <InlineCode>extends</InlineCode> keyword
            checks whether <InlineCode>T</InlineCode> — here the whole{" "}
            <InlineCode>Equal&lt;...&gt;</InlineCode> — is{" "}
            <InlineCode>true</InlineCode>. If it isn't, the compiler reports an
            error. Declaring the alias <em>is</em> the test; nothing runs.
          </p>
          <p className="mb-4">
            <strong>Equal.</strong> The first instinct is to write mutual
            assignability:
          </p>
          <CodeBlock language="typescript" code={equalLooseCode} />
          <p className="mb-4">
            But <InlineCode>extends</InlineCode> isn't strict enough.{" "}
            <InlineCode>any</InlineCode> is assignable in both directions, so
            one stray <InlineCode>any</InlineCode> matches anything; and{" "}
            <InlineCode>{"{ x?: string }"}</InlineCode> and{" "}
            <InlineCode>{"{ x: string | undefined }"}</InlineCode> come out
            equal even though one means "the key may be missing" and the other
            "the key is always sent." To check for the <em>exact same</em> type,
            compare two function types instead:
          </p>
          <CodeBlock language="typescript" code={equalStrictCode} />
          <p className="mb-4">
            We're asking the compiler: given any type T, do{" "}
            <InlineCode>T extends A</InlineCode> and{" "}
            <InlineCode>T extends B</InlineCode> always resolve to the same
            thing? T is never instantiated, so both conditionals stay deferred —
            this forces the checker to compare them structurally rather than
            evaluate them, and only identical A and B pass. It's the same
            utility{" "}
            <a
              href="https://github.com/type-challenges/type-challenges"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              type-challenges
            </a>{" "}
            ships, and the explanation and discussion live in{" "}
            <a
              href="https://github.com/microsoft/TypeScript/issues/27024#issuecomment-421529650"
              className="text-blue-600 dark:text-blue-400 underline"
            >
              microsoft/TypeScript#27024
            </a>
            .
          </p>
          <p className="mb-4">
            <strong>The two sides of Equal.</strong> The right side,{" "}
            <InlineCode>TopicRow</InlineCode>, is simply the interface imported
            from the frontend. The left side needs a bit more unpacking.{" "}
            <InlineCode>TopicsService['findAll']</InlineCode> grabs the method,
            TypeScript's built-in <InlineCode>ReturnType</InlineCode> grabs what
            that method returns, and <InlineCode>RowOf</InlineCode> is a
            JSON-aware unwrapper:
          </p>
          <CodeBlock language="typescript" code={rowOfCode} />
          <p className="mb-4">
            It says: await T, convert it the way{" "}
            <InlineCode>JSON.stringify</InlineCode> would (
            <InlineCode>Jsonify</InlineCode> rewrites <InlineCode>Date</InlineCode>{" "}
            to string, so timestamps line up with what the client actually
            receives), and if the result is an array, call the element type U.
          </p>
          <p className="mb-4">
            All together, the assertion guarantees that the rows{" "}
            <InlineCode>TopicsService.findAll</InlineCode> returns match the
            frontend's <InlineCode>TopicRow</InlineCode> exactly.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Wire it to the method, not the query
          </h2>
          <p className="mb-4">
            One rule matters more than the rest: derive the wire type from the{" "}
            <strong>service method's return type</strong>, never from the Prisma
            select.
          </p>
          <p className="mb-4">
            Services post-process. Mine attach computed fields, strip secrets
            before returning, and reshape rows. A select shows none of that, so
            an assertion against it checks the wrong thing while looking
            perfectly reasonable — the worst kind of test.
          </p>
          <CodeBlock language="typescript" code={wrongAssertionCode} />
          <CodeBlock language="typescript" code={rightAssertionCode} />

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Making it run
          </h2>
          <p className="mb-4">
            The check needs a <InlineCode>tsc</InlineCode> program spanning both
            packages, which is one extra tsconfig:
          </p>
          <CodeBlock language="json" code={tsconfigContractCode} />
          <CodeBlock language="json" code={checkContractScriptCode} />
          <p className="mb-4">
            Then one line in CI. The bundler resolution is worth calling out:
            the frontend is ESM and written with extensionless imports, so under
            the backend's own Node resolution <InlineCode>tsc</InlineCode>{" "}
            demands <InlineCode>.js</InlineCode> suffixes on files Vite resolves
            fine. Matching the bundler's algorithm keeps the checker honest
            about how that code really loads. It's checker-only and doesn't touch
            what ships — <InlineCode>nest build</InlineCode> uses a separate
            config that sees <InlineCode>src/**</InlineCode> only.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Reading a failure
          </h2>
          <p className="mb-4">
            The error is accurate and completely unhelpful:{" "}
            <em>
              Type 'false' does not satisfy the constraint 'true'.
            </em>{" "}
            Invariance is binary; it won't tell you which field moved. Decompose
            it temporarily:
          </p>
          <CodeBlock language="typescript" code={debugFailureCode} />
          <p className="mb-4">
            Ten seconds and you know exactly what drifted. I keep that snippet
            in the file's doc comment so the next person — or the next agent —
            doesn't have to rediscover it.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            What it costs, and where it doesn't reach
          </h2>
          <p className="mb-4">
            Adopt it incrementally. My contract file is deliberately partial:
            you add the assertion for the endpoint you're already touching, and
            unasserted endpoints keep working exactly as before. There's no
            big-bang migration, which is the only reason it got adopted at all.
          </p>
          <p className="mb-4">Two honest limits.</p>
          <p className="mb-4">
            <strong>Interfaces shared across endpoints can't be asserted yet.</strong>{" "}
            One of my <InlineCode>UserRow</InlineCode>s serves five endpoints,
            so seven of its fields are optional purely as a
            loosest-common-denominator — even though the main listing always
            sends them. <InlineCode>Equal</InlineCode> is invariant, so it
            correctly refuses to match any single one of those five methods. The
            fix is splitting the interface per endpoint, which is real work,
            and until you do it the assertion is unavailable rather than wrong.
            I'd rather have that than a permissive check that passes.
          </p>
          <p className="mb-4">
            <strong>Interfaces declared outside the included file can't be seen.</strong>{" "}
            Three of mine live in their page components. Pulling those into the
            program would drag React in and require a frontend install in CI, so
            the move that makes them checkable is relocating them to{" "}
            <InlineCode>types.ts</InlineCode>.
          </p>
          <p className="mb-4">
            And <InlineCode>Jsonify</InlineCode> is a model, not a proof. It
            handles <InlineCode>Date</InlineCode>, arrays, and plain objects —
            the three things my payloads contain. It does not model{" "}
            <InlineCode>JSON.stringify</InlineCode> dropping undefined values
            and functions, or <InlineCode>toJSON</InlineCode> on non-Date
            classes. If your services return Maps or class instances with custom
            serialization, extend it before trusting it.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The point
          </h2>
          <p className="mb-4">
            About sixty lines of type-level code, zero runtime cost, no
            generated files, and adoptable one endpoint at a time. It converts a
            class of silent production bug into a red build.
          </p>
          <p className="mb-4">
            If a constraint only lives in your head, you've already lost it. Put
            it in the compiler.
          </p>
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/keeping-frontend-and-backend-types-in-sync-with-typescript-magic-99a16b87e27d" />
      </BlogLayout>
    </>
  );
}
