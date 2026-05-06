"use client";

import type { FC, KeyboardEvent } from 'react';

import { Tooltip } from '../../overlays/tooltip/Tooltip';
import { TruncatedText } from '../../typography/truncated-text/TruncatedText';

import { formatDayFull, formatTime } from './calendarUtils';
import { EVENT_LABEL_CONFIG } from './types';
import type { CalendarEvent } from './types';

interface EventPillProps {
  event: CalendarEvent;
  compact?: boolean;
  onDoubleClick?: (event: CalendarEvent) => void;
}

export const EventPill: FC<EventPillProps> = ({ event, compact = false, onDoubleClick }) => {
  const cfg = EVENT_LABEL_CONFIG[event.label];
  const timeStr = event.allDay
    ? 'All day'
    : `${formatTime(event.start)} – ${formatTime(event.end)}`;

  const tooltipContent = (
    <div className="flex min-w-0 flex-col gap-1.5">
      <span className="font-semibold leading-snug text-ds-1">{event.title}</span>
      <div className="flex items-center gap-1.5">
        <span
          className="h-2 w-2 shrink-0 rounded-full"
          style={{ backgroundColor: cfg.color }}
          aria-hidden="true"
        />
        <span className="text-xs text-ds-2">{cfg.display}</span>
      </div>
      <span className="text-xs text-ds-3">{formatDayFull(event.start)}</span>
      <span className="text-xs text-ds-3">{timeStr}</span>
      {event.location && <span className="text-xs text-ds-3">{event.location}</span>}
    </div>
  );

  return (
    <Tooltip content={tooltipContent} position="top" delayShow={500} wrapperClassName="w-full min-w-0">
      <div
        className={`w-full min-w-0 cursor-pointer select-none rounded font-medium leading-none ${
          compact ? 'px-1.5 py-1 text-[11px]' : 'px-2 py-1.5 text-xs'
        }`}
        style={{ backgroundColor: cfg.bg, color: cfg.color }}
        role="button"
        tabIndex={0}
        aria-label={`${event.title} – ${cfg.display}`}
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => {
          e.stopPropagation();
          onDoubleClick?.(event);
        }}
        onKeyDown={(e: KeyboardEvent) => {
          if (e.key === 'Enter') onDoubleClick?.(event);
        }}
      >
        <TruncatedText showTitleOnHover={false}>{event.title}</TruncatedText>
      </div>
    </Tooltip>
  );
};
