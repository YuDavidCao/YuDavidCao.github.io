export function Footer() {
  return (
    <footer className="w-full flex justify-center py-4 mt-auto text-tx-primary dark:text-dark-tx-primary text-sm [box-shadow:0_-4px_16px_0_rgba(0,0,0,0.08)] dark:[box-shadow:0_-4px_16px_0_rgba(0,0,0,0.32)]">
      <span className="mr-2">&#169; {new Date().getFullYear()} Yu Cao</span>
      <a
        href="https://github.com/YuDavidCao"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-2 underline hover:text-accent dark:hover:text-accent"
      >
        GitHub
      </a>
    </footer>
  );
}
