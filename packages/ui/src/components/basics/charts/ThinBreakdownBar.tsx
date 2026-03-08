"use client";

import React from "react";

export interface BreakdownSegment {
  id?: string;
  label: string;
  value: number; // The absolute value or percentage
  color: string;
}

interface ThinBreakdownBarProps {
  data: BreakdownSegment[];
  className?: string;
  showLabels?: boolean;
}

export const ThinBreakdownBar: React.FC<ThinBreakdownBarProps> = ({
  data: segments,
  className = "",
  showLabels = true,
}) => {
  // Calculate total to determine percentage widths
  const total = segments.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {/* The Bar Track */}
      <div className="flex w-full h-3 rounded-full overflow-hidden gap-1 bg-neutral-900/50">
        {segments.map((segment, index) => {
          const widthPercent = total > 0 ? (segment.value / total) * 100 : 0;
          return (
            <div
              key={segment.id || `segment-${index}`}
              className="h-full rounded-full transition-all duration-500 ease-out"
              style={{
                width: `${widthPercent}%`,
                backgroundColor: segment.color,
                // Add a very subtle inner shadow/glow to match the 'pill' aesthetic
                boxShadow: `inset 0 1px 1px rgba(255,255,255,0.2), 0 0 8px ${segment.color}40`,
              }}
              title={`${segment.label}: ${segment.value}`}
            />
          );
        })}
      </div>

      {/* The Labels */}
      {showLabels && (
        <div className="flex w-full justify-between items-center px-1">
          {segments.map((segment, index) => (
            <div
              key={`label-${segment.id || index}`}
              className="flex items-center gap-1.5 min-w-0"
            >
              <span className="text-xs text-neutral-400 font-medium truncate">
                {segment.label}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
