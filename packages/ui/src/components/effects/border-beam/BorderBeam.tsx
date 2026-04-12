import type { CSSProperties } from "react";

export interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export function BorderBeam({
  className = "",
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 0.5,
  colorFrom = "var(--ds-color-accent)",
  colorTo = "var(--ds-color-accent-hover)",
  delay = 0,
}: BorderBeamProps) {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}`,
          "--border-width": `${borderWidth}px`,
          "--beam-color-from": colorFrom,
          "--beam-color-to": colorTo,
          "--delay": `-${delay}s`,
        } as CSSProperties
      }
      className={`border-beam ${className}`}
    />
  );
}
