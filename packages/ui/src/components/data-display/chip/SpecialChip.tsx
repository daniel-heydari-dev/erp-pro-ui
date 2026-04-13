import type { ReactNode } from "react";

import { TruncatedText } from "../../typography/truncated-text";
import { mergeClassNames } from "../../../utils";

export type SplitChipDirection = "auto" | "ltr" | "rtl";

export interface SplitChipProps {
  leftLabel: ReactNode;
  rightLabel: ReactNode;
  dir?: SplitChipDirection;
  rightLabelDir?: SplitChipDirection;
  truncateRight?: boolean;
  rightMaxWidth?: string | number;
  showRightTitleOnHover?: boolean;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

export function SplitChip({
  leftLabel,
  rightLabel,
  dir = "auto",
  rightLabelDir = "ltr",
  truncateRight = false,
  rightMaxWidth = "10rem",
  showRightTitleOnHover = true,
  className,
  leftClassName,
  rightClassName,
}: SplitChipProps) {
  const isRtl = dir === "rtl";

  return (
    <span
      dir={dir}
      className={mergeClassNames(
        "inline-flex items-center overflow-hidden rounded-md border border-ds-border-2 bg-ds-surface-2",
        className,
      )}
    >
      <span
        className={mergeClassNames(
          "bg-ds-surface-3 px-2 py-1 text-xs font-medium uppercase tracking-[0.05em] text-ds-2",
          isRtl ? "border-l border-ds-border-2" : "border-r border-ds-border-2",
          leftClassName,
        )}
      >
        {leftLabel}
      </span>
      <span
        dir={rightLabelDir}
        className={mergeClassNames(
          "min-w-0 px-2 py-1 text-xs font-medium text-ds-1",
          rightClassName,
        )}
      >
        {truncateRight ? (
          <TruncatedText
            maxWidth={rightMaxWidth}
            showTitleOnHover={showRightTitleOnHover}
          >
            {rightLabel}
          </TruncatedText>
        ) : (
          rightLabel
        )}
      </span>
    </span>
  );
}

export type StatusDotChipTone = "success" | "warning" | "danger" | "info";

export interface StatusDotChipProps {
  label: string;
  tone?: StatusDotChipTone;
  className?: string;
}

const toneClasses: Record<StatusDotChipTone, string> = {
  success:
    "bg-ds-state-success-surface text-ds-state-success-text border-ds-state-success-border",
  warning:
    "bg-ds-state-warning-surface text-ds-state-warning-text border-ds-state-warning-border",
  danger:
    "bg-ds-state-error-surface text-ds-state-error-text border-ds-state-error-border",
  info: "bg-ds-state-info-surface text-ds-state-info-text border-ds-state-info-border",
};

const dotToneClasses: Record<StatusDotChipTone, string> = {
  success: "bg-ds-state-success",
  warning: "bg-ds-state-warning",
  danger: "bg-ds-state-danger",
  info: "bg-ds-state-info",
};

export function StatusDotChip({
  label,
  tone = "info",
  className,
}: StatusDotChipProps) {
  return (
    <span
      className={mergeClassNames(
        "inline-flex items-center gap-2 rounded-md border px-3 py-1 text-sm font-medium",
        toneClasses[tone],
        className,
      )}
    >
      <span
        aria-hidden="true"
        className={mergeClassNames(
          "h-2.5 w-2.5 rounded-full",
          dotToneClasses[tone],
        )}
      />
      <span>{label}</span>
    </span>
  );
}
