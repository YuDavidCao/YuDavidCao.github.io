import { FaGithub } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { BiLogoLinkedin } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import { useState } from "react";
import { FadeIn } from "../effects/FadeIn";

export function ContactsPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target as HTMLFormElement;

    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const message = (form.elements.namedItem("message") as HTMLTextAreaElement)
      .value;

    emailjs
      .send(
        "service_xqvijuu",
        "template_eielc8j",
        {
          from_name: name,
          to_name: "Yu Cao",
          from_email: email,
          to_email: "yu.cao20041208@gmail.com",
          message: message,
        },
        "YBGJy-chHKuHb6mZ7"
      )
      .then(
        () => {
          setLoading(false);
          alert("Thank you. I will get back to you as soon as possible.");
          form.reset();
        },
        (error) => {
          setLoading(false);
          alert("Ahh, something went wrong. Please try again.");
        }
      );
  };

  return (
    <div className="w-full flex flex-col items-center justify-center py-24 px-6 min-h-screen">
      <FadeIn direction="up">
        <p className="text-ink-muted dark:text-dark-ink-muted text-sm uppercase tracking-[0.2em] mb-4 font-mono text-center">
          Get in Touch
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.1}>
        <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink dark:text-dark-ink mb-4 text-center">
          Correspondence
        </h1>
      </FadeIn>

      <FadeIn direction="up" delay={0.2}>
        <div className="vintage-divider mb-8 w-48">
          <span className="flourish">✉</span>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.3}>
        <p className="max-w-xl text-center text-ink-faded dark:text-dark-ink-faded font-body mb-10">
          I'm always open to discussing new projects, creative ideas, or
          opportunities. Feel free to reach out through the form below or
          connect with me on social media.
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.4} className="w-full max-w-md">
        <form
          className="flex flex-col gap-4 mb-12"
          onSubmit={handleSubmit}
        >
          <input
            placeholder="Your Name"
            className="w-full rounded-sm bg-paper-light dark:bg-dark-paper-light border border-paper-dark dark:border-dark-paper-elevated text-ink dark:text-dark-ink placeholder-ink-muted dark:placeholder-dark-ink-muted h-12 px-4 text-sm font-body transition-all duration-200 focus:border-sepia dark:focus:border-dark-sepia focus:outline-none"
            name="name"
            required
          />
          <input
            placeholder="Your Email"
            type="email"
            className="w-full rounded-sm bg-paper-light dark:bg-dark-paper-light border border-paper-dark dark:border-dark-paper-elevated text-ink dark:text-dark-ink placeholder-ink-muted dark:placeholder-dark-ink-muted h-12 px-4 text-sm font-body transition-all duration-200 focus:border-sepia dark:focus:border-dark-sepia focus:outline-none"
            name="email"
            required
          />
          <textarea
            placeholder="Your Message"
            className="w-full rounded-sm bg-paper-light dark:bg-dark-paper-light border border-paper-dark dark:border-dark-paper-elevated text-ink dark:text-dark-ink placeholder-ink-muted dark:placeholder-dark-ink-muted min-h-36 p-4 text-sm font-body transition-all duration-200 focus:border-sepia dark:focus:border-dark-sepia focus:outline-none resize-none"
            name="message"
            required
          ></textarea>
          <button
            type="submit"
            disabled={loading}
            className="btn-vintage text-ink dark:text-dark-ink w-full disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </FadeIn>

      <FadeIn direction="up" delay={0.5}>
        <div className="vintage-divider mb-8 w-32">
          <span className="text-ink-muted dark:text-dark-ink-muted text-xs">or</span>
        </div>
      </FadeIn>

      <FadeIn direction="up" delay={0.6}>
        <p className="text-sm text-ink-faded dark:text-dark-ink-faded uppercase tracking-wider mb-6 font-mono">
          Connect on Social Media
        </p>
      </FadeIn>

      <FadeIn direction="up" delay={0.7}>
        <div className="flex gap-8 items-center justify-center">
          <a
            href="https://github.com/YuDavidCao"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="p-4 border border-paper-dark dark:border-dark-paper-elevated rounded-full transition-all duration-300 group-hover:border-sepia dark:group-hover:border-dark-sepia group-hover:bg-paper-dark dark:group-hover:bg-dark-paper-elevated">
              <FaGithub className="w-5 h-5 text-ink-faded dark:text-dark-ink-faded group-hover:text-sepia dark:group-hover:text-dark-sepia transition-colors" />
            </div>
            <span className="text-xs font-mono text-ink-muted dark:text-dark-ink-muted uppercase tracking-wider">
              GitHub
            </span>
          </a>
          <a
            href="https://www.linkedin.com/in/yu-david-cao/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="p-4 border border-paper-dark dark:border-dark-paper-elevated rounded-full transition-all duration-300 group-hover:border-sepia dark:group-hover:border-dark-sepia group-hover:bg-paper-dark dark:group-hover:bg-dark-paper-elevated">
              <BiLogoLinkedin className="w-5 h-5 text-ink-faded dark:text-dark-ink-faded group-hover:text-sepia dark:group-hover:text-dark-sepia transition-colors" />
            </div>
            <span className="text-xs font-mono text-ink-muted dark:text-dark-ink-muted uppercase tracking-wider">
              LinkedIn
            </span>
          </a>
          <a
            href="https://medium.com/@yu.cao20041208"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 group"
          >
            <div className="p-4 border border-paper-dark dark:border-dark-paper-elevated rounded-full transition-all duration-300 group-hover:border-sepia dark:group-hover:border-dark-sepia group-hover:bg-paper-dark dark:group-hover:bg-dark-paper-elevated">
              <FaMedium className="w-5 h-5 text-ink-faded dark:text-dark-ink-faded group-hover:text-sepia dark:group-hover:text-dark-sepia transition-colors" />
            </div>
            <span className="text-xs font-mono text-ink-muted dark:text-dark-ink-muted uppercase tracking-wider">
              Medium
            </span>
          </a>
        </div>
      </FadeIn>
    </div>
  );
}
