import { CheckIcon, ChevronDownIcon } from '../../icons';
import React, { useEffect, useRef, useState } from 'react';
import { mergeClassNames } from '../../../utils';

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
  placeholder = 'Select...',
  className,
  bgClassName = 'bg-white/40 dark:bg-zinc-950/40 backdrop-blur-xl',
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const ref = useRef<HTMLDivElement>(null);

  // Filter options by search
  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

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
      className={mergeClassNames('relative w-full', className)}
      tabIndex={0}
    >
      <div
        className={mergeClassNames(
          'flex min-h-10 w-full cursor-pointer items-center justify-between rounded-md border border-black/5 dark:border-white/10 px-3 py-2 text-sm text-foreground transition focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 shadow-sm',
          bgClassName,
          'hover:bg-white/60 dark:hover:bg-white/10',
        )}
        onClick={() => {
          setOpen((o) => {
            if (o) setSearch('');
            return !o;
          });
        }}
      >
        <div className="flex flex-1 flex-wrap gap-1">
          {selectedLabels.length > 0 ? (
            selectedLabels.map((label, index) => (
              <span
                key={value[index]}
                className="inline-flex items-center gap-1 rounded-md bg-primary-100 dark:bg-primary-900/40 px-2 py-0.5 text-xs font-medium text-primary-700 dark:text-primary-300"
              >
                {label}
                <button
                  type="button"
                  onClick={(e) => handleRemoveTag(value[index], e)}
                  className="ml-0.5 rounded-full p-0.5 hover:bg-primary-200 dark:hover:bg-primary-800 transition-colors"
                >
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </div>
        <span
          className={mergeClassNames(
            'ml-2 transition-transform duration-300 flex-shrink-0',
            open ? 'rotate-180' : 'rotate-0',
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
                    'flex cursor-pointer items-center gap-2 px-3 py-2 text-sm transition',
                    isSelected
                      ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-foreground dark:text-white hover:bg-neutral-100 dark:hover:bg-white/10',
                  )}
                  onClick={() => handleOptionClick(option.value)}
                >
                  <span
                    className={mergeClassNames(
                      'flex h-4 w-4 items-center justify-center rounded border transition',
                      isSelected
                        ? 'border-primary-500 bg-primary-500 text-white'
                        : 'border-neutral-300 dark:border-neutral-600',
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
