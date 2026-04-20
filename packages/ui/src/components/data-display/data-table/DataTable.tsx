import React from "react";
import { createPortal } from "react-dom";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type CellContext,
  type ColumnDef,
  type PaginationState,
  type Table as TanStackTable,
} from "@tanstack/react-table";
import { Button } from "../../forms/button";
import { Checkbox } from "../../forms/checkbox";
import { Input } from "../../forms/input";
import { Select } from "../../forms/select";
import { type DatePickerValue } from "../../forms/date-picker";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  EllipsisVerticalIcon,
  FilterIcon,
  FilterProfileIcon,
  FilterXIcon,
  LoaderIcon,
} from "../../icons";
import { mergeClassNames } from "../../../utils";
import {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./TablePrimitives";
import { DataTableRows } from "./DataTableRows";
import type { DataTableEmptyStateContext } from "./DataTableRows";
import { DataTableToolbar, ToolbarIconButton } from "./DataTableToolbar";
import {
  ColumnToggle,
  FilterButton,
  FilterDropdown,
} from "./DataTableControls";
import {
  FilterFieldControl,
  filterClientData,
  isFilterActive,
  resolveFilterOptions,
  useAsyncFilterOptions,
} from "./DataTableFilters";
import { resolveTableDirection, type TableDirection } from "./direction";
export {
  TableContainer,
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./TablePrimitives";
export type { DataTableEmptyStateContext } from "./DataTableRows";
export {
  ColumnToggle,
  FilterButton,
  FilterDropdown,
} from "./DataTableControls";
export { ToolbarIconButton } from "./DataTableToolbar";

// Filter option type - can be static or async
export interface FilterOption {
  id: string;
  label: string;
  type?:
    | "text"
    | "select"
    | "combobox"
    | "checkbox"
    | "switch"
    | "date"
    | "date-range"
    | "number-range";
  placeholder?: string;
  options?: string[]; // Static options
  // Async options support
  queryKey?: string | string[]; // React Query key for caching
  fetchOptions?: () => Promise<string[]>; // Async function to fetch options
  isLoading?: boolean; // Loading state (managed externally)
  multiple?: boolean; // Enable multi-select
  /* Crystal UI Unification */
  /*
  ### Automated Browser Testing
  The filters were verified using the browser subagent, confirming that each filter type correctly updates the table data in real-time and adheres to our new unified "Crystal" aesthetic.

  ````carousel
  ![Unified Crystal Filters](file:///Users/dani.dev/.gemini/antigravity/brain/cddc57db-96d9-409e-add9-b0c887fa88f1/data_table_crystal_filters_verification_1771807771898.png)
  <!-- slide -->
  ![Crystal Combobox Dropdown](file:///Users/dani.dev/.gemini/antigravity/brain/cddc57db-96d9-409e-add9-b0c887fa88f1/crystal_look_verification_final_1771807597075.png)
  <!-- slide -->
  ![Global Unification Verification Recording](file:///Users/dani.dev/.gemini/antigravity/brain/cddc57db-96d9-409e-add9-b0c887fa88f1/verify_global_crystal_style_1771807684506.webp)
  ````

  ### Key Successes:
  - **Unified Aesthetic**: All components now share a consistent `backdrop-blur-xl` and semi-transparent background.
  - **Improved Visual Hierarchy**: The crystal effect makes the components feel integrated with the page while still being clearly interactive.
  - **Robust Logic**: Maintained all advanced filtering logic (date ranges, numeric ranges, partial matches) while upgrading the visual layer.
  */
}

// Filter value can be single string, array of strings, or range objects
export type FilterValue =
  | string
  | string[]
  | boolean
  | DatePickerValue
  | { min?: number; max?: number };
export type FilterValues = Record<string, FilterValue>;

export interface DataTableBulkActionContext<T> {
  selectedRows: T[];
  selectedCount: number;
  clearSelection: () => void;
  disableBulkSelection: () => void;
}

export interface DataTableCellRenderContext<T> {
  value: unknown;
  row: T;
  rowIndex: number;
  columnId: string;
}

export interface DataTableColumn<T> {
  id: string;
  label: string;
  visible?: boolean;
  filterable?: boolean;
  multiFilter?: boolean;
  priority?: number;
  renderCell?: (context: DataTableCellRenderContext<T>) => React.ReactNode;
}

export interface DataTableRowAction<T> {
  id: string;
  label: string;
  variant?: "default" | "destructive";
  onClick?: (row: T) => void;
}

export interface DataTableTextLabels {
  columns: string;
  showAll: string;
  hideAll: string;
  refresh: string;
  export: string;
  columnSettings: string;
  showFilters: string;
  addFilter: string;
  clearFilters: string;
  filterProfiles: string;
  saveNewFilterProfile: string;
}

const DEFAULT_DATA_TABLE_LABELS: DataTableTextLabels = {
  columns: "COLUMNS",
  showAll: "SHOW ALL",
  hideAll: "HIDE ALL",
  refresh: "REFRESH",
  export: "EXPORT",
  columnSettings: "COLUMNS",
  showFilters: "SHOW FILTERS",
  addFilter: "Add filter",
  clearFilters: "Clear filters",
  filterProfiles: "Filter profiles",
  saveNewFilterProfile: "Save new filter profile",
};

export interface FilterSelectorFooterContext {
  onShowAll: () => void;
  onHideAll: () => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableProps<T = Record<string, any>> {
  columns: DataTableColumn<T>[];
  data: T[];
  /** Force layout direction for table internals (row actions, sticky columns, pagination). */
  direction?: "auto" | TableDirection;
  isLoading?: boolean; // Table data loading state
  onColumnToggle?: (columnId: string) => void;
  /** Number of items per page */
  pageSize?: number;
  /** Maximum height for the scrollable table area */
  maxHeight?: string;
  onSearch?: (query: string) => void;
  onRefresh?: () => void;
  onExport?: () => void;
  showRefreshButton?: boolean;
  showExportButton?: boolean;
  onRowAction?: (action: string, row: T) => void;
  onRowClick?: (row: T, rowIndex: number) => void;
  renderRowDetails?: (row: T, rowIndex: number) => React.ReactNode;
  rowActions?: DataTableRowAction<T>[];
  onBulkDelete?: (rows: T[]) => void;
  renderBulkActions?: (
    context: DataTableBulkActionContext<T>,
  ) => React.ReactNode;
  renderBulkActionCard?: (
    context: DataTableBulkActionContext<T>,
  ) => React.ReactNode;
  onFilterChange?: (filters: FilterValues) => void;
  // Filter options - can include async filters
  filterOptions?: FilterOption[];
  // Called when filters are applied (for server-side filtering)
  onFiltersApply?: (filters: FilterValues) => void;
  // Enable server-side filtering mode
  serverSideFiltering?: boolean;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  /** Total row count for server-side pagination */
  totalCount?: number;
  /** Callback when pagination changes (for server-side pagination) */
  onPaginationChange?: (pageIndex: number, pageSize: number) => void;
  renderEmptyState?: (context: DataTableEmptyStateContext) => React.ReactNode;
  labels?: Partial<DataTableTextLabels>;
  renderFilterSelectorFooterActions?: (
    context: FilterSelectorFooterContext,
  ) => React.ReactNode;
  renderFilterRowActions?: React.ReactNode;
  renderToolbarActions?: React.ReactNode;
  className?: string;
  tableContainerClassName?: string;
  tableClassName?: string;
  caption?: React.ReactNode;
  captionClassName?: string;
  headerClassName?: string;
  headerRowClassName?: string;
  headClassName?: string;
  bodyClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  footerClassName?: string;
}

function renderDefaultCellValue(value: unknown): React.ReactNode {
  if (value === undefined || value === null || value === "") {
    return "-";
  }

  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }

  if (Array.isArray(value)) {
    return value.length > 0 ? value.join(", ") : "-";
  }

  return value as React.ReactNode;
}

interface FilterProfileProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveProfile: (name: string) => void;
}

export const FilterProfile: React.FC<FilterProfileProps> = ({
  isOpen,
  onClose,
  onSaveProfile,
}) => {
  const [profileName, setProfileName] = React.useState("");

  const handleSave = () => {
    if (profileName.trim()) {
      onSaveProfile(profileName);
      setProfileName("");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-ds-surface-1 border border-ds-border-2 rounded-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-ds-1 mb-4">Add new profile</h2>

        <label className="mb-2 block text-sm font-medium text-ds-1">
          Enter filter profile name:
        </label>
        <Input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          placeholder="Enter value"
          className=""
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
        />

        <div className="flex justify-end gap-3 mt-6">
          <Button onClick={onClose} className="min-w-28" size="medium">
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!profileName.trim()}
            className="min-w-28"
            size="medium"
            primary
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

const TABLE_CONTROL_ICON_CLASS_NAME = "h-[18px] w-[18px] shrink-0";
const TABLE_COMPLEX_ICON_CLASS_NAME = TABLE_CONTROL_ICON_CLASS_NAME;
const DEFAULT_PAGE_SIZE_OPTIONS = [10, 20, 30, 50, 100] as const;
const ROW_ACTIONS_CELL_WIDTH_CLASS_NAME = "w-12 min-w-12 max-w-12";
const ROW_ACTIONS_MENU_MIN_WIDTH_PX = 140;
const ROW_ACTIONS_MENU_MAX_WIDTH_PX = 200;
const ROW_ACTIONS_MENU_GAP_PX = 6;
const ROW_ACTIONS_MENU_VIEWPORT_PADDING_PX = 8;
const ROW_ACTIONS_MENU_RIGHT_GUTTER_PX = 0;
const ROW_ACTIONS_MENU_LEFT_GUTTER_PX = 0;

interface RowActionsCellProps<T> {
  rowIndex: number;
  row: T;
  isOpen: boolean;
  openDirection: "up" | "down";
  tableContainerRef: React.RefObject<HTMLDivElement | null>;
  onToggle: (rowIndex: number) => void;
  onClose: () => void;
  onRowAction?: (action: string, row: T) => void;
  actions: DataTableRowAction<T>[];
  direction: TableDirection;
}

function RowActionsCell<T>({
  rowIndex,
  row,
  isOpen,
  openDirection,
  tableContainerRef,
  onToggle,
  onClose,
  onRowAction,
  actions,
  direction,
}: RowActionsCellProps<T>) {
  const toggleAnchorRef = React.useRef<HTMLDivElement | null>(null);
  const menuRef = React.useRef<HTMLDivElement | null>(null);
  const [menuPosition, setMenuPosition] = React.useState<{
    top: number;
    right?: number;
    left?: number;
  } | null>(null);

  const updateMenuPosition = React.useCallback(() => {
    if (!isOpen || !toggleAnchorRef.current) {
      return;
    }

    const anchorRect = toggleAnchorRef.current.getBoundingClientRect();
    const tableRect = tableContainerRef.current?.getBoundingClientRect();
    const menuHeight =
      menuRef.current?.getBoundingClientRect().height ??
      Math.max(actions.length, 1) * 36 + 12;

    const spaceBelow =
      window.innerHeight -
      anchorRect.bottom -
      ROW_ACTIONS_MENU_VIEWPORT_PADDING_PX;
    const spaceAbove = anchorRect.top - ROW_ACTIONS_MENU_VIEWPORT_PADDING_PX;

    const openUpward =
      openDirection === "up"
        ? spaceBelow < menuHeight || spaceAbove > spaceBelow
        : spaceBelow < menuHeight && spaceAbove > spaceBelow;

    const targetTop = openUpward
      ? anchorRect.top - menuHeight - ROW_ACTIONS_MENU_GAP_PX
      : anchorRect.bottom + ROW_ACTIONS_MENU_GAP_PX;

    const maxTop = Math.max(
      ROW_ACTIONS_MENU_VIEWPORT_PADDING_PX,
      window.innerHeight - menuHeight - ROW_ACTIONS_MENU_VIEWPORT_PADDING_PX,
    );
    const clampedTop = Math.min(
      Math.max(targetTop, ROW_ACTIONS_MENU_VIEWPORT_PADDING_PX),
      maxTop,
    );

    if (direction === "rtl") {
      const leftOffset = Math.max(
        (tableRect?.left ?? anchorRect.left) + ROW_ACTIONS_MENU_LEFT_GUTTER_PX,
        ROW_ACTIONS_MENU_LEFT_GUTTER_PX,
      );

      setMenuPosition({
        top: clampedTop,
        left: leftOffset,
      });

      return;
    }

    const rightOffset = Math.max(
      window.innerWidth -
        (tableRect?.right ?? anchorRect.right) +
        ROW_ACTIONS_MENU_RIGHT_GUTTER_PX,
      ROW_ACTIONS_MENU_RIGHT_GUTTER_PX,
    );

    setMenuPosition({
      top: clampedTop,
      right: rightOffset,
    });
  }, [actions.length, direction, isOpen, openDirection, tableContainerRef]);

  React.useLayoutEffect(() => {
    if (!isOpen) {
      setMenuPosition(null);
      return;
    }

    updateMenuPosition();
    const rafId = window.requestAnimationFrame(updateMenuPosition);
    return () => window.cancelAnimationFrame(rafId);
  }, [isOpen, updateMenuPosition]);

  React.useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    const handleViewportChange = () => onClose();
    const tableContainerElement = tableContainerRef.current;

    window.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleViewportChange);
    window.addEventListener("scroll", handleViewportChange, true);
    tableContainerElement?.addEventListener("scroll", handleViewportChange, {
      passive: true,
    });

    return () => {
      window.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleViewportChange);
      window.removeEventListener("scroll", handleViewportChange, true);
      tableContainerElement?.removeEventListener(
        "scroll",
        handleViewportChange,
      );
    };
  }, [isOpen, onClose, tableContainerRef]);

  const rowActionsMenu = isOpen
    ? createPortal(
        <>
          <div className="fixed inset-0 z-[220]" onClick={onClose} />
          <div
            ref={menuRef}
            dir={direction}
            className={mergeClassNames(
              "fixed z-[230] min-w-[140px] max-w-[200px] overflow-hidden rounded-lg border border-ds-border-3 bg-ds-surface-2 shadow-xl",
              direction === "rtl" ? "text-right" : "text-left",
            )}
            style={{
              top: menuPosition?.top,
              right: menuPosition?.right,
              left: menuPosition?.left,
              minWidth: `${ROW_ACTIONS_MENU_MIN_WIDTH_PX}px`,
              maxWidth: `${ROW_ACTIONS_MENU_MAX_WIDTH_PX}px`,
            }}
            onClick={(event) => event.stopPropagation()}
          >
            {actions.map((action) => (
              <Button
                key={action.id}
                onClick={() => {
                  action.onClick?.(row);
                  onRowAction?.(action.id, row);
                  onClose();
                }}
                className={mergeClassNames(
                  "w-full rounded-none border-none bg-ds-surface-2 px-4 py-2 text-sm font-normal shadow-none hover:bg-ds-surface-3 hover:opacity-100",
                  direction === "rtl"
                    ? "justify-end text-right"
                    : "justify-start text-left",
                  action.variant === "destructive"
                    ? "text-error hover:text-error"
                    : "text-ds-2 hover:text-ds-1",
                )}
              >
                {action.label}
              </Button>
            ))}
          </div>
        </>,
        document.body,
      )
    : null;

  return (
    <td
      className={mergeClassNames(
        "relative h-full overflow-hidden border-x border-ds-border-2 bg-ds-surface-1 p-0 align-middle",
        direction === "rtl"
          ? "sticky left-0 text-right shadow-[8px_0_12px_-10px_rgba(15,23,42,0.35)]"
          : "sticky right-0 text-right shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.35)]",
        ROW_ACTIONS_CELL_WIDTH_CLASS_NAME,
        isOpen ? "z-20" : "z-10",
      )}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-px left-0 z-20 w-px bg-ds-border-2"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-y-px right-0 z-20 w-px bg-ds-border-2"
      />
      <div
        ref={toggleAnchorRef}
        className={mergeClassNames(
          "absolute -inset-y-px z-10 flex items-stretch bg-ds-surface-2",
          direction === "rtl" ? "left-0 justify-start" : "right-0 justify-end",
        )}
      >
        <Button
          onClick={(event) => {
            event.stopPropagation();
            onToggle(rowIndex);
          }}
          aria-label="Open row actions"
          className={mergeClassNames(
            "h-full w-12 rounded-none border-none px-0 py-0 shadow-none hover:opacity-100 ",
            isOpen
              ? "bg-ds-surface-2 text-ds-1"
              : "bg-ds-surface-2 text-ds-2 hover:bg-ds-surface-3 hover:text-ds-1",
          )}
        >
          <EllipsisVerticalIcon
            className={TABLE_CONTROL_ICON_CLASS_NAME}
            aria-hidden="true"
          />
        </Button>
      </div>
      {rowActionsMenu}
    </td>
  );
}

