"use client";

import type { FC } from "react";

import { mergeClassNames } from "../../../utils";

import type { WFPoint } from "./_PLCharts";

// ── Colors ────────────────────────────────────────────────────────────────────

const ROLE_COLOR = {
  add:      "#22c55e",
  subtract: "#ef4444",
  total:    "var(--ds-color-accent)",
} as const;

const ROLE_BG = {
  add:      "rgba(34,197,94,0.10)",
  subtract: "rgba(239,68,68,0.08)",
  total:    "color-mix(in srgb, var(--ds-color-accent) 10%, transparent)",
} as const;

const ROLE_SIGN = { add: "+", subtract: "−", total: "=" } as const;

// ── PLOverview ────────────────────────────────────────────────────────────────

interface PLOverviewProps {
  data: WFPoint[];
  formatter: (v: number) => string;
}

export const PLOverview: FC<PLOverviewProps> = ({ data, formatter }) => {
  const denom = data.find((d) => d.role === "add")?.delta ?? 1;

  return (
    <div className="flex flex-col px-4 py-2">
      {data.map((step, i) => {
        const isTotal = step.role === "total";
        const pct = Math.round((step.delta / denom) * 100);
        const prevWasSubtract = i > 0 && data[i - 1]?.role === "subtract";

        return (
          <div key={`${step.name}-${i}`}>
            {isTotal && prevWasSubtract && (
              <div className="my-2 border-t border-ds-border-2/70" />
            )}
            <div
              className={mergeClassNames(
                "flex items-center gap-3 rounded-lg px-3 py-2.5",
                isTotal ? "" : "opacity-90",
              )}
              style={{ backgroundColor: isTotal ? ROLE_BG[step.role] : undefined }}
            >
              {/* Role sign */}
              <span
                className="w-4 shrink-0 text-center text-sm font-bold tabular-nums"
                style={{ color: ROLE_COLOR[step.role] }}
                aria-hidden="true"
              >
                {ROLE_SIGN[step.role]}
              </span>

              {/* Label */}
              <span
                className={mergeClassNames(
                  "w-28 shrink-0 text-sm",
                  isTotal ? "font-semibold text-ds-1" : "font-medium text-ds-2",
                )}
              >
                {step.name}
              </span>

              {/* Proportion bar */}
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-ds-border-3/25">
                <div
                  className="h-full rounded-full transition-[width] duration-700 ease-out"
                  style={{
                    width:           `${Math.min(100, pct)}%`,
                    backgroundColor: ROLE_COLOR[step.role],
                    opacity:         isTotal ? 1 : 0.65,
                  }}
                  aria-hidden="true"
                />
              </div>

              {/* Value */}
              <span
                className={mergeClassNames(
                  "w-20 shrink-0 text-right text-sm tabular-nums",
                  isTotal ? "font-bold" : "font-medium text-ds-2",
                )}
                style={isTotal ? { color: ROLE_COLOR[step.role] } : undefined}
              >
                {step.role === "subtract" ? "−" : ""}{formatter(step.delta)}
              </span>

              {/* Margin badge — total rows only */}
              {isTotal ? (
                <span
                  className="w-14 shrink-0 rounded-full px-2 py-0.5 text-center text-[10px] font-bold"
                  style={{
                    color:           ROLE_COLOR[step.role],
                    backgroundColor: ROLE_BG[step.role],
                    border:          `1px solid color-mix(in srgb, ${ROLE_COLOR[step.role]} 35%, transparent)`,
                  }}
                >
                  {pct}%
                </span>
              ) : (
                <span className="w-14 shrink-0" aria-hidden="true" />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
