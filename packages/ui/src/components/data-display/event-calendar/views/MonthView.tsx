"use client";

import type { FC } from 'react';

import { Button } from '../../../forms/button';
import { mergeClassNames } from '../../../../utils';

import { getMonthGridDays, getEventsForDay, isToday } from '../calendarUtils';
import { EventPill } from '../EventPill';
import type { CalendarEvent } from '../types';

interface MonthViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onDayClick: (d: Date) => void;
  onEventDoubleClick?: (event: CalendarEvent) => void;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const MonthView: FC<MonthViewProps> = ({ currentDate, events, onDayClick, onEventDoubleClick }) => {
  const days = getMonthGridDays(currentDate);
  const currentMonth = currentDate.getMonth();

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <div className="grid grid-cols-7 border-b border-ds-border-3">
        {DAY_NAMES.map((name) => (
          <div
            key={name}
            className="py-2 text-center text-xs font-medium uppercase tracking-wide text-ds-3"
          >
            {name}
          </div>
        ))}
      </div>

      <div className="grid flex-1 grid-cols-7 grid-rows-6">
        {days.map((day, i) => {
          const inMonth = day.getMonth() === currentMonth;
          const today = isToday(day);
          const dayEvents = getEventsForDay(events, day);
          const visible = dayEvents.slice(0, 2);
          const overflow = dayEvents.length - visible.length;

          return (
            <Button
              key={i}
              variant="tertiary"
              aria-label={day.toDateString()}
              onClick={() => onDayClick(day)}
              className={mergeClassNames(
                'flex flex-col items-start gap-1 rounded-none border-b border-e border-ds-border-3 p-1.5 text-start hover:bg-ds-surface-2 hover:opacity-100',
                today ? 'bg-ds-surface-2' : '',
              )}
            >
              <span
                className={mergeClassNames(
                  'self-end flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium leading-none',
                  today
                    ? 'bg-ds-accent text-ds-on-accent font-bold'
                    : inMonth
                      ? 'text-ds-2'
                      : 'text-ds-3 opacity-50',
                )}
              >
                {day.getDate()}
              </span>

              <div className="flex w-full min-h-0 flex-col gap-0.5">
                {visible.map((event) => (
                  <EventPill key={event.id} event={event} compact onDoubleClick={onEventDoubleClick} />
                ))}
                {overflow > 0 && (
                  <span className="px-1 text-[10px] text-ds-3">+{overflow} more</span>
                )}
              </div>
            </Button>
          );
        })}
      </div>
    </div>
  );
};
