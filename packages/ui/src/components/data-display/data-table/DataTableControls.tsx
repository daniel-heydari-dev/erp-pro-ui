import React from "react";
import { Button } from "../../forms/button";
import { Checkbox } from "../../forms/checkbox";

interface FilterDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="absolute top-full right-0 z-50 mt-2 min-w-64 overflow-hidden rounded-[4px] border border-white/45 bg-neutral-50 shadow-[0_18px_40px_rgba(15,23,42,0.18)] ring-1 ring-inset ring-white/35 backdrop-blur-2xl dark:border-white/10 dark:bg-neutral-800/50 dark:shadow-[0_22px_48px_rgba(0,0,0,0.42)] dark:ring-white/6">
        {children}
      </div>
    </>
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
        ? "border-accent/20 bg-accent-subtle text-accent hover:bg-accent-subtle hover:opacity-100"
        : "border-transparent bg-transparent text-neutral-600 hover:bg-neutral-100 hover:text-neutral-700 hover:opacity-100 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200"
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
  <div className="p-4 space-y-3">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-semibold text-neutral-900 dark:text-white">
        {labels.columns}
      </span>
    </div>

    <div className="space-y-2 max-h-64 overflow-y-auto">
      {columns.map((col) => (
        <div
          key={col.id}
          className="rounded-[8px] px-2 py-1 hover:bg-neutral-100 dark:hover:bg-neutral-700"
        >
          <Checkbox
            checked={col.visible !== false}
            onChange={() => onToggle(col.id)}
            label={col.label}
          />
        </div>
      ))}
    </div>

    {(onShowAll || onHideAll) && (
      <div className="flex gap-2 border-t border-neutral-200 pt-2 dark:border-neutral-700">
        {onShowAll && (
          <Button
            onClick={onShowAll}
            size="small"
            className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-accent shadow-none hover:bg-transparent hover:text-accent-hover hover:opacity-100"
          >
            {labels.showAll}
          </Button>
        )}
        {onHideAll && (
          <Button
            onClick={onHideAll}
            size="small"
            className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-neutral-500 shadow-none hover:bg-transparent hover:text-neutral-600 hover:opacity-100 dark:text-neutral-300 dark:hover:text-white"
          >
            {labels.hideAll}
          </Button>
        )}
      </div>
    )}
  </div>
);
