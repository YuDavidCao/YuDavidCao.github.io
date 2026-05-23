import { BlogFooter } from "../../blogs/blog-footer";
import { BlogHeader } from "../../blogs/BlogHeader";

const heroImg = "/reflections-from-pycon-us-2026/hero.png";

export function ReflectionsFromPyconUs2026() {
  return (
    <>
      <title>Reflections from PyCon US 2026</title>
      <meta
        name="description"
        content="Reflections from my first PyCon US — volunteering, GPU tiling, AI economics, Python's generational garbage collector, Pablo Galindo's 'cathedral' keynote, and the 'Silence is Gold' lightning talk."
      />
      <meta property="og:title" content="Reflections from PyCon US 2026" />
      <meta
        property="og:description"
        content="Reflections from my first PyCon US — volunteering, GPU tiling, AI economics, Python's generational garbage collector, Pablo Galindo's 'cathedral' keynote, and the 'Silence is Gold' lightning talk."
      />
      <link
        rel="canonical"
        href="https://yudavidcao.github.io/blog/reflections-from-pycon-us-2026"
      />
      <div className="w-3/5 flex gap-4 text-xl rounded-lg py-4 flex-col font-sans dark:bg-dark-primary dark:text-dark-tx-primary">
        <BlogHeader
          title="Reflections from PyCon US 2026"
          date="May 20, 2026"
          heroImgSrc={heroImg}
          heroImgAlt="Reflections from PyCon US 2026 Hero"
        />
        <article className="prose prose-lg max-w-none font-sans dark:prose-invert">
          <p className="mb-4">
            I attended PyCon US 2026 last week, and as my first ever conference,
            it definitely set a high.
          </p>
          <p className="mb-4">
            Beyond the talks themselves, one of the best parts was simply
            meeting people. I got to talk with developers, maintainers,
            students, educators, and engineers from all kinds of backgrounds.
            There's something really refreshing about being surrounded by people
            who genuinely enjoy building things and sharing knowledge. The
            atmosphere felt incredibly welcoming, and I had a lot of fun
            throughout the conference.
          </p>
          <p className="mb-4">
            One thing I realized afterward is that next time, I want to spend
            even more time attending Open Spaces. Some of the most memorable
            conversations and ideas came from those smaller, informal
            discussions rather than the scheduled talks.
          </p>
          <p className="mb-4">
            Below are some concrete takeaways from PyCon 2026:
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Volunteering at PyCon
          </h2>
          <p className="mb-4">
            One of my most meaningful experiences at PyCon US 2026 was
            volunteering at the conference.
          </p>
          <p className="mb-4">
            I was volunteering at the registration desk, where I got to welcome
            attendees as they arrived, help people check in, answer questions,
            and generally be one of the first interactions people had when they
            stepped into PyCon. Through that, I got to meet a lot of people.
          </p>
          <p className="mb-4">
            There was also something genuinely satisfying about contributing in
            a direct, tangible way to the conference running smoothly. It made
            me feel more connected to the event as a whole — not just as an
            attendee, but as part of the infrastructure behind it. It's one of
            the best ways to experience the community firsthand.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Python and GPU Programming
          </h2>
          <p className="mb-4">
            One of the sponsor presentations that really stood out to me was
            NVIDIA's session on GPU tiling. Before attending PyCon, I mostly
            associated Python with backend development, scripting, machine
            learning orchestration, and general productivity tooling. But seeing
            how much work is happening around GPU programming was eye-opening.
          </p>
          <p className="mb-4">
            The concept of GPU tiling itself was fascinating. It involves
            breaking workloads (mostly data) into smaller tiled computations to
            maximize memory locality and GPU efficiency. It was one of those
            talks that reminded me how Python increasingly acts as the interface
            layer to extremely high-performance systems underneath.
          </p>
          <p className="mb-4">
            It also reinforced something I've been noticing recently:{" "}
            <strong>
              Python is no longer just a scripting language. It has become a
              bridge to other industries and domains as well.
            </strong>
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            AI Costs and the Current Reality
          </h2>
          <p className="mb-4">
            Another takeaway I kept thinking about throughout the conference was
            around AI economics.
          </p>
          <p className="mb-4">
            A point that came up in discussions was that current token pricing
            is still heavily subsidized by capital. In other words, the cost
            developers pay today for large-scale AI usage may not reflect the
            true long-term economics of these systems.
          </p>
          <p className="mb-4">
            That has interesting implications. Many products and workflows
            currently assume cheap and abundant inference. But if pricing
            changes significantly in the future, we may see a renewed focus on
            optimization, smaller models, local inference, caching, and more
            efficient architectures.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Python's Generational Garbage Collector
          </h2>
          <p className="mb-4">
            I also attended a talk discussing Python's generational garbage
            collector, which I found surprisingly interesting.
          </p>
          <p className="mb-4">
            The core idea is elegant and brilliant: <em>most objects die young</em>.
            Therefore, instead of treating all objects equally, Python organizes
            them into generations and spends more effort scanning older objects
            less frequently. That design helps reduce unnecessary work and
            improves performance overall. I will be writing a separate blog
            post on this later.
          </p>
          <p className="mb-4">
            It reminded me how easy it is to take that abstraction for granted.
            Python often feels simple and high level, but the amount of
            engineering put into it is easy to overlook. Talks like this made me
            appreciate those invisible layers much more.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Open Source and the "Cathedral"
          </h2>
          <p className="mb-4">
            One of the most memorable moments from the conference was Pablo
            Galindo Salgado's keynote.
          </p>
          <p className="mb-4">He referenced a passage by Javier Pascual:</p>
          <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-6 my-6 italic text-tx-secondary dark:text-tx-tertiary">
            <p className="mb-4">
              "I am working with my brother. I am working with the man who
              taught me. I am working with the boy I am teaching.
            </p>
            <p className="mb-4">
              The cathedral above us is made of stone. It will stand for a
              thousand years and forget our names by the second. But there is
              another cathedral, here on this scaffold, built of nothing but the
              four of us. It has no walls a stranger could touch. It has no
              doors a pilgrim could enter.
            </p>
            <p className="mb-0">
              And when the last of us is gone, it will be gone with us, as if it
              had never been. I came back this morning to add another stone to
              it."
            </p>
          </blockquote>
          <p className="mb-4">
            That metaphor stayed with me for the rest of the conference.
          </p>
          <p className="mb-4">
            Open source often feels exactly like that cathedral. Most
            contributions are small — a bug fix, a documentation improvement,
            answering an issue, reviewing code, or helping another developer
            understand something. Individually, those actions can seem
            insignificant. But together, they become part of a massive software
            ecosystem that countless people rely on.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            AI and Open Source
          </h2>
          <p className="mb-4">
            Another important point from the keynote was the impact AI is
            having on open source maintenance.
          </p>
          <p className="mb-4">
            Many OSS maintainers are now dealing with large volumes of
            AI-generated pull requests and issues. While AI can absolutely help
            people learn and contribute, low-quality autogenerated contributions
            can also create significant maintenance burden.
          </p>
          <p className="mb-4">
            That resonated with me because it highlights a tension in modern
            software development: AI lowers the barrier to generating code, but
            maintainership still requires responsibility, understanding,
            communication, and care.
          </p>
          <p className="mb-4">
            Open source is fundamentally built on{" "}
            <strong>trust between people</strong>, not just code generation.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            "Silence Is Gold"
          </h2>
          <p className="mb-4">
            One topic from the lightning talks that really stayed with me was:
          </p>
          <p className="mb-4">
            <em>"Silence is gold."</em>
          </p>
          <p className="mb-4">
            At PyCon US 2026, there's something called the "Pac-Man Rule." When
            a group of people is talking, they should intentionally stand in a
            Pac-Man shape with an opening in the circle. That opening signals
            that anyone is welcome to join the conversation.
          </p>
          <p className="mb-4">
            What I found interesting was hearing the extension of this idea
            beyond physical space and into conversation itself.
          </p>
          <p className="mb-4">
            Sometimes, pausing before speaking creates an opening for someone
            else to contribute — especially people who may be quieter or unsure
            about interrupting. In that sense, silence becomes the
            conversational equivalent of the Pac-Man Rule: intentionally leaving
            space for others to enter.
          </p>
          <p className="mb-4">
            I thought that was a really beautiful idea, as I have first-hand
            experience where other people are deep into a conversation and it's
            difficult for me to chime in even if I believe I have a noteworthy
            point.
          </p>
          <p className="mb-4">
            That mindset felt deeply connected to the overall spirit of the
            conference: collaborative, welcoming, and built around making room
            for others.
          </p>

          <h2 className="font-serif text-3xl font-bold mt-10 mb-4 tracking-tight">
            Final Thoughts
          </h2>
          <p className="mb-4">
            PyCon reminded me that Python is much bigger than just a programming
            language.
          </p>
          <p className="mb-4">
            It's a community, an ecosystem, and a collective effort built over
            decades by people contributing small pieces over time. Whether it's
            GPU programming, runtime internals, AI discussions, or
            conversations in hallway tracks and Open Spaces, the conference
            constantly reinforced how interconnected everything is.
          </p>
          <p className="mb-4">
            I left with a lot of new ideas, a lot of inspiration, and a lot of
            appreciation for the people behind the tools we use every day.
          </p>
          <p className="mb-4">I'll definitely be at PyCon again next year.</p>
        </article>
        <BlogFooter url="https://medium.com/p/571a2737d98f" />
      </div>
    </>
  );
}
