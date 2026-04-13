import { useState } from "react";

import { ChevronDownIcon } from "../../icons";
import type { AccordionProps } from "./types";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

const caret = (
  <ChevronDownIcon
    className="h-5 w-5 transition-transform duration-300"
    aria-hidden="true"
  />
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
              "rounded-xl border border-ds-border-2 bg-ds-surface-1 backdrop-blur-2xl transition-all duration-300",
              "hover:border-ds-border-1 hover:bg-ds-surface-2",
              // Ring highlight on open
              open && "ring-2 ring-ds-focus/40",
              separated ? "p-0" : "",
            )}
          >
            <button
              type="button"
              className={cx(
                "flex w-full items-center justify-between gap-4 px-5 py-4 rounded-xl transition-colors duration-200",
                "text-ds-1 hover:bg-ds-surface-2",
                separated ? "border-b border-ds-border-2" : "",
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
                <p className="text-base font-semibold text-ds-1">
                  {item.title}
                </p>
                {item.description && (
                  <p className="mt-0.5 text-sm text-ds-2">{item.description}</p>
                )}
              </div>
              <span
                className={cx(
                  "p-1.5 rounded-lg transition-all duration-300",
                  "bg-ds-surface-2 text-ds-2",
                  open && "rotate-180 bg-ds-accent-subtle text-ds-1",
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
              <div className="px-5 pb-5 pt-2 text-sm leading-relaxed text-ds-2">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
