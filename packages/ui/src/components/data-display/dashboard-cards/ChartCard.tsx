"use client";

import type { FC, ReactNode } from "react";

import { Button } from "../../forms/button";
import { EllipsisVerticalIcon } from "../../icons/EllipsisVerticalIcon";
import { mergeClassNames } from "../../../utils";

export interface ChartCardLegendItem {
  label: string;
  color: string;
}

export interface ChartCardProps {
  title: string;
  dateRange?: string;
  legend?: ChartCardLegendItem[];
  className?: string;
  onMenuClick?: () => void;
  children: ReactNode;
}

export const ChartCard: FC<ChartCardProps> = ({
  title,
  dateRange,
  legend,
  className,
  onMenuClick,
  children,
}) => {
  return (
    <div
      className={mergeClassNames(
        "flex flex-col gap-4 rounded-2xl border border-ds-border-2 bg-ds-surface-1 p-5",
        className,
      )}
    >
      <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-sm font-semibold text-ds-color-fg">
            {title}
          </span>
          {dateRange && (
            <span className="text-xs text-ds-color-fg-subtle">{dateRange}</span>
          )}
        </div>

        <div className="flex items-center gap-4 ms-auto">
          {legend && legend.length > 0 && (
            <div className="flex items-center gap-3">
              {legend.map((item) => (
                <span
                  key={item.label}
                  className="flex items-center gap-1.5 text-xs text-ds-color-fg-muted"
                >
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.label}
                </span>
              ))}
            </div>
          )}
          <Button
            variant="tertiary"
            size="small"
            className="shrink-0 p-0.5! text-ds-color-fg-subtle"
            aria-label="More options"
            onClick={onMenuClick}
          >
            <EllipsisVerticalIcon width={18} height={18} />
          </Button>
        </div>
      </div>

      <div className="w-full">{children}</div>
    </div>
  );
};
