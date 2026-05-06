"use client";

import { useState, useRef, useEffect, type FC } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";
import {
  chartTooltipContentStyle,
  chartTooltipItemStyle,
  chartTooltipLabelStyle,
  chartTooltipWrapperStyle,
} from "../charts/chartStyles";

// ── Public types ──────────────────────────────────────────────────────────────

export interface ExpenseItem {
  label: string;
  percentage: number;
  color: string;
}

export interface TopExpenseItem {
  label: string;
  value: string;
  color: string;
}

export interface ExpensesCardProps {
  title?: string;
  /** Center label of the donut, e.g. "$132.34". */
  totalExpense?: string;
  expenses?: ExpenseItem[];
  topExpenses?: TopExpenseItem[];
  periods?: string[];
  defaultPeriod?: string;
  /** Controlled selected period. */
  selectedPeriod?: string;
  onPeriodChange?: (p: string) => void;
  className?: string;
}

// ── Internal ──────────────────────────────────────────────────────────────────

const DEFAULT_EXPENSES: ExpenseItem[] = [
  { label: "Internet",     percentage: 45, color: "#7367F0" },
  { label: "Electricity",  percentage: 26, color: "#00CFE8" },
  { label: "Transactions", percentage: 22, color: "#28C76F" },
  { label: "Rental Cost",  percentage:  8, color: "#FF9F43" },
  { label: "Foods",        percentage:  3, color: "#EA5455" },
  { label: "Other",        percentage:  2, color: "#82868B" },
];

const DEFAULT_TOP: TopExpenseItem[] = [
  { label: "Internet",     value: "$59.46", color: "#7367F0" },
  { label: "Electricity",  value: "$34.41", color: "#00CFE8" },
  { label: "Transactions", value: "$29.12", color: "#28C76F" },
  { label: "Rental Cost",  value: "$10.58", color: "#FF9F43" },
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

// ── ExpensesCard ──────────────────────────────────────────────────────────────

export const ExpensesCard: FC<ExpensesCardProps> = ({
  title = "Expenses",
  totalExpense = "$132.34",
  expenses = DEFAULT_EXPENSES,
  topExpenses = DEFAULT_TOP,
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

      {/* ── Donut chart + legend ────────────────────────────────────────────── */}
      <div className="flex items-center gap-4 px-5 pb-5">
        {/* Donut */}
        <div className="relative shrink-0" style={{ width: 160, height: 160 }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenses}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={72}
                dataKey="percentage"
                paddingAngle={2}
                startAngle={90}
                endAngle={-270}
              >
                {expenses.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={chartTooltipContentStyle}
                itemStyle={chartTooltipItemStyle}
                labelStyle={chartTooltipLabelStyle}
                wrapperStyle={chartTooltipWrapperStyle}
                formatter={(v, _name, props) => [
                  `${v}%`,
                  (props.payload as ExpenseItem).label,
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
          {/* Center label */}
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[10px] leading-none text-ds-3">
              Total Expense
            </span>
            <span className="mt-1 text-base font-bold leading-none text-ds-1">
              {totalExpense}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {expenses.map((e) => (
            <div key={e.label} className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: e.color }}
                aria-hidden="true"
              />
              <span className="flex-1 truncate text-xs text-ds-2">
                {e.label}
              </span>
              <span className="text-xs font-semibold text-ds-1">
                {e.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Top Expense grid ────────────────────────────────────────────────── */}
      {topExpenses.length > 0 && (
        <div className="border-t border-ds-border-3/50 px-5 pb-5 pt-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wide text-ds-3">
            Top Expense
          </p>
          <div className="grid grid-cols-2 gap-3">
            {topExpenses.map((item) => (
              <div key={item.label} className="flex items-start gap-2">
                <span
                  className="mt-0.5 h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-xs text-ds-3">{item.label}</p>
                  <p className="text-sm font-bold text-ds-1">{item.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
