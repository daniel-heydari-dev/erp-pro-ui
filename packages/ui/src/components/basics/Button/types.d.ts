import type { ButtonHTMLAttributes, ReactNode } from "react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Use primary style (filled) or secondary (glass) */
  primary?: boolean;
  /** Custom background color override */
  backgroundColor?: string;
  /** Button size */
  size?: "small" | "medium" | "large";
  /** Text label for the button */
  label?: string;
  /** Children elements (icons, etc.) */
  children?: ReactNode;
}
