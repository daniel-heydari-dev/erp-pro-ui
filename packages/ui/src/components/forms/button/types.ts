import type { ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "tertiary";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Legacy alias for the filled primary variant. Prefer `variant`. */
  primary?: boolean;
  /** Visual treatment for action hierarchy. */
  variant?: ButtonVariant;
  /** Custom background color override */
  backgroundColor?: string;
  /** Button size */
  size?: "small" | "medium" | "large";
  /** Text label for the button */
  label?: string;
  /** Children elements (icons, etc.) */
  children?: ReactNode;
}
