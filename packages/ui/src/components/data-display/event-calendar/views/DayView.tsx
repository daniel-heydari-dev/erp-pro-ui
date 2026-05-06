"use client";

import type { FC } from 'react';

import { getEventsForDay, formatHour, getEventTopPx, getEventHeightPx, GRID_START_HOUR, GRID_END_HOUR, HOUR_HEIGHT_PX } from '../calendarUtils';
import { EVENT_LABEL_CONFIG } from '../types';
import type { CalendarEvent } from '../types';

interface DayViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventDoubleClick?: (event: CalendarEvent) => void;
}

const HOURS = Array.from({ length: GRID_END_HOUR - GRID_START_HOUR }, (_, i) => GRID_START_HOUR + i);

export const DayView: FC<DayViewProps> = ({ currentDate, events, onEventDoubleClick }) => {
  const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'long' });
  const allDayEvents = getEventsForDay(events, currentDate).filter((e) => e.allDay);
  const timedEvents = getEventsForDay(events, currentDate).filter((e) => !e.allDay);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Column header */}
      <div className="grid border-b border-ds-border-3" style={{ gridTemplateColumns: '56px 1fr' }}>
        <div className="border-e border-ds-border-3" />
        <div className="flex flex-col items-center py-2 text-xs font-medium text-ds-accent bg-ds-accent-subtle/30">
          <span>{dayName}</span>
          <span className="mt-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-ds-accent text-ds-on-accent font-semibold">
            {currentDate.getDate()}
          </span>
        </div>
      </div>

      {/* All-Day row */}
      <div className="grid border-b border-ds-border-3" style={{ gridTemplateColumns: '56px 1fr', minHeight: 40 }}>
        <div className="flex items-center justify-end pe-2 text-[10px] text-ds-3 border-e border-ds-border-3">
          All-day
        </div>
        <div className="flex flex-col gap-0.5 p-1">
          {allDayEvents.map((e) => (
            <div
              key={e.id}
              className="cursor-pointer truncate rounded px-2 py-1 text-xs font-medium select-none"
              style={{ backgroundColor: EVENT_LABEL_CONFIG[e.label].bg, color: EVENT_LABEL_CONFIG[e.label].color }}
              title={e.title}
              onDoubleClick={() => onEventDoubleClick?.(e)}
            >
              {e.title}
            </div>
          ))}
        </div>
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid relative" style={{ gridTemplateColumns: '56px 1fr', height: HOURS.length * HOUR_HEIGHT_PX }}>
          {/* Hour labels */}
          <div className="relative border-e border-ds-border-3">
            {HOURS.map((h) => (
              <div key={h} className="absolute w-full flex justify-end pe-2" style={{ top: (h - GRID_START_HOUR) * HOUR_HEIGHT_PX - 8 }}>
                <span className="text-[10px] text-ds-3">{formatHour(h)}</span>
              </div>
            ))}
          </div>

          {/* Day column */}
          <div className="relative bg-ds-accent-subtle/20">
            {HOURS.map((h) => (
              <div key={h} className="border-t border-ds-border-3/50" style={{ height: HOUR_HEIGHT_PX }} />
            ))}
            {timedEvents.map((event) => {
              const cfg = EVENT_LABEL_CONFIG[event.label];
              return (
                <div
                  key={event.id}
                  className="absolute inset-x-1 cursor-pointer overflow-hidden rounded px-2 py-1 text-xs font-medium leading-tight select-none"
                  style={{
                    top: getEventTopPx(event),
                    height: getEventHeightPx(event),
                    backgroundColor: cfg.bg,
                    color: cfg.color,
                  }}
                  title={event.title}
                  onDoubleClick={() => onEventDoubleClick?.(event)}
                >
                  {event.title}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
