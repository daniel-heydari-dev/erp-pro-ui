"use client";

import { type FC } from "react";

import { Button } from "../../forms/button";
import { DatePicker } from "../../forms/date-picker";
import { Select } from "../../forms/select";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";

import type { DateRangeValue } from "../../forms/date-picker/types";
import type { PLPeriod } from "./FinancialPLCard";

// ── i18n ───────────────────────────────────────────────────────────────────────

export interface PLCardLabels {
  overview?: string;
  compare?: string;
  /** The "vs" separator between period selects. */
  compareTo?: string;
  /** aria-label for the ⋮ menu button. */
  moreOptions?: string;
  dateRangePlaceholder?: string;
  periods?: {
    today?: string;
    yesterday?: string;
    thisWeek?: string;
    thisMonth?: string;
    thisYear?: string;
    custom?: string;
  };
}

// ── Constants ──────────────────────────────────────────────────────────────────

export const PERIOD_OPTS = [
  { value: "today",      label: "Today"      },
  { value: "yesterday",  label: "Yesterday"  },
  { value: "this-week",  label: "This Week"  },
  { value: "this-month", label: "This Month" },
  { value: "this-year",  label: "This Year"  },
  { value: "custom",     label: "Custom"     },
] satisfies { value: PLPeriod; label: string }[];

const PERIOD_KEY_MAP: Record<PLPeriod, keyof NonNullable<PLCardLabels["periods"]>> = {
  "today":       "today",
  "yesterday":   "yesterday",
  "this-week":   "thisWeek",
  "this-month":  "thisMonth",
  "this-year":   "thisYear",
  "custom":      "custom",
};

// ── Types ──────────────────────────────────────────────────────────────────────

export interface PLCardHeaderProps {
  title: string;
  subtitle?: string;
  showPeriodFilter: boolean;
  activePeriod: PLPeriod;
  onPeriodChange: (v: PLPeriod) => void;
  activeRange: DateRangeValue;
  onRangeChange: (r: DateRangeValue) => void;
  canOverview: boolean;
  isOverviewOn: boolean;
  onToggleOverview: () => void;
  showComparison: boolean;
  isCompOn: boolean;
  onToggleComparison: () => void;
  activeCmpPeriod: PLPeriod;
  onCmpPeriodChange: (v: PLPeriod) => void;
  onMenuClick?: () => void;
  labels?: PLCardLabels;
}

// ── Helpers ────────────────────────────────────────────────────────────────────

function ctrlBtn(active: boolean) {
  return [
    "rounded-lg border px-2.5 py-1 text-xs font-semibold transition-colors hover:opacity-100",
    active
      ? "border-ds-accent bg-ds-accent-subtle text-ds-accent"
      : "border-ds-border-3 text-ds-3 hover:border-ds-border-2 hover:bg-ds-surface-2 hover:text-ds-2",
  ].join(" ");
}

// ── PLCardHeader ───────────────────────────────────────────────────────────────

export const PLCardHeader: FC<PLCardHeaderProps> = ({
  title,
  subtitle,
  showPeriodFilter,
  activePeriod,
  onPeriodChange,
  activeRange,
  onRangeChange,
  canOverview,
  isOverviewOn,
  onToggleOverview,
  showComparison,
  isCompOn,
  onToggleComparison,
  activeCmpPeriod,
  onCmpPeriodChange,
  onMenuClick,
  labels,
}) => {
  const showCmpSelect  = showComparison && isCompOn && !isOverviewOn;
  const showDatePicker = showPeriodFilter && activePeriod === "custom";

  const periodOpts = PERIOD_OPTS.map((opt) => ({
    ...opt,
    label: labels?.periods?.[PERIOD_KEY_MAP[opt.value]] ?? opt.label,
  }));

  return (
    <>
      {/* Row 1: title + menu */}
      <div className="flex items-start justify-between px-5 pb-1 pt-4">
        <div>
          <p className="text-base font-bold text-ds-1">{title}</p>
          {subtitle && <p className="mt-0.5 text-xs text-ds-3">{subtitle}</p>}
        </div>
        <Button
          variant="tertiary"
          size="small"
          className="shrink-0 p-0.5! text-ds-3"
          aria-label={labels?.moreOptions ?? "More options"}
          onClick={onMenuClick}
        >
          <EllipsisVerticalIcon width={18} height={18} />
        </Button>
      </div>

      {/* Row 2: selects left · buttons right */}
      <div className="flex items-center justify-between gap-2 px-5 pb-3 pt-1">
        {/* Left — period selects */}
        <div className="flex flex-wrap items-center gap-1.5">
          {showPeriodFilter && (
            <Select
              options={periodOpts}
              value={activePeriod}
              onChange={(e) => onPeriodChange(e.target.value as PLPeriod)}
              size="compact"
              selectionIndicator="none"
              containerClassName="w-[118px]"
              aria-label="Filter by period"
            />
          )}
          {showCmpSelect && (
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-ds-3">{labels?.compareTo ?? "vs"}</span>
              <Select
                options={periodOpts}
                value={activeCmpPeriod}
                onChange={(e) => onCmpPeriodChange(e.target.value as PLPeriod)}
                size="compact"
                selectionIndicator="none"
                containerClassName="w-[118px]"
                aria-label="Comparison period"
              />
            </div>
          )}
        </div>

        {/* Right — action buttons */}
        <div className="flex items-center gap-1.5">
          {canOverview && (
            <Button
              variant="tertiary"
              size="small"
              onClick={onToggleOverview}
              aria-pressed={isOverviewOn}
              className={ctrlBtn(isOverviewOn)}
            >
              {labels?.overview ?? "Overview"}
            </Button>
          )}
          {showComparison && (
            <Button
              variant="tertiary"
              size="small"
              onClick={onToggleComparison}
              aria-pressed={isCompOn && !isOverviewOn}
              className={ctrlBtn(isCompOn && !isOverviewOn)}
            >
              {labels?.compare ?? "Compare"}
            </Button>
          )}
        </div>
      </div>

      {/* Row 3: date range picker — only when period = custom */}
      {showDatePicker && (
        <div className="flex items-center gap-2 px-5 pb-2">
          <DatePicker
            mode="range"
            value={activeRange}
            onChange={(v) => {
              if (v && typeof v === "object" && "start" in v) {
                onRangeChange(v as DateRangeValue);
              }
            }}
            placeholder={labels?.dateRangePlaceholder ?? "Pick a date range"}
          />
        </div>
      )}
    </>
  );
};
