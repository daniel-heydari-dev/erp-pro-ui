import { AnimatePresence, motion } from "framer-motion";
import { Button } from "erp-pro-ui";
import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({
  code,
  language = "tsx",
  showLineNumbers = false,
}: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="docs-code-block group relative my-6 overflow-hidden rounded-xl border border-neutral-200 bg-neutral-50 dark:border-neutral-800 dark:bg-[#111]">
      <div className="absolute top-3 right-3 z-10 opacity-0 transition-opacity group-hover:opacity-100">
        <Button
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          className={`h-8 w-8 px-0 py-0 shadow-none ${
            copied
              ? "border-emerald-200 bg-emerald-50 text-emerald-600 hover:bg-emerald-50 hover:opacity-100 dark:border-emerald-500/40 dark:bg-emerald-500/10 dark:text-emerald-300 dark:hover:bg-emerald-500/10"
              : "border-neutral-200 bg-white text-neutral-500 hover:bg-white hover:text-neutral-900 hover:opacity-100 dark:border-neutral-700 dark:bg-neutral-800 dark:hover:bg-neutral-800 dark:hover:text-white"
          }`}
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.svg
                key="check"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-500"
              >
                <polyline points="20 6 9 17 4 12" />
              </motion.svg>
            ) : (
              <motion.svg
                key="copy"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </motion.svg>
            )}
          </AnimatePresence>
        </Button>
      </div>
      <div className="custom-scrollbar overflow-x-auto p-4 font-mono text-sm leading-relaxed">
        <pre className="text-neutral-800 dark:text-neutral-200">
          <code data-language={language} data-line-numbers={showLineNumbers}>
            {code.trim()}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
