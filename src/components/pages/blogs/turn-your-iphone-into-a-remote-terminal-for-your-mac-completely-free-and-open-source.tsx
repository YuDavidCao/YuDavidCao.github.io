import { CodeBlock } from "../../blogs/code-block";
import { InlineCode } from "../../blogs/inline-code";
import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg =
  "/turn-your-iphone-into-a-remote-terminal-for-your-mac-completely-free-and-open-source/hero.png";

export function TurnYourIphoneIntoARemoteTerminalForYourMacCompletelyFreeAndOpenSource() {
  return (
    <>
      <title>
        Turn Your iPhone into a Remote Terminal for Your Mac — Completely Free
        and Open Source
      </title>
      <meta
        name="description"
        content="SSH into your MacBook from your iPhone anywhere in the world using a-Shell, Tailscale, and tmux — a completely free, open-source remote terminal setup."
      />
      <meta
        property="og:title"
        content="Turn Your iPhone into a Remote Terminal for Your Mac — Completely Free and Open Source"
      />
      <meta
        property="og:description"
        content="SSH into your MacBook from your iPhone anywhere in the world using a-Shell, Tailscale, and tmux — a completely free, open-source remote terminal setup."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/turn-your-iphone-into-a-remote-terminal-for-your-mac-completely-free-and-open-source"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Turn Your iPhone into a Remote Terminal for Your Mac — Completely Free and Open Source"
          date="July 11, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Turn Your iPhone into a Remote Terminal for Your Mac Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            One of the nicest developer setups I've built recently costs
            absolutely nothing.
          </p>
          <p className="mb-4">
            With just three free tools, I can SSH into my MacBook from my iPhone
            anywhere in the world, close the app whenever I want, reopen it
            hours later, and continue exactly where I left off.
          </p>
          <p className="mb-4">The stack is surprisingly simple:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>
              <strong>a-Shell</strong> — a Unix-like shell environment for iOS
              that includes an SSH client
            </li>
            <li>
              <strong>Tailscale</strong> — a secure VPN that gives all your
              devices stable private IP addresses
            </li>
            <li>
              <strong>tmux</strong> — keeps terminal sessions alive even after
              disconnecting
            </li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Why This Setup?
          </h2>
          <p className="mb-4">
            I've never been used to remote control desktop with like AnyDesk, as
            I find the mobile UI to be too small and counter intuitive to use to
            control my macbook, plus mostly I can achieve everything in my
            terminal even faster with SSH:
          </p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Spin off an AI agent</li>
            <li>Check some git status</li>
            <li>Look for a file</li>
            <li>Run some quick script</li>
            <li>Hot fix something in my machine</li>
          </ul>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Prerequisite
          </h2>
          <p className="mb-4">
            You need to enable Remote Login (SSH) in macOS System Settings →
            General → Sharing before any of this works.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            The Three Components
          </h2>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            1. a-Shell
          </h3>
          <p className="mb-4">
            a-Shell is an open source iOS application that provides a Unix-like
            shell environment. (
            <a
              href="https://github.com/holzschu/a-shell"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              GitHub
            </a>
            )
          </p>
          <p className="mb-4">
            It includes an SSH client, allowing your iPhone to connect directly
            to remote machines. As a result, you can do:
          </p>
          <CodeBlock language="bash" code={`ssh user@ip`} />
          <p className="mb-4">To SSH into your machine.</p>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            2. Tailscale
          </h3>
          <p className="mb-4">
            Tailscale is an open source VPN service that enables SSH over the
            internet by providing a static IP. (
            <a
              href="https://github.com/tailscale/tailscale"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-blue-600"
            >
              GitHub
            </a>
            )
          </p>
          <p className="mb-4">
            After installing it on both your Mac and iPhone, each device
            receives a stable private IPv4 address.
          </p>
          <p className="mb-4">For example:</p>
          <CodeBlock
            language="text"
            code={`MacBook    100.81.42.15
iPhone     100.74.98.31`}
          />
          <p className="mb-4">Now, from your phone:</p>
          <CodeBlock language="bash" code={`ssh user@100.81.42.15`} />
          <p className="mb-4">That's it.</p>
          <p className="mb-4">
            Even if your home Wi-Fi changes or you're on LTE halfway across the
            country, your devices can still communicate securely through
            Tailscale.
          </p>

          <h3 className="font-serif text-2xl font-bold mt-8 mb-4 tracking-tight">
            3. Tmux
          </h3>
          <p className="mb-4">
            Tmux is a popular open source terminal multiplexer that makes the
            setup truly enjoyable by allowing persistent terminal sessions.
          </p>
          <p className="mb-4">Installing Tmux on macOS (using Homebrew):</p>
          <CodeBlock language="bash" code={`brew install tmux`} />
          <p className="mb-4">
            Normally, SSH sessions disappear the moment your connection drops.
          </p>
          <p className="mb-4">That happens a lot on mobile when:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>switching apps</li>
            <li>locking your phone</li>
            <li>iOS suspending background apps</li>
          </ul>
          <p className="mb-4">
            Without tmux, the terminal session would be terminated right as SSH
            dropped.
          </p>
          <p className="mb-4">
            However, with Tmux, you have the ability to create detached session:
          </p>
          <CodeBlock language="bash" code={`tmux new-session -d -s main`} />
          <p className="mb-4">
            This creates a detached session called "main", such that every time
            you want to go back to that session you can do that by executing:
          </p>
          <CodeBlock language="bash" code={`tmux attach -t main`} />
          <p className="mb-4">
            This reattaches the main session to the current terminal, preserving
            all progress.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Putting Everything Together
          </h2>
          <p className="mb-4">Your workflow becomes:</p>
          <CodeBlock
            language="text"
            code={`iPhone  │ a-Shell  │  SSH  │ Tailscale VPN  │ MacBook  │  tmux`}
          />
          <p className="mb-4">Connect:</p>
          <CodeBlock language="bash" code={`ssh user@ip`} />
          <p className="mb-4">Attach:</p>
          <CodeBlock language="bash" code={`tmux attach -t main`} />
          <p className="mb-4">Work normally.</p>
          <p className="mb-4">Close the iPhone app.</p>
          <p className="mb-4">Hours later:</p>
          <CodeBlock
            language="bash"
            code={`ssh user@ip
tmux attach -t main`}
          />
          <p className="mb-4">You're instantly back where you were.</p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            A Nice Quality-of-Life Improvement
          </h2>
          <p className="mb-4">
            You can make tmux start automatically whenever you SSH into your Mac.
          </p>
          <p className="mb-4">
            In your shell configuration (i.e.{" "}
            <InlineCode>~/.zshrc</InlineCode>):
          </p>
          <CodeBlock
            language="bash"
            code={`if [ -n "$SSH_CONNECTION" ] && [ -z "$TMUX" ]; then
    tmux attach -t main || tmux new -s main
fi`}
          />
          <p className="mb-4">
            Now every SSH login automatically reconnects to your persistent
            workspace.
          </p>
          <p className="mb-4">
            You never have to remember to type <InlineCode>tmux attach</InlineCode>{" "}
            again.
          </p>
          <BlogFooter url="https://medium.com/@yu.cao20041208/turn-your-iphone-into-a-remote-terminal-for-your-mac-completely-free-and-open-source-8a656f45e1be" />
        </article>
      </div>
    </>
  );
}
