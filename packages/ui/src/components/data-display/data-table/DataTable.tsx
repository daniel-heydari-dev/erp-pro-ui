import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type CellContext,
  type ColumnDef,
  type PaginationState,
  type Table,
} from "@tanstack/react-table";
import { Chip } from "../chip";
import { Button } from "../../forms/button";
import { Combobox } from "../../forms/combobox";
import { MultiSelectCombobox } from "../../forms/multi-select-combobox";
import { Checkbox } from "../../forms/checkbox";
import { Input } from "../../forms/input";
import { Select } from "../../forms/select";
import { Switch } from "../../forms/switch";
import {
  DatePicker,
  type DatePickerValue,
  type DateRangeValue,
} from "../../forms/date-picker";
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
  RefreshIcon,
  SearchIcon,
  SelectionIcon,
  SettingsIcon,
  TrashIcon,
} from "../../icons";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableProps<T = Record<string, any>> {
  columns: DataTableColumn<T>[];
  data: T[];
  isLoading?: boolean; // Table data loading state
  onColumnToggle?: (columnId: string) => void;
  /** Number of items per page */
  pageSize?: number;
  /** Maximum height for the scrollable table area */
  maxHeight?: string;
  onSearch?: (query: string) => void;
  onExport?: () => void;
  onRowAction?: (action: string, row: T) => void;
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

interface ColumnToggleProps {
  columns: {
    id: string;
    label: string;
    visible?: boolean;
  }[];
  onToggle: (columnId: string) => void;
  onShowAll?: () => void;
  onHideAll?: () => void;
}

export const ColumnToggle: React.FC<ColumnToggleProps> = ({
  columns,
  onToggle,
  onShowAll,
  onHideAll,
}) => (
  <div className="p-4 space-y-3">
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-semibold text-neutral-900 dark:text-white">
        COLUMNS
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
            SHOW ALL
          </Button>
        )}
        {onHideAll && (
          <Button
            onClick={onHideAll}
            size="small"
            className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-neutral-500 shadow-none hover:bg-transparent hover:text-neutral-600 hover:opacity-100 dark:text-neutral-300 dark:hover:text-white"
          >
            HIDE ALL
          </Button>
        )}
      </div>
    )}
  </div>
);

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
        className="bg-white dark:bg-neutral-800 rounded-xl p-6 max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
          Add new profile
        </h2>

        <label className="mb-2 block text-sm font-medium text-accent">
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

type AsyncFilterOptionsState = Record<
  string,
  { options: string[]; isLoading: boolean }
>;

type NumberRangeFilterValue = { min?: number; max?: number };

const ICON_BUTTON_CLASS_NAME =
  "inline-flex items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-neutral-100 hover:text-neutral-600 dark:hover:bg-neutral-700";
const DISABLED_ICON_BUTTON_CLASS_NAME = `${ICON_BUTTON_CLASS_NAME} disabled:opacity-40 disabled:cursor-not-allowed`;
const TABLE_CONTROL_ICON_CLASS_NAME = "h-[18px] w-[18px] shrink-0";
const TABLE_COMPLEX_ICON_CLASS_NAME = "h-5 w-5 shrink-0";

const isFilterValueEmpty = (value?: FilterValue | null): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === "string") {
    return value === "";
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Date || typeof value === "boolean") {
    return false;
  }

  if ("start" in value || "end" in value) {
    const rangeValue = value as DateRangeValue;
    return !rangeValue.start && !rangeValue.end;
  }

  return value.min === undefined && value.max === undefined;
};

const isFilterActive = (value?: FilterValue): boolean =>
  !isFilterValueEmpty(value);

const toSelectOptions = (options?: string[]) =>
  (options || []).map((option) => ({
    value: option,
    label: option,
  }));

const getStringFilterValue = (value?: FilterValue): string =>
  typeof value === "string" ? value : "";

const getMultiStringFilterValue = (value?: FilterValue): string[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return typeof value === "string" && value ? [value] : [];
};

