"use client";

import { useMemo, useState, type FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface TopSellingItem {
  id: string | number;
  name: string;
  category?: string;
  image?: string;
  /** Units sold. */
  qty: number;
  /** Gross revenue ($). */
  revenue: number;
  /** % change vs previous period for qty. */
  qtyTrend?: number;
  /** % change vs previous period for revenue. */
  revenueTrend?: number;
}

export type TopSellingMetric = "qty" | "revenue";

export interface TopSellingItemsCardLabels {
  byQtyLabel?: string;
  byRevenueLabel?: string;
  viewAllLabel?: string;
  /** Appended after qty value, e.g. "sold" → "1,240 sold". */
  soldSuffix?: string;
  moreOptionsAriaLabel?: string;
}

export interface TopSellingItemsCardProps {
  title?: string;
  subtitle?: string;
  items: TopSellingItem[];
  /** Controlled active metric. */
  metric?: TopSellingMetric;
  defaultMetric?: TopSellingMetric;
  onMetricChange?: (metric: TopSellingMetric) => void;
  showTrend?: boolean;
  /** Max rows shown (default 5). */
  maxItems?: number;
  labels?: TopSellingItemsCardLabels;
  onViewAll?: () => void;
  className?: string;
  onMenuClick?: () => void;
}

// ── Private sub-components ────────────────────────────────────────────────────

const ProductThumb: FC<{ src?: string; alt: string }> = ({ src, alt }) =>
  src ? (
    <img
      src={src}
      alt={alt}
      className="h-10 w-10 shrink-0 rounded-md object-contain bg-ds-surface-2 p-1"
    />
  ) : (
    <div
      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ds-surface-2 text-ds-3 text-base"
      aria-hidden="true"
    >
      □
    </div>
  );

const TrendBadge: FC<{ value: number }> = ({ value }) => {
  const up = value >= 0;
  return (
    <span
      className={mergeClassNames(
        "shrink-0 rounded px-1.5 py-0.5 text-[11px] font-semibold tabular-nums",
        up
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : "bg-red-500/10 text-red-600 dark:text-red-400",
      )}
      aria-label={`${up ? "Up" : "Down"} ${Math.abs(value)} percent`}
    >
      {up ? "+" : ""}{value}%
    </span>
  );
};

interface ItemRowProps {
  item: TopSellingItem;
  rank: number;
  metric: TopSellingMetric;
  maxValue: number;
  showTrend: boolean;
  soldSuffix: string;
}

const ItemRow: FC<ItemRowProps> = ({ item, rank, metric, maxValue, showTrend, soldSuffix }) => {
  const value = metric === "qty" ? item.qty : item.revenue;
  const trend = metric === "qty" ? item.qtyTrend : item.revenueTrend;
  const sharePct = maxValue > 0 ? (value / maxValue) * 100 : 0;

  const displayValue =
    metric === "revenue"
      ? value >= 1_000_000
        ? `$${(value / 1_000_000).toFixed(1)}M`
        : value >= 1_000
        ? `$${Math.round(value / 1_000)}k`
        : `$${value}`
      : value >= 1_000
      ? `${(value / 1_000).toFixed(1)}k ${soldSuffix}`
      : `${value} ${soldSuffix}`;

  return (
    <li className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
      <span
        className="w-4 shrink-0 text-center text-xs font-bold tabular-nums text-ds-3"
        aria-label={`Rank ${rank}`}
      >
        {rank}
      </span>

      <ProductThumb src={item.image} alt={item.name} />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-semibold text-ds-1">{item.name}</span>
          <div className="flex shrink-0 items-center gap-2">
            {showTrend && trend !== undefined && <TrendBadge value={trend} />}
            <span className="text-sm font-bold tabular-nums text-ds-1">{displayValue}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {item.category && (
            <span className="shrink-0 text-xs text-ds-3">{item.category}</span>
          )}
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-ds-border-2">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${sharePct}%`,
                backgroundColor: "var(--ds-color-accent)",
                opacity: rank === 1 ? 1 : 0.45 + (sharePct / 100) * 0.55,
              }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </li>
  );
};

// ── TopSellingItemsCard ───────────────────────────────────────────────────────

export const TopSellingItemsCard: FC<TopSellingItemsCardProps> = ({
  title = "Top Selling Items",
  subtitle,
  items,
  metric: metricProp,
  defaultMetric = "qty",
  onMetricChange,
  showTrend = true,
  maxItems = 5,
  labels,
  onViewAll,
  className,
  onMenuClick,
}) => {
  const isControlled = metricProp !== undefined;
  const [internalMetric, setInternalMetric] = useState<TopSellingMetric>(defaultMetric);
  const metric = isControlled ? metricProp! : internalMetric;

  const handleMetricChange = (m: TopSellingMetric) => {
    if (!isControlled) setInternalMetric(m);
    onMetricChange?.(m);
  };

  const byQtyLabel     = labels?.byQtyLabel     ?? "By Qty";
  const byRevenueLabel = labels?.byRevenueLabel  ?? "By Revenue";
  const soldSuffix     = labels?.soldSuffix      ?? "sold";

  const sorted = useMemo(
    () =>
      [...items]
        .sort((a, b) => (metric === "qty" ? b.qty - a.qty : b.revenue - a.revenue))
        .slice(0, maxItems),
    [items, metric, maxItems],
  );

  const maxValue = sorted[0] ? (metric === "qty" ? sorted[0].qty : sorted[0].revenue) : 0;

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between px-5 pb-3 pt-5">
        <div>
          <p className="text-base font-bold text-ds-1">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex rounded-md border border-ds-border-2 bg-ds-surface-2 p-0.5"
            role="group"
            aria-label="Metric toggle"
          >
            {(["qty", "revenue"] as TopSellingMetric[]).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => handleMetricChange(m)}
                className={mergeClassNames(
                  "rounded px-2.5 py-1 text-xs font-medium transition-colors",
                  metric === m
                    ? "bg-ds-surface-1 text-ds-1 shadow-sm"
                    : "text-ds-3 hover:text-ds-2",
                )}
                aria-pressed={metric === m}
              >
                {m === "qty" ? byQtyLabel : byRevenueLabel}
              </button>
            ))}
          </div>
          <Button
            variant="tertiary"
            size="small"
            className="shrink-0 p-0.5! text-ds-3"
            aria-label={labels?.moreOptionsAriaLabel ?? "More options"}
            onClick={onMenuClick}
          >
            <EllipsisVerticalIcon width={18} height={18} />
          </Button>
        </div>
      </div>

      {/* List */}
      <ul
        className="flex flex-col divide-y divide-ds-border-2 px-5"
        role="list"
        aria-label={metric === "qty" ? byQtyLabel : byRevenueLabel}
      >
        {sorted.map((item, i) => (
          <ItemRow
            key={item.id}
            item={item}
            rank={i + 1}
            metric={metric}
            maxValue={maxValue}
            showTrend={showTrend}
            soldSuffix={soldSuffix}
          />
        ))}
      </ul>

      {/* Footer */}
      {onViewAll && (
        <div className="border-t border-ds-border-2 px-5 py-3">
          <Button
            variant="tertiary"
            size="small"
            onClick={onViewAll}
            className="p-0! text-xs text-ds-accent hover:opacity-100"
          >
            {labels?.viewAllLabel ?? "View all items"}
          </Button>
        </div>
      )}
    </div>
  );
};
