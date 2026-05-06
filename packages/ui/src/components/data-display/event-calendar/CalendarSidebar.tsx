"use client";

import type { FC } from 'react';

import { Button } from '../../forms/button';

import { MiniCalendarPicker } from './MiniCalendarPicker';
import { EventFilterList } from './EventFilterList';
import type { EventLabel } from './types';

export interface CalendarSidebarProps {
  currentDate: Date;
  onDateChange: (d: Date) => void;
  onMonthChange: (d: Date) => void;
  activeLabels: EventLabel[];
  onFiltersChange: (labels: EventLabel[]) => void;
  onAddEvent: () => void;
}

export const CalendarSidebarContent: FC<CalendarSidebarProps> = ({
  currentDate,
  onDateChange,
  onMonthChange,
  activeLabels,
  onFiltersChange,
  onAddEvent,
}) => (
  <div className="flex flex-col gap-5">
    <Button
      variant="primary"
      className="w-full"
      onClick={onAddEvent}
      aria-label="Add new event"
    >
      + Add Event
    </Button>

    <MiniCalendarPicker
      currentDate={currentDate}
      onDateChange={onDateChange}
      onMonthChange={onMonthChange}
    />

    <div>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ds-3">
        Event Filters
      </h3>
      <EventFilterList activeLabels={activeLabels} onChange={onFiltersChange} />
    </div>
  </div>
);

export const CalendarSidebar: FC<CalendarSidebarProps> = (props) => (
  <aside className="hidden w-[280px] shrink-0 flex-col border-e border-ds-border-3 bg-ds-surface-1 p-4 lg:flex">
    <CalendarSidebarContent {...props} />
  </aside>
);
