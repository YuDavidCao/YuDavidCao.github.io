import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { FaRegClipboard, FaCheck } from "react-icons/fa6";
import { useState, useEffect } from "react";

export interface ICodeBlockProps {
  language: string;
  code: string;
}

export function CodeBlock(props: ICodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkDark = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    checkDark();
    const observer = new MutationObserver(checkDark);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(props.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <div className="relative mb-4">
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 z-10 bg-primary/80 hover:bg-primary text-tx-primary border border-tertiary rounded px-2 py-1 flex items-center gap-1 text-xs shadow transition dark:bg-dark-bg/80 dark:hover:bg-dark-bg dark:text-dark-bg-tx-primary dark:border-dark-bg-hover"
        aria-label="Copy code"
        type="button"
      >
        {copied ? <FaCheck className="text-green-500" /> : <FaRegClipboard />}
        {copied ? "Copied!" : "Copy"}
      </button>
      <SyntaxHighlighter
        language={props.language}
        style={isDark ? oneDark : oneLight}
        className="rounded-lg text-base !mb-0"
        customStyle={{
          backgroundColor: isDark ? "#282a36" : "#f6f8fa",
        }}
      >
        {props.code}
      </SyntaxHighlighter>
    </div>
  );
}
