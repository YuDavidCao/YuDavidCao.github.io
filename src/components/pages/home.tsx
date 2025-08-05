import Typewriter from "typewriter-effect";

export function HomePage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[100px] text-tx-primary dark:text-dark-tx-primary min-h-screen">
      <img
        src="/profile.png"
        alt="profile"
        className="md:w-1/5 w-2/5 rounded-full mb-10"
        loading="lazy"
      />
      <div className="mb-10">
        <h1 className="text-4xl font-bold dark:text-dark-tx-primary text-tx-primary">
          <Typewriter
            options={{
              autoStart: true,
              loop: false,
              delay: 50,
            }}
            onInit={(typewriter) => {
              typewriter.typeString("Hi, I'm David Cao.").start();
            }}
          />
        </h1>
      </div>
      <p className="w-3/5 flex flex-col gap-4 text-xl mb-4 dark:text-dark-tx-secondary text-tx-secondary">
        <span>
          I am a second year CS student at the University of Virginia. I like
          making softwares solutions. My most familar tech stack together:
        </span>
      </p>
      <ul className="list-disc pl-4 w-3/5 mb-4 text-xl dark:text-dark-tx-secondary text-tx-secondary">
        <li>Backend: NestJs + Prisma + Typescript</li>
        <li>Frontend: React + TailwindCss</li>
        <li>Mobile: Flutter/dart</li>
      </ul>
      <p className="w-3/5 flex flex-col gap-4 text-xl dark:text-dark-tx-secondary text-tx-secondary">
        <span>
          I also have worked with Nextjs, Django, Flask, Firebase, MongoDB,
          Tensorflow.
        </span>
        <span>
          In my free time, I like to play games, write blog posts, read books,
          and draw.
        </span>
      </p>
    </div>
  );
}
