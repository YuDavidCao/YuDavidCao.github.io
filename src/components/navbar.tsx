import { useEffect, useState } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contacts", label: "Contact" },
  { href: "/blogs", label: "Journal" },
];

export function NavBar() {
  const [theme, setTheme] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("theme");
    if (stored) {
      setTheme(stored);
    } else {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (theme === null) return;

    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const isDark = theme === "dark";

  return (
    <nav
      className={`w-full flex justify-center py-5 sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-paper/95 dark:bg-dark-paper/95 backdrop-blur-sm shadow-vintage dark:shadow-vintage-dark"
          : "bg-transparent"
      }`}
    >
      <div className="w-full max-w-4xl px-6 flex items-center justify-between">
        {/* Logo/Brand */}
        <a
          href="/"
          className="font-serif text-xl font-semibold text-ink dark:text-dark-ink hover:text-sepia dark:hover:text-dark-sepia transition-colors"
        >
          DC
        </a>

        {/* Navigation Links */}
        <ul className="flex gap-8 text-sm font-body text-ink-light dark:text-dark-ink-light">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="link-vintage py-2 text-ink-faded dark:text-dark-ink-faded hover:text-sepia dark:hover:text-dark-sepia transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 text-ink-muted dark:text-dark-ink-muted hover:text-sepia dark:hover:text-dark-sepia transition-colors"
          aria-label="Toggle light/dark mode"
          suppressHydrationWarning
        >
          {isDark ? (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
