import { useMemo } from "react";

import { Button } from "../../forms/button";
import type { SidebarNavLinkProps } from "./types";

export function NavLink({
  className,
  children,
  style,
  borderRadius,
  disabled = false,
  href,
  target,
  rel,
  onClick,
}: SidebarNavLinkProps) {
  const memoizedStyle = useMemo(
    () => (borderRadius !== undefined ? { ...style, borderRadius } : style),
    [borderRadius, style],
  );

  if (href) {
    const resolvedRel = target === "_blank" ? (rel ?? "noreferrer noopener") : rel;

    return (
      <a
        href={href}
        className={className}
        style={memoizedStyle}
        target={target}
        rel={resolvedRel}
        aria-disabled={disabled}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }

          onClick?.(event);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Button
      type="button"
      variant="tertiary"
      className={className}
      style={memoizedStyle}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}
