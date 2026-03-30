import type { InputHTMLAttributes, ReactNode } from 'react';

export enum InputState {
  DEFAULT = 'default',
  DISABLED = 'disabled',
  ERROR = 'error',
  SUCCESS = 'success',
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  id?: string;
  extra?: string;
  state?: InputState;
  message?: string;
  icon?: ReactNode;
  iconClassName?: string;
  /** Custom background classes for light/dark mode (e.g. "ui:bg-white ui:dark:bg-zinc-900") */
  bgClassName?: string;
}
