import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

const CodeBlock = ({ code, language = "tsx", showLineNumbers = false }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  return (
    <div className="docs-code-block relative group rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-[#111] my-6">
      <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
          aria-label="Copy to clipboard"
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
        </button>
      </div>
      <div className="overflow-x-auto p-4 text-sm font-mono leading-relaxed custom-scrollbar">
        <pre className="text-neutral-800 dark:text-neutral-200">
          <code>{code.trim()}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
