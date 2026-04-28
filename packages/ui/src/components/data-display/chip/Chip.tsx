import { forwardRef } from "react";

import { CloseIcon } from "../../icons";
import { TruncatedText } from "../../typography/truncated-text";

export type ChipVariant = "filled" | "outlined" | "soft" | "glass";
export type ChipColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info";
export type ChipSize = "sm" | "md" | "lg";

export interface ChipProps {
  /** The content of the chip */
  children: React.ReactNode;
  /** The variant style of the chip */
  variant?: ChipVariant;
  /** The color scheme of the chip */
  color?: ChipColor;
  /** The size of the chip */
  size?: ChipSize;
  /** Icon or element to display at the start */
  startIcon?: React.ReactNode;
  /** Icon or element to display at the end */
  endIcon?: React.ReactNode;
  /** Makes the chip removable with an X button */
  onRemove?: () => void;
  /** Makes the chip clickable */
  onClick?: () => void;
  /** Whether the chip is disabled */
  disabled?: boolean;
  /** Custom className */
  className?: string;
  /** Whether the chip should have a dot indicator */
  dot?: boolean;
  /** Dot color (uses chip color by default) */
  dotColor?: string;
  /** Maximum width for the chip - text will truncate with ellipsis if exceeded */
  maxWidth?: number | string;
}

const sizeStyles: Record<ChipSize, string> = {
  sm: "px-2.5 py-1 text-xs gap-1.5",
  md: "px-3 py-1.5 text-sm gap-2",
  lg: "px-4 py-2 text-base gap-2.5",
};

const dotSizeStyles: Record<ChipSize, string> = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

const iconSizeStyles: Record<ChipSize, string> = {
  sm: "w-3.5 h-3.5",
  md: "w-4 h-4",
  lg: "w-5 h-5",
};

const colorStyles: Record<ChipVariant, Record<ChipColor, string>> = {
  filled: {
    default: "bg-ds-surface-2 text-ds-1 shadow-sm border border-ds-border-2",
    primary:
      "bg-ds-accent text-ds-on-accent shadow-md shadow-ds-accent/25 border border-ds-border-accent",
    secondary:
      "bg-ds-accent-subtle text-ds-1 shadow-sm border border-ds-border-accent",
    success:
      "bg-ds-state-success-surface text-ds-state-success-text shadow-sm border border-ds-state-success-border",
    warning:
      "bg-ds-state-warning-surface text-ds-state-warning-text shadow-sm border border-ds-state-warning-border",
    error:
      "bg-ds-state-error-surface text-ds-state-error-text shadow-sm border border-ds-state-error-border",
    info: "bg-ds-state-info-surface text-ds-state-info-text shadow-sm border border-ds-state-info-border",
  },
  outlined: {
    default:
      "border-2 border-ds-border-3 text-ds-2 bg-transparent hover:bg-ds-surface-2",
    primary:
      "border-2 border-ds-border-accent bg-transparent text-ds-accent hover:bg-ds-accent-subtle",
    secondary:
      "border-2 border-ds-border-3 text-ds-1 bg-transparent hover:bg-ds-surface-2",
    success:
      "border-2 border-ds-state-success-border text-ds-state-success-text bg-transparent hover:bg-ds-state-success-surface",
    warning:
      "border-2 border-ds-state-warning-border text-ds-state-warning-text bg-transparent hover:bg-ds-state-warning-surface",
    error:
      "border-2 border-ds-state-error-border text-ds-state-error-text bg-transparent hover:bg-ds-state-error-surface",
    info: "border-2 border-ds-state-info-border text-ds-state-info-text bg-transparent hover:bg-ds-state-info-surface",
  },
  soft: {
    default:
      "bg-ds-surface-2 text-ds-1 backdrop-blur-sm border border-ds-border-2",
    primary:
      "border border-ds-border-accent/20 bg-ds-accent-subtle text-ds-1 backdrop-blur-sm",
    secondary:
      "bg-ds-surface-3/30 text-ds-1 backdrop-blur-sm border border-ds-border-3/50",
    success:
      "bg-ds-state-success-surface text-ds-state-success-text backdrop-blur-sm border border-ds-state-success-border/70",
    warning:
      "bg-ds-state-warning-surface text-ds-state-warning-text backdrop-blur-sm border border-ds-state-warning-border/70",
    error:
      "bg-ds-state-error-surface text-ds-state-error-text backdrop-blur-sm border border-ds-state-error-border/70",
    info: "bg-ds-state-info-surface text-ds-state-info-text backdrop-blur-sm border border-ds-state-info-border/70",
  },
  glass: {
    default:
      "bg-ds-surface-1/70 text-ds-1 backdrop-blur-xl border border-ds-border-2/40 shadow-lg",
    primary:
      "border border-ds-border-accent/20 bg-ds-accent/15 text-ds-1 backdrop-blur-xl shadow-lg shadow-ds-accent/10",
    secondary:
      "bg-ds-surface-3/45 text-ds-1 backdrop-blur-xl border border-ds-border-3/50 shadow-lg",
    success:
      "bg-ds-state-success-surface/65 text-ds-state-success-text backdrop-blur-xl border border-ds-state-success-border/60 shadow-lg",
    warning:
      "bg-ds-state-warning-surface/65 text-ds-state-warning-text backdrop-blur-xl border border-ds-state-warning-border/60 shadow-lg",
    error:
      "bg-ds-state-error-surface/65 text-ds-state-error-text backdrop-blur-xl border border-ds-state-error-border/60 shadow-lg",
    info: "bg-ds-state-info-surface/65 text-ds-state-info-text backdrop-blur-xl border border-ds-state-info-border/60 shadow-lg",
  },
};

