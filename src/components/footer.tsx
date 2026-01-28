export function Footer() {
  return (
    <footer className="w-full flex flex-col items-center py-8 mt-auto border-t border-paper-dark dark:border-dark-paper-elevated">
      <div className="vintage-divider mb-4 w-24">
        <span className="flourish text-sm">✦</span>
      </div>
      <div className="flex items-center gap-4 text-sm text-ink-faded dark:text-dark-ink-faded font-body">
        <span>© {new Date().getFullYear()} David Cao</span>
        <span className="text-ink-muted dark:text-dark-ink-muted">·</span>
        <a
          href="https://github.com/YuDavidCao"
          target="_blank"
          rel="noopener noreferrer"
          className="link-vintage"
        >
          GitHub
        </a>
      </div>
    </footer>
  );
}
