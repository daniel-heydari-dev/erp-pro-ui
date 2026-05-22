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
  /** Hide the month/year navigation bar — for externally controlled dual-month views. */
  showNav?: boolean;
  /** Hovered date for range preview painting. */
  hoverDate?: Date | null;
  /** Called when a day cell is hovered or the grid is left. */
  onHoverDate?: (date: Date | null) => void;
}
