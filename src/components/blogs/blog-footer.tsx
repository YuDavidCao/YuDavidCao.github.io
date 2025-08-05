export interface IBlogFooterProps {
  url: string;
}

export function BlogFooter({ url }: IBlogFooterProps) {
  return (
    <footer className="mt-12 border-t pt-6 text-base text-tx-secondary text-center font-light italic dark:text-tx-tertiary dark:border-gray-700">
      <p>
        View on{" "}
        <a
          href={url}
          className="underline hover:text-blue-600 font-normal not-italic"
          target="_blank"
          rel="noopener noreferrer"
        >
          Medium
        </a>
        .
      </p>
    </footer>
  );
}
