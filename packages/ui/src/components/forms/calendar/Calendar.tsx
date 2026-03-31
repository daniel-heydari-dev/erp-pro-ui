import { useMemo, useState } from "react";

import type { CalendarProps } from "./types";

const dayNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

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

  const updateMonth = (offset: number) => {
    const nextDate = new Date(currentYear, currentMonth + offset, 1);

    if (month === undefined) {
      setInternalMonth(nextDate.getMonth());
      setInternalYear(nextDate.getFullYear());
    }

    onMonthChange?.(nextDate.getMonth(), nextDate.getFullYear());
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
      className={`w-[320px] rounded-lg border border-white/20 bg-white/70 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70 ${className}`.trim()}
    >
      <div className="mb-4 flex items-center justify-between">
        <button
          type="button"
          className="text-sm text-muted-foreground"
          onClick={() => updateMonth(-1)}
          aria-label="Previous month"
        >
          ←
        </button>
        <p className="text-sm font-medium text-heading">
          {new Date(currentYear, currentMonth).toLocaleString(undefined, {
            month: "long",
            year: "numeric",
          })}
        </p>
        <button
          type="button"
          className="text-sm text-muted-foreground"
          onClick={() => updateMonth(1)}
          aria-label="Next month"
        >
          →
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2 text-center">
        {dayNames.map((dayName) => (
          <span
            key={dayName}
            className="text-xs font-medium text-muted-foreground"
          >
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
                  ? "bg-ring text-white"
                  : inRange
                    ? "bg-ring/10 text-heading"
                    : isToday
                      ? "border border-ring text-heading"
                      : "text-muted-foreground"
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
