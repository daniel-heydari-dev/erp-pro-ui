"use client";

import { useState, useCallback, type FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface AIFeature {
  id: string | number;
  name: string;
  shortName: string;
  /** Adoption % 0–100 */
  adoption: number;
  /** MoM change in percentage points */
  trend: number;
  activeAccounts: number;
  color: string;
  icon: string;
}

export interface AIFeatureAdoptionCardProps {
  title?: string;
  subtitle?: string;
  features?: AIFeature[];
  overallAdoption?: number;
  totalSessions?: number;
  sessionsGrowth?: number;
  satisfactionScore?: number;
  className?: string;
  onMenuClick?: () => void;
}

// ── Default data — SaaS management AI modules ─────────────────────────────────

const DEFAULT_FEATURES: AIFeature[] = [
  { id: 1, name: "Churn Predictor",    shortName: "Churn",   adoption: 71, trend: +8.2,  activeAccounts: 2840, color: "#8B5CF6", icon: "⚠️" },
  { id: 2, name: "Revenue Forecast",   shortName: "Revenue", adoption: 58, trend: +12.4, activeAccounts: 2318, color: "#3B82F6", icon: "📈" },
  { id: 3, name: "Smart Onboarding",   shortName: "Onboard", adoption: 43, trend: +5.1,  activeAccounts: 1718, color: "#06B6D4", icon: "🚀" },
  { id: 4, name: "Seat Optimizer",     shortName: "Seats",   adoption: 34, trend: +18.6, activeAccounts: 1358, color: "#10B981", icon: "💺" },
  { id: 5, name: "Price Intelligence", shortName: "Pricing", adoption: 29, trend: +3.8,  activeAccounts: 1158, color: "#F59E0B", icon: "💡" },
  { id: 6, name: "API Anomaly Detect", shortName: "API",     adoption: 22, trend: +24.1, activeAccounts:  879, color: "#EF4444", icon: "📡" },
];

// ── Hover tooltip ─────────────────────────────────────────────────────────────

interface TooltipProps {
  feature: AIFeature;
  x: number;
  y: number;
  cardWidth: number;
}

const HoverTooltip: FC<TooltipProps> = ({ feature: f, x, y, cardWidth }) => {
  const flipX = x > cardWidth / 2;
  return (
    <div
      className="pointer-events-none absolute z-50 w-52 rounded-xl border border-ds-border-2 bg-ds-surface-1 p-3.5 shadow-xl"
      style={{
        left:      flipX ? x - 12 : x + 12,
        top:       y - 10,
        transform: flipX ? "translateX(-100%)" : "none",
      }}
    >
      {/* Header */}
      <div className="mb-2.5 flex items-center gap-2">
        <span className="text-xl">{f.icon}</span>
        <div>
          <p className="text-xs font-bold text-ds-1">{f.name}</p>
          <p className="text-[10px] text-ds-3">AI module</p>
        </div>
      </div>

      {/* Adoption bar */}
      <div className="mb-2">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] text-ds-3">Adoption rate</span>
          <span className="text-sm font-extrabold" style={{ color: f.color }}>{f.adoption}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-ds-surface-3">
          <div className="h-full rounded-full transition-all" style={{ width: `${f.adoption}%`, backgroundColor: f.color }} />
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-1.5 border-t border-ds-border-3/50 pt-2.5">
        <div>
          <p className="text-[10px] text-ds-3">Active accounts</p>
          <p className="text-xs font-bold text-ds-1">{f.activeAccounts.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-[10px] text-ds-3">MoM trend</p>
          <p
            className="text-xs font-bold"
            style={{ color: f.trend >= 0 ? "#22c55e" : "#ef4444" }}
          >
            {f.trend >= 0 ? "+" : ""}{f.trend}pp
          </p>
        </div>
      </div>
    </div>
  );
};

// ── Concentric ring SVG ───────────────────────────────────────────────────────

const CHART_SIZE = 340;
const CX         = CHART_SIZE / 2;
const CY         = CHART_SIZE / 2;
const STROKE_W   = 12;
const RING_STEP  = 24;
const OUTER_R    = CX - STROKE_W / 2 - 2;

interface RingChartProps {
  features:       AIFeature[];
  overall:        number;
  hovered:        AIFeature | null;
  onHover:        (f: AIFeature | null) => void;
}

const RingChart: FC<RingChartProps> = ({ features, overall, hovered, onHover }) => {
  const sorted = [...features].sort((a, b) => b.adoption - a.adoption);

  return (
    <svg
      width={CHART_SIZE}
      height={CHART_SIZE}
      viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      aria-hidden="true"
      style={{ overflow: "visible" }}
    >
      {sorted.map((f, i) => {
        const r      = OUTER_R - i * RING_STEP;
        const startA = -Math.PI / 2;
        const frac   = f.adoption / 100;
        const endA   = startA + frac * 2 * Math.PI;

        const sx = CX + r * Math.cos(startA);
        const sy = CY + r * Math.sin(startA);
        const ex = CX + r * Math.cos(endA);
        const ey = CY + r * Math.sin(endA);
        const largeArc = frac > 0.5 ? 1 : 0;

        const lx = CX;
        const ly = CY - r + STROKE_W / 2 + 6;

        const isHovered = hovered?.id === f.id;

        return (
          <g key={f.id}>
            {/* Track */}
            <circle
              cx={CX} cy={CY} r={r}
              fill="none"
              stroke="color-mix(in srgb, var(--ds-color-border-strong) 28%, transparent)"
              strokeWidth={STROKE_W}
            />

            {/* Filled arc */}
            <path
              d={
                frac >= 0.9999
                  ? `M ${sx} ${sy} A ${r} ${r} 0 1 1 ${sx - 0.001} ${sy}`
                  : `M ${sx} ${sy} A ${r} ${r} 0 ${largeArc} 1 ${ex} ${ey}`
              }
              fill="none"
              stroke={f.color}
              strokeWidth={isHovered ? STROKE_W + 3 : STROKE_W}
              strokeLinecap="round"
              opacity={hovered && !isHovered ? 0.35 : 1}
              style={{ transition: "stroke-width 150ms, opacity 150ms" }}
            />

            {/* % label */}
            <text
              x={lx} y={ly}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={9}
              fontWeight="700"
              fill={f.color}
              opacity={hovered && !isHovered ? 0.35 : 1}
              style={{
                paintOrder: "stroke",
                stroke: "var(--ds-color-bg-surface, #fff)",
                strokeWidth: 2,
                transition: "opacity 150ms",
              }}
            >
              {f.adoption}%
            </text>

            {/* Invisible wide hit area */}
            <circle
              cx={CX} cy={CY} r={r}
              fill="none"
              stroke="transparent"
              strokeWidth={STROKE_W + 14}
              style={{ cursor: "pointer" }}
              onMouseEnter={() => onHover(f)}
              onMouseLeave={() => onHover(null)}
            />
          </g>
        );
      })}

      {/* Centre */}
      <text x={CX} y={CY - 10} textAnchor="middle" dominantBaseline="middle"
        fontSize={24} fontWeight="800" fill="var(--ds-color-fg)">
        {hovered ? `${hovered.adoption}%` : `${overall}%`}
      </text>
      <text x={CX} y={CY + 12} textAnchor="middle" dominantBaseline="middle"
        fontSize={10} fill="var(--ds-color-fg-muted)">
        {hovered ? hovered.shortName : "overall AI"}
      </text>
    </svg>
  );
};

// ── FeatureRow ────────────────────────────────────────────────────────────────

interface FeatureRowProps {
  feature:  AIFeature;
  hovered:  AIFeature | null;
  onHover:  (f: AIFeature | null) => void;
}

const FeatureRow: FC<FeatureRowProps> = ({ feature: f, hovered, onHover }) => {
  const isHovered = hovered?.id === f.id;
  const isDimmed  = hovered && !isHovered;

  return (
    <li
      className="flex cursor-pointer items-center gap-3 rounded-md px-1.5 py-[5px] first:pt-0 last:pb-0 transition-colors"
      style={{
        opacity:         isDimmed ? 0.35 : 1,
        backgroundColor: isHovered ? `${f.color}14` : "transparent",
        transition:      "opacity 150ms, background-color 150ms",
      }}
      onMouseEnter={() => onHover(f)}
      onMouseLeave={() => onHover(null)}
    >
      <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: f.color }} aria-hidden="true" />
      <span className="flex-1 min-w-0 text-xs font-medium text-ds-2 truncate">
        <span className="mr-1">{f.icon}</span>{f.name}
      </span>
      <div className="w-14 shrink-0">
        <div className="h-1.5 overflow-hidden rounded-full bg-ds-surface-3">
          <div className="h-full rounded-full" style={{ width: `${f.adoption}%`, backgroundColor: f.color }} />
        </div>
      </div>
      <span className="w-9 shrink-0 text-right text-sm font-extrabold" style={{ color: f.color }}>
        {f.adoption}%
      </span>
      <span
        className="w-12 shrink-0 text-right text-[10px] font-semibold"
        style={{ color: f.trend >= 0 ? "#22c55e" : "#ef4444" }}
      >
        {f.trend >= 0 ? "+" : ""}{f.trend}pp
      </span>
    </li>
  );
};

