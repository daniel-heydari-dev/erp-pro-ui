import React from "react";
import { Button } from "../../forms/button";
import { Checkbox } from "../../forms/checkbox";
import { DropdownMenu } from "../../overlays/dropdown-menu";

interface FilterDropdownProps {
  trigger: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
  direction?: "ltr" | "rtl";
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  trigger,
  open,
  onOpenChange,
  children,
  direction = "ltr",
}) => {
  return (
    <DropdownMenu
      trigger={trigger}
      open={open}
      onOpenChange={onOpenChange}
      className="relative"
      animationClassName={`${
        direction === "rtl" ? "origin-top-left" : "origin-top-right"
      } transition-all duration-200 ease-[cubic-bezier(0.22,1,0.36,1)]`}
      panelClassName={`top-full z-50 mt-2 min-w-64 overflow-hidden rounded-md border border-ds-border-2 bg-ds-surface-1 shadow-[0_18px_40px_rgba(15,23,42,0.18)] ring-1 ring-inset ring-ds-border-3/35 backdrop-blur-2xl ${
        direction === "rtl" ? "left-0" : "right-0"
      }`}
    >
      {children}
    </DropdownMenu>
  );
};

interface FilterButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  hasActive?: boolean;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  icon,
  label,
  onClick,
  hasActive,
}) => (
  <Button
    onClick={onClick}
    title={label}
    aria-label={label}
    className={`h-10 min-w-10 px-0 py-0 shadow-none ${
      hasActive
        ? "border-ds-border-accent/20 bg-ds-accent-subtle text-ds-1 hover:bg-ds-accent-subtle hover:opacity-100"
        : "border-transparent bg-transparent text-ds-2 hover:bg-ds-surface-2 hover:text-ds-1 hover:opacity-100"
    }`}
  >
    {icon}
  </Button>
);

interface ColumnToggleLabels {
  columns: string;
  showAll: string;
  hideAll: string;
}

interface ColumnToggleProps {
  columns: {
    id: string;
    label: string;
    visible?: boolean;
  }[];
  onToggle: (columnId: string) => void;
  onShowAll?: () => void;
  onHideAll?: () => void;
  labels: ColumnToggleLabels;
}

export const ColumnToggle: React.FC<ColumnToggleProps> = ({
  columns,
  onToggle,
  onShowAll,
  onHideAll,
  labels,
}) => (
  <div
    className="flex flex-col"
    style={{ maxHeight: "min(400px, 80dvh)" }}
  >
    {/* Header — never scrolls */}
    <div className="flex shrink-0 items-center px-4 pb-2 pt-4">
      <span className="text-sm font-semibold text-ds-1">{labels.columns}</span>
    </div>

    {/* Scrollable column list */}
    <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-1">
      <div className="space-y-0.5">
        {columns.map((col) => (
          <div
            key={col.id}
            className="rounded-md px-2 py-1 hover:bg-ds-surface-2"
          >
            <Checkbox
              checked={col.visible !== false}
              onChange={() => onToggle(col.id)}
              label={col.label}
            />
          </div>
        ))}
      </div>
    </div>

    {/* Sticky footer — always visible at bottom */}
    {(onShowAll || onHideAll) && (
      <div className="flex shrink-0 gap-2 border-t border-ds-border-2 px-4 py-3">
        {onShowAll && (
          <Button
            onClick={onShowAll}
            size="small"
            className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-ds-1 shadow-none hover:bg-transparent hover:text-ds-accent-hover hover:opacity-100"
          >
            {labels.showAll}
          </Button>
        )}
        {onHideAll && (
          <Button
            onClick={onHideAll}
            size="small"
            className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-ds-2 shadow-none hover:bg-transparent hover:text-ds-1 hover:opacity-100"
          >
            {labels.hideAll}
          </Button>
        )}
      </div>
    )}
  </div>
);
