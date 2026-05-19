"use client";

import { useMemo, type FC } from "react";

import { BarBreakdownCard } from "./BarBreakdownCard";
import { IncomeExpenseCard } from "./IncomeExpenseCard";
import { StockAvailabilityCard } from "./StockAvailabilityCard";
import { TopSellingItemsCard } from "./TopSellingItemsCard";
import type { TopSellingItem } from "./TopSellingItemsCard";

// ── i18n ──────────────────────────────────────────────────────────────────────

export interface InventoryCardsLabels {
  costVsRevenueTitle?: string;       // "Cost vs Revenue by Category"
  totalCostLabel?: string;           // "Total Cost"
  potentialRevLabel?: string;        // "Potential Rev"
  grossMarginLabel?: string;         // "Gross Margin"
  needsReorderLabel?: string;        // "Needs Reorder"
  buyCostLabel?: string;             // "Buy Cost"
  sellRevenueLabel?: string;         // "Sell Revenue"
  currentStockPeriod?: string;       // "Current Stock"
  stockValueTitle?: string;          // "Stock Value by Category"
  topProfitTitle?: string;           // "Top Profit Potential"
  topProfitSubtitle?: string;        // "Ranked by profit if all units sold"
  byProfitLabel?: string;            // "By Profit"
  byUnitsLabel?: string;             // "By Units"
}

// ── Public types ──────────────────────────────────────────────────────────────

export interface InventoryCardRow {
  id: string;
  name: string;
  category: string;
  qty: number;
  totalCost: number;
  potentialRevenue: number;
  potentialProfit: number;
  status: "ok" | "low" | "out";
  /** % change vs previous period, e.g. 12 = +12%, -8 = -8% */
  qtyTrend?: number;
  profitTrend?: number;
}

