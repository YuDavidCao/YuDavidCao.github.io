import { useState, useEffect } from "react";
import { FadeIn } from "../effects/FadeIn";

export function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-24">
        <div className="text-center">
          <img
            src="/profile.png"
            alt="profile"
            className="w-32 h-32 rounded-full mx-auto mb-8 border-4 border-paper-dark dark:border-dark-paper-elevated"
          />
          <h1 className="font-serif text-4xl md:text-5xl font-semibold text-ink dark:text-dark-ink">
            David Cao
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center py-24 px-6">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 text-ink-muted/20 dark:text-dark-ink-muted/20 text-8xl font-serif select-none hidden lg:block">
        "
      </div>
      <div className="absolute bottom-20 right-10 text-ink-muted/20 dark:text-dark-ink-muted/20 text-8xl font-serif select-none hidden lg:block rotate-180">
        "
      </div>

      <div className="max-w-2xl mx-auto text-center">
        <FadeIn direction="none" duration={0.8}>
          <img
            src="/profile.png"
            alt="profile"
            className="w-36 h-36 rounded-full mx-auto mb-8 border-4 border-paper-dark dark:border-dark-paper-elevated shadow-vintage dark:shadow-vintage-dark"
            loading="eager"
          />
        </FadeIn>

        <FadeIn direction="up" delay={0.2}>
          <p className="text-ink-muted dark:text-dark-ink-muted text-sm uppercase tracking-[0.2em] mb-4 font-mono">
            Software Developer
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.3}>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold text-ink dark:text-dark-ink mb-6">
            David Cao
          </h1>
        </FadeIn>

        <FadeIn direction="up" delay={0.4}>
          <div className="vintage-divider mb-8">
            <span className="flourish">❧</span>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.5}>
          <p className="text-lg text-ink-light dark:text-dark-ink-light leading-relaxed mb-8 font-body">
            A second year Computer Science student at the University of Virginia,
            passionate about crafting elegant software solutions.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.6}>
          <div className="mb-10">
            <p className="text-sm text-ink-faded dark:text-dark-ink-faded mb-4 uppercase tracking-wider">
              Specializing in
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "NestJS",
                "React",
                "TypeScript",
                "Flutter",
                "Prisma",
                "TailwindCSS",
              ].map((tech) => (
                <span key={tech} className="tag-vintage">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.7}>
          <p className="text-ink-faded dark:text-dark-ink-faded mb-10 italic font-body">
            Also experienced with Next.js, Django, Flask, Firebase, MongoDB, and TensorFlow.
          </p>
        </FadeIn>

        <FadeIn direction="up" delay={0.8}>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/projects"
              className="btn-vintage text-ink dark:text-dark-ink"
            >
              View My Work
            </a>
            <a
              href="/blogs"
              className="btn-vintage text-ink dark:text-dark-ink"
            >
              Read Journal
            </a>
          </div>
        </FadeIn>

        <FadeIn direction="up" delay={0.9}>
          <p className="mt-16 text-ink-muted dark:text-dark-ink-muted text-sm font-body italic">
            "In my free time, I enjoy gaming, writing, reading, and drawing."
          </p>
        </FadeIn>
      </div>
    </div>
  );
}
