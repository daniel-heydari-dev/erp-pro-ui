"use client";

import type { FC } from 'react';

import { Button } from '../../forms/button';
import { mergeClassNames } from '../../../utils';

import {
  formatMonthYear,
  formatWeekRange,
  formatDayFull,
} from './calendarUtils';
import type { CalendarView } from './types';

interface CalendarHeaderProps {
  view: CalendarView;
  currentDate: Date;
  onPrev: () => void;
  onNext: () => void;
  onViewChange: (v: CalendarView) => void;
  onSidebarToggle?: () => void;
}

const VIEWS: { value: CalendarView; label: string }[] = [
  { value: 'month', label: 'Month' },
  { value: 'week', label: 'Week' },
  { value: 'day', label: 'Day' },
  { value: 'list', label: 'List' },
];

function getTitle(view: CalendarView, date: Date): string {
  if (view === 'month' || view === 'list') return formatMonthYear(date);
  if (view === 'week') return formatWeekRange(date);
  return formatDayFull(date);
}

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const MenuIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export const CalendarHeader: FC<CalendarHeaderProps> = ({
  view,
  currentDate,
  onPrev,
  onNext,
  onViewChange,
  onSidebarToggle,
}) => (
  <header className="flex items-center justify-between border-b border-ds-border-3 bg-ds-surface-1 px-4 py-3">
    <div className="flex items-center gap-2">
      {onSidebarToggle && (
        <Button
          variant="secondary"
          size="small"
          className="h-8 w-8 p-0! hover:opacity-100 lg:hidden"
          aria-label="Toggle calendar sidebar"
          onClick={onSidebarToggle}
        >
          <MenuIcon />
        </Button>
      )}
      <Button
        variant="secondary"
        size="small"
        className="h-8 w-8 p-0! hover:opacity-100"
        aria-label="Previous period"
        onClick={onPrev}
      >
        <ChevronLeft />
      </Button>
      <Button
        variant="secondary"
        size="small"
        className="h-8 w-8 p-0! hover:opacity-100"
        aria-label="Next period"
        onClick={onNext}
      >
        <ChevronRight />
      </Button>
      <h2 className="ms-1 text-base font-semibold text-ds-1">
        {getTitle(view, currentDate)}
      </h2>
    </div>

    <div className="flex rounded-lg border border-ds-border-2 bg-ds-surface-2 p-0.5" role="tablist" aria-label="Calendar view">
      {VIEWS.map(({ value, label }) => (
        <Button
          key={value}
          variant="tertiary"
          size="small"
          role="tab"
          aria-selected={view === value}
          onClick={() => onViewChange(value)}
          className={mergeClassNames(
            'rounded-md px-3 py-1.5 text-xs font-medium hover:opacity-100',
            view === value
              ? 'bg-ds-surface-1 text-ds-1 shadow-1'
              : 'text-ds-3 hover:text-ds-2',
          )}
        >
          {label}
        </Button>
      ))}
    </div>
  </header>
);
