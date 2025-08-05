import React, { useEffect, useState } from "react";
import { CiLight, CiDark } from "react-icons/ci";

export function NavBar() {
  const getInitialTheme = () => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) return stored;
      // If no stored theme, check <html> class (set by inline script)
      return document.documentElement.classList.contains("dark")
        ? "dark"
        : "light";
    }
    return "light";
  };

  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", theme);
      if (theme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <nav className="w-full flex justify-center shadow-md py-4 mb-8 bg-white dark:bg-dark-primary">
      <ul className="flex gap-8 text-sm md:text-base lg:text-lg font-semibold text-tx-primary dark:text-dark-tx-primary self-center pt-2">
        <li>
          <a
            href="/"
            className="hover:text-accent transition-colors text-tx-primary dark:text-dark-tx-primary"
          >
            Home
          </a>
        </li>
        <li>
          <a
            href="/projects"
            className="hover:text-accent transition-colors text-tx-primary dark:text-dark-tx-primary"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="/contacts"
            className="hover:text-accent transition-colors text-tx-primary dark:text-dark-tx-primary"
          >
            Contacts
          </a>
        </li>
        <li>
          <a
            href="/blogs"
            className="hover:text-accent transition-colors text-tx-primary dark:text-dark-tx-primary"
          >
            Blogs
          </a>
        </li>
      </ul>
      <button
        onClick={toggleTheme}
        className="self-center ml-8 px-3 py-1 mt-2 rounded border border-tertiary dark:border-dark-tertiary bg-primary dark:bg-dark-secondary text-tx-primary dark:text-dark-tx-primary transition-colors"
        aria-label="Toggle light/dark mode"
      >
        {theme === "light" ? <CiLight /> : <CiDark />}
      </button>
    </nav>
  );
}
