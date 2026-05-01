import { useMemo, useState } from "react";

import { Select } from "../select";

import type { CalendarProps } from "./types";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
const monthNames = Array.from({ length: 12 }, (_, monthIndex) =>
  new Date(2026, monthIndex, 1).toLocaleString(undefined, {
    month: "long",
  }),
);
const monthOptions = monthNames.map((monthName, monthIndex) => ({
  label: monthName,
  value: String(monthIndex),
}));

const getDaysInMonth = (month: number, year: number) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const startWeekday = firstDay.getDay();
  const daysInMonth = lastDay.getDate();
  const days: Array<Date | null> = [];

  for (let index = 0; index < startWeekday; index += 1) {
    days.push(null);
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    days.push(new Date(year, month, day));
  }

  while (days.length % 7 !== 0) {
    days.push(null);
  }

  return days;
};

const normalizeRange = (range?: { start: Date | null; end: Date | null }) => ({
  start: range?.start ?? null,
  end: range?.end ?? null,
});

const isSameDay = (left: Date | null, right: Date | null) => {
  if (!left || !right) {
    return false;
  }

  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
};

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
}: CalendarProps) => {
  const today = new Date();
  const [internalMonth, setInternalMonth] = useState(month ?? today.getMonth());
  const [internalYear, setInternalYear] = useState(year ?? today.getFullYear());
  const [internalRange, setInternalRange] = useState(normalizeRange(range));

  const currentMonth = month ?? internalMonth;
  const currentYear = year ?? internalYear;
  const currentRange = range ? normalizeRange(range) : internalRange;
  const yearOptions = useMemo(() => {
    const startYear = 1980;
    const endYear = Math.max(new Date().getFullYear() + 10, currentYear + 5);

    return Array.from({ length: endYear - startYear + 1 }, (_, index) => ({
      label: String(endYear - index),
      value: String(endYear - index),
    }));
  }, [currentYear]);

  const setDisplayedMonth = (nextMonth: number, nextYear: number) => {
    if (month === undefined) {
      setInternalMonth(nextMonth);
    }

    if (year === undefined) {
      setInternalYear(nextYear);
    }

    onMonthChange?.(nextMonth, nextYear);
  };

  const updateMonth = (offset: number) => {
    const nextDate = new Date(currentYear, currentMonth + offset, 1);

    setDisplayedMonth(nextDate.getMonth(), nextDate.getFullYear());
  };

  const days = useMemo(
    () => getDaysInMonth(currentMonth, currentYear),
    [currentMonth, currentYear],
  );

  const isInRange = (date: Date | null) => {
    if (!date || !currentRange.start || !currentRange.end) {
      return false;
    }

    const time = date.getTime();
    const start = currentRange.start.getTime();
    const end = currentRange.end.getTime();

    return time >= Math.min(start, end) && time <= Math.max(start, end);
  };

  const handleSelect = (date: Date) => {
    if (selectionMode === "range") {
      const existingRange = currentRange;
      let nextRange = existingRange;

      if (!existingRange.start || existingRange.end) {
        nextRange = { start: date, end: null };
      } else if (date.getTime() < existingRange.start.getTime()) {
        nextRange = { start: date, end: existingRange.start };
      } else {
        nextRange = { start: existingRange.start, end: date };
      }

      if (!range) {
        setInternalRange(nextRange);
      }

      onRangeSelect?.(nextRange);
      return;
    }

    onSelect?.(date);
  };

  return (
    <div
      className={`w-[360px] max-w-[calc(100vw-1.5rem)] rounded-lg border border-ds-border-2 bg-ds-surface-1/95 p-4 shadow-xl backdrop-blur-xl ${className}`.trim()}
    >
      <div className="mb-4 flex items-center gap-2">
        <button
          type="button"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ds-border-field bg-ds-surface-1 text-sm text-ds-2 transition-colors hover:border-ds-border-accent hover:text-ds-1"
          onClick={() => updateMonth(-1)}
          aria-label="Previous month"
        >
          ←
        </button>

        <div className="grid flex-1 grid-cols-[minmax(0,1fr)_7rem] gap-2">
          <Select
            name="calendar-month-select"
            value={String(currentMonth)}
            onChange={(event) => {
              setDisplayedMonth(Number(event.target.value), currentYear);
            }}
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
            onChange={(event) => {
              setDisplayedMonth(currentMonth, Number(event.target.value));
            }}
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
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-ds-border-field bg-ds-surface-1 text-sm text-ds-2 transition-colors hover:border-ds-border-accent hover:text-ds-1"
          onClick={() => updateMonth(1)}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {dayNames.map((dayName) => (
          <span key={dayName} className="text-xs font-medium text-ds-2">
            {dayName}
          </span>
        ))}

        {days.map((date, index) => {
          const isSelected =
            selectionMode === "single" && isSameDay(date, value);
          const isToday = isSameDay(date, today);
          const inRange = selectionMode === "range" && isInRange(date);
          const isRangeStart =
            selectionMode === "range" && isSameDay(date, currentRange.start);
          const isRangeEnd =
            selectionMode === "range" && isSameDay(date, currentRange.end);

          if (!date) {
            return <span key={`empty-${index}`} />;
          }

          return (
            <button
              type="button"
              key={date.toISOString()}
              className={`rounded-md px-0 py-2 text-sm transition-colors ${
                isSelected || isRangeStart || isRangeEnd
                  ? "bg-ds-accent text-ds-on-accent"
                  : inRange
                    ? "bg-ds-accent-subtle text-ds-1"
                    : isToday
                      ? "border border-ds-border-accent text-ds-1"
                      : "text-ds-2"
              }`}
              onClick={() => handleSelect(date)}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>

      {footer ? <div className="mt-4">{footer}</div> : null}
    </div>
  );
};
