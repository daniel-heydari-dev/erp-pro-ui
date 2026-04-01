import { InfoCircleIcon } from "../../icons";
import type { AlertProps } from "./types";

const variantClasses: Record<NonNullable<AlertProps["variant"]>, string> = {
  info: "border-info-border bg-info-subtle",
  success: "border-success-border bg-success-subtle",
  warning: "border-warning-border bg-warning-subtle",
  destructive: "border-danger-border bg-danger-subtle",
};

const defaultIcon = <InfoCircleIcon className="h-5 w-5" aria-hidden="true" />;

export const Alert = ({
  title,
  description,
  icon = defaultIcon,
  variant = "info",
  className = "",
  children,
}: AlertProps) => {
  const classes =
    `flex gap-3 rounded-lg border p-4 text-sm text-foreground ${variantClasses[variant]}`
      .concat(" ", className)
      .trim();

  return (
    <div
      className={classes}
      role={variant === "destructive" ? "alert" : "status"}
    >
      <span className="text-heading">{icon}</span>
      <div className="space-y-1">
        {title && <p className="text-base font-medium text-heading">{title}</p>}
        {description && <p className="text-muted-foreground">{description}</p>}
        {children}
      </div>
    </div>
  );
};
