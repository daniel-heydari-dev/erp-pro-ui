import { CheckIcon, ChevronDownIcon } from "../../icons";
import React, { useEffect, useRef, useState } from "react";
import { mergeClassNames } from "../../../utils"

export interface ComboboxOption {
  label: string;
  value: string;
}

interface ComboboxProps {
  options: ComboboxOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  bgClassName?: string;
  createOptionLabel?: string;
  onCreateOption?: () => void;
}

const Combobox: React.FC<ComboboxProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  bgClassName = "bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl",
  createOptionLabel,
  onCreateOption,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  // Filter options by search
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
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

  return (
    <div
      ref={ref}
      className={mergeClassNames("relative w-full", className)}
      tabIndex={0}
    >
      <div
        className={mergeClassNames(
          "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-black/5 dark:border-white/10 px-3 py-2 text-sm text-foreground transition focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-sm",
          bgClassName,
          "hover:bg-white/60 dark:hover:bg-white/10"
        )}
        onClick={() => {
          setOpen((o) => {
            if (o) setSearch(""); // Reset search when closing
            return !o;
          });
        }}
      >
        {value ? (
          <span className="text-foreground dark:text-white flex-1 truncate">
            {options.find((opt) => opt.value === value)?.label}
          </span>
        ) : (
          <span className="text-muted-foreground flex-1">
            {placeholder}
          </span>
        )}
        <span
          className={mergeClassNames(
            "ml-2 transition-transform duration-300",
            open ? "rotate-180" : "rotate-0"
          )}
        >
          <ChevronDownIcon width={24} height={24} color="#a1a1a1" />
        </span>
      </div>
      {open && (
        <div className="absolute right-0 left-0 z-20 mt-1 flex max-h-60 flex-col rounded-md border border-white/20 dark:border-white/10 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-xl shadow-xl transition">
          {/* Sticky search input */}
          <div className="sticky top-0 z-10 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-t-md">
            <input
              autoFocus
              className="w-full border-b border-white/20 dark:border-white/10 bg-transparent px-3 py-2 text-sm text-foreground dark:text-white outline-none placeholder:text-muted-foreground"
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          {/* Scrollable options */}
          <div className="max-h-80 flex-1 overflow-auto">
            {filteredOptions.length === 0 && !createOptionLabel && (
              <div className="px-3 py-2 text-muted-foreground">
                No options
              </div>
            )}
            {filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={mergeClassNames(
                  "mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground dark:text-white transition",
                  opt.value === value
                    ? "bg-primary/20 font-semibold"
                    : "",
                  "hover:bg-primary hover:text-white"
                )}
                onClick={() => {
                  onChange(opt.value);
                  setSearch("");
                  setOpen(false);
                }}
              >
                <span className="flex w-5 items-center justify-center">
                  {opt.value === value && (
                    <CheckIcon
                      className="text-primary"
                      width={18}
                      height={18}
                    />
                  )}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {opt.label}
                </span>
              </div>
            ))}
          </div>
          {/* Sticky create option */}
          {createOptionLabel && onCreateOption && (
            <div className="sticky bottom-0 z-10 border-t border-white/20 dark:border-white/10 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-b-md">
              <div
                className="mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground dark:text-white transition hover:bg-primary hover:text-white"
                onClick={() => {
                  onCreateOption();
                  setSearch("");
                  setOpen(false);
                }}
              >
                <span className="flex w-5 items-center justify-center">
                  {/* Optionally add an icon here */}
                </span>
                <span className="min-w-0 flex-1 truncate">
                  {createOptionLabel}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Combobox;
