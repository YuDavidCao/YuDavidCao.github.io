import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
import { BlogLayout } from "../../blogs/BlogLayout";

const heroImg =
  "/create-an-unused-function-detection-script-using-the-typescript-compiler-and-lsp-api/hero.png";

const entryPointCode = `#!/usr/bin/env node
import path from 'node:path'
import { createRequire } from 'node:module'`;

const loadTsCode = `function loadTs(fromDir) {
  const require = createRequire(path.join(fromDir, 'noop.js'))
  return require('typescript')
}`;

const declaredFunctionNameCode = `function declaredFunctionName(ts, node) {
  if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
    if (ts.getDecorators(node)?.length) return null
    return node.name && ts.isIdentifier(node.name) ? node.name : null
  }
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer &&
    (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
  ) {
    return node.name
  }
  return null
}`;

const analyzeStartCode = `function analyze(configPath) {
  const dir = path.dirname(path.resolve(configPath))
  const ts = loadTs(dir)
  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile)
  if (error) throw new Error(ts.flattenDiagnosticMessageText(error.messageText, '\\n'))
  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, dir)`;

const hostCode = `const host = {
    getScriptFileNames: () => parsed.fileNames,
    getScriptVersion: () => '0',
    getScriptSnapshot: (f) => {
      const text = ts.sys.readFile(f)
      return text === undefined ? undefined : ts.ScriptSnapshot.fromString(text)
    },
    getCurrentDirectory: () => dir,
    getCompilationSettings: () => parsed.options,
    getDefaultLibFileName: (o) => ts.getDefaultLibFilePath(o),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  }`;

const serviceCode = `const service = ts.createLanguageService(host, ts.createDocumentRegistry())
const program = service.getProgram()
if (!program) throw new Error('failed to create TypeScript program')`;

const deadLoopCode = `const dead = []
  for (const file of program.getSourceFiles()) {
    if (file.isDeclarationFile || file.fileName.includes('node_modules')) continue
    const visit = (node) => {
      const name = declaredFunctionName(ts, node)
      if (name) {
        const refs = service.getReferencesAtPosition(file.fileName, name.getStart(file)) ?? []
        if (refs.length < 2) {
          const { line } = file.getLineAndCharacterOfPosition(name.getStart(file))
          dead.push({ file: path.relative(process.cwd(), file.fileName), line: line + 1, name: name.getText(file) })
        }
      }
      ts.forEachChild(node, visit)
    }
    ts.forEachChild(file, visit)
  }
  return dead}`;

const cliCode = `const config = process.argv[2]
if (!config) {
  console.error('usage: node unused-function-detection-ts.mjs <tsconfig.json>')
  process.exit(1)
}
const dead = analyze(config)
for (const d of dead.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
  console.log(\`\${d.file}:\${d.line}  \${d.name}\`)
}
console.error(\`\\n\${dead.length} candidates\`)`;

const flowDiagramCode = `tsconfig.json
      │
      ▼
readConfigFile + parseJsonConfigFileContent
      │
      ▼
Language Service Host  ──►  createLanguageService
      │
      ▼
AST walk per file  ──►  getReferencesAtPosition
      │
      ▼
refs.length < 2?  ──yes──►  report as candidate
      │
      no
      ▼
    skip`;

