"use client";

import { useState, useRef, useEffect, type FC } from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
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

export interface ShipmentDataPoint {
  /** X-axis label, e.g. "1 Jan". */
  date: string;
  /** Shipment bar value. */
  shipment: number;
  /** Delivery line value. */
  delivery: number;
}

export interface ShipmentStatisticsCardProps {
  title?: string;
  subtitle?: string;
  data: ShipmentDataPoint[];
  /** Month names shown in the dropdown. */
  months?: string[];
  /** Controlled selected month. */
  selectedMonth?: string;
  onMonthChange?: (month: string) => void;
  /** Default month for uncontrolled usage. Defaults to months[0]. */
  defaultMonth?: string;
  /** Y-axis tick formatter. Defaults to "${v}%" style. */
  yAxisFormatter?: (v: number) => string;
  /** Bar fill color. Defaults to amber. */
  shipmentColor?: string;
  /** Line stroke color. Defaults to indigo. */
  deliveryColor?: string;
  /** Labels for the legend. */
  shipmentLabel?: string;
  deliveryLabel?: string;
  className?: string;
}

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

// ── ShipmentStatisticsCard ────────────────────────────────────────────────────

export const ShipmentStatisticsCard: FC<ShipmentStatisticsCardProps> = ({
  title = "Shipment statistics",
  subtitle,
  data,
  months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ],
  selectedMonth: controlledMonth,
  onMonthChange,
  defaultMonth,
  yAxisFormatter = (v: number) => `${v}%`,
  shipmentColor = "#FFB400",
  deliveryColor = "#7367F0",
  shipmentLabel = "Shipment",
  deliveryLabel = "Delivery",
  className,
}) => {
  const isControlled = controlledMonth !== undefined;
  const [internalMonth, setInternalMonth] = useState(
    defaultMonth ?? months[0] ?? "",
  );
  const activeMonth = isControlled ? controlledMonth : internalMonth;

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
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownOpen]);

  const handleMonthSelect = (m: string) => {
    if (!isControlled) setInternalMonth(m);
    onMonthChange?.(m);
    setDropdownOpen(false);
  };

  return (
    <div
      className={mergeClassNames(
        "rounded-lg border border-ds-border-3/80 bg-ds-surface-1 p-5",
        className,
      )}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-lg font-bold text-ds-1">{title}</p>
          {subtitle && (
            <p className="mt-0.5 text-sm text-ds-3">{subtitle}</p>
          )}
        </div>

        {/* Month dropdown */}
        <div ref={dropdownRef} className="relative shrink-0">
          <Button
            variant="tertiary"
            size="small"
            onClick={() => setDropdownOpen((o) => !o)}
            className="gap-1.5 rounded-md border border-ds-border-accent/30 bg-ds-accent-subtle px-3 py-1.5 text-sm font-semibold text-ds-accent hover:bg-ds-accent-subtle/80 hover:opacity-100"
            aria-haspopup="listbox"
            aria-expanded={dropdownOpen}
          >
            {activeMonth}
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
              className="absolute end-0 top-full z-20 mt-1 max-h-48 min-w-[130px] overflow-y-auto rounded-md border border-ds-border-2 bg-ds-surface-1 py-1 shadow-lg"
            >
              {months.map((m) => (
                <Button
                  key={m}
                  variant="tertiary"
                  size="small"
                  role="option"
                  aria-selected={m === activeMonth}
                  onClick={() => handleMonthSelect(m)}
                  className={mergeClassNames(
                    "w-full justify-start rounded-none px-3 py-1.5 text-start text-sm hover:bg-ds-surface-2 hover:opacity-100",
                    m === activeMonth
                      ? "font-semibold text-ds-accent"
                      : "text-ds-2",
                  )}
                >
                  {m}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Chart ──────────────────────────────────────────────────────────── */}
      <div style={{ height: 260 }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            barSize={22}
            barCategoryGap="30%"
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="var(--ds-color-border)"
              opacity={0.5}
            />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={yAxisFormatter}
              tick={{ fill: "var(--ds-color-fg-muted)", fontSize: 11 }}
              dx={-4}
              domain={[0, "auto"]}
            />
            <Tooltip
              contentStyle={chartTooltipContentStyle}
              itemStyle={chartTooltipItemStyle}
              labelStyle={chartTooltipLabelStyle}
              wrapperStyle={chartTooltipWrapperStyle}
              cursor={{ fill: "rgba(0,0,0,0.04)" }}
              formatter={(v, name) => [
                yAxisFormatter(Number(v)),
                name === "shipment" ? shipmentLabel : deliveryLabel,
              ]}
            />
            <Bar
              dataKey="shipment"
              fill={shipmentColor}
              radius={[4, 4, 0, 0]}
            />
            <Line
              type="monotone"
              dataKey="delivery"
              stroke={deliveryColor}
              strokeWidth={2.5}
              dot={{ r: 3.5, fill: deliveryColor, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: deliveryColor, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* ── Legend ─────────────────────────────────────────────────────────── */}
      <div className="mt-4 flex items-center justify-center gap-6">
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: shipmentColor }}
            aria-hidden="true"
          />
          <span className="text-sm text-ds-2">{shipmentLabel}</span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: deliveryColor }}
            aria-hidden="true"
          />
          <span className="text-sm text-ds-2">{deliveryLabel}</span>
        </div>
      </div>
    </div>
  );
};
