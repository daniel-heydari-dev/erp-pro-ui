import { Children, cloneElement, isValidElement, useId } from "react";
import type { ReactElement } from "react";

import type {
  FormProps,
  FormSectionProps,
  FormFieldProps,
  FormActionsProps,
  InputGroupProps,
  FormDescriptionProps,
  FormMessageProps,
} from "./types";

const cx = (...classes: Array<string | false | undefined>) =>
  classes.filter(Boolean).join(" ").replace(/\s+/g, " ").trim();

const gapClassMap: Record<NonNullable<FormProps["gap"]>, string> = {
  sm: "space-y-4",
  md: "space-y-6",
  lg: "space-y-8",
};

const sectionColumnsMap: Record<
  NonNullable<FormSectionProps["columns"]>,
  string
> = {
  1: "space-y-4",
  2: "grid grid-cols-2 gap-4",
  3: "grid grid-cols-3 gap-4",
};

const inputGroupMap: Record<NonNullable<InputGroupProps["columns"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

const actionsAlignMap: Record<
  NonNullable<FormActionsProps["align"]>,
  string
> = {
  start: "justify-start",
  center: "justify-center",
  end: "justify-end",
  between: "justify-between",
};

const messageIntentMap: Record<
  NonNullable<FormMessageProps["intent"]>,
  string
> = {
  default: "text-ds-2",
  error: "text-destructive",
  success: "text-success",
};

const sanitizeId = (value: string) => value.replace(/[^a-zA-Z0-9_-]/g, "-");

export const Form = ({
  title,
  description,
  gap = "lg",
  children,
  className = "",
  ...props
}: FormProps) => {
  return (
    <form
      className={cx(
        "w-full space-y-6 rounded-lg border border-ds-border-2 bg-ds-surface-1 p-6",
        className,
      )}
      {...props}
    >
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h2 className="text-xl font-semibold text-ds-1">{title}</h2>
          )}
          {description && <p className="text-sm text-ds-2">{description}</p>}
        </div>
      )}
      <div className={gapClassMap[gap]}>{children}</div>
    </form>
  );
};

export const FormSection = ({
  title,
  description,
  columns = 1,
  children,
  className = "",
}: FormSectionProps) => {
  return (
    <section className={cx("space-y-4", className)}>
      {(title || description) && (
        <header className="space-y-1">
          {title && (
            <h3 className="text-base font-medium text-ds-1">{title}</h3>
          )}
          {description && <p className="text-sm text-ds-2">{description}</p>}
        </header>
      )}
      <div className={sectionColumnsMap[columns] || sectionColumnsMap[1]}>
        {children}
      </div>
    </section>
  );
};

export const FormDescription = ({
  children,
  className = "",
  id,
}: FormDescriptionProps) => (
  <p id={id} className={cx("text-sm text-ds-2", className)}>
    {children}
  </p>
);

export const FormMessage = ({
  children,
  intent = "default",
  className = "",
  id,
}: FormMessageProps) => (
  <p
    id={id}
    role={intent === "error" ? "alert" : "status"}
    className={cx("text-sm", messageIntentMap[intent], className)}
  >
    {children}
  </p>
);

export const FormField = ({
  label,
  description,
  error,
  required,
  htmlFor,
  helperAction,
  layout = "stacked",
  children,
  className = "",
}: FormFieldProps) => {
  const autoId = useId();
  const fieldId = sanitizeId(htmlFor ?? autoId);
  const descriptionId = description ? `${fieldId}-description` : undefined;
  const errorId = error ? `${fieldId}-error` : undefined;

  const controls = Children.map(children, (child) => {
    if (!isValidElement(child)) {
      return child;
    }

    const element = child as ReactElement<Record<string, unknown>>;
    const currentDescribedBy = element.props?.["aria-describedby"] as
      | string
      | undefined;
    const describedBy = [currentDescribedBy, descriptionId, errorId]
      .filter(Boolean)
      .join(" ")
      .trim();

    return cloneElement(element, {
      id: element.props?.id ?? fieldId,
      "aria-describedby": describedBy || undefined,
      "aria-invalid": element.props?.["aria-invalid"] ?? Boolean(error),
    });
  });

  const labelNode = (
    <div className="flex items-center justify-between gap-2">
      <label htmlFor={fieldId} className="text-sm font-medium text-ds-1">
        {label}
        {required && <span className="ms-1 text-destructive">*</span>}
      </label>
      {helperAction && <div className="text-xs text-ds-2">{helperAction}</div>}
    </div>
  );

  if (layout === "inline") {
    return (
      <div className={cx("flex flex-wrap items-start gap-6", className)}>
        <div className="min-w-[200px] space-y-1">
          {labelNode}
          {description && (
            <FormDescription id={descriptionId}>{description}</FormDescription>
          )}
        </div>
        <div className="flex-1 space-y-2">
          {controls}
          {error && (
            <FormMessage id={errorId} intent="error">
              {error}
            </FormMessage>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={cx("space-y-2", className)}>
      {labelNode}
      {description && (
        <FormDescription id={descriptionId}>{description}</FormDescription>
      )}
      <div className="space-y-2">
        {controls}
        {error && (
          <FormMessage id={errorId} intent="error">
            {error}
          </FormMessage>
        )}
      </div>
    </div>
  );
};

export const FormActions = ({
  children,
  align = "end",
  className = "",
}: FormActionsProps) => (
  <div
    className={cx("flex flex-wrap gap-3", actionsAlignMap[align], className)}
  >
    {children}
  </div>
);

export const InputGroup = ({
  columns = 2,
  children,
  className = "",
}: InputGroupProps) => (
  <div className={cx("grid gap-4", inputGroupMap[columns], className)}>
    {children}
  </div>
);
