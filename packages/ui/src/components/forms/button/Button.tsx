import type { ButtonProps } from "./types";

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
  active:scale-95
  hover:opacity-90
  disabled:opacity-50
  disabled:cursor-not-allowed
`;
const variantClassMap = {
  primary: "bg-accent hover:bg-accent-hover text-on-accent shadow-2",
  secondary:
    "bg-surface border border-border text-fg shadow-1 hover:border-border-strong hover:bg-canvas",
};
const sizeClassMap = {
  small: "py-2 px-3 text-xs",
  medium: "py-2.5 px-4 text-sm",
  large: "py-3 px-6 text-base",
};

export const Button = ({
  primary = false,
  size = "medium",
  backgroundColor,
  label,
  children,
  type = "button",
  className = "",
  ...props
}: ButtonProps) => {
  const variantClasses = variantClassMap[primary ? "primary" : "secondary"];
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