const dotColorStyles: Record<ChipColor, string> = {
  default: "bg-ds-3",
  primary: "bg-ds-accent",
  secondary: "bg-ds-border-3",
  success: "bg-ds-state-success",
  warning: "bg-ds-state-warning",
  error: "bg-ds-state-danger",
  info: "bg-ds-state-info",
};

const Chip = forwardRef<HTMLSpanElement, ChipProps>(
  (
    {
      children,
      variant = "soft",
      color = "default",
      size = "md",
      startIcon,
      endIcon,
      onRemove,
      onClick,
      disabled = false,
      className = "",
      dot = false,
      dotColor,
      maxWidth,
    },
    ref,
  ) => {
    const isClickable = onClick !== undefined;
    const isRemovable = onRemove !== undefined;

    const baseStyles = `
      inline-flex items-center font-medium rounded-md transition-all duration-200
      ${sizeStyles[size]}
      ${colorStyles[variant][color]}
      ${
        isClickable && !disabled
          ? "cursor-pointer hover:scale-105 hover:shadow-lg active:scale-95"
          : ""
      }
      ${disabled ? "opacity-50 cursor-not-allowed grayscale" : ""}
      ${maxWidth ? "max-w-full" : ""}
      ${className}
    `;

    const handleClick = () => {
      if (!disabled && onClick) {
        onClick();
      }
    };

    const handleRemove = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (!disabled && onRemove) {
        onRemove();
      }
    };

    return (
      <span
        ref={ref}
        className={baseStyles}
        onClick={handleClick}
        role={isClickable ? "button" : undefined}
        tabIndex={isClickable && !disabled ? 0 : undefined}
        style={
          maxWidth
            ? {
                maxWidth:
                  typeof maxWidth === "number" ? `${maxWidth}px` : maxWidth,
              }
            : undefined
        }
        onKeyDown={(e) => {
          if (
            isClickable &&
            !disabled &&
            (e.key === "Enter" || e.key === " ")
          ) {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        {dot && (
          <span
            className={`rounded-full shrink-0 animate-pulse ${
              dotSizeStyles[size]
            } ${dotColor ? "" : dotColorStyles[color]}`}
            style={dotColor ? { backgroundColor: dotColor } : undefined}
          />
        )}
        {startIcon && (
          <span className={`shrink-0 ${iconSizeStyles[size]}`}>
            {startIcon}
          </span>
        )}
        <TruncatedText
          as="span"
          showTitleOnHover
          className="max-w-full font-semibold"
        >
          {children}
        </TruncatedText>
        {endIcon && !isRemovable && (
          <span className={`shrink-0 ${iconSizeStyles[size]}`}>{endIcon}</span>
        )}
        {isRemovable && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className={`
              shrink-0 rounded-full p-0.5 ml-1 transition-all duration-200
              hover:bg-ds-surface-3/35 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1
              ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            `}
            aria-label="Remove"
          >
            <CloseIcon className={iconSizeStyles[size]} aria-hidden="true" />
          </button>
        )}
      </span>
    );
  },
);

Chip.displayName = "Chip";

export default Chip;
export { Chip };