// ── AIFeatureAdoptionCard ─────────────────────────────────────────────────────

export const AIFeatureAdoptionCard: FC<AIFeatureAdoptionCardProps> = ({
  title             = "AI Feature Adoption",
  subtitle          = "AI module activation across managed accounts · last 30 days",
  features          = DEFAULT_FEATURES,
  overallAdoption,
  totalSessions     = 124800,
  sessionsGrowth    = 18.2,
  satisfactionScore = 87,
  className,
  onMenuClick,
}) => {
  const [hovered,    setHovered]    = useState<AIFeature | null>(null);
  const [mousePos,   setMousePos]   = useState({ x: 0, y: 0 });
  const [cardWidth,  setCardWidth]  = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setCardWidth(rect.width);
  }, []);

  const overall = overallAdoption ??
    Math.round(features.reduce((s, f) => s + f.adoption, 0) / features.length);

  const fastestGrowing = features.reduce(
    (best, f) => (f.trend > best.trend ? f : best),
    features[0]!,
  );

  const fmtSessions = totalSessions >= 1_000
    ? `${(totalSessions / 1_000).toFixed(1)}K`
    : String(totalSessions);

  return (
    <div
      className={mergeClassNames("relative rounded-lg border border-ds-border-3/80 bg-ds-surface-1", className)}
      onMouseMove={handleMouseMove}
    >
      {/* Hover tooltip */}
      {hovered && (
        <HoverTooltip
          feature={hovered}
          x={mousePos.x}
          y={mousePos.y}
          cardWidth={cardWidth}
        />
      )}

      {/* Header */}
      <div className="flex items-start justify-between px-5 pb-1 pt-5">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-base font-bold text-ds-1">{title}</p>
            <span className="rounded-full bg-ds-accent px-2 py-0.5 text-[10px] font-bold text-ds-on-accent">AI</span>
          </div>
          {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
        </div>
        <Button variant="tertiary" size="small" className="shrink-0 p-0.5! text-ds-3" aria-label="More options" onClick={onMenuClick}>
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      </div>

      {/* Body */}
      <div className="flex items-center gap-5 px-5 py-4">
        <div className="shrink-0">
          <RingChart
            features={features}
            overall={overall}
            hovered={hovered}
            onHover={setHovered}
          />
        </div>
        <ul className="flex-1 min-w-0 divide-y divide-ds-border-3/40" role="list">
          {features.map((f) => (
            <FeatureRow
              key={f.id}
              feature={f}
              hovered={hovered}
              onHover={setHovered}
            />
          ))}
        </ul>
      </div>

      {/* Stats strip */}
      <div className="flex items-center divide-x divide-ds-border-3/50 border-t border-ds-border-3/50">
        {[
          { label: "AI sessions",     value: fmtSessions,              sub: `+${sessionsGrowth}% MoM`,    subColor: "#22c55e" as string | undefined },
          { label: "Fastest growing", value: fastestGrowing.shortName, sub: `+${fastestGrowing.trend}pp`, subColor: "#22c55e" as string | undefined },
          { label: "Satisfaction",    value: `${satisfactionScore}%`,  sub: "avg AI rating",              subColor: undefined },
        ].map(({ label, value, sub, subColor }) => (
          <div key={label} className="flex flex-1 flex-col items-center px-3 py-2.5">
            <span className="text-[10px] text-ds-3">{label}</span>
            <span className="mt-0.5 text-sm font-bold text-ds-1">{value}</span>
            <span className="text-[10px]" style={{ color: subColor ?? "var(--ds-color-fg-muted)" }}>{sub}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
