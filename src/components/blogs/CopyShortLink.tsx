import { useEffect, useState } from "react";
import { FaCheck, FaRegClipboard } from "react-icons/fa6";

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "");
}

export function CopyShortLink() {
  const [shortUrl, setShortUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const href = document.querySelector<HTMLLinkElement>(
      'link[rel="shortlink"]',
    )?.href;
    if (href) setShortUrl(href);
  }, []);

  if (!shortUrl) return null;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setFailed(false);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
      setFailed(true);
      window.setTimeout(() => setFailed(false), 1600);
    }
  };

  const label = copied ? "Copied" : failed ? "Copy failed" : "Copy short link";

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="mt-1 inline-flex items-center gap-2 not-italic font-mono text-xs tracking-wide border border-current/25 rounded-sm px-2.5 py-1 hover:border-current/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      aria-label={`${label}: ${shortUrl}`}
    >
      {copied ? <FaCheck aria-hidden="true" /> : <FaRegClipboard aria-hidden="true" />}
      <span>{label}</span>
      <span className="opacity-70">{displayUrl(shortUrl)}</span>
    </button>
  );
}
