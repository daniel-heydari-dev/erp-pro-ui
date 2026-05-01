import type { ButtonProps, ButtonVariant } from "./types";

const baseClasses = `
  inline-flex
  items-center
  justify-center
  gap-2
  cursor-pointer
  rounded-lg
  font-semibold
  leading-none
  transition-all
  duration-200
  ease-in-out
  active:scale-99
  hover:opacity-90
  disabled:opacity-50
  disabled:cursor-not-allowed
`;
const variantClassMap = {
  primary: "bg-ds-accent hover:bg-ds-accent-hover text-ds-on-accent shadow-2",
  secondary:
    "bg-ds-surface-1 border border-ds-border-2 text-ds-1 shadow-1 hover:border-ds-border-1 hover:bg-ds-canvas",
  tertiary:
    "bg-transparent text-ds-1 shadow-none hover:bg-ds-canvas/70 hover:text-ds-1 border border-transparent",
} satisfies Record<ButtonVariant, string>;
const sizeClassMap = {
  small: "py-2 px-3 text-xs",
  medium: "py-2.5 px-4 text-sm",
  large: "py-3 px-6 text-base",
};

export const Button = ({
  primary = false,
  variant,
  size = "medium",
  backgroundColor,
  label,
  children,
  type = "button",
  className = "",
  ...props
}: ButtonProps) => {
  const resolvedVariant = variant ?? (primary ? "primary" : "secondary");
  const variantClasses = variantClassMap[resolvedVariant];
  const sizeClasses =
    sizeClassMap[size as keyof typeof sizeClassMap] || sizeClassMap.medium;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`.trim()}
      style={backgroundColor ? { backgroundColor } : undefined}
      {...props}
    >
      {children}
      {label && <span>{label}</span>}
    </button>
  );
};
