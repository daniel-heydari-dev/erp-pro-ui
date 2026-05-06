"use client";

import type { FC } from 'react';

import { Button } from '../../forms/button';
import { mergeClassNames } from '../../../utils';

import { getMonthGridDays, isSameDay, isToday, addMonths } from './calendarUtils';

interface MiniCalendarPickerProps {
  currentDate: Date;
  onDateChange: (d: Date) => void;
  onMonthChange: (d: Date) => void;
}

const DAY_CHARS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

const ChevronLeft = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export const MiniCalendarPicker: FC<MiniCalendarPickerProps> = ({
  currentDate,
  onDateChange,
  onMonthChange,
}) => {
  const days = getMonthGridDays(currentDate);
  const monthLabel = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  return (
    <div className="select-none">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold text-ds-1">{monthLabel}</span>
        <div className="flex gap-0.5">
          <Button
            variant="tertiary"
            size="small"
            className="h-6 w-6 p-0! hover:opacity-100"
            aria-label="Previous month"
            onClick={() => onMonthChange(addMonths(currentDate, -1))}
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="tertiary"
            size="small"
            className="h-6 w-6 p-0! hover:opacity-100"
            aria-label="Next month"
            onClick={() => onMonthChange(addMonths(currentDate, 1))}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>

      <div className="mb-1 grid grid-cols-7">
        {DAY_CHARS.map((c, i) => (
          <div key={i} className="py-0.5 text-center text-[10px] font-medium text-ds-3">
            {c}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-y-0.5">
        {days.map((day, i) => {
          const isCurrentMonth = day.getMonth() === currentDate.getMonth();
          const today = isToday(day);
          const selected = isSameDay(day, currentDate);
          return (
            <Button
              key={i}
              variant="tertiary"
              aria-label={day.toDateString()}
              onClick={() => onDateChange(day)}
              className={mergeClassNames(
                'mx-auto h-6 w-6 rounded-full p-0! text-[10px] hover:opacity-100',
                today ? 'bg-ds-accent! text-ds-on-accent! font-bold' : '',
                !today && selected ? 'bg-ds-surface-3! text-ds-1! font-medium' : '',
                !today && !selected && isCurrentMonth ? 'text-ds-2 hover:bg-ds-surface-3' : '',
                !today && !selected && !isCurrentMonth ? 'text-ds-3 opacity-50' : '',
              )}
            >
              {day.getDate()}
            </Button>
          );
        })}
      </div>
    </div>
  );
};
