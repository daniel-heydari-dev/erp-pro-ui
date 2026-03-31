import type { InputHTMLAttributes } from "react";

export type RadioColor =
  | "red"
  | "blue"
  | "green"
  | "yellow"
  | "teal"
  | "primary";

export interface RadioProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "type"
> {
  label?: string;
  error?: string;
  /** Color variant for the checked state */
  color?: RadioColor;
  /** Custom background class for the radio button */
  bgClassName?: string;
}
