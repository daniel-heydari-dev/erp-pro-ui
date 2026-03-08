import type { ReactNode } from "react";

export interface AccordionItemConfig {
  id: string;
  title: string;
  content: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  items: AccordionItemConfig[];
  type?: "single" | "multiple";
  defaultOpenIds?: string[];
  value?: string[];
  onValueChange?: (ids: string[]) => void;
  className?: string;
  separated?: boolean;
}
