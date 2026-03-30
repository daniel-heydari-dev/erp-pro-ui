import { useEffect, useMemo, useRef, useState } from 'react';

import { Calendar } from '../calendar';

import type {
  DatePickerProps,
  DatePickerValue,
  DateRangeValue,
} from './types';

const formatDate = (date: Date | null) =>
  date?.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) ?? '';

const isRangeValue = (value: DatePickerValue): value is DateRangeValue =>
  typeof value === "object" &&
  value !== null &&
  "start" in value &&
  "end" in value;

const emptyRange: DateRangeValue = { start: null, end: null };

export const DatePicker = ({
  mode = 'single',
  value,
  onChange,
  label,
  placeholder = "Pick a date",
  helperText,
  disabled = false,
  className = '',
  presets,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<DatePickerValue>(
    value ?? (mode === "range" ? emptyRange : null)
  );

  const currentValue = isControlled ? value : internalValue;
  const singleValue = mode === "range" ? null : (currentValue as Date | null);
  const rangeValue =
    mode === "range" && isRangeValue(currentValue)
      ? currentValue
      : mode === "range"
        ? { ...emptyRange }
        : emptyRange;

  const displayValue = useMemo(() => {
    if (mode === "range") {
      if (rangeValue.start && rangeValue.end) {
        return `${formatDate(rangeValue.start)} — ${formatDate(rangeValue.end)}`;
      }
      if (rangeValue.start) {
        return `${formatDate(rangeValue.start)} — …`;
      }
      return '';
    }
    return formatDate(singleValue);
  }, [mode, rangeValue.end, rangeValue.start, singleValue]);

  const updateValue = (next: DatePickerValue) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handlePresetClick = (getValue: () => DatePickerValue) => {
    const next = getValue();
    updateValue(next);
    setOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`w-full space-y-2 ${className}`.trim()}
    >
      {label && (
        <p className="text-sm font-medium text-heading">{label}</p>
      )}
      <div className="relative">
        <button
          type="button"
          className={`flex w-full items-center justify-between rounded-md border border-black/5 dark:border-white/10 backdrop-blur-xl bg-white/40 dark:bg-zinc-950/40 px-3 py-2 text-sm shadow-sm ${disabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => !disabled && setOpen((prev) => !prev)}
          aria-haspopup="dialog"
          aria-expanded={open}
          disabled={disabled}
        >
          <span
            className={
              displayValue ? "text-foreground" : "text-muted-foreground"
            }
          >
            {displayValue || placeholder}
          </span>
          <span aria-hidden="true">📅</span>
        </button>
        {open && !disabled && (
          <div className="absolute left-0 top-12 z-40 dropdown-panel">
            <Calendar
              value={mode === "single" ? singleValue ?? null : undefined}
              selectionMode={mode}
              range={mode === "range" ? rangeValue : undefined}
              onSelect={
                mode === "single"
                  ? (date) => {
                    updateValue(date);
                    setOpen(false);
                  }
                  : undefined
              }
              onRangeSelect={
                mode === "range"
                  ? (nextRange) => {
                    updateValue(nextRange);
                    if (nextRange.start && nextRange.end) {
                      setOpen(false);
                    }
                  }
                  : undefined
              }
            />
            {presets?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {presets.map((preset) => (
                  <button
                    key={preset.label}
                    type="button"
                    className="rounded-full border border-input px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-ring hover:text-heading"
                    onClick={() => handlePresetClick(preset.value)}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
      {helperText && (
        <p className="text-xs text-muted-foreground">{helperText}</p>
      )}
    </div>
  );
};