const getNumberRangeFilterValue = (
  value?: FilterValue,
): NumberRangeFilterValue => {
  if (
    !value ||
    typeof value !== "object" ||
    "start" in value ||
    "end" in value
  ) {
    return {};
  }

  return value as NumberRangeFilterValue;
};

const getDateFilterValue = (value?: FilterValue): DatePickerValue =>
  value instanceof Date || value === null ? value : null;

const getDateRangeFilterValue = (value?: FilterValue): DateRangeValue => {
  if (
    value &&
    typeof value === "object" &&
    "start" in value &&
    "end" in value
  ) {
    return value as DateRangeValue;
  }

  return { start: null, end: null };
};

function buildGeneratedFilterOptions<T>(
  columns: DataTableProps<T>["columns"],
  data: T[],
): FilterOption[] {
  return columns
    .filter((column) => column.filterable !== false)
    .map((column) => {
      const uniqueValues = new Set<string>();

      data.forEach((row) => {
        const value = (row as Record<string, unknown>)[column.id];
        if (value !== undefined && value !== null && value !== "") {
          uniqueValues.add(String(value));
        }
      });

      return {
        id: column.id,
        label: column.label,
        options: Array.from(uniqueValues).sort(),
        multiple: column.multiFilter,
      };
    });
}

function resolveFilterOptions<T>(
  columns: DataTableProps<T>["columns"],
  data: T[],
  externalFilterOptions: FilterOption[] | undefined,
  asyncFilterOptions: AsyncFilterOptionsState,
): FilterOption[] {
  if (!externalFilterOptions?.length) {
    return buildGeneratedFilterOptions(columns, data);
  }

  return externalFilterOptions.map((filter) => {
    const asyncState = asyncFilterOptions[filter.id];
    if (!asyncState) {
      return filter;
    }

    return {
      ...filter,
      options: asyncState.options,
      isLoading: asyncState.isLoading,
    };
  });
}

function matchesSearchQuery<T>(row: T, searchQuery: string): boolean {
  if (!searchQuery.trim()) {
    return true;
  }

  const query = searchQuery.toLowerCase();
  return Object.values(row as Record<string, unknown>).some((value) => {
    if (value === undefined || value === null) {
      return false;
    }

    return String(value).toLowerCase().includes(query);
  });
}

