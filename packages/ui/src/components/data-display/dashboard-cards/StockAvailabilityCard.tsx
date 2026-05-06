"use client";

import type { FC } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

// ── Public types ──────────────────────────────────────────────────────────────

export interface StockItem {
  id: string | number;
  name: string;
  qty: number;
  onOrder?: () => void;
}

export interface StockAvailabilityCardProps {
  title?: string;
  totalAsset?: string;
  totalProduct?: number;
  /** Percentages for each segment — should sum to 100. */
  availability?: {
    available: number;
    lowStock: number;
    outOfStock: number;
  };
  lowStockItems?: StockItem[];
  onViewAll?: () => void;
  className?: string;
  onMenuClick?: () => void;
}

// ── Colors ────────────────────────────────────────────────────────────────────

const AVAILABLE_COLOR = "#0ABFBC";
const LOW_STOCK_COLOR = "#FFC107";
const OUT_OF_STOCK_COLOR = "#FF5B5C";

// ── StockAvailabilityCard ─────────────────────────────────────────────────────

export const StockAvailabilityCard: FC<StockAvailabilityCardProps> = ({
  title = "Stock Availability",
  totalAsset = "$53,000",
  totalProduct = 442,
  availability = { available: 62, lowStock: 28, outOfStock: 10 },
  lowStockItems = [],
  onViewAll,
  className,
  onMenuClick,
}) => {
  const { available, lowStock, outOfStock } = availability;
  const total = available + lowStock + outOfStock || 100;

  const segments = [
    { label: "Available",    color: AVAILABLE_COLOR,    pct: available },
    { label: "Low Stock",    color: LOW_STOCK_COLOR,    pct: lowStock },
    { label: "Out of stock", color: OUT_OF_STOCK_COLOR, pct: outOfStock },
  ];

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 pb-3 pt-5">
        <p className="text-base font-bold text-ds-1">{title}</p>
        <Button
          variant="tertiary"
          size="small"
          className="shrink-0 p-0.5! text-ds-3"
          aria-label="More options"
          onClick={onMenuClick}
        >
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      </div>

      {/* ── Metrics row ────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 divide-x divide-ds-border-3/50 border-b border-ds-border-3/50 px-5 pb-5">
        <div className="pe-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-ds-3">
            Total Asset
          </p>
          <p className="mt-1 text-2xl font-bold text-ds-1">{totalAsset}</p>
        </div>
        <div className="ps-4">
          <p className="text-[10px] font-medium uppercase tracking-wide text-ds-3">
            Total Product
          </p>
          <p className="mt-1 text-2xl font-bold text-ds-1">
            {totalProduct.toLocaleString()}
          </p>
        </div>
      </div>

      {/* ── Availability bar ───────────────────────────────────────────────── */}
      <div className="px-5 py-4">
        <div className="flex h-2 w-full overflow-hidden rounded-full">
          {segments.map(({ label, color, pct }) => (
            <div
              key={label}
              style={{ width: `${(pct / total) * 100}%`, backgroundColor: color }}
              aria-hidden="true"
            />
          ))}
        </div>

        {/* Legend */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
          {segments.map(({ label, color, pct }) => (
            <div key={label} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <span className="text-xs text-ds-2">{label}</span>
              <span className="text-xs font-semibold text-ds-1">{pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Low stock list ─────────────────────────────────────────────────── */}
      {lowStockItems.length > 0 && (
        <div className="border-t border-ds-border-3/50">
          <div className="flex items-center justify-between px-5 py-3">
            <p className="text-xs font-bold uppercase tracking-wide text-ds-1">
              Low Stock
            </p>
            {onViewAll && (
              <Button
                variant="tertiary"
                size="small"
                onClick={onViewAll}
                className="p-0! text-xs text-ds-accent hover:opacity-100"
              >
                View all
              </Button>
            )}
          </div>
          <div className="pb-2">
            {lowStockItems.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between gap-2 px-5 py-2"
              >
                <p className="truncate text-sm font-medium text-ds-1">
                  {item.name}
                </p>
                <div className="flex shrink-0 items-center gap-3">
                  <span className="text-xs text-ds-3">Qty: {item.qty}</span>
                  <Button
                    variant="secondary"
                    size="small"
                    onClick={item.onOrder}
                    className="h-7 rounded-md px-3 text-xs"
                  >
                    Order
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
