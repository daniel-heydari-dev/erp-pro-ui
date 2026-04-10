import React from "react";
import { Chip } from "../chip";
import { Button } from "../../forms/button";
import { Input } from "../../forms/input";
import { Tooltip } from "../../overlays/tooltip";
import {
  RefreshIcon,
  SearchIcon,
  SelectionIcon,
  SettingsIcon,
  TrashIcon,
} from "../../icons";
import { ColumnToggle, FilterButton, FilterDropdown } from "./DataTableControls";

const ICON_BUTTON_CLASS_NAME =
  "inline-flex items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:hover:text-neutral-200";
const DISABLED_ICON_BUTTON_CLASS_NAME = `${ICON_BUTTON_CLASS_NAME} disabled:cursor-not-allowed disabled:opacity-40`;
const TABLE_CONTROL_ICON_CLASS_NAME = "h-[18px] w-[18px] shrink-0";
const TABLE_COMPLEX_ICON_CLASS_NAME = TABLE_CONTROL_ICON_CLASS_NAME;

interface ToolbarIconButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

export function ToolbarIconButton({
  title,
  onClick,
  disabled,
  children,
}: ToolbarIconButtonProps) {
  return (
    <Tooltip content={title}>
      <Button
        onClick={onClick}
        disabled={disabled}
        title={title}
        aria-label={title}
        className={
          disabled
            ? `${DISABLED_ICON_BUTTON_CLASS_NAME} h-10 w-10 shrink-0 border-transparent bg-transparent px-0 py-0 text-base shadow-none`
            : `${ICON_BUTTON_CLASS_NAME} h-10 w-10 shrink-0 border-transparent bg-transparent px-0 py-0 text-base shadow-none`
        }
      >
        {children}
      </Button>
    </Tooltip>
  );
}

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

function SearchField({ value, onChange, placeholder }: SearchFieldProps) {
  return (
    <div className="relative w-[300px]">
      <SearchIcon
        className={`pointer-events-none absolute left-4 top-1/2 z-10 -translate-y-1/2 text-neutral-400 ${TABLE_CONTROL_ICON_CLASS_NAME}`}
        aria-hidden="true"
      />
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: "2.75rem" }}
      />
    </div>
  );
}

interface ToolbarLabels {
  columns: string;
  showAll: string;
  hideAll: string;
}

interface DataTableToolbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder: string;
  bulkDeleteEnabled: boolean;
  bulkSelectionActive: boolean;
  selectedCount: number;
  bulkActionsContent?: React.ReactNode;
  bulkActionCard?: React.ReactNode;
  onToggleBulkSelection: () => void;
  onBulkDeleteSelected: () => void;
  onExport?: () => void;
  columnMenuOpen: boolean;
  onToggleColumnMenu: () => void;
  onCloseColumnMenu: () => void;
  columns: {
    id: string;
    label: string;
    visible?: boolean;
  }[];
  onColumnToggle?: (columnId: string) => void;
  onShowAllColumns: () => void;
  onHideAllColumns: () => void;
  labels: ToolbarLabels;
  toolbarActions?: React.ReactNode;
}

export function DataTableToolbar({
  searchQuery,
  onSearchChange,
  searchPlaceholder,
  bulkDeleteEnabled,
  bulkSelectionActive,
  selectedCount,
  bulkActionsContent,
  bulkActionCard,
  onToggleBulkSelection,
  onBulkDeleteSelected,
  onExport,
  columnMenuOpen,
  onToggleColumnMenu,
  onCloseColumnMenu,
  columns,
  onColumnToggle,
  onShowAllColumns,
  onHideAllColumns,
  labels,
  toolbarActions,
}: DataTableToolbarProps) {
  const hasSelectedRows = selectedCount > 0;

  return (
    <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {bulkDeleteEnabled ? (
            <FilterButton
              icon={
                <SelectionIcon
                  className={TABLE_COMPLEX_ICON_CLASS_NAME}
                  aria-hidden="true"
                />
              }
              label={
                bulkSelectionActive
                  ? "Disable bulk selection"
                  : "Enable bulk selection"
              }
              onClick={onToggleBulkSelection}
              hasActive={bulkSelectionActive}
            />
          ) : null}

          <SearchField
            value={searchQuery}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
          />
        </div>

        <div className="flex items-center gap-1 self-end lg:self-auto">
          <ToolbarIconButton onClick={onExport} title="Refresh">
            <RefreshIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          </ToolbarIconButton>
          {toolbarActions}

          <div className="relative">
            <ToolbarIconButton
              onClick={onToggleColumnMenu}
              title="Column settings"
            >
              <SettingsIcon
                className={TABLE_COMPLEX_ICON_CLASS_NAME}
                aria-hidden="true"
              />
            </ToolbarIconButton>

            <FilterDropdown isOpen={columnMenuOpen} onClose={onCloseColumnMenu}>
              <ColumnToggle
                columns={columns}
                onToggle={(columnId) => {
                  onColumnToggle?.(columnId);
                }}
                onShowAll={onShowAllColumns}
                onHideAll={onHideAllColumns}
                labels={labels}
              />
            </FilterDropdown>
          </div>
        </div>
      </div>

      {bulkSelectionActive && hasSelectedRows
        ? (bulkActionCard ?? (
            <div className="mt-2 flex flex-col gap-2 rounded-[4px] border border-neutral-200 bg-neutral-50 px-3 py-2 shadow-sm dark:border-neutral-700 dark:bg-neutral-800/50 dark:shadow-black/25 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <Chip
                  variant="soft"
                  color="primary"
                  size="sm"
                  className="uppercase tracking-wide"
                >
                  Bulk actions
                </Chip>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {selectedCount} {selectedCount === 1 ? "row" : "rows"}{" "}
                  selected
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {bulkActionsContent}
                {bulkDeleteEnabled ? (
                  <Button
                    onClick={onBulkDeleteSelected}
                    primary
                    size="small"
                    className="border-accent/20 px-3 py-2 text-sm text-on-accent shadow-lg shadow-accent/20 hover:bg-accent-hover hover:opacity-100"
                  >
                    <TrashIcon className="h-4 w-4" aria-hidden="true" />
                    Delete selected
                  </Button>
                ) : null}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
