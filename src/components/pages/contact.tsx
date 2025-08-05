import { FaGithub } from "react-icons/fa6";
import { FaMedium } from "react-icons/fa6";
import { BiLogoLinkedin } from "react-icons/bi";
import emailjs from "@emailjs/browser";
import { useState } from "react";

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
          setLoading(false);
        },
        (error) => {
          setLoading(false);
          console.error(error);

          alert("Ahh, something went wrong. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center py-[100px] text-tx-primary dark:text-dark-tx-primary min-h-screen">
      <h1 className="text-3xl font-bold mb-10 dark:text-dark-tx-primary text-tx-primary">
        Contact Me
      </h1>
      <div className="w-3/5 flex flex-col gap-4 text-xl items-center justify-center text-center dark:text-dark-tx-secondary text-tx-secondary">
        <p>
          I'm always open to discussing new projects, creative ideas, or
          opportunities to be part of your visions. Feel free to reach out
          through the form below or connect with me on social media.
        </p>
        <form
          className="flex flex-col w-[300px] sm:w-[360px] md:w[480px] lg:w-[600px] items-center justify-center gap-4 m-10"
          onSubmit={handleSubmit}
        >
          <label className="flex flex-col flex-1 w-full">
            <input
              placeholder="Your Name"
              className="form-input w-full rounded-lg bg-primary border border-tertiary text-tx-primary placeholder-tx-tertiary h-14 p-4 text-base font-normal focus:outline-none focus:ring-0 focus:border-tertiary dark:bg-dark-primary dark:border-dark-tertiary dark:text-dark-tx-primary dark:placeholder-dark-tx-tertiary"
              name="name"
            />
          </label>
          <label className="flex flex-col flex-1 w-full">
            <input
              placeholder="Your Email"
              className="form-input w-full rounded-lg bg-primary border border-tertiary text-tx-primary placeholder-tx-tertiary h-14 p-4 text-base font-normal focus:outline-none focus:ring-0 focus:border-tertiary dark:bg-dark-primary dark:border-dark-tertiary dark:text-dark-tx-primary dark:placeholder-dark-tx-tertiary"
              name="email"
            />
          </label>
          <label className="flex flex-col flex-1 w-full">
            <textarea
              placeholder="Your Message"
              className="form-input w-full rounded-lg bg-primary border border-tertiary text-tx-primary placeholder-tx-tertiary min-h-36 p-4 text-base font-normal focus:outline-none focus:ring-0 focus:border-tertiary resize-none dark:bg-dark-primary dark:border-dark-tertiary dark:text-dark-tx-primary dark:placeholder-dark-tx-tertiary"
              name="message"
            ></textarea>
          </label>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary text-tx-primary px-4 pt-3 pb-2 rounded-lg hover:bg-tertiary transition-colors text-sm font-bold dark:bg-dark-bg dark:text-dark-bg-tx-primary dark:hover:bg-dark-bg-hover"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
        <h2 className="text-2xl font-bold dark:text-dark-tx-primary text-tx-primary">
          Connect with me on social media
        </h2>
        <div className="flex gap-4 items-center justify-center">
          <div
            className="flex flex-col items-center justify-center gap-2 hover:text-tx-secondary transition-colors cursor-pointer dark:hover:text-dark-tx-tertiary"
            onClick={() =>
              window.open("https://github.com/YuDavidCao", "_blank")
            }
          >
            <div className="bg-secondary rounded-full p-4 m-2 dark:bg-dark-secondary">
              <FaGithub className="w-6 h-6 dark:text-dark-tx-primary text-tx-primary" />
            </div>
            <span className="text-sm dark:text-dark-tx-primary text-tx-primary">
              Github
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2 hover:text-tx-secondary transition-colors cursor-pointer dark:hover:text-dark-tx-tertiary"
            onClick={() =>
              window.open("https://www.linkedin.com/in/yu-david-cao/", "_blank")
            }
          >
            <div className="bg-secondary rounded-full p-4 m-2 dark:bg-dark-secondary">
              <BiLogoLinkedin className="w-6 h-6 dark:text-dark-tx-primary text-tx-primary" />
            </div>
            <span className="text-sm dark:text-dark-tx-primary text-tx-primary">
              LinkedIn
            </span>
          </div>
          <div
            className="flex flex-col items-center justify-center gap-2 hover:text-tx-secondary transition-colors cursor-pointer dark:hover:text-dark-tx-tertiary"
            onClick={() =>
              window.open("https://medium.com/@yu.cao20041208", "_blank")
            }
          >
            <div className="bg-secondary rounded-full p-4 m-2 dark:bg-dark-secondary">
              <FaMedium className="w-6 h-6 dark:text-dark-tx-primary text-tx-primary" />
            </div>
            <span className="text-sm dark:text-dark-tx-primary text-tx-primary">
              Medium
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
