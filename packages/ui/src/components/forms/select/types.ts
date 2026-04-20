import type { SelectHTMLAttributes } from "react";

export type SelectSize = "default" | "compact";
export type SelectSelectionIndicator = "check" | "none";

export interface SelectProps extends Omit<
  SelectHTMLAttributes<HTMLSelectElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  noOptionsText?: string;
  bgClassName?: string;
  containerClassName?: string;
  triggerClassName?: string;
  dropdownClassName?: string;
  optionClassName?: string;
  size?: SelectSize;
  selectionIndicator?: SelectSelectionIndicator;
  options: Array<{ value: string; label: string }>;
}
