"use client";

import { useState, useRef, useEffect, type FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── Public types ──────────────────────────────────────────────────────────────

export interface IncomeExpenseDataPoint {
  month: string;
  income: number;
  expense: number;
  /** When true, bars render at full saturation; others render at 60% opacity. */
  highlighted?: boolean;
}

export interface IncomeExpenseBadge {
  value: string;
  direction: "up" | "down";
}

export interface IncomeExpenseCardProps {
  title?: string;
  totalIncome?: string;
  incomeBadge?: IncomeExpenseBadge;
  totalExpenses?: string;
  expensesBadge?: IncomeExpenseBadge;
  data?: IncomeExpenseDataPoint[];
  incomeColor?: string;
  expenseColor?: string;
  periods?: string[];
  defaultPeriod?: string;
  /** Controlled selected period. */
  selectedPeriod?: string;
  onPeriodChange?: (p: string) => void;
  className?: string;
}

// ── Internal ──────────────────────────────────────────────────────────────────

const DEFAULT_DATA: IncomeExpenseDataPoint[] = [
  { month: "JAN", income: 800,  expense: 400 },
  { month: "FEB", income: 1000, expense: 500 },
  { month: "MAR", income: 1412, expense: 612, highlighted: true },
  { month: "APR", income: 900,  expense: 450 },
  { month: "MAY", income: 1100, expense: 520 },
  { month: "JUN", income: 950,  expense: 480 },
];

const ChevronDownIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const TrendLabel: FC<IncomeExpenseBadge> = ({ value, direction }) => (
  <span
    className="text-xs font-semibold"
    style={{
      color:
        direction === "up"
          ? "var(--ds-color-success)"
          : "var(--ds-color-danger)",
    }}
  >
    {direction === "up" ? "▲" : "▼"} {value}
  </span>
);

// ── IncomeExpenseCard ─────────────────────────────────────────────────────────

export const IncomeExpenseCard: FC<IncomeExpenseCardProps> = ({
  title = "Income & Expense",
  totalIncome = "$1,412",
  incomeBadge = { value: "4.51%", direction: "up" },
  totalExpenses = "$612.34",
  expensesBadge = { value: "2.41%", direction: "down" },
  data = DEFAULT_DATA,
  incomeColor = "#28C76F",
  expenseColor = "#FFC107",
  periods = ["Last 6 months", "Last 3 months", "Last year"],
  defaultPeriod,
  selectedPeriod: controlledPeriod,
  onPeriodChange,
  className,
}) => {
  const isControlled = controlledPeriod !== undefined;
  const [internalPeriod, setInternalPeriod] = useState(
    defaultPeriod ?? periods[0] ?? "",
  );
  const activePeriod = isControlled ? controlledPeriod : internalPeriod;

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handlePeriodSelect = (p: string) => {
    if (!isControlled) setInternalPeriod(p);
    onPeriodChange?.(p);
    setDropdownOpen(false);
  };

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

        <div ref={dropdownRef} className="relative shrink-0">
          <Button
            variant="tertiary"
            size="small"
            onClick={() => setDropdownOpen((o) => !o)}
            className="gap-1.5 rounded-md border border-ds-border-accent/30 bg-ds-accent-subtle px-3 py-1.5 text-sm font-semibold text-ds-accent hover:bg-ds-accent-subtle/80 hover:opacity-100"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {activePeriod}
            <span
              className={mergeClassNames(
                "transition-transform duration-150",
                dropdownOpen ? "rotate-180" : "",
              )}
            >
              <ChevronDownIcon />
            </span>
          </Button>

          {dropdownOpen && (
            <div
              role="listbox"
              className="absolute end-0 top-full z-20 mt-1 min-w-[160px] overflow-y-auto rounded-md border border-ds-border-2 bg-ds-surface-1 py-1 shadow-lg"
            >
              {periods.map((p) => (
                <Button
                  key={p}
                  variant="tertiary"
                  size="small"
                  role="option"
                  aria-selected={p === activePeriod}
                  onClick={() => handlePeriodSelect(p)}
                  className={mergeClassNames(
                    "w-full justify-start rounded-none px-3 py-1.5 text-start text-sm hover:bg-ds-surface-2 hover:opacity-100",
                    p === activePeriod ? "font-semibold text-ds-accent" : "text-ds-2",
                  )}
                >
                  {p}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Metric headers ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-4 px-5 pb-4">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-ds-3">
            Total Income
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ds-1">{totalIncome}</span>
            {incomeBadge && (
              <TrendLabel
                value={incomeBadge.value}
                direction={incomeBadge.direction}
              />
            )}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wide text-ds-3">
            Total Expenses
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-ds-1">{totalExpenses}</span>
            {expensesBadge && (
              <TrendLabel
                value={expensesBadge.value}
                direction={expensesBadge.direction}
              />
            )}
          </div>
        </div>
      </div>

      {/* ── Bar chart ──────────────────────────────────────────────────────── */}
      <div style={{ height: 200 }} className="px-2">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            barSize={12}
            barCategoryGap="30%"
            barGap={4}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--ds-color-border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
              dy={8}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 10 }}
              dx={-4}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              wrapperStyle={chartTooltipWrapperStyle}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
            />
            <Bar dataKey="income" name="Income" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.highlighted ? incomeColor : incomeColor + "80"}
                />
              ))}
            </Bar>
            <Bar dataKey="expense" name="Expense" radius={[4, 4, 0, 0]}>
              {data.map((entry, i) => (
                <Cell
                  key={i}
                  fill={entry.highlighted ? expenseColor : expenseColor + "80"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-center gap-6 py-4">
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: incomeColor }}
            aria-hidden="true"
          />
          <span className="text-sm text-ds-2">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: expenseColor }}
            aria-hidden="true"
          />
          <span className="text-sm text-ds-2">Expense</span>
        </div>
      </div>
    </div>
  );
};
