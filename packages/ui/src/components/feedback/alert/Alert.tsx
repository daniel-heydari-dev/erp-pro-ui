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
    container:
      "border-[color-mix(in_oklch,var(--ds-color-info)_30%,transparent)] bg-[color-mix(in_oklch,var(--ds-color-info)_14%,transparent)]",
    icon: "text-[var(--ds-color-info)]",
    title: "text-[var(--ds-color-info)]",
    description:
      "text-[color-mix(in_oklch,var(--ds-color-info)_82%,var(--ds-color-fg))]",
  },
  success: {
    container:
      "border-[color-mix(in_oklch,var(--ds-color-success)_34%,transparent)] bg-[color-mix(in_oklch,var(--ds-color-success)_14%,transparent)]",
    icon: "text-[var(--ds-color-success)]",
    title: "text-[var(--ds-color-success)]",
    description:
      "text-[color-mix(in_oklch,var(--ds-color-success)_82%,var(--ds-color-fg))]",
  },
  warning: {
    container:
      "border-[color-mix(in_oklch,var(--ds-color-warning)_38%,transparent)] bg-[color-mix(in_oklch,var(--ds-color-warning)_14%,transparent)]",
    icon: "text-[var(--ds-color-warning)]",
    title: "text-[var(--ds-color-warning)]",
    description:
      "text-[color-mix(in_oklch,var(--ds-color-warning)_84%,var(--ds-color-fg))]",
  },
  destructive: {
    container:
      "border-[color-mix(in_oklch,var(--ds-color-danger)_38%,transparent)] bg-[color-mix(in_oklch,var(--ds-color-danger)_14%,transparent)]",
    icon: "text-[var(--ds-color-danger)]",
    title: "text-[var(--ds-color-danger)]",
    description:
      "text-[color-mix(in_oklch,var(--ds-color-danger)_82%,var(--ds-color-fg))]",
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
  const classes =
    `flex gap-3 rounded-lg border p-4 text-sm ${styles.container}`
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
          <p className={`text-base font-medium ${styles.title}`} style={titleStyle}>
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