export interface InventoryCardsProps {
  rows: InventoryCardRow[];
  /** Map of full category name → short axis label. */
  categoryLabels?: Record<string, string>;
  /** Overall revenue % change vs previous period — drives green/red badge. */
  revenueChangePct?: number;
  /** Overall cost % change vs previous period. */
  costChangePct?: number;
  /** Gross margin % change vs previous period. */
  marginChangePct?: number;
  labels?: InventoryCardsLabels;
  className?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function pctBadge(pct: number) {
  return {
    value:     `${pct >= 0 ? "+" : ""}${pct.toFixed(1)}%`,
    direction: (pct >= 0 ? "up" : "down") as "up" | "down",
  };
}

// ── InventoryCards ────────────────────────────────────────────────────────────

export const InventoryCards: FC<InventoryCardsProps> = ({
  rows,
  categoryLabels = {},
  revenueChangePct,
  costChangePct,
  marginChangePct,
  labels,
  className,
}) => {
  const barCategories = [
    { key: "cost",    label: labels?.buyCostLabel    ?? "Buy Cost",     color: "#6366f1" },
    { key: "revenue", label: labels?.sellRevenueLabel ?? "Sell Revenue", color: "#22c55e" },
  ];
  const d = useMemo(() => {
    const okCount  = rows.filter((r) => r.status === "ok").length;
    const lowCount = rows.filter((r) => r.status === "low").length;
    const outCount = rows.filter((r) => r.status === "out").length;
    const n = rows.length || 1;

    const lowStockItems = rows
      .filter((r) => r.status !== "ok")
      .map((r) => ({ id: r.id, name: r.name, qty: r.qty }));

    const catMap = new Map<string, { cost: number; revenue: number }>();
    for (const r of rows) {
      const prev = catMap.get(r.category) ?? { cost: 0, revenue: 0 };
      catMap.set(r.category, {
        cost:    prev.cost    + r.totalCost,
        revenue: prev.revenue + r.potentialRevenue,
      });
    }
    const cats = [...catMap.entries()];

    const shortLabel = (cat: string) =>
      categoryLabels[cat] ?? (cat.length > 8 ? `${cat.slice(0, 7)}.` : cat);

    const barData = cats.map(([cat, v]) => ({
      name:    shortLabel(cat),
      cost:    Math.round(v.cost),
      revenue: Math.round(v.revenue),
    }));

    let maxRevCat = "";
    let maxRev = 0;
    for (const [cat, v] of cats) {
      if (v.revenue > maxRev) { maxRev = v.revenue; maxRevCat = shortLabel(cat); }
    }

    const incomeData = cats.map(([cat, v]) => ({
      month:       shortLabel(cat),
      income:      Math.round(v.revenue),
      expense:     Math.round(v.cost),
      highlighted: shortLabel(cat) === maxRevCat,
    }));

    const topItems: TopSellingItem[] = [...rows]
      .sort((a, b) => b.potentialProfit - a.potentialProfit)
      .slice(0, 5)
      .map((r) => ({
        id:           r.id,
        name:         r.name,
        category:     r.category,
        qty:          r.qty,
        revenue:      r.potentialProfit,
        qtyTrend:     r.qtyTrend,
        revenueTrend: r.profitTrend,
      }));

    const totalCost    = rows.reduce((s, r) => s + r.totalCost, 0);
    const totalRevenue = rows.reduce((s, r) => s + r.potentialRevenue, 0);
    const totalUnits   = rows.reduce((s, r) => s + r.qty, 0);
    const grossMarginPct = totalRevenue > 0
      ? Math.round(((totalRevenue - totalCost) / totalRevenue) * 100)
      : 0;

    return {
      stock: {
        totalAsset:   `€${Math.round(totalCost    / 1_000)}K`,
        totalProduct: totalUnits,
        availability: {
          available:  Math.round((okCount  / n) * 100),
          lowStock:   Math.round((lowCount / n) * 100),
          outOfStock: Math.round((outCount / n) * 100),
        },
        lowStockItems,
      },
      barData,
      incomeData,
      topItems,
      grossMarginPct,
      lowStockCount: lowCount + outCount,
      totalRevStr:  `€${Math.round(totalRevenue / 1_000)}K`,
      totalCostStr: `€${Math.round(totalCost    / 1_000)}K`,
    };
  }, [rows, categoryLabels]);

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <StockAvailabilityCard {...d.stock} />
        <div className="md:col-span-2">
          <BarBreakdownCard
            title={labels?.costVsRevenueTitle ?? "Cost vs Revenue by Category"}
            variant="full"
            headlines={[
              { label: labels?.totalCostLabel   ?? "Total Cost",    value: d.totalCostStr },
              { label: labels?.potentialRevLabel ?? "Potential Rev", value: d.totalRevStr  },
            ]}
            metrics={[
              {
                label:   labels?.grossMarginLabel ?? "Gross Margin",
                primary: `${d.grossMarginPct}%`,
                badge:   marginChangePct !== undefined ? pctBadge(marginChangePct) : undefined,
              },
              {
                label:   labels?.needsReorderLabel ?? "Needs Reorder",
                primary: String(d.lowStockCount),
              },
            ]}
            categories={barCategories}
            data={d.barData}
            periods={[labels?.currentStockPeriod ?? "Current Stock"]}
            defaultPeriod={labels?.currentStockPeriod ?? "Current Stock"}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <IncomeExpenseCard
          title={labels?.stockValueTitle ?? "Stock Value by Category"}
          totalIncome={d.totalRevStr}
          totalExpenses={d.totalCostStr}
          incomeBadge={revenueChangePct  !== undefined ? pctBadge(revenueChangePct)  : undefined}
          expensesBadge={costChangePct   !== undefined ? pctBadge(costChangePct)     : undefined}
          data={d.incomeData}
          periods={[labels?.currentStockPeriod ?? "Current Stock"]}
          defaultPeriod={labels?.currentStockPeriod ?? "Current Stock"}
        />
        <TopSellingItemsCard
          title={labels?.topProfitTitle ?? "Top Profit Potential"}
          subtitle={labels?.topProfitSubtitle ?? "Ranked by profit if all units sold"}
          items={d.topItems}
          showTrend
          defaultMetric="revenue"
          labels={{
            byRevenueLabel: labels?.byProfitLabel ?? "By Profit",
            byQtyLabel:     labels?.byUnitsLabel  ?? "By Units",
          }}
        />
      </div>
    </div>
  );
};
