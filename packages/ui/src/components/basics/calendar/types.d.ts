import type { ReactNode } from "react";

export interface CalendarProps {
  value?: Date | null;
  range?: { start: Date | null; end: Date | null };
  selectionMode?: "single" | "range";
  onSelect?: (date: Date) => void;
  onRangeSelect?: (range: { start: Date | null; end: Date | null }) => void;
  month?: number;
  year?: number;
  onMonthChange?: (month: number, year: number) => void;
  footer?: ReactNode;
  className?: string;
}
