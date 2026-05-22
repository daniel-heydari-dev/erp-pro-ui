import { useMemo, useState } from "react";

import { Select } from "../select";
import { mergeClassNames } from "../../../utils";

import type { CalendarProps } from "./types";

const DAY_NAMES = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

const monthNames = Array.from({ length: 12 }, (_, i) =>
  new Date(2026, i, 1).toLocaleString(undefined, { month: "long" }),
);
const monthOptions = monthNames.map((label, i) => ({ label, value: String(i) }));

function getDaysInMonth(month: number, year: number): Array<Date | null> {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: Array<Date | null> = [];

  for (let i = 0; i < firstDay.getDay(); i++) days.push(null);
  for (let d = 1; d <= lastDay.getDate(); d++) days.push(new Date(year, month, d));
  while (days.length % 7 !== 0) days.push(null);

  return days;
}

function isSameDay(a: Date | null, b: Date | null) {
  if (!a || !b) return false;
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function normalizeRange(r?: { start: Date | null; end: Date | null }) {
  return { start: r?.start ?? null, end: r?.end ?? null };
}

export const Calendar = ({
  value = null,
  range,
  selectionMode = "single",
  onSelect,
  onRangeSelect,
  month,
  year,
  onMonthChange,
  footer,
  className = "",
  showNav = true,
  hoverDate,
  onHoverDate,
}: CalendarProps) => {
  const today = new Date();
  const [internalMonth, setInternalMonth] = useState(month ?? today.getMonth());
  const [internalYear,  setInternalYear]  = useState(year  ?? today.getFullYear());
  const [internalRange, setInternalRange] = useState(normalizeRange(range));

  const currentMonth = month ?? internalMonth;
  const currentYear  = year  ?? internalYear;
  const currentRange = range ? normalizeRange(range) : internalRange;

  const yearOptions = useMemo(() => {
    const end = Math.max(new Date().getFullYear() + 10, currentYear + 5);
    return Array.from({ length: end - 1980 + 1 }, (_, i) => ({
      label: String(end - i),
      value: String(end - i),
    }));
  }, [currentYear]);

  const setDisplayedMonth = (m: number, y: number) => {
    if (month === undefined) setInternalMonth(m);
    if (year  === undefined) setInternalYear(y);
    onMonthChange?.(m, y);
  };

  const updateMonth = (offset: number) => {
    const d = new Date(currentYear, currentMonth + offset, 1);
    setDisplayedMonth(d.getMonth(), d.getFullYear());
  };

  const days = useMemo(
    () => getDaysInMonth(currentMonth, currentYear),
    [currentMonth, currentYear],
  );

  // When only start is selected, use hoverDate as preview end
  const effectiveEnd =
    selectionMode === "range" && currentRange.start && !currentRange.end
      ? (hoverDate ?? null)
      : currentRange.end;

  const rangeMin = currentRange.start && effectiveEnd
    ? Math.min(currentRange.start.getTime(), effectiveEnd.getTime())
    : null;
  const rangeMax = currentRange.start && effectiveEnd
    ? Math.max(currentRange.start.getTime(), effectiveEnd.getTime())
    : null;

  const isInRange = (date: Date | null) => {
    if (!date || rangeMin === null || rangeMax === null) return false;
    const t = date.getTime();
    return t > rangeMin && t < rangeMax;
  };

  const handleSelect = (date: Date) => {
    if (selectionMode === "range") {
      const existing = currentRange;
      let next: { start: Date | null; end: Date | null };

      if (!existing.start || existing.end) {
        next = { start: date, end: null };
      } else if (date.getTime() < existing.start.getTime()) {
        next = { start: date, end: existing.start };
      } else {
        next = { start: existing.start, end: date };
      }

      if (!range) setInternalRange(next);
      onRangeSelect?.(next);
      return;
    }
    onSelect?.(date);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "PageUp") {
      e.preventDefault();
      updateMonth(e.shiftKey ? -12 : -1);
    } else if (e.key === "PageDown") {
      e.preventDefault();
      updateMonth(e.shiftKey ? 12 : 1);
    }
  };

  return (
    <div
      className={mergeClassNames(
        "w-[320px] max-w-[calc(100vw-1.5rem)] rounded-lg border border-ds-border-2 bg-ds-surface-1/95 p-4 shadow-xl backdrop-blur-xl outline-none",
        className,
      )}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      {showNav && (
        <div className="mb-4 flex items-center gap-2">
          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ds-border-field bg-ds-surface-1 text-sm text-ds-2 transition-colors hover:border-ds-border-accent hover:text-ds-1"
            onClick={() => updateMonth(-1)}
            aria-label="Previous month"
          >
            ←
          </button>

          <div className="grid flex-1 grid-cols-[minmax(0,1fr)_6rem] gap-2">
            <Select
              name="calendar-month-select"
              value={String(currentMonth)}
              onChange={(e) => setDisplayedMonth(Number(e.target.value), currentYear)}
              options={monthOptions}
              containerClassName="min-w-0"
              triggerClassName="font-medium"
              dropdownClassName="start-0 end-auto min-w-full w-max"
              optionClassName="justify-start"
              placeholder="Month"
              size="compact"
              selectionIndicator="none"
              aria-label="Select month"
            />
            <Select
              name="calendar-year-select"
              value={String(currentYear)}
              onChange={(e) => setDisplayedMonth(currentMonth, Number(e.target.value))}
              options={yearOptions}
              containerClassName="min-w-0"
              triggerClassName="font-medium"
              dropdownClassName="start-auto end-0 min-w-full w-max"
              optionClassName="justify-start"
              placeholder="Year"
              size="compact"
              selectionIndicator="none"
              aria-label="Select year"
            />
          </div>

          <button
            type="button"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-ds-border-field bg-ds-surface-1 text-sm text-ds-2 transition-colors hover:border-ds-border-accent hover:text-ds-1"
            onClick={() => updateMonth(1)}
            aria-label="Next month"
          >
            →
          </button>
        </div>
      )}

      {/* Day-name headers */}
      <div className="mb-1 grid grid-cols-7">
        {DAY_NAMES.map((d) => (
          <div key={d} className="flex h-8 items-center justify-center text-[10px] font-semibold text-ds-3">
            {d}
          </div>
        ))}
      </div>

      {/* Day grid — no gap so range band is continuous */}
      <div className="grid grid-cols-7" onMouseLeave={() => onHoverDate?.(null)}>
        {days.map((date, index) => {
          if (!date) return <span key={`empty-${index}`} className="h-10" />;

          const isSelected   = selectionMode === "single" && isSameDay(date, value);
          const isToday      = isSameDay(date, today);
          const inRange      = selectionMode === "range" && isInRange(date);

          // Normalise start/end so start ≤ end (handles backward drag)
          const normStart = rangeMin !== null ? new Date(rangeMin) : null;
          const normEnd   = rangeMax !== null ? new Date(rangeMax) : null;

          const isRangeStart = selectionMode === "range" && isSameDay(date, normStart);
          const isRangeEnd   = selectionMode === "range" && isSameDay(date, normEnd);
          const isSingleDay  = isRangeStart && isRangeEnd;
          const isActive     = isSelected || isRangeStart || isRangeEnd;

          return (
            <div key={date.toISOString()} className="relative flex h-10 items-center justify-center">

              {/* Range band — full width for in-range, half-width at endpoints */}
              {inRange && (
                <div className="absolute top-1/2 h-8 w-full -translate-y-1/2 bg-ds-accent-subtle" />
              )}
              {isRangeStart && !isSingleDay && (
                <div className="absolute top-1/2 left-1/2 h-8 w-1/2 -translate-y-1/2 bg-ds-accent-subtle" />
              )}
              {isRangeEnd && !isSingleDay && (
                <div className="absolute top-1/2 right-1/2 h-8 w-1/2 -translate-y-1/2 bg-ds-accent-subtle" />
              )}

              <button
                type="button"
                className={mergeClassNames(
                  "relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors",
                  isActive
                    ? "bg-ds-accent font-semibold text-ds-on-accent"
                    : inRange
                      ? "text-ds-1 hover:bg-ds-accent/20"
                      : isToday
                        ? "font-semibold text-ds-accent hover:bg-ds-surface-3"
                        : "text-ds-2 hover:bg-ds-surface-3 hover:text-ds-1",
                )}
                onClick={() => handleSelect(date)}
                onMouseEnter={() => onHoverDate?.(date)}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>

      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
};
