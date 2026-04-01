import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { CheckIcon, ChevronDownIcon, CloseIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";

export interface MultiSelectOption {
  label: string;
  value: string;
}

export interface MultiSelectComboboxProps {
  options: MultiSelectOption[];
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  className?: string;
  bgClassName?: string;
}

const MultiSelectCombobox: React.FC<MultiSelectComboboxProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  className,
  bgClassName = "bg-background-secondary",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = 100;

  // Filter options by search
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  const handleOptionClick = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onChange(value.filter((v) => v !== optionValue));
    } else {
      onChange([...value, optionValue]);
    }
  };

  const handleRemoveTag = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((v) => v !== optionValue));
  };

  const selectedLabels = value
    .map((v) => options.find((opt) => opt.value === v)?.label)
    .filter(Boolean);

  return (
    <div
      ref={ref}
      className={mergeClassNames("relative w-full", className)}
      tabIndex={0}
    >
      <motion.div
        style={{
          backgroundImage: useMotionTemplate`
            radial-gradient(
              ${visible ? `${radius}px` : "0px"} circle at ${mouseX}px ${mouseY}px,
              var(--ds-color-accent),
              transparent 90%
            )
          `,
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        className="group/multi-combobox rounded-lg border-border p-[2px] transition duration-300 hover:border-accent"
      >
        <div
          className={mergeClassNames(
            "shadow-input flex min-h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input px-3 py-2 text-sm text-foreground transition duration-400 ease-in-out group-hover/multi-combobox:shadow-none",
            bgClassName,
          )}
          onClick={() => {
            setOpen((o) => {
              if (o) setSearch("");
              return !o;
            });
          }}
        >
          <div className="flex flex-1 flex-wrap gap-1">
            {selectedLabels.length > 0 ? (
              selectedLabels.map((label, index) => (
                <span
                  key={value[index]}
                  className="inline-flex items-center gap-1 rounded-md bg-accent-subtle px-2 py-0.5 text-xs font-medium text-accent"
                >
                  {label}
                  <button
                    type="button"
                    onClick={(e) => handleRemoveTag(value[index], e)}
                    className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-accent/10"
                  >
                    <CloseIcon className="w-3 h-3" aria-hidden="true" />
                  </button>
                </span>
              ))
            ) : (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
          </div>
          <span
            className={mergeClassNames(
              "ml-2 shrink-0 text-muted-foreground transition-transform duration-300",
              open ? "rotate-180" : "rotate-0",
            )}
          >
            <ChevronDownIcon
              width={24}
              height={24}
              color="currentColor"
              className="h-5 w-5"
            />
          </span>
        </div>
      </motion.div>
      {open && (
        <div className="absolute right-0 left-0 z-20 mt-1 flex max-h-60 flex-col rounded-lg border border-border bg-background-secondary shadow-3 backdrop-blur-xl transition">
          {/* Sticky search input */}
          <div className="sticky top-0 z-10 rounded-t-lg border-b border-border-muted bg-elevated/95 backdrop-blur-sm">
            <input
              autoFocus
              className="w-full bg-transparent px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent"
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {/* Scrollable options */}
          <div className="max-h-80 flex-1 overflow-auto">
            {filteredOptions.length === 0 && (
              <div className="p-3 text-center text-muted-foreground text-sm">
                No options found
              </div>
            )}
            {filteredOptions.map((option) => {
              const isSelected = value.includes(option.value);
              return (
                <div
                  key={option.value}
                  className={mergeClassNames(
                    "flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition",
                    isSelected
                      ? "bg-accent-subtle text-accent"
                      : "text-foreground hover:bg-accent hover:text-on-accent",
                  )}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <span
                    className={mergeClassNames(
                      "flex h-4 w-4 items-center justify-center rounded border transition",
                      isSelected
                        ? "border-accent bg-accent text-on-accent"
                        : "border-border",
                    )}
                  >
                    {isSelected && <CheckIcon width={12} height={12} />}
                  </span>
                  <span className="flex-1">{option.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelectCombobox;
