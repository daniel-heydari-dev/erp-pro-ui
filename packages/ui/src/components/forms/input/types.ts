import type { InputHTMLAttributes, ReactNode } from "react";

export enum InputState {
  DEFAULT = "default",
  DISABLED = "disabled",
  ERROR = "error",
  SUCCESS = "success",
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  /** Text shown in a tooltip on the info icon next to the label. */
  labelTooltip?: string;
  labelHint?: ReactNode;
  error?: string;
  helperText?: string;
  id?: string;
  extra?: string;
  state?: InputState;
  message?: string;
  leftIcon?: ReactNode;
  leftIconClassName?: string;
  rightIcon?: ReactNode;
  rightIconClassName?: string;
  icon?: ReactNode;
  iconClassName?: string;
  /** Custom background classes (e.g. "ui:bg-ds-surface-1"). */
  bgClassName?: string;
}
