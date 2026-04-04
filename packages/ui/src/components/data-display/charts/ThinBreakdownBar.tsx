"use client";

import React from "react";

import { normalizeChartColors } from "./chartPalette";
import { chartPillTooltipStyle } from "./chartStyles";

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
  showSummary?: boolean;
  summaryLabel?: string;
  valueFormatter?: (value: number) => string;
}

const defaultValueFormatter = (value: number): string =>
  new Intl.NumberFormat().format(value);

export const ThinBreakdownBar: React.FC<ThinBreakdownBarProps> = ({
  data: segments,
  className = "",
  showLabels = true,
  showSummary = false,
  summaryLabel = "Total",
  valueFormatter = defaultValueFormatter,
}) => {
  const [activeSegmentKey, setActiveSegmentKey] = React.useState<string | null>(
    null,
  );

  const normalizedSegments = React.useMemo(() => {
    const normalizedColors = normalizeChartColors(
      segments.map((segment) => segment.color),
    );

    const totalValue = segments.reduce((sum, item) => sum + item.value, 0);

    return segments.map((segment, index) => ({
      ...segment,
      key: segment.id || `segment-${index}`,
      color: normalizedColors[index] ?? segment.color,
      widthPercent:
        totalValue > 0 ? Math.max((segment.value / totalValue) * 100, 0) : 0,
    }));
  }, [segments]);

  const segmentsWithMetrics = React.useMemo(() => {
    let runningPercent = 0;

    return normalizedSegments.map((segment) => {
      const nextSegment = {
        ...segment,
        centerPercent: runningPercent + segment.widthPercent / 2,
      };

      runningPercent += segment.widthPercent;
      return nextSegment;
    });
  }, [normalizedSegments]);

  const activeSegment = React.useMemo(
    () =>
      segmentsWithMetrics.find((segment) => segment.key === activeSegmentKey) ??
      null,
    [activeSegmentKey, segmentsWithMetrics],
  );
  const totalValue = React.useMemo(
    () => segments.reduce((sum, item) => sum + item.value, 0),
    [segments],
  );
  const summaryTitle = activeSegment?.label ?? summaryLabel;
  const summaryValue = activeSegment?.value ?? totalValue;
  const summaryMeta = activeSegment
    ? `${Math.round(activeSegment.widthPercent)}% of total`
    : `${segments.length} segments`;

  return (
    <div className={`w-full flex flex-col gap-3 ${className}`}>
      {showSummary && (activeSegment || totalValue > 0) ? (
        <div className="flex items-start justify-between gap-4 rounded-xl border border-border/70 bg-background/70 px-4 py-3 backdrop-blur-md">
          <div className="min-w-0">
            <p
              className="truncate text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase transition-colors duration-200"
              style={activeSegment ? { color: activeSegment.color } : undefined}
            >
              {summaryTitle}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{summaryMeta}</p>
          </div>
          <p
            className="text-right text-lg font-semibold leading-none text-foreground transition-colors duration-200"
            style={activeSegment ? { color: activeSegment.color } : undefined}
          >
            {valueFormatter(summaryValue)}
          </p>
        </div>
      ) : null}

      <div className="relative">
        {activeSegment && !showSummary && (
          <div
            className="pointer-events-none absolute -top-10 z-10 -translate-x-1/2 rounded-full px-2.5 py-1 text-[11px] font-medium text-foreground"
            style={{
              ...chartPillTooltipStyle,
              left: `${activeSegment.centerPercent}%`,
            }}
          >
            <span>{activeSegment.label}</span>
            <span className="mx-1 text-muted-foreground">•</span>
            <span style={{ color: activeSegment.color }}>
              {activeSegment.value}
            </span>
          </div>
        )}

        <div className="rounded-full bg-background-tertiary/80 p-0.5">
          <div
            className="flex w-full gap-1"
            onMouseLeave={() => setActiveSegmentKey(null)}
          >
            {segmentsWithMetrics.map((segment) => {
              const isActive = activeSegmentKey === segment.key;

              return (
                <div
                  key={segment.key}
                  className="relative flex h-2.5 min-w-0 items-center"
                  style={{ width: `${segment.widthPercent}%` }}
                  onMouseEnter={() => setActiveSegmentKey(segment.key)}
                >
                  <div
                    className="h-full w-full rounded-full transition-[transform,filter,box-shadow,opacity] duration-200 ease-out"
                    style={{
                      backgroundColor: segment.color,
                      opacity: activeSegmentKey && !isActive ? 0.72 : 1,
                      transform: isActive ? "scaleY(1.3)" : "scaleY(1)",
                      filter: isActive
                        ? "saturate(1.1) brightness(1.05)"
                        : "none",
                      boxShadow: isActive
                        ? `inset 0 1px 1px rgba(255,255,255,0.28), 0 0 0 1px color-mix(in srgb, ${segment.color} 35%, transparent), 0 0 14px color-mix(in srgb, ${segment.color} 45%, transparent)`
                        : `inset 0 1px 1px rgba(255,255,255,0.2), 0 0 8px color-mix(in srgb, ${segment.color} 30%, transparent)`,
                    }}
                    title={`${segment.label}: ${segment.value}`}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showLabels && (
        <div className="flex w-full items-start gap-1 px-0.5">
          {segmentsWithMetrics.map((segment) => {
            const isActive = activeSegmentKey === segment.key;

            return (
              <div
                key={`label-${segment.key}`}
                className="flex min-w-0 justify-center"
                style={{ width: `${segment.widthPercent}%` }}
              >
                <span
                  className="whitespace-nowrap px-1 text-center text-[11px] font-medium tracking-wide text-muted-foreground transition-colors duration-200"
                  style={isActive ? { color: segment.color } : undefined}
                >
                  {segment.label}
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
