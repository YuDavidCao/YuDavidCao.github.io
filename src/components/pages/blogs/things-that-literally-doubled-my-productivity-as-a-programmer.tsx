import { InlineCode } from "../../blogs/inline-code";
import { CodeBlock } from "../../blogs/code-block";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";
const heroImg =
  "/things-that-literally-doubled-my-productivity-as-a-programmer/hero.png";
const errorLensImg =
  "/things-that-literally-doubled-my-productivity-as-a-programmer/error-lens-in-action.png";
const codeSnapImg =
  "/things-that-literally-doubled-my-productivity-as-a-programmer/code-snap-in-action.png";
const betterCommentImg =
  "/things-that-literally-doubled-my-productivity-as-a-programmer/better-comment-in-action.png";
const zshAutosuggestionImg =
  "/things-that-literally-doubled-my-productivity-as-a-programmer/zsh-autosuggestion-in-action.png";
const refinedGithubImg =
  "/things-that-literally-doubled-my-productivity-as-a-programmer/refined-github-in-action.png";
const chromeDevToolImg =
  "/things-that-literally-doubled-my-productivity-as-a-programmer/chrome-dev-tool-command-menu-in-action.png";

export function ThingsThatLiterallyDoubledMyProductivityAsAProgrammer() {
  return (
    <>
      <title>
        Things that literally doubled my productivity as a programmer
      </title>
      <meta
        name="description"
        content="Discover practical productivity tips and tools that can significantly boost your programming efficiency, from keyboard shortcuts to automation techniques."
      />
      <meta
        property="og:title"
        content="Things that literally doubled my productivity as a programmer"
      />
      <meta
        property="og:description"
        content="Discover practical productivity tips and tools that can significantly boost your programming efficiency, from keyboard shortcuts to automation techniques."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/things-that-literally-doubled-my-productivity-as-a-programmer"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Things that literally doubled my productivity as a programmer"
          date="January 15, 2025"
          heroImgSrc={heroImg}
          heroImgAlt="Things that literally doubled my productivity as a programmer Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            As someone constantly looking for productivity hacks and better
            tools, I wanted to share a few things that have significantly
            boosted my output.
          </p>
          <blockquote className="border-l-4 border-blue-500 pl-4 italic bg-gray-100 dark:bg-gray-800 py-2 mb-4">
            I primarily build <strong>web</strong> and <strong>mobile</strong>{" "}
            applications using <strong>Cursor</strong> on a{" "}
            <strong>MacBook</strong>, so these tips are tailored for a similar
            setup. That said, many of them apply more broadly too.
          </blockquote>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Section 1: Hotkeys That Save My Brain
          </h2>
          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Navigate Forward and Backward in Cursor Position
          </h3>
          <p className="mb-4">
            When working on large projects, jumping between files and function
            definitions is a constant. But once I jump, I often forget where I
            came from. Sound familiar?
          </p>
          <p className="mb-4">
            Luckily, most editors have a way to move backward and forward
            through your cursor history.
          </p>
          <p className="mb-4">
            In <strong>VSCode/Cursor</strong> on <strong>Mac</strong>:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              <InlineCode>ctrl + -</InlineCode> : Go to <em>previous</em> cursor
              position
            </li>
            <li>
              <InlineCode>ctrl + Shift + -</InlineCode> : Go to <em>next</em>{" "}
              cursor position
            </li>
          </ul>
          <p className="mb-4">
            This is a <em>game-changer</em> for regaining your context quickly.
          </p>
          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Text Editing Shortcuts That Add Up
          </h3>
          <p className="mb-4">
            These may seem small, but they <em>stack up fast</em> when you're
            writing and editing code all day. Here are a few I use constantly on
            macOS with VSCode/Cursor:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Move by word: <InlineCode>Option + left/right arrow</InlineCode>
            </li>
            <li>
              Delete by word: <InlineCode>Option + delete</InlineCode>
            </li>
            <li>
              Move by line: <InlineCode>cmd + left/right arrow</InlineCode>
            </li>
            <li>
              Delete by line (in Vscode):{" "}
              <InlineCode>cmd + shift + k</InlineCode>
            </li>
          </ul>
          <p className="mb-4">
            Once these become muscle memory, you'll feel like you're flying
            through code.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Section 2: Plugins That Do the Heavy Lifting
          </h2>
          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Vscode / Cursor Plugins:
          </h3>
          <ol className="list-decimal pl-6 mb-4">
            <li className="mb-4">
              <strong>Error lens:</strong> Replaces subtle squiggly lines with
              bold, full-line highlights and messages for errors, warnings, and
              suggestions. It makes bugs and issues hard to miss — in the best
              way.
            </li>
          </ol>
          <div className="my-6">
            <img
              src={errorLensImg}
              alt="Error Lens in Action"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Error Lens in Action
            </p>
          </div>
          <ol className="list-decimal pl-6 mb-4" start={2}>
            <li className="mb-4">
              <strong>Code Snap:</strong> Ever wondered how people share
              beautifully formatted code snippets? CodeSnap makes it easy to
              export clean, styled code images.
            </li>
          </ol>
          <div className="my-6">
            <img
              src={codeSnapImg}
              alt="Code Snap In Action"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Code Snap In Action
            </p>
          </div>
          <ol className="list-decimal pl-6 mb-4" start={3}>
            <li className="mb-4">
              <strong>Better Comments:</strong> Better comments allows custom
              colors for comments that starts with <InlineCode>todo</InlineCode>
              , <InlineCode>?</InlineCode>,<InlineCode>!</InlineCode>,{" "}
              <InlineCode>*</InlineCode>, or more for you to customize!
            </li>
          </ol>
          <div className="my-6">
            <img
              src={betterCommentImg}
              alt="Better Comment in Action"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Better Comment in Action
            </p>
          </div>
          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Terminal Plugins:
          </h3>
          <p className="mb-4">
            Zsh-autosuggestions has single handedly doubled my command-line
            productivity. It remembers your previous commands and shows them as
            suggestions as you type, just hit the → arrow to autocomplete. As an
            example, a flask command I often use popped up after I typed{" "}
            <InlineCode>fla</InlineCode>. This removes the need to search Google
            or ChatGPT every time I forget a CLI command.
          </p>
          <div className="my-6">
            <img
              src={zshAutosuggestionImg}
              alt="Zsh-autosuggestions in Action"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Zsh-autosuggestions in Action
            </p>
          </div>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Section 3: Misc Tools & Hidden Gems
          </h2>
          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Refined Github
          </h3>
          <p className="mb-4">
            This Chrome extension upgrades GitHub's UI with small but impactful
            features. My favorite? An improved merge conflict resolver right in
            the browser. Cleaner and more functional.
          </p>
          <div className="my-6">
            <img
              src={refinedGithubImg}
              alt="Refined Github in Action"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Refined Github in Action
            </p>
          </div>
          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Chrome Dev Tool Command Menu
          </h3>
          <p className="mb-4">
            Instead of hunting through menus, use the <em>Command Menu</em> like
            a pro:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Mac: <InlineCode>cmd + shift + p</InlineCode>
            </li>
            <li>
              Windows/Linux: <InlineCode>ctrl + shift + p</InlineCode>
            </li>
          </ul>
          <p className="mb-4">
            Type what you need (e.g., "Lighthouse") and jump straight to it.
            It's fast, keyboard-driven, and honestly addictive.
          </p>
          <div className="my-6">
            <img
              src={chromeDevToolImg}
              alt="Chrome Dev Tool Command Menu in Action"
              className="w-full rounded-lg shadow-lg"
            />
            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
              Chrome Dev Tool Command Menu in Action
            </p>
          </div>
          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            Git Aliases
          </h3>
          <p className="mb-4">
            Git commands can be long and hard to remember. Aliases are your
            shortcut to sanity. Here's one of my favorites:
          </p>
          <CodeBlock
            language="bash"
            code={`git config --global alias.step-back "reset --soft HEAD~1"`}
          />
          <p className="mb-4">
            Now you can just type <InlineCode>git step-back</InlineCode> to undo
            your last commit (without losing changes). Perfect for "oops"
            moments.
          </p>
          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Wrapping Up
          </h2>
          <p className="mb-4">
            These tools and habits didn't just save time — they removed friction
            and made coding more fun. If you're a developer using Mac, Cursor,
            and VSCode, I highly recommend giving these a try.
          </p>
          <BlogFooter url="https://medium.com/@yu.cao20041208/things-that-literally-doubled-my-productivity-as-a-programmer-a2806408f46a" />
        </article>
      </div>
    </>
  );
}
