import { InfoCircleIcon } from "../../icons";
import type { AlertProps } from "./types";
import type { CSSProperties } from "react";

type ResolvedAlertVariant = "info" | "success" | "warning" | "destructive";

const variantStyles: Record<
  ResolvedAlertVariant,
  {
    container: string;
    icon: string;
    title: string;
    description: string;
  }
> = {
  info: {
    container: "border-ds-state-info-border bg-ds-state-info-surface",
    icon: "text-ds-state-info-text",
    title: "text-ds-state-info-text",
    description: "text-ds-1",
  },
  success: {
    container: "border-ds-state-success-border bg-ds-state-success-surface",
    icon: "text-ds-state-success-text",
    title: "text-ds-state-success-text",
    description: "text-ds-1",
  },
  warning: {
    container: "border-ds-state-warning-border bg-ds-state-warning-surface",
    icon: "text-ds-state-warning-text",
    title: "text-ds-state-warning-text",
    description: "text-ds-1",
  },
  destructive: {
    container: "border-ds-state-error-border bg-ds-state-error-surface",
    icon: "text-ds-state-error-text",
    title: "text-ds-state-error-text",
    description: "text-ds-1",
  },
};

const defaultIcon = <InfoCircleIcon className="h-5 w-5" aria-hidden="true" />;

export const Alert = ({
  title,
  description,
  icon = defaultIcon,
  variant = "info",
  colorOverrides,
  style,
  className = "",
  children,
}: AlertProps) => {
  const resolvedVariant: ResolvedAlertVariant =
    variant === "error" ? "destructive" : variant;
  const styles = variantStyles[resolvedVariant];
  const classes = `flex gap-3 rounded-lg border p-4 text-sm ${styles.container}`
    .concat(" ", className)
    .trim();
  const containerStyle: CSSProperties = {
    ...style,
    ...(colorOverrides?.background
      ? { backgroundColor: colorOverrides.background }
      : {}),
    ...(colorOverrides?.border ? { borderColor: colorOverrides.border } : {}),
  };
  const iconStyle: CSSProperties = colorOverrides?.icon
    ? { color: colorOverrides.icon }
    : {};
  const titleStyle: CSSProperties = colorOverrides?.title
    ? { color: colorOverrides.title }
    : {};
  const descriptionStyle: CSSProperties = colorOverrides?.description
    ? { color: colorOverrides.description }
    : {};

  return (
    <div
      className={classes}
      style={containerStyle}
      role={resolvedVariant === "destructive" ? "alert" : "status"}
    >
      <span className={styles.icon} style={iconStyle}>
        {icon}
      </span>
      <div className="space-y-1">
        {title && (
          <p
            className={`text-base font-medium ${styles.title}`}
            style={titleStyle}
          >
            {title}
          </p>
        )}
        {description && (
          <p className={styles.description} style={descriptionStyle}>
            {description}
          </p>
        )}
        {children}
      </div>
    </div>
  );
};
