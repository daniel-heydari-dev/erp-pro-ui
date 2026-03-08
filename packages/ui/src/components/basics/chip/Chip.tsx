import { forwardRef } from "react";

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
    default:
      "bg-gradient-to-br from-neutral-100 to-neutral-200 text-neutral-800 shadow-sm dark:from-neutral-700 dark:to-neutral-800 dark:text-neutral-100 border border-neutral-200 dark:border-neutral-600",
    primary:
      "bg-gradient-to-br from-primary-500 to-primary-600 text-white shadow-md shadow-primary-500/30 dark:shadow-primary-500/20",
    secondary:
      "bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md shadow-purple-500/30 dark:shadow-purple-500/20",
    success:
      "bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md shadow-green-500/30 dark:shadow-green-500/20",
    warning:
      "bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/30 dark:shadow-amber-500/20",
    error:
      "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-md shadow-red-500/30 dark:shadow-red-500/20",
    info: "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md shadow-blue-500/30 dark:shadow-blue-500/20",
  },
  outlined: {
    default:
      "border-2 border-neutral-300 text-neutral-700 bg-transparent dark:border-neutral-600 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800/50",
    primary:
      "border-2 border-primary-500 text-primary-600 bg-transparent dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20",
    secondary:
      "border-2 border-purple-500 text-purple-600 bg-transparent dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20",
    success:
      "border-2 border-green-500 text-green-600 bg-transparent dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20",
    warning:
      "border-2 border-amber-500 text-amber-600 bg-transparent dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20",
    error:
      "border-2 border-red-500 text-red-600 bg-transparent dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20",
    info: "border-2 border-blue-500 text-blue-600 bg-transparent dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20",
  },
  soft: {
    default:
      "bg-neutral-100 text-neutral-800 dark:bg-neutral-800/60 dark:text-neutral-200 backdrop-blur-sm border border-neutral-200/50 dark:border-neutral-700/50",
    primary:
      "bg-primary-100 text-primary-700 dark:bg-primary-900/40 dark:text-primary-300 backdrop-blur-sm border border-primary-200/50 dark:border-primary-800/50",
    secondary:
      "bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 backdrop-blur-sm border border-purple-200/50 dark:border-purple-800/50",
    success:
      "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300 backdrop-blur-sm border border-green-200/50 dark:border-green-800/50",
    warning:
      "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/50",
    error:
      "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300 backdrop-blur-sm border border-red-200/50 dark:border-red-800/50",
    info: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50",
  },
  glass: {
    default:
      "bg-white/70 text-neutral-800 dark:bg-neutral-800/70 dark:text-neutral-100 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-lg",
    primary:
      "bg-primary-500/20 text-primary-700 dark:bg-primary-500/30 dark:text-primary-200 backdrop-blur-xl border border-primary-300/30 dark:border-primary-400/20 shadow-lg shadow-primary-500/10",
    secondary:
      "bg-purple-500/20 text-purple-700 dark:bg-purple-500/30 dark:text-purple-200 backdrop-blur-xl border border-purple-300/30 dark:border-purple-400/20 shadow-lg shadow-purple-500/10",
    success:
      "bg-green-500/20 text-green-700 dark:bg-green-500/30 dark:text-green-200 backdrop-blur-xl border border-green-300/30 dark:border-green-400/20 shadow-lg shadow-green-500/10",
    warning:
      "bg-amber-500/20 text-amber-700 dark:bg-amber-500/30 dark:text-amber-200 backdrop-blur-xl border border-amber-300/30 dark:border-amber-400/20 shadow-lg shadow-amber-500/10",
    error:
      "bg-red-500/20 text-red-700 dark:bg-red-500/30 dark:text-red-200 backdrop-blur-xl border border-red-300/30 dark:border-red-400/20 shadow-lg shadow-red-500/10",
    info: "bg-blue-500/20 text-blue-700 dark:bg-blue-500/30 dark:text-blue-200 backdrop-blur-xl border border-blue-300/30 dark:border-blue-400/20 shadow-lg shadow-blue-500/10",
  },
};

const dotColorStyles: Record<ChipColor, string> = {
  default: "bg-neutral-500 dark:bg-neutral-400",
  primary: "bg-primary-500",
  secondary: "bg-purple-500",
  success: "bg-green-500",
  warning: "bg-amber-500",
  error: "bg-red-500",
  info: "bg-blue-500",
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
    ref
  ) => {
    const isClickable = onClick !== undefined;
    const isRemovable = onRemove !== undefined;

    const baseStyles = `
      inline-flex items-center font-medium rounded-full transition-all duration-200
      ${sizeStyles[size]}
      ${colorStyles[variant][color]}
      ${isClickable && !disabled
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
            className={`rounded-full flex-shrink-0 animate-pulse ${dotSizeStyles[size]
              } ${dotColor ? "" : dotColorStyles[color]}`}
            style={dotColor ? { backgroundColor: dotColor } : undefined}
          />
        )}
        {startIcon && (
          <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>
            {startIcon}
          </span>
        )}
        <span className="truncate font-semibold">{children}</span>
        {endIcon && !isRemovable && (
          <span className={`flex-shrink-0 ${iconSizeStyles[size]}`}>
            {endIcon}
          </span>
        )}
        {isRemovable && (
          <button
            type="button"
            onClick={handleRemove}
            disabled={disabled}
            className={`
              flex-shrink-0 rounded-full p-0.5 ml-1 transition-all duration-200
              hover:bg-black/20 dark:hover:bg-white/20 hover:scale-110
              focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-1
              ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
            `}
            aria-label="Remove"
          >
            <svg
              className={iconSizeStyles[size]}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}
      </span>
    );
  }
);

Chip.displayName = "Chip";

export default Chip;
export { Chip };

