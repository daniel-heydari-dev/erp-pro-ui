import type { AlertProps } from "./types";

const variantClasses: Record<NonNullable<AlertProps["variant"]>, string> = {
  info: "border-ring bg-ring/10",
  success: "border-emerald-500 bg-emerald-500/10",
  warning: "border-amber-500 bg-amber-500/10",
  destructive: "border-destructive bg-destructive/10",
};

const defaultIcon = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M12 8v5m0 4h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

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
        {title && (
          <p className="text-base font-medium text-heading">{title}</p>
        )}
        {description && (
          <p className="text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </div>
  );
};