const fullScriptCode = `#!/usr/bin/env node
import path from 'node:path'
import { createRequire } from 'node:module'

function loadTs(fromDir) {
  const require = createRequire(path.join(fromDir, 'noop.js'))
  return require('typescript')
}

function declaredFunctionName(ts, node) {
  if (ts.isFunctionDeclaration(node) || ts.isMethodDeclaration(node)) {
    if (ts.getDecorators(node)?.length) return null
    return node.name && ts.isIdentifier(node.name) ? node.name : null
  }
  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer &&
    (ts.isArrowFunction(node.initializer) || ts.isFunctionExpression(node.initializer))
  ) {
    return node.name
  }
  return null
}

function analyze(configPath) {
  const dir = path.dirname(path.resolve(configPath))
  const ts = loadTs(dir)
  const { config, error } = ts.readConfigFile(configPath, ts.sys.readFile)
  if (error) throw new Error(ts.flattenDiagnosticMessageText(error.messageText, '\\n'))
  const parsed = ts.parseJsonConfigFileContent(config, ts.sys, dir)

  const host = {
    getScriptFileNames: () => parsed.fileNames,
    getScriptVersion: () => '0',
    getScriptSnapshot: (f) => {
      const text = ts.sys.readFile(f)
      return text === undefined ? undefined : ts.ScriptSnapshot.fromString(text)
    },
    getCurrentDirectory: () => dir,
    getCompilationSettings: () => parsed.options,
    getDefaultLibFileName: (o) => ts.getDefaultLibFilePath(o),
    fileExists: ts.sys.fileExists,
    readFile: ts.sys.readFile,
    readDirectory: ts.sys.readDirectory,
    directoryExists: ts.sys.directoryExists,
    getDirectories: ts.sys.getDirectories,
  }

  const service = ts.createLanguageService(host, ts.createDocumentRegistry())
  const program = service.getProgram()
  if (!program) throw new Error('failed to create TypeScript program')

  const dead = []
  for (const file of program.getSourceFiles()) {
    if (file.isDeclarationFile || file.fileName.includes('node_modules')) continue
    const visit = (node) => {
      const name = declaredFunctionName(ts, node)
      if (name) {
        const refs = service.getReferencesAtPosition(file.fileName, name.getStart(file)) ?? []
        if (refs.length < 2) {
          const { line } = file.getLineAndCharacterOfPosition(name.getStart(file))
          dead.push({ file: path.relative(process.cwd(), file.fileName), line: line + 1, name: name.getText(file) })
        }
      }
      ts.forEachChild(node, visit)
    }
    ts.forEachChild(file, visit)
  }
  return dead
}

const config = process.argv[2]
if (!config) {
  console.error('usage: node unused-function-detection-ts.mjs <tsconfig.json>')
  process.exit(1)
}
const dead = analyze(config)
for (const d of dead.sort((a, b) => a.file.localeCompare(b.file) || a.line - b.line)) {
  console.log(\`\${d.file}:\${d.line}  \${d.name}\`)
}
console.error(\`\\n\${dead.length} candidates\`)`;