interface DataTablePaginationProps<T> {
  table: TanStackTable<T>;
  totalCount?: number;
  filteredCount: number;
  direction: TableDirection;
}

function DataTablePagination<T>({
  table,
  totalCount,
  filteredCount,
  direction,
}: DataTablePaginationProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const itemCount = totalCount ?? filteredCount;
  const pageStart = itemCount === 0 ? 0 : pageIndex * pageSize + 1;
  const pageEnd = Math.min((pageIndex + 1) * pageSize, itemCount);
  const pageSizeOptions = Array.from(
    new Set([...DEFAULT_PAGE_SIZE_OPTIONS, pageSize]),
  ).sort((left, right) => left - right);

  return (
    <div className="relative z-10 flex flex-col gap-3 border-t border-ds-border-2 bg-ds-surface-2 px-4 py-3 overflow-visible md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm text-ds-2">
          Showing {pageStart} to {pageEnd} of {itemCount} items
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 overflow-visible">
        <span className="text-sm text-ds-2">Rows</span>
        <Select
          value={String(pageSize)}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
          aria-label="Rows per page"
          size="compact"
          containerClassName="w-[5.5rem] min-w-[5.5rem] shrink-0"
          triggerClassName="px-2.5 font-medium text-ds-1"
          dropdownClassName="top-auto bottom-full z-[80] mb-1 mt-0"
          options={pageSizeOptions.map((size) => ({
            value: String(size),
            label: String(size),
          }))}
        />

        <ToolbarIconButton
          title="First page"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          {direction === "rtl" ? (
            <ChevronsRightIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          ) : (
            <ChevronsLeftIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          )}
        </ToolbarIconButton>

        <ToolbarIconButton
          title="Previous page"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          {direction === "rtl" ? (
            <ChevronRightIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          ) : (
            <ChevronLeftIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          )}
        </ToolbarIconButton>

        <span className="inline-flex h-10 shrink-0 items-center rounded-lg px-3 text-sm font-medium text-ds-2">
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>

        <ToolbarIconButton
          title="Next page"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          {direction === "rtl" ? (
            <ChevronLeftIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          ) : (
            <ChevronRightIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          )}
        </ToolbarIconButton>

        <ToolbarIconButton
          title="Last page"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          {direction === "rtl" ? (
            <ChevronsLeftIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          ) : (
            <ChevronsRightIcon
              className={TABLE_CONTROL_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          )}
        </ToolbarIconButton>
      </div>
    </div>
  );
}

interface FilterSelectorMenuProps {
  direction: TableDirection;
  filterOptions: FilterOption[];
  visibleFilters: string[];
  onToggleFilter: (filterId: string, isVisible: boolean) => void;
  onShowAll: () => void;
  onHideAll: () => void;
  labels: DataTableTextLabels;
  footerActions?: React.ReactNode;
}

function FilterSelectorMenu({
  direction,
  filterOptions,
  visibleFilters,
  onToggleFilter,
  onShowAll,
  onHideAll,
  labels,
  footerActions,
}: FilterSelectorMenuProps) {
  return (
    <div
      dir={direction}
      className={mergeClassNames(
        "p-4 min-h-58 min-w-48 space-y-3",
        direction === "rtl" ? "text-right" : "text-left",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-semibold text-ds-1">
          {labels.showFilters}
        </span>
      </div>
      {filterOptions.map((filter) => (
        <div
          key={filter.id}
          className="min-w-36 rounded-[8px] px-2 py-1 hover:bg-ds-surface-2"
        >
          <Checkbox
            checked={visibleFilters.includes(filter.id)}
            onChange={(event) =>
              onToggleFilter(filter.id, event.target.checked)
            }
            label={filter.label}
          />
        </div>
      ))}
      <div
        className={mergeClassNames(
          "flex gap-2 border-t border-ds-border-2 pt-2",
          direction === "rtl" && "flex-row-reverse",
        )}
      >
        <Button
          onClick={onShowAll}
          size="small"
          className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-ds-1 shadow-none hover:bg-transparent hover:text-ds-accent-hover hover:opacity-100"
        >
          {labels.showAll}
        </Button>
        <Button
          onClick={onHideAll}
          size="small"
          className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-ds-2 shadow-none hover:bg-transparent hover:text-ds-1 hover:opacity-100"
        >
          {labels.hideAll}
        </Button>
        {footerActions}
      </div>
    </div>
  );
}

const usesManualPagination = (
  totalCount?: number,
  onPaginationChange?: (pageIndex: number, pageSize: number) => void,
) => totalCount !== undefined || typeof onPaginationChange === "function";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T = Record<string, any>>({
  columns,
  data,
  direction = "auto",
  isLoading = false,
  onColumnToggle,
  pageSize = 10,
  maxHeight = "500px",
  onSearch,
  onRefresh,
  onExport,
  showRefreshButton = true,
  showExportButton = true,
  onRowAction,
  onRowClick,
  renderRowDetails,
  rowActions,
  onBulkDelete,
  renderBulkActions,
  renderBulkActionCard,
  onFilterChange,
  onFiltersApply,
  serverSideFiltering = false,
  filterOptions: externalFilterOptions,
  searchPlaceholder = "Search ...",
  totalCount,
  onPaginationChange,
  renderEmptyState,
  labels: labelsProp,
  renderFilterSelectorFooterActions,
  renderFilterRowActions,
  renderToolbarActions,
  className,
  tableContainerClassName,
  tableClassName,
  caption,
  captionClassName,
  headerClassName,
  headerRowClassName,
  headClassName,
  bodyClassName,
  rowClassName,
  cellClassName,
  footerClassName,
}: DataTableProps<T>) {
  const tableRootRef = React.useRef<HTMLDivElement | null>(null);
  const [tableDirection, setTableDirection] =
    React.useState<TableDirection>("ltr");

  React.useLayoutEffect(() => {
    if (direction === "rtl" || direction === "ltr") {
      setTableDirection(direction);
      return;
    }

    setTableDirection(resolveTableDirection(tableRootRef.current));
  }, [direction]);

  const isRtl = tableDirection === "rtl";

  const resolvedRowActions = React.useMemo<DataTableRowAction<T>[]>(
    () => rowActions ?? [],
    [rowActions],
  );
  const hasRowActions = resolvedRowActions.length > 0;

  const labels = React.useMemo<DataTableTextLabels>(
    () => ({
      ...DEFAULT_DATA_TABLE_LABELS,
      ...labelsProp,
    }),
    [labelsProp],
  );

  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });
  const [columnMenuOpen, setColumnMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [filterSelectorOpen, setFilterSelectorOpen] = React.useState(false);
  const [visibleFilters, setVisibleFilters] = React.useState<string[]>([]);
  const [activeFilters, setActiveFilters] = React.useState<FilterValues>({});
  const [bulkSelectionActive, setBulkSelectionActive] = React.useState(false);
  const [selectedRowIds, setSelectedRowIds] = React.useState<
    Record<string, boolean>
  >({});
  const [rowMenuOpen, setRowMenuOpen] = React.useState<number | null>(null);
  const [expandedRowId, setExpandedRowId] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [columnVisibility, setColumnVisibility] = React.useState<
    Record<string, boolean>
  >(() =>
    Object.fromEntries(
      columns.map((column) => [column.id, column.visible !== false]),
    ),
  );

  const columnsVisibilitySignature = React.useMemo(
    () =>
      columns
        .map((column) => `${column.id}:${column.visible !== false}`)
        .join("|"),
    [columns],
  );

  React.useEffect(() => {
    setColumnVisibility(
      Object.fromEntries(
        columns.map((column) => [column.id, column.visible !== false]),
      ),
    );
  }, [columns, columnsVisibilitySignature]);

  const asyncFilterOptions = useAsyncFilterOptions(
    externalFilterOptions,
    filterSelectorOpen,
  );

  // Auto-generate filter options from columns that are filterable
  const filterOptions: FilterOption[] = React.useMemo(() => {
    return resolveFilterOptions(
      columns,
      data,
      externalFilterOptions,
      asyncFilterOptions,
    );
  }, [columns, data, externalFilterOptions, asyncFilterOptions]);

  const resolvedColumns = React.useMemo(
    () =>
      columns.map((column) => ({
        ...column,
        visible: columnVisibility[column.id] ?? column.visible !== false,
      })),
    [columnVisibility, columns],
  );

  const visibleColumns = React.useMemo(
    () => resolvedColumns.filter((column) => column.visible !== false),
    [resolvedColumns],
  );
  const manualPagination = usesManualPagination(totalCount, onPaginationChange);
  const pageCount =
    totalCount === undefined
      ? undefined
      : Math.ceil(totalCount / pagination.pageSize);

  // Filter data based on search query and active filters (client-side only)
  const filteredData = React.useMemo(() => {
    return filterClientData(
      data,
      activeFilters,
      searchQuery,
      serverSideFiltering,
      filterOptions,
    );
  }, [data, activeFilters, searchQuery, serverSideFiltering, filterOptions]);

  // TanStack Table columns definition
  const tableColumns = React.useMemo<ColumnDef<T>[]>(
    () =>
      visibleColumns.map((col) => ({
        id: col.id,
        accessorKey: col.id,
        header: col.label,
        cell: (info: CellContext<T, unknown>) => {
          const value = info.getValue();

          if (col.renderCell) {
            return col.renderCell({
              value,
              row: info.row.original,
              rowIndex: info.row.index,
              columnId: col.id,
            });
          }

          return renderDefaultCellValue(value);
        },
      })),
    [visibleColumns],
  );

  const updatePagination = React.useCallback(
    (
      updater:
        | PaginationState
        | ((previous: PaginationState) => PaginationState),
    ) => {
      setPagination((previous) => {
        const nextPagination =
          typeof updater === "function" ? updater(previous) : updater;

        if (
          previous.pageIndex !== nextPagination.pageIndex ||
          previous.pageSize !== nextPagination.pageSize
        ) {
          onPaginationChange?.(
            nextPagination.pageIndex,
            nextPagination.pageSize,
          );
        }

        return nextPagination;
      });
    },
    [onPaginationChange],
  );

  const table = useReactTable({
    data: filteredData,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      pagination,
      globalFilter: searchQuery,
    },
    onPaginationChange: updatePagination,
    manualPagination,
    pageCount,
  });

  const visibleRows = table.getRowModel().rows;
  const bulkDeleteEnabled = typeof onBulkDelete === "function";
  const selectedRows = React.useMemo(
    () =>
      visibleRows
        .filter((row) => selectedRowIds[row.id])
        .map((row) => row.original),
    [selectedRowIds, visibleRows],
  );
  const allVisibleRowsSelected =
    visibleRows.length > 0 &&
    visibleRows.every((row) => selectedRowIds[row.id]);

  React.useEffect(() => {
    updatePagination((previous) =>
      previous.pageIndex === 0 ? previous : { ...previous, pageIndex: 0 },
    );
  }, [activeFilters, searchQuery, updatePagination]);

  React.useEffect(() => {
    setSelectedRowIds((previous) => {
      const visibleRowIds = new Set(visibleRows.map((row) => row.id));
      const nextSelection = Object.fromEntries(
        Object.entries(previous).filter(
          ([rowId, isSelected]) => isSelected && visibleRowIds.has(rowId),
        ),
      );

      const previousKeys = Object.keys(previous).sort().join("|");
      const nextKeys = Object.keys(nextSelection).sort().join("|");

      return previousKeys === nextKeys ? previous : nextSelection;
    });
  }, [visibleRows]);

  const applyFilters = React.useCallback(
    (nextFilters: FilterValues) => {
      setActiveFilters(nextFilters);
      onFilterChange?.(nextFilters);

      if (serverSideFiltering) {
        onFiltersApply?.(nextFilters);
      }
    },
    [onFilterChange, onFiltersApply, serverSideFiltering],
  );

  const handleSearchChange = React.useCallback(
    (value: string) => {
      setSearchQuery(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  const handleFilterChange = React.useCallback(
    (filterId: string, value: FilterValue) => {
      applyFilters({
        ...activeFilters,
        [filterId]: value,
      });
    },
    [activeFilters, applyFilters],
  );

  const handleResetFilters = React.useCallback(() => {
    applyFilters({});
  }, [applyFilters]);

  const handleToggleFilterVisibility = React.useCallback(
    (filterId: string, isVisible: boolean) => {
      setVisibleFilters((previous) => {
        if (isVisible) {
          return previous.includes(filterId)
            ? previous
            : [...previous, filterId];
        }

        return previous.filter((id) => id !== filterId);
      });

      if (!isVisible && filterId in activeFilters) {
        const nextFilters = { ...activeFilters };
        delete nextFilters[filterId];
        applyFilters(nextFilters);
      }
    },
    [activeFilters, applyFilters],
  );

  const handleShowAllFilters = React.useCallback(() => {
    setVisibleFilters(filterOptions.map((filter) => filter.id));
  }, [filterOptions]);

  const handleHideAllFilters = React.useCallback(() => {
    setVisibleFilters([]);
    handleResetFilters();
  }, [handleResetFilters]);

  const handleToggleRowMenu = React.useCallback((rowIndex: number) => {
    setRowMenuOpen((previous) => (previous === rowIndex ? null : rowIndex));
  }, []);
  const handleCloseRowMenu = React.useCallback(() => {
    setRowMenuOpen(null);
  }, []);
  const handleToggleExpandedRow = React.useCallback((rowId: string) => {
    setExpandedRowId((previous) => (previous === rowId ? null : rowId));
  }, []);
  const tableContainerRef = React.useRef<HTMLDivElement | null>(null);

  const handleToggleColumnMenu = React.useCallback(() => {
    setColumnMenuOpen((previous) => !previous);
  }, []);

  const handleToggleColumnVisibility = React.useCallback(
    (columnId: string) => {
      setColumnVisibility((previous) => ({
        ...previous,
        [columnId]: !(previous[columnId] ?? true),
      }));
      onColumnToggle?.(columnId);
    },
    [onColumnToggle],
  );

  const handleShowAllColumns = React.useCallback(() => {
    setColumnVisibility(
      Object.fromEntries(columns.map((column) => [column.id, true])),
    );
  }, [columns]);

  const handleHideAllColumns = React.useCallback(() => {
    setColumnVisibility(
      Object.fromEntries(columns.map((column) => [column.id, false])),
    );
  }, [columns]);

  const handleToggleBulkSelection = React.useCallback(() => {
    setBulkSelectionActive((previous) => {
      if (previous) {
        setSelectedRowIds({});
      }

      return !previous;
    });
  }, []);

  const handleToggleRowSelection = React.useCallback(
    (rowId: string, checked: boolean) => {
      setSelectedRowIds((previous) => {
        if (checked) {
          return {
            ...previous,
            [rowId]: true,
          };
        }

        const nextSelection = { ...previous };
        delete nextSelection[rowId];
        return nextSelection;
      });
    },
    [],
  );

  const handleToggleAllVisibleRows = React.useCallback(
    (checked: boolean) => {
      setSelectedRowIds((previous) => {
        const nextSelection = { ...previous };

        visibleRows.forEach((row) => {
          if (checked) {
            nextSelection[row.id] = true;
          } else {
            delete nextSelection[row.id];
          }
        });

        return nextSelection;
      });
    },
    [visibleRows],
  );

  const handleBulkDeleteSelected = React.useCallback(() => {
    if (!onBulkDelete || selectedRows.length === 0) {
      return;
    }

    onBulkDelete(selectedRows);
    setSelectedRowIds({});
  }, [onBulkDelete, selectedRows]);

  const handleClearSelectedRows = React.useCallback(() => {
    setSelectedRowIds({});
  }, []);

  const handleDisableBulkSelection = React.useCallback(() => {
    setBulkSelectionActive(false);
    setSelectedRowIds({});
  }, []);

  const bulkActionContext = React.useMemo<DataTableBulkActionContext<T>>(
    () => ({
      selectedRows,
      selectedCount: selectedRows.length,
      clearSelection: handleClearSelectedRows,
      disableBulkSelection: handleDisableBulkSelection,
    }),
    [handleClearSelectedRows, handleDisableBulkSelection, selectedRows],
  );

  const bulkActionsContent = renderBulkActions?.(bulkActionContext);
  const bulkActionCard = renderBulkActionCard?.(bulkActionContext);

  const handleOpenProfile = React.useCallback(() => {
    setProfileOpen(true);
    setProfileMenuOpen(false);
  }, []);

  const hasActiveFilters = Object.values(activeFilters).some(isFilterActive);

  const handleSaveProfile = (profileName: string) => {
    void {
      name: profileName,
      filters: activeFilters,
      timestamp: new Date().toISOString(),
    };
  };

  return (
    <div
      ref={tableRootRef}
      dir={tableDirection}
      className={mergeClassNames("space-y-0", className)}
    >
      {/* Row 1: Filters Row - Separated with border */}
      <div className="relative z-[60] mb-4 min-h-[80px] flex items-center justify-between gap-4 rounded-[8px] border border-ds-border-2 bg-ds-surface-1 px-4 py-4">
        <div className="flex items-center gap-3 flex-wrap">
          {filterOptions
            .filter((filter) => visibleFilters.includes(filter.id))
            .map((filter, index) => {
              const isActive = isFilterActive(activeFilters[filter.id]);

              return (
                <div
                  key={filter.id}
                  className={mergeClassNames(
                    "min-w-[200px]",
                    index > 0 && "border-ds-border-2 ps-3",
                    index > 0 && (isRtl ? "border-r" : "border-l"),
                  )}
                >
                  <FilterFieldControl
                    filter={filter}
                    value={activeFilters[filter.id]}
                    isActive={isActive}
                    direction={tableDirection}
                    onChange={(value) => handleFilterChange(filter.id, value)}
                  />
                </div>
              );
            })}
        </div>

        {/* Right side icons */}
        <div className="ms-auto flex items-center gap-1">
          <FilterDropdown
            direction={tableDirection}
            open={filterSelectorOpen}
            onOpenChange={setFilterSelectorOpen}
            trigger={
              <ToolbarIconButton title={labels.addFilter}>
                <FilterIcon
                  className={TABLE_COMPLEX_ICON_CLASS_NAME}
                  aria-hidden="true"
                />
              </ToolbarIconButton>
            }
          >
            <FilterSelectorMenu
              direction={tableDirection}
              filterOptions={filterOptions}
              visibleFilters={visibleFilters}
              onToggleFilter={handleToggleFilterVisibility}
              onShowAll={handleShowAllFilters}
              onHideAll={handleHideAllFilters}
              labels={labels}
              footerActions={renderFilterSelectorFooterActions?.({
                onShowAll: handleShowAllFilters,
                onHideAll: handleHideAllFilters,
              })}
            />
          </FilterDropdown>
          <ToolbarIconButton
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            title={labels.clearFilters}
          >
            <FilterXIcon
              className={TABLE_COMPLEX_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          </ToolbarIconButton>
          <FilterDropdown
            direction={tableDirection}
            open={profileMenuOpen}
            onOpenChange={setProfileMenuOpen}
            trigger={
              <ToolbarIconButton title={labels.filterProfiles}>
                <FilterProfileIcon
                  className={TABLE_COMPLEX_ICON_CLASS_NAME}
                  aria-hidden="true"
                />
              </ToolbarIconButton>
            }
          >
            <div className="p-2 min-w-48">
              <Button
                onClick={handleOpenProfile}
                className={mergeClassNames(
                  "w-full border-2 border-dashed border-ds-border-accent/40 bg-transparent px-4 py-3 text-sm font-medium text-ds-1 shadow-none hover:bg-ds-accent-subtle hover:opacity-100",
                  tableDirection === "rtl"
                    ? "justify-end text-right"
                    : "justify-start text-left",
                )}
              >
                {labels.saveNewFilterProfile}
              </Button>
            </div>
          </FilterDropdown>
          {renderFilterRowActions}
        </div>
      </div>
      {/* Table */}
      <div className="relative overflow-visible rounded-lg border border-ds-border-2 bg-ds-surface-1">
        <DataTableToolbar
          direction={tableDirection}
          showRefreshButton={showRefreshButton}
          showExportButton={showExportButton}
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          searchPlaceholder={searchPlaceholder}
          bulkDeleteEnabled={bulkDeleteEnabled}
          bulkSelectionActive={bulkSelectionActive}
          selectedCount={selectedRows.length}
          bulkActionsContent={bulkActionsContent}
          bulkActionCard={bulkActionCard}
          onToggleBulkSelection={handleToggleBulkSelection}
          onBulkDeleteSelected={handleBulkDeleteSelected}
          onRefresh={onRefresh}
          onExport={onExport}
          columnMenuOpen={columnMenuOpen}
          onToggleColumnMenu={handleToggleColumnMenu}
          onCloseColumnMenu={() => setColumnMenuOpen(false)}
          columns={resolvedColumns}
          onColumnToggle={handleToggleColumnVisibility}
          onShowAllColumns={handleShowAllColumns}
          onHideAllColumns={handleHideAllColumns}
          labels={labels}
          toolbarActions={renderToolbarActions}
        />

        {/* Table Container */}
        <TableContainer
          ref={tableContainerRef}
          className={tableContainerClassName}
          style={{ maxHeight }}
        >
          <Table className={tableClassName}>
            {caption ? (
              <TableCaption className={captionClassName}>
                {caption}
              </TableCaption>
            ) : null}
            <TableHeader className={mergeClassNames("z-40", headerClassName)}>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className={mergeClassNames(
                    "border-b border-ds-border-2",
                    headerRowClassName,
                  )}
                >
                  {bulkSelectionActive ? (
                    <TableHead
                      className={mergeClassNames(
                        "w-12 bg-ds-surface-2 px-4 py-3",
                        headClassName,
                      )}
                    >
                      <Checkbox
                        aria-label="Select all visible rows"
                        checked={allVisibleRowsSelected}
                        onChange={(event) =>
                          handleToggleAllVisibleRows(event.target.checked)
                        }
                      />
                    </TableHead>
                  ) : null}
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      className={mergeClassNames(
                        "whitespace-nowrap bg-ds-surface-2 px-4 py-3 text-sm font-semibold text-ds-1",
                        isRtl ? "text-right" : "text-left",
                        headClassName,
                      )}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  ))}
                  {hasRowActions ? (
                    <TableHead
                      className={mergeClassNames(
                        "sticky top-0 z-30 border-x border-ds-border-2 bg-ds-surface-2 p-0",
                        isRtl
                          ? "left-0 shadow-[8px_0_12px_-10px_rgba(15,23,42,0.35)]"
                          : "right-0 shadow-[-8px_0_12px_-10px_rgba(15,23,42,0.35)]",
                        ROW_ACTIONS_CELL_WIDTH_CLASS_NAME,
                        headClassName,
                      )}
                    >
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-y-px left-0 z-30 w-px bg-ds-border-2"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -inset-y-px right-0 z-30 w-px bg-ds-border-2"
                      />
                      <div aria-hidden="true" className="h-[45px] w-12" />
                    </TableHead>
                  ) : null}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className={bodyClassName}>
              <DataTableRows
                table={table}
                direction={tableDirection}
                hasRowActions={hasRowActions}
                isLoading={isLoading}
                bulkSelectionActive={bulkSelectionActive}
                selectedRowIds={selectedRowIds}
                onToggleRowSelection={handleToggleRowSelection}
                rowMenuOpen={rowMenuOpen}
                onToggleRowMenu={handleToggleRowMenu}
                onCloseRowMenu={handleCloseRowMenu}
                onRowAction={onRowAction}
                onRowClick={onRowClick}
                expandedRowId={expandedRowId}
                onToggleExpandedRow={handleToggleExpandedRow}
                renderRowDetails={renderRowDetails}
                rowClassName={rowClassName}
                cellClassName={cellClassName}
                hasActiveFilters={hasActiveFilters}
                searchQuery={searchQuery}
                renderEmptyState={renderEmptyState}
                renderRowActionsCell={(context) =>
                  hasRowActions ? (
                    <RowActionsCell
                      rowIndex={context.rowIndex}
                      row={context.row}
                      isOpen={context.isOpen}
                      openDirection={context.openDirection}
                      tableContainerRef={tableContainerRef}
                      onToggle={context.onToggle}
                      onClose={context.onClose}
                      onRowAction={context.onRowAction}
                      actions={resolvedRowActions}
                      direction={tableDirection}
                    />
                  ) : null
                }
              />
            </TableBody>
            <TableFooter className={footerClassName} />
          </Table>
        </TableContainer>

        <div className={footerClassName}>
          <DataTablePagination
            table={table}
            totalCount={totalCount}
            filteredCount={filteredData.length}
            direction={tableDirection}
          />
        </div>
      </div>
      {/* Profile Modal */}
      <FilterProfile
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onSaveProfile={(name) => {
          handleSaveProfile(name);
          setProfileOpen(false);
        }}
      />
    </div>
  );
}