function matchesFilterValue(
  rowValue: unknown,
  filterValue: FilterValue,
  filterOption?: FilterOption,
): boolean {
  if (isFilterValueEmpty(filterValue)) {
    return true;
  }

  switch (filterOption?.type) {
    case "text":
      return String(rowValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    case "number-range": {
      const rangeValue = getNumberRangeFilterValue(filterValue);
      const numericValue = Number(rowValue);
      if (rangeValue.min !== undefined && numericValue < rangeValue.min) {
        return false;
      }
      if (rangeValue.max !== undefined && numericValue > rangeValue.max) {
        return false;
      }
      return true;
    }
    case "date-range": {
      const rangeValue = getDateRangeFilterValue(filterValue);
      if (!rangeValue.start) {
        return true;
      }
      const timeValue = new Date(rowValue as string | number | Date).getTime();
      if (timeValue < rangeValue.start.getTime()) {
        return false;
      }
      return !rangeValue.end || timeValue <= rangeValue.end.getTime();
    }
    case "date": {
      const selectedDate = filterValue as Date;
      const rowDate = new Date(rowValue as string | number | Date);
      return selectedDate.toDateString() === rowDate.toDateString();
    }
    case "switch":
    case "checkbox":
      return Boolean(rowValue) === Boolean(filterValue);
    default: {
      const rowValueString = String(rowValue).toLowerCase();
      if (Array.isArray(filterValue)) {
        return filterValue.some(
          (value) => String(value).toLowerCase() === rowValueString,
        );
      }

      return typeof filterValue !== "string"
        ? true
        : rowValueString === filterValue.toLowerCase();
    }
  }
}

function filterClientData<T>(
  data: T[],
  activeFilters: FilterValues,
  searchQuery: string,
  serverSideFiltering: boolean,
  filterOptions: FilterOption[],
): T[] {
  if (serverSideFiltering) {
    return data;
  }

  const filterOptionsMap = new Map(
    filterOptions.map((filterOption) => [filterOption.id, filterOption]),
  );

  return data.filter((row) => {
    if (!matchesSearchQuery(row, searchQuery)) {
      return false;
    }

    return Object.entries(activeFilters).every(([filterId, filterValue]) => {
      const rowValue = (row as Record<string, unknown>)[filterId];
      return matchesFilterValue(
        rowValue,
        filterValue,
        filterOptionsMap.get(filterId),
      );
    });
  });
}

function useAsyncFilterOptions(
  externalFilterOptions: FilterOption[] | undefined,
  filterSelectorOpen: boolean,
): AsyncFilterOptionsState {
  const [asyncFilterOptions, setAsyncFilterOptions] =
    React.useState<AsyncFilterOptionsState>({});
  const asyncFilterOptionsRef = React.useRef(asyncFilterOptions);

  React.useEffect(() => {
    asyncFilterOptionsRef.current = asyncFilterOptions;
  }, [asyncFilterOptions]);

  const fetchAsyncOptions = React.useCallback(async (filter: FilterOption) => {
    if (
      !filter.fetchOptions ||
      asyncFilterOptionsRef.current[filter.id]?.options.length
    ) {
      return;
    }

    setAsyncFilterOptions((prev) => ({
      ...prev,
      [filter.id]: { options: [], isLoading: true },
    }));

    try {
      const options = await filter.fetchOptions();
      setAsyncFilterOptions((prev) => ({
        ...prev,
        [filter.id]: { options, isLoading: false },
      }));
    } catch {
      setAsyncFilterOptions((prev) => ({
        ...prev,
        [filter.id]: { options: [], isLoading: false },
      }));
    }
  }, []);

  React.useEffect(() => {
    if (!filterSelectorOpen || !externalFilterOptions) {
      return;
    }

    externalFilterOptions.forEach((filter) => {
      if (filter.fetchOptions) {
        void fetchAsyncOptions(filter);
      }
    });
  }, [externalFilterOptions, fetchAsyncOptions, filterSelectorOpen]);

  return asyncFilterOptions;
}

function LoadingFilterField({ label }: { label: string }) {
  return (
    <div className="h-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-md px-3">
      <LoaderIcon
        className="w-4 h-4 animate-spin text-neutral-400"
        aria-hidden="true"
      />
      <span className="ml-2 text-sm text-neutral-500">{label}</span>
    </div>
  );
}

interface NumberRangeFilterProps {
  value: NumberRangeFilterValue;
  onChange: (value: NumberRangeFilterValue) => void;
}

function NumberRangeFilter({ value, onChange }: NumberRangeFilterProps) {
  return (
    <div className="flex items-center gap-1">
      <Input
        type="number"
        placeholder="Min"
        value={value.min ?? ""}
        onChange={(event) => {
          const min =
            event.target.value === "" ? undefined : Number(event.target.value);
          onChange({ ...value, min });
        }}
        className="h-9 px-2 text-xs"
      />
      <span className="text-neutral-400">-</span>
      <Input
        type="number"
        placeholder="Max"
        value={value.max ?? ""}
        onChange={(event) => {
          const max =
            event.target.value === "" ? undefined : Number(event.target.value);
          onChange({ ...value, max });
        }}
        className="h-9 px-2 text-xs"
      />
    </div>
  );
}

interface FilterFieldControlProps {
  filter: FilterOption;
  value?: FilterValue;
  isActive: boolean;
  onChange: (value: FilterValue) => void;
}

function FilterFieldControl({
  filter,
  value,
  isActive,
  onChange,
}: FilterFieldControlProps) {
  if (filter.isLoading) {
    return <LoadingFilterField label={filter.label} />;
  }

  const activeClassName = isActive ? "border-accent" : "";

  switch (filter.type) {
    case "text":
      return (
        <Input
          value={getStringFilterValue(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={filter.placeholder || filter.label}
          className={activeClassName}
        />
      );
    case "select":
      return (
        <Select
          value={getStringFilterValue(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={filter.placeholder || filter.label}
          options={toSelectOptions(filter.options)}
          className={activeClassName}
        />
      );
    case "switch":
    case "checkbox":
      return (
        <Switch
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          label={filter.label}
        />
      );
    case "date":
      return (
        <DatePicker
          mode="single"
          value={getDateFilterValue(value)}
          onChange={(nextValue) => onChange(nextValue)}
          placeholder={filter.placeholder || filter.label}
        />
      );
    case "date-range":
      return (
        <DatePicker
          mode="range"
          value={getDateRangeFilterValue(value)}
          onChange={(nextValue) => onChange(nextValue)}
          placeholder={filter.placeholder || filter.label}
        />
      );
    case "number-range":
      return (
        <NumberRangeFilter
          value={getNumberRangeFilterValue(value)}
          onChange={onChange}
        />
      );
    default:
      return filter.multiple ? (
        <MultiSelectCombobox
          value={getMultiStringFilterValue(value)}
          onChange={(values) => onChange(values)}
          placeholder={filter.placeholder || filter.label}
          options={toSelectOptions(filter.options)}
          className={isActive ? "border-accent border-2" : ""}
        />
      ) : (
        <Combobox
          value={getStringFilterValue(value)}
          onChange={(nextValue) => onChange(nextValue)}
          placeholder={filter.placeholder || filter.label}
          options={toSelectOptions(filter.options)}
          className={isActive ? "border-accent border-2" : ""}
        />
      );
  }
}

interface ToolbarIconButtonProps {
  title: string;
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

function ToolbarIconButton({
  title,
  onClick,
  disabled,
  children,
}: ToolbarIconButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      title={title}
      aria-label={title}
      className={
        disabled
          ? `${DISABLED_ICON_BUTTON_CLASS_NAME} h-10 w-10 shrink-0 border-transparent bg-transparent px-0 py-0 text-base shadow-none hover:bg-transparent hover:opacity-100`
          : `${ICON_BUTTON_CLASS_NAME} h-10 w-10 shrink-0 border-transparent bg-transparent px-0 py-0 text-base shadow-none hover:opacity-100`
      }
    >
      {children}
    </Button>
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

interface RowActionsCellProps<T> {
  rowIndex: number;
  row: T;
  isOpen: boolean;
  onToggle: (rowIndex: number) => void;
  onClose: () => void;
  onRowAction?: (action: string, row: T) => void;
}

function RowActionsCell<T>({
  rowIndex,
  row,
  isOpen,
  onToggle,
  onClose,
  onRowAction,
}: RowActionsCellProps<T>) {
  return (
    <td className="px-2 py-3 text-right relative">
      <Button
        onClick={() => onToggle(rowIndex)}
        aria-label="Open row actions"
        className="h-8 w-8 border-none bg-transparent px-0 py-0 text-neutral-500 shadow-none hover:bg-neutral-100 hover:text-neutral-700 hover:opacity-100 dark:hover:bg-neutral-600 dark:hover:text-neutral-200"
      >
        <EllipsisVerticalIcon
          className={TABLE_CONTROL_ICON_CLASS_NAME}
          aria-hidden="true"
        />
      </Button>
      {isOpen ? (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 min-w-32 py-1">
            <Button
              onClick={() => {
                onRowAction?.("edit", row);
                onClose();
              }}
              className="w-full justify-start rounded-none border-none bg-transparent px-4 py-2 text-sm font-normal text-neutral-700 shadow-none hover:bg-neutral-50 hover:text-neutral-900 hover:opacity-100 dark:text-neutral-200 dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              Edit
            </Button>
            <Button
              onClick={() => {
                onRowAction?.("delete", row);
                onClose();
              }}
              className="w-full justify-start rounded-none border-none bg-transparent px-4 py-2 text-sm font-normal text-error shadow-none hover:bg-neutral-50 hover:text-error hover:opacity-100 dark:hover:bg-neutral-700"
            >
              Delete
            </Button>
          </div>
        </>
      ) : null}
    </td>
  );
}

interface DataTablePaginationProps<T> {
  table: Table<T>;
  totalCount?: number;
  filteredCount: number;
}

function DataTablePagination<T>({
  table,
  totalCount,
  filteredCount,
}: DataTablePaginationProps<T>) {
  const { pageIndex, pageSize } = table.getState().pagination;
  const itemCount = totalCount ?? filteredCount;
  const pageStart = itemCount === 0 ? 0 : pageIndex * pageSize + 1;
  const pageEnd = Math.min((pageIndex + 1) * pageSize, itemCount);

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
      <div className="flex items-center gap-2">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          Showing {pageStart} to {pageEnd} of {itemCount} items
        </span>
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2">
        <span className="text-sm text-neutral-600 dark:text-neutral-400">
          Rows
        </span>
        <Select
          value={String(pageSize)}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
          aria-label="Rows per page"
          containerClassName="w-24 min-w-24 shrink-0"
          triggerClassName="px-3 font-medium text-neutral-900 dark:text-white"
          options={[10, 20, 30, 50, 100].map((size) => ({
            value: String(size),
            label: String(size),
          }))}
        />

        <ToolbarIconButton
          title="First page"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeftIcon
            className={TABLE_CONTROL_ICON_CLASS_NAME}
            aria-hidden="true"
          />
        </ToolbarIconButton>

        <ToolbarIconButton
          title="Previous page"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeftIcon
            className={TABLE_CONTROL_ICON_CLASS_NAME}
            aria-hidden="true"
          />
        </ToolbarIconButton>

        <span className="inline-flex h-10 shrink-0 items-center rounded-lg px-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>

        <ToolbarIconButton
          title="Next page"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRightIcon
            className={TABLE_CONTROL_ICON_CLASS_NAME}
            aria-hidden="true"
          />
        </ToolbarIconButton>

        <ToolbarIconButton
          title="Last page"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRightIcon
            className={TABLE_CONTROL_ICON_CLASS_NAME}
            aria-hidden="true"
          />
        </ToolbarIconButton>
      </div>
    </div>
  );
}

interface FilterSelectorMenuProps {
  filterOptions: FilterOption[];
  visibleFilters: string[];
  onToggleFilter: (filterId: string, isVisible: boolean) => void;
  onShowAll: () => void;
  onHideAll: () => void;
}

function FilterSelectorMenu({
  filterOptions,
  visibleFilters,
  onToggleFilter,
  onShowAll,
  onHideAll,
}: FilterSelectorMenuProps) {
  return (
    <div className="p-2 min-w-48 space-y-1">
      <div className="px-2 pb-2 text-xs font-semibold text-neutral-500 dark:text-neutral-300">
        Show filters
      </div>
      {filterOptions.map((filter) => (
        <div key={filter.id} className="min-w-36">
          <Checkbox
            checked={visibleFilters.includes(filter.id)}
            onChange={(event) =>
              onToggleFilter(filter.id, event.target.checked)
            }
            label={filter.label}
          />
        </div>
      ))}
      <div className="flex gap-2 border-t border-neutral-200 pt-2 dark:border-neutral-700">
        <Button
          onClick={onShowAll}
          size="small"
          className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-accent shadow-none hover:bg-transparent hover:text-accent-hover hover:opacity-100"
        >
          SHOW ALL
        </Button>
        <Button
          onClick={onHideAll}
          size="small"
          className="flex-1 border-none bg-transparent px-1 py-1 text-xs font-semibold text-neutral-500 shadow-none hover:bg-transparent hover:text-neutral-600 hover:opacity-100 dark:text-neutral-300 dark:hover:text-white"
        >
          HIDE ALL
        </Button>
      </div>
    </div>
  );
}

interface DataTableToolbarProps<T> {
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
  columns: DataTableProps<T>["columns"];
  onColumnToggle?: (columnId: string) => void;
  onShowAllColumns: () => void;
  onHideAllColumns: () => void;
}

function DataTableToolbar<T>({
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
}: DataTableToolbarProps<T>) {
  const hasSelectedRows = selectedCount > 0;

  return (
    <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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

interface TableStateRowProps {
  colSpan: number;
  children: React.ReactNode;
}

function TableStateRow({ colSpan, children }: TableStateRowProps) {
  return (
    <tr>
      <td colSpan={colSpan} className="px-4 py-12 text-center text-neutral-500">
        {children}
      </td>
    </tr>
  );
}

function LoadingTableState({ colSpan }: { colSpan: number }) {
  return (
    <TableStateRow colSpan={colSpan}>
      <div className="flex flex-col items-center gap-3">
        <LoaderIcon
          className="w-8 h-8 animate-spin text-accent"
          aria-hidden="true"
        />
        <span>Loading data...</span>
      </div>
    </TableStateRow>
  );
}

function EmptyTableState({ colSpan }: { colSpan: number }) {
  return (
    <TableStateRow colSpan={colSpan}>
      <div className="flex flex-col items-center gap-2">
        <span className="text-4xl">🔍</span>
        <p className="font-medium">No results found</p>
        <p className="text-sm">Try adjusting the filter</p>
      </div>
    </TableStateRow>
  );
}

interface DataTableRowsProps<T> {
  table: Table<T>;
  isLoading: boolean;
  bulkSelectionActive: boolean;
  selectedRowIds: Record<string, boolean>;
  onToggleRowSelection: (rowId: string, checked: boolean) => void;
  rowMenuOpen: number | null;
  onToggleRowMenu: (rowIndex: number) => void;
  onCloseRowMenu: () => void;
  onRowAction?: (action: string, row: T) => void;
}

function DataTableRows<T>({
  table,
  isLoading,
  bulkSelectionActive,
  selectedRowIds,
  onToggleRowSelection,
  rowMenuOpen,
  onToggleRowMenu,
  onCloseRowMenu,
  onRowAction,
}: DataTableRowsProps<T>) {
  const colSpan =
    table.getVisibleLeafColumns().length + (bulkSelectionActive ? 2 : 1);

  if (isLoading) {
    return <LoadingTableState colSpan={colSpan} />;
  }

  if (table.getRowModel().rows.length === 0) {
    return <EmptyTableState colSpan={colSpan} />;
  }

  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <tr
          key={row.id}
          className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
        >
          {bulkSelectionActive ? (
            <td className="w-12 px-4 py-3 align-middle">
              <Checkbox
                aria-label={`Select row ${row.id}`}
                checked={Boolean(selectedRowIds[row.id])}
                onChange={(event) =>
                  onToggleRowSelection(row.id, event.target.checked)
                }
              />
            </td>
          ) : null}
          {row.getVisibleCells().map((cell) => (
            <td
              key={cell.id}
              className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300"
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
          <RowActionsCell
            rowIndex={row.index}
            row={row.original}
            isOpen={rowMenuOpen === row.index}
            onToggle={onToggleRowMenu}
            onClose={onCloseRowMenu}
            onRowAction={onRowAction}
          />
        </tr>
      ))}
    </>
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
  isLoading = false,
  onColumnToggle,
  pageSize = 10,
  maxHeight = "500px",
  onSearch,
  onExport,
  onRowAction,
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
}: DataTableProps<T>) {
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

  const handleToggleFilterSelector = React.useCallback(() => {
    setFilterSelectorOpen((previous) => !previous);
  }, []);

  const handleToggleProfileMenu = React.useCallback(() => {
    setProfileMenuOpen((previous) => !previous);
  }, []);

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
    <div className="space-y-0">
      {/* Row 1: Filters Row - Separated with border */}
      <div className="mb-4 flex items-center justify-between gap-4 rounded-[8px] border border-neutral-200 bg-neutral-50 px-4 py-4 dark:border-neutral-700 dark:bg-neutral-800/50">
        <div className="flex items-center gap-3 flex-wrap">
          {filterOptions
            .filter((filter) => visibleFilters.includes(filter.id))
            .map((filter, index) => {
              const isActive = isFilterActive(activeFilters[filter.id]);

              return (
                <div
                  key={filter.id}
                  className={`min-w-[200px] ${
                    index > 0
                      ? "border-l border-neutral-200 pl-3 dark:border-neutral-600"
                      : ""
                  }`}
                >
                  <FilterFieldControl
                    filter={filter}
                    value={activeFilters[filter.id]}
                    isActive={isActive}
                    onChange={(value) => handleFilterChange(filter.id, value)}
                  />
                </div>
              );
            })}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-1 ml-auto">
          <div className="relative">
            <ToolbarIconButton
              onClick={handleToggleFilterSelector}
              title="Add filter"
            >
              <FilterIcon
                className={TABLE_COMPLEX_ICON_CLASS_NAME}
                aria-hidden="true"
              />
            </ToolbarIconButton>
            <FilterDropdown
              isOpen={filterSelectorOpen}
              onClose={() => setFilterSelectorOpen(false)}
            >
              <FilterSelectorMenu
                filterOptions={filterOptions}
                visibleFilters={visibleFilters}
                onToggleFilter={handleToggleFilterVisibility}
                onShowAll={handleShowAllFilters}
                onHideAll={handleHideAllFilters}
              />
            </FilterDropdown>
          </div>

          <ToolbarIconButton
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            title="Clear filters"
          >
            <FilterXIcon
              className={TABLE_COMPLEX_ICON_CLASS_NAME}
              aria-hidden="true"
            />
          </ToolbarIconButton>

          <div className="relative">
            <ToolbarIconButton
              onClick={handleToggleProfileMenu}
              title="Filter profiles"
            >
              <FilterProfileIcon
                className={TABLE_COMPLEX_ICON_CLASS_NAME}
                aria-hidden="true"
              />
            </ToolbarIconButton>
            <FilterDropdown
              isOpen={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
            >
              <div className="p-2 min-w-48">
                <Button
                  onClick={handleOpenProfile}
                  className="w-full justify-start border-2 border-dashed border-accent/40 bg-transparent px-4 py-3 text-left text-sm font-medium text-accent shadow-none hover:bg-accent-subtle hover:opacity-100"
                >
                  Save new filter profile
                </Button>
              </div>
            </FilterDropdown>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-background-secondary rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        <DataTableToolbar
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
          onExport={onExport}
          columnMenuOpen={columnMenuOpen}
          onToggleColumnMenu={handleToggleColumnMenu}
          onCloseColumnMenu={() => setColumnMenuOpen(false)}
          columns={resolvedColumns}
          onColumnToggle={handleToggleColumnVisibility}
          onShowAllColumns={handleShowAllColumns}
          onHideAllColumns={handleHideAllColumns}
        />

        {/* Table Container */}
        <div className="overflow-auto" style={{ maxHeight }}>
          <table className="w-full min-w-[600px]">
            <thead className="sticky top-0 z-10 bg-background-secondary">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-neutral-200 dark:border-neutral-700"
                >
                  {bulkSelectionActive ? (
                    <th className="w-12 px-4 py-3 bg-background-secondary">
                      <Checkbox
                        aria-label="Select all visible rows"
                        checked={allVisibleRowsSelected}
                        onChange={(event) =>
                          handleToggleAllVisibleRows(event.target.checked)
                        }
                      />
                    </th>
                  ) : null}
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="bg-background-secondary px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white whitespace-nowrap"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                  <th className="w-12 bg-background-secondary"></th>
                </tr>
              ))}
            </thead>
            <tbody>
              <DataTableRows
                table={table}
                isLoading={isLoading}
                bulkSelectionActive={bulkSelectionActive}
                selectedRowIds={selectedRowIds}
                onToggleRowSelection={handleToggleRowSelection}
                rowMenuOpen={rowMenuOpen}
                onToggleRowMenu={handleToggleRowMenu}
                onCloseRowMenu={() => setRowMenuOpen(null)}
                onRowAction={onRowAction}
              />
            </tbody>
          </table>
        </div>

        <DataTablePagination
          table={table}
          totalCount={totalCount}
          filteredCount={filteredData.length}
        />
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