export function CreateAnUnusedFunctionDetectionScriptUsingTheTypescriptCompilerAndLspApi() {
  return (
    <>
      <title>
        Create an Unused Function Detection Script Using the TypeScript
        Compiler and LSP API
      </title>
      <meta
        name="description"
        content="A walkthrough of an ~80-line script that finds unused TypeScript function candidates by combining the compiler AST with getReferencesAtPosition from the Language Service API."
      />
      <meta
        property="og:title"
        content="Create an Unused Function Detection Script Using the TypeScript Compiler and LSP API"
      />
      <meta
        property="og:description"
        content="A walkthrough of an ~80-line script that finds unused TypeScript function candidates by combining the compiler AST with getReferencesAtPosition from the Language Service API."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/create-an-unused-function-detection-script-using-the-typescript-compiler-and-lsp-api"
      />
      <BlogLayout>
        <BlogHeader
          title="Create an Unused Function Detection Script Using the TypeScript Compiler and LSP API"
          date="August 2, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="TypeScript unused function detection script diagram"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            Every TypeScript project accumulates functions that nobody calls
            anymore. I've been using tools like knip, yet they only detect
            unused files, not unused functions inside a file. An approach to
            solve this issue is to ask the same engine that powers your editor:
            the TypeScript Language Service, the in-process API that{" "}
            <InlineCode>tsserver</InlineCode> (and every LSP plugin) wraps.
          </p>
          <p className="mb-4">
            This post walks through a ~80-line script that finds unused function
            candidates by combining the compiler's AST with{" "}
            <InlineCode>getReferencesAtPosition</InlineCode>.
          </p>
          <p className="mb-4">
            The full GitHub code with a simple example can be found on{" "}
            <a
              href="https://github.com/YuDavidCao/unused-function-detection-ts"
              className="underline hover:text-blue-600"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            .
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The idea
          </h2>
          <p className="mb-4">
            For each named function in your project, count how many places
            reference it. If the only reference is the declaration itself, the
            function is probably dead.
          </p>
          <p className="mb-4">
            TypeScript already knows how to resolve references across files,
            respect <InlineCode>tsconfig.json</InlineCode> paths, and handle
            renames. We just need to wire up a minimal language service host and
            call the same API your IDE uses when you click "Find All
            References."
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 1 — Set up the script entry point
          </h2>
          <p className="mb-4">
            Create <InlineCode>unused-function-detection-ts.mjs</InlineCode> and
            add the shebang plus imports.
          </p>
          <CodeBlock language="javascript" code={entryPointCode} />

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 2 — Load TypeScript from the target project
          </h2>
          <p className="mb-4">
            The script should use whatever <InlineCode>typescript</InlineCode>{" "}
            version the analyzed project depends on — not a global install.
          </p>
          <CodeBlock language="javascript" code={loadTsCode} />
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <InlineCode>loadTs(fromDir)</InlineCode> takes a directory and
              returns the <InlineCode>typescript</InlineCode> module from that
              project's <InlineCode>node_modules</InlineCode>.
            </li>
            <li>
              <InlineCode>createRequire</InlineCode> needs a file path as its
              resolution anchor. We point at a hypothetical{" "}
              <InlineCode>noop.js</InlineCode> in <InlineCode>fromDir</InlineCode>
              — the file doesn't need to exist, only the directory matters for
              resolving <InlineCode>node_modules</InlineCode>.
            </li>
            <li>
              <InlineCode>require('typescript')</InlineCode> loads the project's
              TypeScript, so compiler behavior matches what{" "}
              <InlineCode>tsc</InlineCode> would use.
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 3 — Recognize named function declarations in the AST
          </h2>
          <p className="mb-4">
            Before we can ask "who references this function?", we need to find
            function declarations and extract their name identifier.
          </p>
          <CodeBlock language="javascript" code={declaredFunctionNameCode} />
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              The helper takes the loaded <InlineCode>ts</InlineCode> module and
              any AST node, returning the name identifier or{" "}
              <InlineCode>null</InlineCode>.
            </li>
            <li>
              The first branch matches <InlineCode>function foo() {}</InlineCode>{" "}
              declarations and class methods like{" "}
              <InlineCode>method() {}</InlineCode>.
            </li>
            <li>
              Decorated functions and methods are skipped — think NestJS
              controllers or Angular components. Decorators often register usage
              that the reference graph won't see.
            </li>
            <li>
              We only return the name when it's a plain identifier, not computed
              names like <InlineCode>[Symbol.iterator]</InlineCode>.
            </li>
            <li>
              The second branch matches{" "}
              <InlineCode>const foo = () =&gt; {}</InlineCode> or{" "}
              <InlineCode>const foo = function() {}</InlineCode> — a variable
              declaration with an identifier name and an arrow or
              function-expression initializer.
            </li>
            <li>
              Anything else isn't a trackable named function, so we return{" "}
              <InlineCode>null</InlineCode>.
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 4 — Read and parse tsconfig.json
          </h2>
          <p className="mb-4">
            The analysis function starts by loading the config the same way the
            compiler does.
          </p>
          <CodeBlock language="javascript" code={analyzeStartCode} />
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <InlineCode>analyze</InlineCode> is the entry point — it accepts a
              path to any <InlineCode>tsconfig.json</InlineCode>.
            </li>
            <li>
              We resolve the config to an absolute path; its parent directory
              becomes the project root.
            </li>
            <li>
              TypeScript is loaded from that project's{" "}
              <InlineCode>node_modules</InlineCode>.
            </li>
            <li>
              The JSON config is read and parsed using TypeScript's built-in
              file reader.
            </li>
            <li>
              If the config is malformed or missing, we throw a readable error.
            </li>
            <li>
              Finally, <InlineCode>parseJsonConfigFileContent</InlineCode>{" "}
              expands <InlineCode>extends</InlineCode>,{" "}
              <InlineCode>include</InlineCode>/<InlineCode>exclude</InlineCode>,
              and <InlineCode>compilerOptions</InlineCode> into a full file list
              and resolved options — the same work <InlineCode>tsc</InlineCode>{" "}
              does.
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 5 — Implement a Language Service host
          </h2>
          <p className="mb-4">
            The Language Service needs a host object describing how to read
            project files. This is the same interface VS Code's TypeScript
            extension implements.
          </p>
          <CodeBlock language="javascript" code={hostCode} />
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              The host object is what the Language Service calls into for all
              file access.
            </li>
            <li>
              <InlineCode>getScriptFileNames</InlineCode> returns every{" "}
              <InlineCode>.ts</InlineCode> and <InlineCode>.tsx</InlineCode>{" "}
              file from the parsed config.
            </li>
            <li>
              <InlineCode>getScriptVersion</InlineCode> returns a fixed{" "}
              <InlineCode>'0'</InlineCode> — fine for a one-shot batch scan with
              no incremental updates.
            </li>
            <li>
              <InlineCode>getScriptSnapshot</InlineCode> reads file content and
              wraps it in an immutable <InlineCode>ScriptSnapshot</InlineCode>{" "}
              the service caches internally.
            </li>
            <li>
              <InlineCode>getCurrentDirectory</InlineCode> provides the project
              root for relative path resolution.
            </li>
            <li>
              <InlineCode>getCompilationSettings</InlineCode> passes through
              compiler options like <InlineCode>strict</InlineCode> and{" "}
              <InlineCode>paths</InlineCode>, which affect how references are
              resolved.
            </li>
            <li>
              <InlineCode>getDefaultLibFileName</InlineCode> locates default lib
              files such as <InlineCode>lib.es2022.d.ts</InlineCode>.
            </li>
            <li>
              The remaining methods delegate filesystem operations to{" "}
              <InlineCode>ts.sys</InlineCode> — the same helpers the CLI uses.
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 6 — Create the Language Service and program
          </h2>
          <p className="mb-4">
            This is where the LSP API comes in.{" "}
            <InlineCode>createLanguageService</InlineCode> gives you
            editor-grade operations like{" "}
            <InlineCode>getReferencesAtPosition</InlineCode>.
          </p>
          <CodeBlock language="javascript" code={serviceCode} />
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              We create the Language Service with a document registry — a shared
              AST cache.
            </li>
            <li>
              From the service we get the underlying <InlineCode>Program</InlineCode>
              , the full type-checked compilation unit.
            </li>
            <li>
              If program creation fails, we throw — usually a sign the host is
              misconfigured.
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 7 — Walk the AST and find unused functions
          </h2>
          <p className="mb-4">
            For each source file, recursively visit every node. When we find a
            named function, ask the Language Service for all references.
          </p>
          <CodeBlock language="javascript" code={deadLoopCode} />
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              We accumulate unused-function candidates in a <InlineCode>dead</InlineCode>{" "}
              array.
            </li>
            <li>
              We iterate every source file TypeScript loaded — project files and
              libs included.
            </li>
            <li>
              Declaration files (<InlineCode>.d.ts</InlineCode>) and anything
              under <InlineCode>node_modules</InlineCode> are skipped.
            </li>
            <li>
              A recursive <InlineCode>visit</InlineCode> function walks the AST
              for the current file.
            </li>
            <li>
              At each node, we check whether it's a named function declaration.
            </li>
            <li>
              If it is, we call <InlineCode>getReferencesAtPosition</InlineCode>
              — the same API behind "Find All References" in your editor. The
              position is the start of the identifier;{" "}
              <InlineCode>?? []</InlineCode> normalizes a missing result to an
              empty array.
            </li>
            <li>
              The <InlineCode>&lt; 2</InlineCode> heuristic is the core trick:
              one reference means only the definition site exists. Two or more
              means something else references it — a call site, re-export, type
              usage, and so on.
            </li>
            <li>
              For candidates, we convert the byte offset to a line number and
              record the relative file path, a 1-based line number, and the
              function name.
            </li>
            <li>
              <InlineCode>ts.forEachChild</InlineCode> recurses into nested
              functions, class bodies, and other child nodes.
            </li>
            <li>
              The outer call starts traversal at each file's top-level
              statements.
            </li>
            <li>Finally, we return the collected list.</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Step 8 — Wire up the CLI
          </h2>
          <p className="mb-4">
            The bottom of the file reads the config path from argv, runs
            analysis, and prints results.
          </p>
          <CodeBlock language="javascript" code={cliCode} />
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              The <InlineCode>tsconfig.json</InlineCode> path comes from the
              first CLI argument.
            </li>
            <li>
              If it's missing, we print usage to stderr and exit with code 1.
            </li>
            <li>
              We run the analysis, then sort results by file path and line number
              for stable output.
            </li>
            <li>
              Each result prints to stdout in{" "}
              <InlineCode>src/utils.ts:42 helperFn</InlineCode> format —
              pipe-friendly.
            </li>
            <li>
              The total count goes to stderr, so{" "}
              <InlineCode>node script.mjs tsconfig.json | wc -l</InlineCode>{" "}
              counts only the results.
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            How it fits together
          </h2>
          <CodeBlock language="text" code={flowDiagramCode} />
          <p className="mb-4">
            The Compiler API gives you the AST and type graph. The Language
            Service gives you editor-grade reference finding on top — no need to
            reinvent symbol resolution.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Caveats
          </h2>
          <p className="mb-4">
            Treat output as candidates, not a delete list:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              Entry points (<InlineCode>main</InlineCode>, framework hooks) —
              called by the runtime, not TypeScript code
            </li>
            <li>
              String-based or dynamic imports — no static reference edge
            </li>
            <li>
              Exported but unused API surface — referenced only from outside the
              project
            </li>
            <li>Decorated handlers — skipped entirely by design</li>
            <li>
              Overloads and implementations — may need finer-grained logic
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Full script
          </h2>
          <CodeBlock language="javascript" code={fullScriptCode} />
        </article>
        <BlogFooter url="https://medium.com/@yu.cao20041208/create-an-unused-function-detection-script-using-the-typescript-compiler-and-lsp-api-f5768a4475cb" />
      </BlogLayout>
    </>
  );
}
