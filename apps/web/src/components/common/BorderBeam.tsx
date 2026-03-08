import React from 'react';

interface BorderBeamProps {
  className?: string;
  size?: number;
  duration?: number;
  borderWidth?: number;
  anchor?: number;
  colorFrom?: string;
  colorTo?: string;
  delay?: number;
}

export const BorderBeam: React.FC<BorderBeamProps> = ({
  className = "",
  size = 200,
  duration = 15,
  anchor = 90,
  borderWidth = 0.5,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  delay = 0,
}) => {
  return (
    <div
      style={
        {
          "--size": `${size}px`,
          "--duration": `${duration}s`,
          "--anchor": `${anchor}`,
          "--border-width": `${borderWidth}px`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--delay": `-${delay}s`,
        } as React.CSSProperties
      }
      className={`border-beam ${className}`}
    />
  );
};
