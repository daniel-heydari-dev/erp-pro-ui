import type { InputHTMLAttributes } from 'react';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
  error?: string;
  extra?: string;
  // Accepts predefined color names OR any custom color string (hex, rgb, etc.)
  color?: "red" | "blue" | "green" | "yellow" | "teal" | "primary" | string;
}

