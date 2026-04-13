import React from "react";
import { Chip } from "../chip";
import { Button } from "../../forms/button";
import { Input } from "../../forms/input";
import { Tooltip } from "../../overlays/tooltip";
import {
  ArrowDownIcon,
  ColumnsIcon,
  RefreshIcon,
  SearchIcon,
  SelectionIcon,
  TrashIcon,
} from "../../icons";
import { mergeClassNames } from "../../../utils";
import {
  ColumnToggle,
  FilterButton,
  FilterDropdown,
} from "./DataTableControls";

const ICON_BUTTON_CLASS_NAME =
  "inline-flex items-center justify-center rounded-lg text-ds-2 transition-colors hover:bg-ds-surface-2 hover:text-ds-1";
const DISABLED_ICON_BUTTON_CLASS_NAME = `${ICON_BUTTON_CLASS_NAME} disabled:cursor-not-allowed disabled:opacity-40`;
const TABLE_CONTROL_ICON_CLASS_NAME = "h-[18px] w-[18px] shrink-0";
const TABLE_COMPLEX_ICON_CLASS_NAME = TABLE_CONTROL_ICON_CLASS_NAME;
const TOOLBAR_ACTION_BUTTON_CLASS_NAME =
  "inline-flex h-9 items-center gap-2 rounded-md border border-transparent bg-transparent px-2.5 text-[12px] font-semibold uppercase tracking-[0.03em] text-ds-2 shadow-none transition-colors hover:bg-ds-surface-2 hover:text-ds-1 hover:opacity-100";

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

interface ToolbarActionButtonProps {
  title: string;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
  icon: React.ReactNode;
}

function ToolbarActionButton({
  title,
  label,
  onClick,
  isActive = false,
  icon,
}: ToolbarActionButtonProps) {
  return (
    <Button
      onClick={onClick}
      title={title}
      aria-label={title}
      aria-pressed={isActive}
      className={mergeClassNames(
        TOOLBAR_ACTION_BUTTON_CLASS_NAME,
        "relative z-10",
        isActive ? "text-ds-on-accent" : "text-ds-2",
      )}
    >
      <span
        className={mergeClassNames(
          "inline-flex h-5 w-5 items-center justify-center text-ds-2",
          isActive && "text-ds-on-accent",
        )}
      >
        {icon}
      </span>
      <span>{label}</span>
    </Button>
  );
}

interface SearchFieldProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  direction: "ltr" | "rtl";
}

function SearchField({
  value,
  onChange,
  placeholder,
  direction,
}: SearchFieldProps) {
  return (
    <div className="relative w-[300px]">
      <SearchIcon
        className={`pointer-events-none absolute top-1/2 z-10 -translate-y-1/2 text-ds-2 ${TABLE_CONTROL_ICON_CLASS_NAME}`}
        style={{
          insetInlineStart: "1rem",
        }}
        aria-hidden="true"
      />
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{
          paddingInlineStart: "2.75rem",
          textAlign: direction === "rtl" ? "right" : "left",
        }}
      />
    </div>
  );
}

interface ToolbarLabels {
  columns: string;
  showAll: string;
  hideAll: string;
  refresh: string;
  export: string;
  columnSettings: string;
}

interface DataTableToolbarProps {
  direction: "ltr" | "rtl";
  showRefreshButton?: boolean;
  showExportButton?: boolean;
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
  direction,
  showRefreshButton = true,
  showExportButton = true,
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
  const visibleActionIds = React.useMemo(
    () =>
      [
        showRefreshButton ? "refresh" : null,
        showExportButton ? "export" : null,
        "columns",
      ].filter(Boolean) as Array<"refresh" | "export" | "columns">,
    [showExportButton, showRefreshButton],
  );
  const [activeAction, setActiveAction] = React.useState<
    "refresh" | "export" | "columns"
  >("columns");

  React.useEffect(() => {
    if (columnMenuOpen) {
      setActiveAction("columns");
      return;
    }

    if (!visibleActionIds.includes(activeAction)) {
      setActiveAction(visibleActionIds[0] ?? "columns");
    }
  }, [activeAction, columnMenuOpen, visibleActionIds]);

  const logicalActiveIndex = Math.max(
    visibleActionIds.indexOf(activeAction),
    0,
  );
  const visualActiveIndex =
    direction === "rtl"
      ? Math.max(visibleActionIds.length - logicalActiveIndex - 1, 0)
      : logicalActiveIndex;

  return (
    <div className="border-b border-ds-border-2 px-4 py-3">
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
            direction={direction}
          />
        </div>

        <div className="flex items-center gap-1 self-end lg:self-auto">
          <div className="relative overflow-hidden rounded-xl border border-ds-border-2 bg-ds-surface-1 p-1">
            {visibleActionIds.length > 0 ? (
              <span
                aria-hidden="true"
                className="pointer-events-none absolute bottom-1 top-1 rounded-lg border border-ds-border-accent/35 bg-ds-accent shadow-[0_8px_20px_rgba(79,43,226,0.34)] transition-transform duration-300 ease-out"
                style={{
                  width: `calc((100% - 0.5rem) / ${visibleActionIds.length})`,
                  transform: `translateX(${visualActiveIndex * 100}%)`,
                  insetInlineStart: "0.25rem",
                }}
              />
            ) : null}
            <div
              className="grid min-w-[290px] items-center"
              style={{
                gridTemplateColumns: `repeat(${visibleActionIds.length}, minmax(0, 1fr))`,
              }}
            >
              {showRefreshButton ? (
                <ToolbarActionButton
                  title={labels.refresh}
                  label={labels.refresh}
                  isActive={activeAction === "refresh"}
                  onClick={() => {
                    setActiveAction("refresh");
                    onExport?.();
                  }}
                  icon={
                    <RefreshIcon
                      className={TABLE_CONTROL_ICON_CLASS_NAME}
                      aria-hidden="true"
                    />
                  }
                />
              ) : null}
              {showExportButton ? (
                <ToolbarActionButton
                  title={labels.export}
                  label={labels.export}
                  isActive={activeAction === "export"}
                  onClick={() => {
                    setActiveAction("export");
                    onExport?.();
                  }}
                  icon={
                    <ArrowDownIcon
                      className={TABLE_CONTROL_ICON_CLASS_NAME}
                      aria-hidden="true"
                    />
                  }
                />
              ) : null}
              <ToolbarActionButton
                onClick={() => {
                  setActiveAction("columns");
                  onToggleColumnMenu();
                }}
                title={labels.columnSettings}
                label={labels.columnSettings}
                isActive={activeAction === "columns" || columnMenuOpen}
                icon={
                  <ColumnsIcon
                    className={TABLE_COMPLEX_ICON_CLASS_NAME}
                    aria-hidden="true"
                  />
                }
              />
            </div>
          </div>
          {toolbarActions}

          <div className="relative">
            <FilterDropdown
              isOpen={columnMenuOpen}
              onClose={onCloseColumnMenu}
              direction={direction}
            >
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
            <div className="mt-2 flex flex-col gap-2 rounded-[4px] border border-ds-border-2 bg-ds-surface-2 px-3 py-2 shadow-sm lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <Chip
                  variant="soft"
                  color="primary"
                  size="sm"
                  className="uppercase tracking-wide"
                >
                  Bulk actions
                </Chip>
                <p className="text-sm font-medium text-ds-1">
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
                    className="border-ds-border-accent/20 px-3 py-2 text-sm text-ds-on-accent shadow-lg shadow-ds-accent/20 hover:bg-ds-accent-hover hover:opacity-100"
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
