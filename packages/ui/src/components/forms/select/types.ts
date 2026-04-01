import type { SelectHTMLAttributes } from "react";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  helperText?: string;
  placeholder?: string;
  bgClassName?: string;
  containerClassName?: string;
  triggerClassName?: string;
  options: Array<{ value: string; label: string }>;
}
