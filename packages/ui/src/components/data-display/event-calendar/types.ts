export type CalendarView = 'month' | 'week' | 'day' | 'list';
export type EventLabel = 'personal' | 'business' | 'family' | 'holiday' | 'etc';

export interface CalendarEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
  label: EventLabel;
  url?: string;
  guests?: string;
  location?: string;
  description?: string;
}

export interface EventCalendarProps {
  initialEvents?: CalendarEvent[];
  initialView?: CalendarView;
  initialDate?: Date;
  onEventAdd?: (event: CalendarEvent) => void;
  onEventUpdate?: (event: CalendarEvent) => void;
  onEventDelete?: (id: string) => void;
  className?: string;
}

export const EVENT_LABEL_CONFIG = {
  personal: { display: 'Personal', color: 'var(--ds-color-danger)',  bg: 'var(--ds-color-danger-subtle)' },
  business: { display: 'Business', color: 'var(--ds-color-accent)',  bg: 'var(--ds-color-accent-subtle)' },
  family:   { display: 'Family',   color: 'var(--ds-color-warning)', bg: 'var(--ds-color-warning-subtle)' },
  holiday:  { display: 'Holiday',  color: 'var(--ds-color-success)', bg: 'var(--ds-color-success-subtle)' },
  etc:      { display: 'ETC',      color: 'var(--ds-color-info)',    bg: 'var(--ds-color-info-subtle)' },
} as const;

export const ALL_LABELS: EventLabel[] = ['personal', 'business', 'family', 'holiday', 'etc'];
