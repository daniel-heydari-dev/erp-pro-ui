import React, { useState } from "react";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { CheckIcon, ChevronDownIcon, CloseIcon } from "../../icons";
import { DropdownMenu } from "../../overlays/dropdown-menu";
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
  searchPlaceholder?: string;
  noOptionsText?: string;
  className?: string;
  bgClassName?: string;
}

const MultiSelectCombobox: React.FC<MultiSelectComboboxProps> = ({
  options,
  value = [],
  onChange,
  placeholder = "Select...",
  searchPlaceholder = "Type to search...",
  noOptionsText = "No options found",
  className,
  bgClassName = "bg-ds-surface-1",
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
      panelClassName="top-[40px] start-0 z-20 mt-1 flex w-full max-h-60 flex-col rounded-lg border border-ds-border-2 bg-ds-surface-1 shadow-3 backdrop-blur-xl transition"
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
          className="group/multi-combobox w-full rounded-lg border-ds-border-2 p-[2px] transition duration-300 hover:border-ds-border-accent"
        >
          <div
            className={mergeClassNames(
              "flex min-h-10 w-full cursor-pointer items-center justify-between rounded-md border border-ds-border-field px-3 py-2 text-sm text-ds-1 transition duration-400 ease-in-out group-hover/multi-combobox:shadow-none",
              bgClassName,
            )}
          >
            <div className="flex flex-1 flex-wrap gap-1">
              {selectedLabels.length > 0 ? (
                selectedLabels.map((label, index) => (
                  <span
                    key={value[index]}
                    className="inline-flex items-center gap-1 rounded-md border border-ds-border-field bg-ds-surface-2 px-2 py-0.5 text-xs font-medium text-ds-1"
                  >
                    {label}
                    <button
                      type="button"
                      onMouseDown={(e) => e.stopPropagation()}
                      onClick={(e) => handleRemoveTag(value[index], e)}
                      className="ms-0.5 rounded-full p-0.5 text-ds-2 transition-colors hover:bg-ds-surface-1 hover:text-ds-1"
                    >
                      <CloseIcon className="h-3 w-3" aria-hidden="true" />
                    </button>
                  </span>
                ))
              ) : (
                <span className="text-ds-2">{placeholder}</span>
              )}
            </div>
            <span
              className={mergeClassNames(
                "ms-2 shrink-0 text-ds-2 transition-transform duration-300",
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
          className="w-full rounded-t-lg bg-transparent px-3 py-2 text-sm text-ds-1 outline-none placeholder:text-ds-2 focus-visible:ring-2 focus-visible:ring-ds-focus/30"
          placeholder={searchPlaceholder}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
      {/* Scrollable options */}
      <div className="max-h-80 flex-1 overflow-auto">
        {filteredOptions.length === 0 && (
          <div className="p-3 text-center text-sm text-ds-2">
            {noOptionsText}
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
                  ? "bg-ds-surface-2 text-ds-1"
                  : "text-ds-1 hover:bg-ds-surface-2 hover:text-ds-1",
              )}
              onClick={() => handleOptionClick(option.value)}
            >
              <span
                className={mergeClassNames(
                  "flex h-4 w-4 items-center justify-center rounded border transition",
                  isSelected
                    ? "border-ds-border-accent bg-ds-accent text-ds-on-accent"
                    : "border-ds-border-2",
                )}
              >
                {isSelected && <CheckIcon width={12} height={12} />}
              </span>
              <span className="flex-1">{option.label}</span>
            </div>
          );
        })}
      </div>
    </DropdownMenu>
  );
};

export default MultiSelectCombobox;
