import type { ReactNode } from "react";

export type TabsDirection = "auto" | "ltr" | "rtl";

export interface TabsItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  items: readonly TabsItem[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  dir?: TabsDirection;
  className?: string;
  listClassName?: string;
  triggerClassName?: string;
  panelClassName?: string;
  animationDurationMs?: number;
}
