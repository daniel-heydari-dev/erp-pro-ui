"use client";

import { useState } from 'react';

import { Drawer } from '../../overlays/drawer/Drawer';
import { mergeClassNames } from '../../../utils';

import { addDays, addMonths, addWeeks } from './calendarUtils';
import { CalendarSidebar, CalendarSidebarContent } from './CalendarSidebar';
import { CalendarHeader } from './CalendarHeader';
import { MonthView } from './views/MonthView';
import { WeekView } from './views/WeekView';
import { DayView } from './views/DayView';
import { ListView } from './views/ListView';
import { AddEventPanel } from './AddEventPanel';
import { EventDetailDrawer } from './EventDetailDrawer';
import { ALL_LABELS } from './types';
import type { CalendarEvent, CalendarView, EventLabel, EventCalendarProps } from './types';

export const EventCalendar = ({
  initialEvents = [],
  initialView = 'month',
  initialDate,
  onEventAdd,
  className,
}: EventCalendarProps) => {
  const [view, setView] = useState<CalendarView>(initialView);
  const [currentDate, setCurrentDate] = useState<Date>(initialDate ?? new Date());
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [activeLabels, setActiveLabels] = useState<EventLabel[]>([...ALL_LABELS]);
  const [isAddPanelOpen, setIsAddPanelOpen] = useState(false);
  const [isSidebarDrawerOpen, setIsSidebarDrawerOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isEventDrawerOpen, setIsEventDrawerOpen] = useState(false);

  const handlePrev = () => {
    if (view === 'month' || view === 'list') setCurrentDate((d) => addMonths(d, -1));
    else if (view === 'week') setCurrentDate((d) => addWeeks(d, -1));
    else setCurrentDate((d) => addDays(d, -1));
  };

  const handleNext = () => {
    if (view === 'month' || view === 'list') setCurrentDate((d) => addMonths(d, 1));
    else if (view === 'week') setCurrentDate((d) => addWeeks(d, 1));
    else setCurrentDate((d) => addDays(d, 1));
  };

  const handleEventSubmit = (event: CalendarEvent) => {
    setEvents((prev) => [...prev, event]);
    onEventAdd?.(event);
    setIsAddPanelOpen(false);
  };

  const handleEventDoubleClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setIsEventDrawerOpen(true);
  };

  const filteredEvents = events.filter((e) => activeLabels.includes(e.label));

  const handleDayClick = (day: Date) => {
    setCurrentDate(day);
    setView('day');
  };

  const sidebarProps = {
    currentDate,
    onDateChange: (d: Date) => setCurrentDate(d),
    onMonthChange: (d: Date) => setCurrentDate(d),
    activeLabels,
    onFiltersChange: setActiveLabels,
    onAddEvent: () => {
      setIsSidebarDrawerOpen(false);
      setIsAddPanelOpen(true);
    },
  };

  return (
    <div className={mergeClassNames('flex h-full overflow-hidden rounded-xl border border-ds-border-3 bg-ds-surface-1', className)}>
      {/* Inline sidebar — hidden on mobile, visible on lg+ */}
      <CalendarSidebar {...sidebarProps} />

      {/* Sidebar Drawer — mobile only */}
      <Drawer
        open={isSidebarDrawerOpen}
        onOpenChange={setIsSidebarDrawerOpen}
        title="Calendar"
        position="left"
      >
        <CalendarSidebarContent {...sidebarProps} />
      </Drawer>

      <main className="flex flex-1 flex-col overflow-hidden">
        <CalendarHeader
          view={view}
          currentDate={currentDate}
          onPrev={handlePrev}
          onNext={handleNext}
          onViewChange={setView}
          onSidebarToggle={() => setIsSidebarDrawerOpen(true)}
        />

        {view === 'month' && (
          <MonthView
            currentDate={currentDate}
            events={filteredEvents}
            onDayClick={handleDayClick}
            onEventDoubleClick={handleEventDoubleClick}
          />
        )}
        {view === 'week' && (
          <WeekView
            currentDate={currentDate}
            events={filteredEvents}
            onEventDoubleClick={handleEventDoubleClick}
          />
        )}
        {view === 'day' && (
          <DayView
            currentDate={currentDate}
            events={filteredEvents}
            onEventDoubleClick={handleEventDoubleClick}
          />
        )}
        {view === 'list' && (
          <ListView
            currentDate={currentDate}
            events={filteredEvents}
            onEventDoubleClick={handleEventDoubleClick}
          />
        )}
      </main>

      <AddEventPanel
        isOpen={isAddPanelOpen}
        onClose={() => setIsAddPanelOpen(false)}
        onSubmit={handleEventSubmit}
        initialDate={currentDate}
      />

      <EventDetailDrawer
        event={selectedEvent}
        open={isEventDrawerOpen}
        onClose={() => setIsEventDrawerOpen(false)}
      />
    </div>
  );
};
