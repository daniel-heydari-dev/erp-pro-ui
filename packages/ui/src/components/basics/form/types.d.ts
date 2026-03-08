import type { FormHTMLAttributes, ReactNode } from "react";

export interface FormProps extends FormHTMLAttributes<HTMLFormElement> {
  title?: string;
  description?: string;
  gap?: "sm" | "md" | "lg";
  className?: string;
}

export interface FormSectionProps {
  title?: string;
  description?: string;
  children?: ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
}

export interface FormFieldProps {
  label: string;
  children?: ReactNode;
  description?: string;
  error?: string;
  required?: boolean;
  htmlFor?: string;
  layout?: "stacked" | "inline";
  helperAction?: ReactNode;
  className?: string;
}

export interface FormActionsProps {
  children?: ReactNode;
  align?: "start" | "center" | "end" | "between";
  className?: string;
}

export interface InputGroupProps {
  children?: ReactNode;
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

export interface FormDescriptionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export interface FormMessageProps {
  children: ReactNode;
  intent?: "default" | "error" | "success";
  className?: string;
  id?: string;
}
