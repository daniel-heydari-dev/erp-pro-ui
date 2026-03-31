import { useState } from "react";
import type { AccordionProps } from "./types";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

const caret = (
  <svg
    className="h-5 w-5 transition-transform duration-300"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path
      d="M6 9l6 6 6-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const Accordion = ({
  items,
  type = "single",
  defaultOpenIds = type === "single" && items.length ? [items[0].id] : [],
  value,
  onValueChange,
  className = "",
  separated = false,
}: AccordionProps) => {
  const [internalOpen, setInternalOpen] = useState<string[]>(defaultOpenIds);
  const controlled = Array.isArray(value);
  const openItems = controlled ? value! : internalOpen;

  const toggleItem = (id: string) => {
    let next: string[];
    const isOpen = openItems.includes(id);

    if (type === "single") {
      next = isOpen ? [] : [id];
    } else {
      next = isOpen
        ? openItems.filter((openId) => openId !== id)
        : [...openItems, id];
    }

    if (!controlled) {
      setInternalOpen(next);
    }
    onValueChange?.(next);
  };

  return (
    <div className={cx("space-y-3", className)}>
      {items.map((item) => {
        const open = openItems.includes(item.id);
        return (
          <div
            key={item.id}
            className={cx(
              // Glass effect base
              "rounded-xl backdrop-blur-2xl transition-all duration-300",
              // Light mode glass
              "bg-white/60 border border-white/40 shadow-lg shadow-neutral-200/50",
              // Dark mode glass
              "dark:bg-neutral-900/50 dark:border-white/10 dark:shadow-neutral-950/50",
              // Hover effects
              "hover:bg-white/80 hover:shadow-xl hover:border-white/60",
              "dark:hover:bg-neutral-800/60 dark:hover:border-white/20",
              // Ring highlight on open
              open && "ring-2 ring-primary/30 dark:ring-primary/20",
              separated ? "p-0" : "",
            )}
          >
            <button
              type="button"
              className={cx(
                "flex w-full items-center justify-between gap-4 px-5 py-4 rounded-xl transition-colors duration-200",
                // Text colors
                "text-neutral-700 dark:text-neutral-200",
                // Hover state
                "hover:bg-white/40 dark:hover:bg-white/5",
                separated
                  ? "border-b border-neutral-200/50 dark:border-white/10"
                  : "",
                item.disabled
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer",
              )}
              aria-expanded={open}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-trigger`}
              onClick={() => !item.disabled && toggleItem(item.id)}
              disabled={item.disabled}
            >
              <div className="text-left flex-1">
                <p className="text-base font-semibold text-neutral-900 dark:text-white">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    {item.description}
                  </p>
                )}
              </div>
              <span
                className={cx(
                  "p-1.5 rounded-lg transition-all duration-300",
                  "bg-neutral-100/80 dark:bg-white/10",
                  "text-neutral-600 dark:text-neutral-300",
                  open &&
                    "rotate-180 bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-400",
                )}
              >
                {caret}
              </span>
            </button>
            <div
              id={`${item.id}-content`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              className={cx(
                "overflow-hidden transition-all duration-300 ease-in-out",
                open ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0",
              )}
            >
              <div className="px-5 pb-5 pt-2 text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
