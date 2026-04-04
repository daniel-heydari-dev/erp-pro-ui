import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { CheckIcon, ChevronDownIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";

export interface ComboboxOption {
  label: string;
  value: string;
}

export interface ComboboxProps {
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
  bgClassName = "bg-background-secondary",
  createOptionLabel,
  onCreateOption,
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
        className="group/combobox rounded-lg border-border p-[2px] transition duration-300 hover:border-accent"
      >
        <div
          className={mergeClassNames(
            "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-input px-3 py-2 text-sm text-foreground transition duration-400 ease-in-out focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
            bgClassName,
          )}
          onClick={() => {
            setOpen((current) => {
              if (current) {
                setSearch("");
              }

              return !current;
            });
          }}
        >
          {value ? (
            <span className="flex-1 truncate text-foreground">
              {options.find((opt) => opt.value === value)?.label}
            </span>
          ) : (
            <span className="flex-1 text-muted-foreground">{placeholder}</span>
          )}
          <span
            className={mergeClassNames(
              "ml-2 text-muted-foreground transition-transform duration-300",
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
            {filteredOptions.length === 0 && !createOptionLabel && (
              <div className="px-3 py-2 text-muted-foreground">No options</div>
            )}
            {filteredOptions.map((opt) => (
              <div
                key={opt.value}
                className={mergeClassNames(
                  "mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition",
                  opt.value === value
                    ? "bg-accent-subtle text-accent font-semibold"
                    : "",
                  "hover:bg-accent hover:text-on-accent",
                )}
                onClick={() => {
                  onChange(opt.value);
                  setSearch("");
                  setOpen(false);
                }}
              >
                <span className="flex w-5 items-center justify-center">
                  {opt.value === value && (
                    <CheckIcon className="text-accent" width={18} height={18} />
                  )}
                </span>
                <span className="min-w-0 flex-1 truncate">{opt.label}</span>
              </div>
            ))}
          </div>
          {/* Sticky create option */}
          {createOptionLabel && onCreateOption && (
            <div className="sticky bottom-0 z-10 rounded-b-lg border-t border-border-muted bg-elevated/95 backdrop-blur-sm">
              <div
                className="mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-accent hover:text-on-accent"
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
