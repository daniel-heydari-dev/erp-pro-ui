"use client";

import type { FC } from 'react';

import {
  startOfMonth,
  endOfMonth,
  isSameDay,
  formatListDate,
  formatListDayName,
  formatTime,
} from '../calendarUtils';
import { EVENT_LABEL_CONFIG } from '../types';
import type { CalendarEvent } from '../types';

interface ListViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventDoubleClick?: (event: CalendarEvent) => void;
}

export const ListView: FC<ListViewProps> = ({ currentDate, events, onEventDoubleClick }) => {
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);

  const monthEvents = events
    .filter((e) => e.start <= monthEnd && e.end >= monthStart)
    .sort((a, b) => a.start.getTime() - b.start.getTime());

  // Group by day
  const groups: { day: Date; events: CalendarEvent[] }[] = [];
  for (const event of monthEvents) {
    const existing = groups.find((g) => isSameDay(g.day, event.start));
    if (existing) {
      existing.events.push(event);
    } else {
      groups.push({ day: event.start, events: [event] });
    }
  }

  if (groups.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-ds-3">
        No events this month
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {groups.map(({ day, events: dayEvents }) => (
        <div key={day.toISOString()}>
          {/* Date header */}
          <div className="flex items-center justify-between bg-ds-surface-2 px-4 py-2 border-b border-ds-border-3">
            <span className="text-sm font-semibold text-ds-1">{formatListDate(day)}</span>
            <span className="text-xs font-medium text-ds-3">{formatListDayName(day)}</span>
          </div>

          {/* Events */}
          {dayEvents.map((event) => {
            const cfg = EVENT_LABEL_CONFIG[event.label];
            const timeLabel = event.allDay
              ? 'all-day'
              : `${formatTime(event.start)}–${formatTime(event.end)}`;
            return (
              <div
                key={event.id}
                className="flex cursor-pointer select-none items-center gap-3 border-b border-ds-border-3 px-4 py-3 transition-colors hover:bg-ds-surface-2"
                onDoubleClick={() => onEventDoubleClick?.(event)}
                title="Double-click to view details"
              >
                <span className="w-28 shrink-0 text-xs text-ds-3">{timeLabel}</span>
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: cfg.color }}
                  aria-hidden="true"
                />
                <span className="truncate text-sm text-ds-1">{event.title}</span>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};
