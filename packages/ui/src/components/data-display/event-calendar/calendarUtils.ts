import type { CalendarEvent } from './types';

export const GRID_START_HOUR = 6;
export const GRID_END_HOUR = 22;
export const HOUR_HEIGHT_PX = 80;

export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function isToday(date: Date): boolean {
  return isSameDay(date, new Date());
}

export function addDays(date: Date, n: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + n);
  return d;
}

export function addMonths(date: Date, n: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + n);
  return d;
}

export function addWeeks(date: Date, n: number): Date {
  return addDays(date, n * 7);
}

export function startOfWeek(date: Date): Date {
  const d = new Date(date);
  d.setDate(d.getDate() - d.getDay());
  d.setHours(0, 0, 0, 0);
  return d;
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

export function getMonthGridDays(date: Date): Date[] {
  const first = startOfMonth(date);
  const gridStart = startOfWeek(first);
  return Array.from({ length: 42 }, (_, i) => addDays(gridStart, i));
}

export function getWeekDays(date: Date): Date[] {
  const sunday = startOfWeek(date);
  return Array.from({ length: 7 }, (_, i) => addDays(sunday, i));
}

export function getEventsForDay(events: CalendarEvent[], day: Date): CalendarEvent[] {
  const dayStart = new Date(day);
  dayStart.setHours(0, 0, 0, 0);
  const dayEnd = new Date(day);
  dayEnd.setHours(23, 59, 59, 999);
  return events.filter((e) => e.start <= dayEnd && e.end >= dayStart);
}

export function formatMonthYear(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function formatWeekRange(date: Date): string {
  const days = getWeekDays(date);
  const start = days[0]!;
  const end = days[6]!;
  const startStr = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  const endStr =
    start.getMonth() === end.getMonth()
      ? end.getDate().toString()
      : end.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
  return `${startStr}–${endStr}, ${end.getFullYear()}`;
}

export function formatDayFull(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatShortDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}`;
}

export function formatHour(h: number): string {
  if (h === 0) return '12AM';
  if (h === 12) return '12PM';
  return h < 12 ? `${h}AM` : `${h - 12}PM`;
}

export function formatTime(date: Date): string {
  let h = date.getHours();
  const m = date.getMinutes();
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12 || 12;
  const mm = m.toString().padStart(2, '0');
  return `${h}:${mm}${ampm}`;
}

export function formatListDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function formatListDayName(date: Date): string {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
}

export function generateId(): string {
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

export function getEventTopPx(event: CalendarEvent): number {
  const startH = event.start.getHours() + event.start.getMinutes() / 60;
  return (startH - GRID_START_HOUR) * HOUR_HEIGHT_PX;
}

export function getEventHeightPx(event: CalendarEvent): number {
  const startH = event.start.getHours() + event.start.getMinutes() / 60;
  const endH = event.end.getHours() + event.end.getMinutes() / 60;
  const clampedEnd = Math.min(endH, GRID_END_HOUR);
  const clampedStart = Math.max(startH, GRID_START_HOUR);
  return Math.max((clampedEnd - clampedStart) * HOUR_HEIGHT_PX, 20);
}
