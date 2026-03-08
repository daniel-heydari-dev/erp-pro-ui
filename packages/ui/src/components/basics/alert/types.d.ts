import type { ReactNode } from "react";

export type AlertVariant = "info" | "success" | "warning" | "destructive";

export interface AlertProps {
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  variant?: AlertVariant;
  className?: string;
  children?: ReactNode;
}
