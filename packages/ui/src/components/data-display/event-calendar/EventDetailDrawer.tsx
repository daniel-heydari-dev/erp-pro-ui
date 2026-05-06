"use client";

import type { FC } from 'react';

import { Drawer } from '../../overlays/drawer/Drawer';

import { formatDayFull, formatTime } from './calendarUtils';
import { EVENT_LABEL_CONFIG } from './types';
import type { CalendarEvent } from './types';

interface EventDetailDrawerProps {
  event: CalendarEvent | null;
  open: boolean;
  onClose: () => void;
}

export const EventDetailDrawer: FC<EventDetailDrawerProps> = ({ event, open, onClose }) => {
  if (!event) return null;
  const cfg = EVENT_LABEL_CONFIG[event.label];
  const timeStr = event.allDay
    ? 'All day'
    : `${formatTime(event.start)} – ${formatTime(event.end)}`;

  return (
    <Drawer
      open={open}
      onOpenChange={(o) => { if (!o) onClose(); }}
      title={event.title}
      position="right"
    >
      <div className="flex flex-col gap-5">
        <span
          className="inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold"
          style={{ backgroundColor: cfg.bg, color: cfg.color }}
        >
          <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: cfg.color }} aria-hidden="true" />
          {cfg.display}
        </span>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-ds-3">Date</p>
          <p className="text-sm text-ds-1">{formatDayFull(event.start)}</p>
        </div>

        <div className="flex flex-col gap-1">
          <p className="text-xs font-semibold uppercase tracking-wider text-ds-3">Time</p>
          <p className="text-sm text-ds-1">{timeStr}</p>
        </div>

        {event.location && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-ds-3">Location</p>
            <p className="text-sm text-ds-1">{event.location}</p>
          </div>
        )}

        {event.guests && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-ds-3">Guests</p>
            <p className="text-sm text-ds-1">{event.guests}</p>
          </div>
        )}

        {event.url && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-ds-3">Event URL</p>
            <p className="break-all text-sm text-ds-accent">{event.url}</p>
          </div>
        )}

        {event.description && (
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-ds-3">Description</p>
            <p className="text-sm leading-relaxed text-ds-2">{event.description}</p>
          </div>
        )}
      </div>
    </Drawer>
  );
};
