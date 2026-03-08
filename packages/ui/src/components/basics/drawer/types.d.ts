import type { ReactNode } from "react";

export type DrawerPosition = "left" | "right" | "top" | "bottom";

export interface DrawerProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: string;
  description?: ReactNode;
  position?: DrawerPosition;
  children?: ReactNode;
  footer?: ReactNode;
}
