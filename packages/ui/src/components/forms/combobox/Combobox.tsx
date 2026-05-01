import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { CheckIcon, ChevronDownIcon } from "../../icons";
import { DropdownMenu } from "../../overlays/dropdown-menu";
import { TruncatedText } from "../../typography/truncated-text";
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
  searchPlaceholder?: string;
  noOptionsText?: string;
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
  searchPlaceholder = "Type to search...",
  noOptionsText = "No options",
  className,
  bgClassName = "bg-ds-surface-1",
  createOptionLabel,
  onCreateOption,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = 100;

  // Filter options by search
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  return (
    <DropdownMenu
      className={mergeClassNames("w-full", className)}
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          setSearch("");
        }
      }}
      animationClassName="origin-top-left"
      panelClassName="start-0 top-[40px] z-20 mt-1 flex w-full max-h-60 flex-col rounded-lg border border-ds-border-2 bg-ds-surface-1 shadow-3 backdrop-blur-xl transition"
      trigger={
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
          className="group/combobox w-full rounded-lg border-ds-border-2 p-[2px] transition duration-300 hover:border-ds-border-accent"
        >
          <div
            className={mergeClassNames(
              "flex h-10 w-full cursor-pointer items-center justify-between rounded-md border border-ds-border-field px-3 py-2 text-sm text-ds-1 transition duration-400 ease-in-out focus-visible:ring-2 focus-visible:ring-ds-focus focus-visible:outline-none",
              bgClassName,
            )}
          >
            {value ? (
              <TruncatedText
                as="span"
                showTitleOnHover
                className="flex-1 text-ds-1"
              >
                {options.find((opt) => opt.value === value)?.label}
              </TruncatedText>
            ) : (
              <TruncatedText as="span" className="flex-1 text-ds-2">
                {placeholder}
              </TruncatedText>
            )}
            <span
              className={mergeClassNames(
                "ms-2 text-ds-2 transition-transform duration-300",
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
      }
    >
      {/* Sticky search input */}
      <div className="sticky top-0 z-10 rounded-t-lg border-b border-ds-border-2/30 bg-ds-surface-1/95 backdrop-blur-sm">
        <input
          autoFocus
          className="w-full bg-transparent px-3 py-2 text-sm text-ds-1 outline-none placeholder:text-ds-2 focus-visible:ring-2 focus-visible:ring-ds-focus/30 rounded-t-lg"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {/* Scrollable options */}
      <div className="max-h-80 flex-1 overflow-auto">
        {filteredOptions.length === 0 && !createOptionLabel && (
          <div className="px-3 py-2 text-ds-2">{noOptionsText}</div>
        )}
        {filteredOptions.map((opt) => (
          <div
            key={opt.value}
            className={mergeClassNames(
              "mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm text-ds-1 transition",
              opt.value === value
                ? "bg-ds-accent-subtle text-ds-1 font-semibold"
                : "",
              "hover:bg-ds-accent hover:text-ds-on-accent",
            )}
            onClick={() => {
              onChange(opt.value);
              setSearch("");
              setOpen(false);
            }}
          >
            <span className="flex w-5 items-center justify-center">
              {opt.value === value && (
                <CheckIcon className="text-ds-1" width={18} height={18} />
              )}
            </span>
            <TruncatedText as="span" showTitleOnHover className="flex-1">
              {opt.label}
            </TruncatedText>
          </div>
        ))}
      </div>
      {/* Sticky create option */}
      {createOptionLabel && onCreateOption && (
        <div className="sticky bottom-0 z-10 rounded-b-lg border-t border-ds-border-3 bg-ds-surface-1/95 backdrop-blur-sm">
          <div
            className="mx-1 my-1 flex cursor-pointer items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-ds-1 transition hover:bg-ds-accent hover:text-ds-on-accent"
            onClick={() => {
              onCreateOption();
              setSearch("");
              setOpen(false);
            }}
          >
            <span className="flex w-5 items-center justify-center">
              {/* Optionally add an icon here */}
            </span>
            <TruncatedText as="span" showTitleOnHover className="flex-1">
              {createOptionLabel}
            </TruncatedText>
          </div>
        </div>
      )}
    </DropdownMenu>
  );
};

export default Combobox;
