"use client";

import type { FC } from 'react';

import { mergeClassNames } from '../../../../utils';

import {
  getWeekDays,
  getEventsForDay,
  isSameDay,
  isToday,
  formatShortDate,
  formatHour,
  getEventTopPx,
  getEventHeightPx,
  GRID_START_HOUR,
  GRID_END_HOUR,
  HOUR_HEIGHT_PX,
} from '../calendarUtils';
import { EventPill } from '../EventPill';
import { EVENT_LABEL_CONFIG } from '../types';
import type { CalendarEvent } from '../types';

interface WeekViewProps {
  currentDate: Date;
  events: CalendarEvent[];
  onEventDoubleClick?: (event: CalendarEvent) => void;
}

const HOURS = Array.from({ length: GRID_END_HOUR - GRID_START_HOUR }, (_, i) => GRID_START_HOUR + i);
const DAY_ABBR = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export const WeekView: FC<WeekViewProps> = ({ currentDate, events, onEventDoubleClick }) => {
  const weekDays = getWeekDays(currentDate);

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* Column headers */}
      <div className="grid border-b border-ds-border-3" style={{ gridTemplateColumns: '56px repeat(7, 1fr)' }}>
        <div className="border-e border-ds-border-3" />
        {weekDays.map((day) => {
          const today = isToday(day);
          return (
            <div
              key={day.toISOString()}
              className={mergeClassNames(
                'flex flex-col items-center py-2 text-xs font-medium border-e border-ds-border-3 last:border-e-0',
                today ? 'bg-ds-accent-subtle/30 text-ds-accent' : 'text-ds-3',
              )}
            >
              <span>{DAY_ABBR[day.getDay()]}</span>
              <span className={mergeClassNames(
                'mt-0.5 flex h-6 w-6 items-center justify-center rounded-full font-semibold',
                today ? 'bg-ds-accent text-ds-on-accent' : 'text-ds-2',
              )}>
                {formatShortDate(day).split('/')[1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* All-Day row */}
      <div className="grid border-b border-ds-border-3" style={{ gridTemplateColumns: '56px repeat(7, 1fr)', minHeight: 40 }}>
        <div className="flex items-center justify-end pe-2 text-[10px] text-ds-3 border-e border-ds-border-3">All-day</div>
        {weekDays.map((day) => {
          const allDayEvents = getEventsForDay(events, day).filter((e) => e.allDay);
          return (
            <div key={day.toISOString()} className="flex flex-col gap-0.5 p-0.5 border-e border-ds-border-3 last:border-e-0">
              {allDayEvents.map((e) => <EventPill key={e.id} event={e} compact onDoubleClick={onEventDoubleClick} />)}
            </div>
          );
        })}
      </div>

      {/* Time grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid relative" style={{ gridTemplateColumns: '56px repeat(7, 1fr)', height: HOURS.length * HOUR_HEIGHT_PX }}>
          {/* Hour labels */}
          <div className="relative border-e border-ds-border-3">
            {HOURS.map((h) => (
              <div key={h} className="absolute w-full flex justify-end pe-2" style={{ top: (h - GRID_START_HOUR) * HOUR_HEIGHT_PX - 8 }}>
                <span className="text-[10px] text-ds-3">{formatHour(h)}</span>
              </div>
            ))}
          </div>

          {/* Day columns */}
          {weekDays.map((day) => {
            const today = isToday(day);
            const timedEvents = getEventsForDay(events, day).filter((e) => !e.allDay);
            return (
              <div
                key={day.toISOString()}
                className={mergeClassNames(
                  'relative border-e border-ds-border-3 last:border-e-0',
                  today ? 'bg-ds-accent-subtle/20' : '',
                )}
              >
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="border-t border-ds-border-3/50"
                    style={{ height: HOUR_HEIGHT_PX }}
                  />
                ))}
                {timedEvents.map((event) => {
                  const cfg = EVENT_LABEL_CONFIG[event.label];
                  return (
                    <div
                      key={event.id}
                      className="absolute inset-x-0.5 cursor-pointer overflow-hidden rounded px-1.5 py-1 text-xs font-medium leading-tight select-none"
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
            );
          })}
        </div>
      </div>
    </div>
  );
};
