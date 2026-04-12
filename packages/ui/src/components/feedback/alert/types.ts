import type { ReactNode } from "react";
import type { CSSProperties } from "react";

export type AlertVariant =
  | "info"
  | "success"
  | "warning"
  | "destructive"
  | "error";

export interface AlertColorOverrides {
  background?: string;
  border?: string;
  icon?: string;
  title?: string;
  description?: string;
}

export interface AlertProps {
  title?: string;
  description?: ReactNode;
  icon?: ReactNode;
  variant?: AlertVariant;
  colorOverrides?: AlertColorOverrides;
  style?: CSSProperties;
  className?: string;
  children?: ReactNode;
}
