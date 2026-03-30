import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type PaginationState,
} from "@tanstack/react-table";
import { Combobox } from "../../forms/combobox";
import { MultiSelectCombobox } from "../../forms/multi-select-combobox";
import { Input } from "../../forms/input";
import { Select } from "../../forms/select";
import { Switch } from "../../forms/switch";
import { DatePicker, type DatePickerValue, type DateRangeValue } from "../../forms/date-picker";

// Filter option type - can be static or async
export interface FilterOption {
  id: string;
  label: string;
  type?: "text" | "select" | "combobox" | "checkbox" | "switch" | "date" | "date-range" | "number-range";
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
export type FilterValue = string | string[] | boolean | DatePickerValue | { min?: number; max?: number };
export type FilterValues = Record<string, FilterValue>;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface DataTableProps<T = Record<string, any>> {
  columns: {
    id: string;
    label: string;
    visible?: boolean;
    filterable?: boolean; // Enable filtering for this column
    multiFilter?: boolean; // Enable multi-select filter for this column
    /** Priority for responsive display (1 = always visible, higher = hidden earlier on small screens) */
    priority?: number;
  }[];
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
      <div className="absolute top-full right-0 mt-2 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 min-w-64">
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
  <button
    onClick={onClick}
    title={label}
    className={`p-2 rounded-lg transition-colors ${hasActive
      ? "bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400"
      : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700"
      }`}
  >
    {icon}
  </button>
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
        <label
          key={col.id}
          className="flex items-center gap-2 cursor-pointer px-2 py-1 hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded"
        >
          <input
            type="checkbox"
            checked={col.visible !== false}
            onChange={() => onToggle(col.id)}
            className="w-4 h-4 rounded cursor-pointer accent-primary-500"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {col.label}
          </span>
        </label>
      ))}
    </div>

    {(onShowAll || onHideAll) && (
      <div className="flex gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
        {onShowAll && (
          <button
            onClick={onShowAll}
            className="flex-1 text-xs font-semibold text-primary-500 hover:text-primary-600 py-1"
          >
            SHOW ALL
          </button>
        )}
        {onHideAll && (
          <button
            onClick={onHideAll}
            className="flex-1 text-xs font-semibold text-neutral-500 hover:text-neutral-600 py-1"
          >
            HIDE ALL
          </button>
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

        <label className="block text-sm font-medium text-primary-500 mb-2">
          Enter filter profile name:
        </label>
        <input
          type="text"
          value={profileName}
          onChange={(e) => setProfileName(e.target.value)}
          placeholder="Enter value"
          className="w-full px-4 py-3 border-2 border-primary-500 rounded-lg bg-white dark:bg-neutral-700 text-neutral-900 dark:text-white placeholder:text-neutral-400 dark:placeholder:text-neutral-500 mb-6 focus:outline-none focus:ring-2 focus:ring-primary-300"
          onKeyPress={(e) => e.key === "Enter" && handleSave()}
        />

        <div className="flex gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 rounded-lg border-2 border-neutral-300 dark:border-neutral-600 text-neutral-700 dark:text-neutral-200 font-semibold hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors flex items-center justify-center gap-2"
          >
            <span>🗑️</span>
            CANCEL
          </button>
          <button
            onClick={handleSave}
            disabled={!profileName.trim()}
            className="flex-1 px-4 py-3 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 font-semibold hover:bg-neutral-800 dark:hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T = Record<string, any>>({
  columns,
  data,
  isLoading = false,
  onColumnToggle,
  pageSize = 10,
  maxHeight = "500px",
  onExport,
  onRowAction,
  onFilterChange,
  onFiltersApply,
  serverSideFiltering = false,
  filterOptions: externalFilterOptions,
  totalCount,
  onPaginationChange,
}: DataTableProps<T>) {
  // Pagination state
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: pageSize,
  });

  // State for async filter options
  const [asyncFilterOptions, setAsyncFilterOptions] = React.useState<
    Record<string, { options: string[]; isLoading: boolean }>
  >({});

  // Fetch async filter options when filter selector opens
  const fetchAsyncOptions = React.useCallback(
    async (filter: FilterOption) => {
      if (!filter.fetchOptions || asyncFilterOptions[filter.id]?.options) {
        return; // Already fetched or no fetch function
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
      } catch (error) {
        console.error(`Failed to fetch options for ${filter.id}:`, error);
        setAsyncFilterOptions((prev) => ({
          ...prev,
          [filter.id]: { options: [], isLoading: false },
        }));
      }
    },
    [asyncFilterOptions]
  );

  // Auto-generate filter options from columns that are filterable
  const filterOptions: FilterOption[] = React.useMemo(() => {
    if (externalFilterOptions && externalFilterOptions.length > 0) {
      // Merge external options with async loaded options
      return externalFilterOptions.map((filter) => {
        const asyncData = asyncFilterOptions[filter.id];
        if (asyncData) {
          return {
            ...filter,
            options: asyncData.options,
            isLoading: asyncData.isLoading,
          };
        }
        return filter;
      });
    }

    // Generate filter options from filterable columns
    return columns
      .filter((col) => col.filterable !== false)
      .map((col) => {
        // Get unique values from data for this column
        const uniqueValues = new Set<string>();
        data.forEach((row) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const value = (row as any)[col.id];
          if (value !== undefined && value !== null && value !== "") {
            uniqueValues.add(String(value));
          }
        });

        return {
          id: col.id,
          label: col.label,
          options: Array.from(uniqueValues).sort(),
          multiple: col.multiFilter, // Enable multi-select from column config
        };
      });
  }, [columns, data, externalFilterOptions, asyncFilterOptions]);

  const [columnMenuOpen, setColumnMenuOpen] = React.useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const [filterSelectorOpen, setFilterSelectorOpen] = React.useState(false);
  const [visibleFilters, setVisibleFilters] = React.useState<string[]>([]);
  const [activeFilters, setActiveFilters] = React.useState<FilterValues>({});
  const [rowMenuOpen, setRowMenuOpen] = React.useState<number | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  // Fetch async options when filter selector opens
  React.useEffect(() => {
    if (filterSelectorOpen && externalFilterOptions) {
      externalFilterOptions.forEach((filter) => {
        if (filter.fetchOptions) {
          fetchAsyncOptions(filter);
        }
      });
    }
  }, [filterSelectorOpen, externalFilterOptions, fetchAsyncOptions]);

  const visibleColumns = columns.filter((col) => col.visible !== false);

  // Filter data based on search query and active filters (client-side only)
  const filteredData = React.useMemo(() => {
    // If server-side filtering is enabled, don't filter on client
    if (serverSideFiltering) {
      return data;
    }

    return data.filter((row) => {
      // First check search query (searches across all string fields)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rowValues = Object.values(row as any);
        const matchesSearch = rowValues.some((value) => {
          if (value === null || value === undefined) return false;
          return String(value).toLowerCase().includes(query);
        });
        if (!matchesSearch) return false;
      }

      // Then check each active filter
      for (const [filterId, filterValue] of Object.entries(activeFilters)) {
        if (filterValue === undefined || filterValue === null || filterValue === "") continue;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const rowValue = (row as any)[filterId];
        const filterOption = filterOptions.find(f => f.id === filterId);

        if (filterOption?.type === "text") {
          if (!String(rowValue).toLowerCase().includes(String(filterValue).toLowerCase())) return false;
          continue;
        }

        if (filterOption?.type === "number-range") {
          const range = filterValue as { min?: number; max?: number };
          const val = Number(rowValue);
          if (range.min !== undefined && val < range.min) return false;
          if (range.max !== undefined && val > range.max) return false;
          continue;
        }

        if (filterOption?.type === "date-range") {
          const range = filterValue as unknown as DateRangeValue;
          if (!range.start) continue;
          const val = new Date(rowValue).getTime();
          if (val < range.start.getTime()) return false;
          if (range.end && val > range.end.getTime()) return false;
          continue;
        }

        if (filterOption?.type === "date") {
          const filterDate = filterValue as unknown as Date;
          const rowDate = new Date(rowValue);
          if (filterDate.toDateString() !== rowDate.toDateString()) return false;
          continue;
        }

        if (filterOption?.type === "switch" || filterOption?.type === "checkbox") {
          if (Boolean(rowValue) !== Boolean(filterValue)) return false;
          continue;
        }

        // Default exact match / multi-select behavior
        const rowValueStr = String(rowValue).toLowerCase();
        if (Array.isArray(filterValue)) {
          if (filterValue.length === 0) continue;
          const matchesAny = filterValue.some(
            (val) => String(val).toLowerCase() === rowValueStr
          );
          if (!matchesAny) return false;
        } else if (typeof filterValue === "string") {
          const filterValueStr = filterValue.toLowerCase();
          if (rowValueStr !== filterValueStr) return false;
        }
      }
      return true;
    });
  }, [data, activeFilters, searchQuery, serverSideFiltering, filterOptions]);

  // TanStack Table columns definition
  const tableColumns = React.useMemo<ColumnDef<T>[]>(
    () =>
      visibleColumns.map((col) => ({
        id: col.id,
        accessorKey: col.id,
        header: col.label,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (info: any) => info.getValue() || "-",
      })),
    [visibleColumns]
  );

  // TanStack Table instance
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
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === "function" ? updater(pagination) : updater;
      setPagination(newPagination);
      onPaginationChange?.(newPagination.pageIndex, newPagination.pageSize);
    },
    manualPagination: !!totalCount, // Enable manual pagination for server-side
    pageCount: totalCount
      ? Math.ceil(totalCount / pagination.pageSize)
      : undefined,
  });

  // Reset pagination when filters change
  React.useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [activeFilters, searchQuery]);

  const handleFilterChange = (filterId: string, value: FilterValue) => {
    const newFilters = {
      ...activeFilters,
      [filterId]: value,
    };
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);

    // For server-side filtering, call the apply handler
    if (serverSideFiltering) {
      onFiltersApply?.(newFilters);
    }
  };

  const handleResetFilters = () => {
    setActiveFilters({});
    onFilterChange?.({});

    // For server-side filtering, call the apply handler with empty filters
    if (serverSideFiltering) {
      onFiltersApply?.({});
    }
  };

  const hasActiveFilters = Object.values(activeFilters).some((v) => v !== "");

  const handleSaveProfile = (profileName: string) => {
    const filterState = {
      name: profileName,
      filters: activeFilters,
      timestamp: new Date().toISOString(),
    };
    console.log("Filter profile saved:", filterState);
  };

  return (
    <div className="space-y-0">
      {/* Row 1: Filters Row - Separated with border */}
      <div className="flex items-center justify-between gap-4 py-4 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg mb-4">
        {/* Filter Dropdowns - horizontal layout */}
        <div className="flex items-center gap-3 flex-wrap">
          {filterOptions
            .filter((filter) => visibleFilters.includes(filter.id))
            .map((filter, index) => {
              const isActive = activeFilters[filter.id] !== undefined && activeFilters[filter.id] !== "" &&
                (!Array.isArray(activeFilters[filter.id]) || (activeFilters[filter.id] as string[]).length > 0);

              return (
                <div
                  key={filter.id}
                  className={`min-w-[200px] ${index > 0
                    ? "pl-3 border-l border-neutral-200 dark:border-neutral-600"
                    : ""
                    }`}
                >
                  {filter.isLoading ? (
                    <div className="h-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-md px-3">
                      <svg
                        className="w-4 h-4 animate-spin text-neutral-400"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="ml-2 text-sm text-neutral-500">
                        {filter.label}
                      </span>
                    </div>
                  ) : filter.type === "text" ? (
                    <Input
                      value={(activeFilters[filter.id] as string) || ""}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      placeholder={filter.placeholder || filter.label}
                      className={isActive ? "border-primary-500" : ""}
                    />
                  ) : filter.type === "select" ? (
                    <Select
                      value={(activeFilters[filter.id] as string) || ""}
                      onChange={(e) => handleFilterChange(filter.id, e.target.value)}
                      placeholder={filter.placeholder || filter.label}
                      options={(filter.options || []).map((opt) => ({
                        value: opt,
                        label: opt,
                      }))}
                      className={isActive ? "border-primary-500" : ""}
                    />
                  ) : filter.type === "switch" ? (
                    <Switch
                      checked={Boolean(activeFilters[filter.id])}
                      onChange={(e) => handleFilterChange(filter.id, e.target.checked)}
                      label={filter.label}
                    />
                  ) : filter.type === "date-range" ? (
                    <DatePicker
                      mode="range"
                      value={(activeFilters[filter.id] as unknown as DateRangeValue) || { start: null, end: null }}
                      onChange={(val) => handleFilterChange(filter.id, val)}
                      placeholder={filter.placeholder || filter.label}
                    />
                  ) : filter.type === "number-range" ? (
                    <div className="flex items-center gap-1">
                      <Input
                        type="number"
                        placeholder="Min"
                        value={(activeFilters[filter.id] as { min?: number })?.min ?? ""}
                        onChange={(e) => {
                          const val = e.target.value === "" ? undefined : Number(e.target.value);
                          const current = (activeFilters[filter.id] as { min?: number; max?: number }) || {};
                          handleFilterChange(filter.id, { ...current, min: val });
                        }}
                        className="h-9 px-2 text-xs"
                      />
                      <span className="text-neutral-400">-</span>
                      <Input
                        type="number"
                        placeholder="Max"
                        value={(activeFilters[filter.id] as { max?: number })?.max ?? ""}
                        onChange={(e) => {
                          const val = e.target.value === "" ? undefined : Number(e.target.value);
                          const current = (activeFilters[filter.id] as { min?: number; max?: number }) || {};
                          handleFilterChange(filter.id, { ...current, max: val });
                        }}
                        className="h-9 px-2 text-xs"
                      />
                    </div>
                  ) : filter.multiple ? (
                    <MultiSelectCombobox
                      value={
                        Array.isArray(activeFilters[filter.id])
                          ? (activeFilters[filter.id] as string[])
                          : activeFilters[filter.id]
                            ? [activeFilters[filter.id] as string]
                            : []
                      }
                      onChange={(values) => handleFilterChange(filter.id, values)}
                      placeholder={filter.placeholder || filter.label}
                      options={(filter.options || []).map((opt) => ({
                        value: opt,
                        label: opt,
                      }))}
                      className={isActive ? "border-primary-500 border-2" : ""}
                    />
                  ) : (
                    <Combobox
                      value={
                        Array.isArray(activeFilters[filter.id])
                          ? (activeFilters[filter.id] as string[])[0] || ""
                          : (activeFilters[filter.id] as string) || ""
                      }
                      onChange={(value) => handleFilterChange(filter.id, value)}
                      placeholder={filter.placeholder || filter.label}
                      options={(filter.options || []).map((opt) => ({
                        value: opt,
                        label: opt,
                      }))}
                      className={isActive ? "border-primary-500 border-2" : ""}
                    />
                  )}
                </div>
              );
            })}
        </div>

        {/* Right side icons */}
        <div className="flex items-center gap-1 ml-auto">
          {/* Add Filter Selector - Funnel icon */}
          <div className="relative">
            <button
              onClick={() => setFilterSelectorOpen(!filterSelectorOpen)}
              title="Add filter"
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
                />
              </svg>
            </button>
            <FilterDropdown
              isOpen={filterSelectorOpen}
              onClose={() => setFilterSelectorOpen(false)}
            >
              <div className="p-2 min-w-48 space-y-1">
                <div className="text-xs font-semibold text-neutral-500 px-2 pb-2">
                  Show filters
                </div>
                {filterOptions.map((filter) => (
                  <label
                    key={filter.id}
                    className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-700"
                  >
                    <input
                      type="checkbox"
                      checked={visibleFilters.includes(filter.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setVisibleFilters([...visibleFilters, filter.id]);
                        } else {
                          setVisibleFilters(
                            visibleFilters.filter((id) => id !== filter.id)
                          );
                          // Also clear the filter value when hiding
                          setActiveFilters((prev) => {
                            const newFilters = { ...prev };
                            delete newFilters[filter.id];
                            return newFilters;
                          });
                        }
                      }}
                      className="w-4 h-4 rounded cursor-pointer accent-primary-500"
                    />
                    <span className="text-sm text-neutral-700 dark:text-neutral-300">
                      {filter.label}
                    </span>
                  </label>
                ))}
                <div className="flex gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <button
                    onClick={() =>
                      setVisibleFilters(filterOptions.map((f) => f.id))
                    }
                    className="flex-1 text-xs font-semibold text-primary-500 hover:text-primary-600 py-1"
                  >
                    SHOW ALL
                  </button>
                  <button
                    onClick={() => {
                      setVisibleFilters([]);
                      setActiveFilters({});
                    }}
                    className="flex-1 text-xs font-semibold text-neutral-500 hover:text-neutral-600 py-1"
                  >
                    HIDE ALL
                  </button>
                </div>
              </div>
            </FilterDropdown>
          </div>

          {/* Reset Filters - Funnel with X icon */}
          <button
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
            title="Clear filters"
            className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 17l4 4m0-4l-4 4"
              />
            </svg>
          </button>

          {/* Save Profile - Person with funnel icon */}
          <div className="relative">
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              title="Filter profiles"
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                {/* Person head */}
                <circle cx="9" cy="7" r="3" />
                {/* Person body */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 21v-2a4 4 0 014-4h4"
                />
                {/* Small funnel */}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12h6l-3 3.5v2.5l-1.5 1v-3.5L15 12z"
                />
              </svg>
            </button>
            <FilterDropdown
              isOpen={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
            >
              <div className="p-2 min-w-48">
                <button
                  onClick={() => {
                    setProfileOpen(true);
                    setProfileMenuOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-primary-500 font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 rounded-lg border-2 border-dashed border-primary-300"
                >
                  Save new filter profile
                </button>
              </div>
            </FilterDropdown>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden">
        {/* Search Bar + Actions Row inside table card */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-neutral-200 dark:border-neutral-700">
          {/* Search - Left side */}
          <div className="relative w-[300px]">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-neutral-100 dark:bg-neutral-800 border-0 rounded-lg text-neutral-900 dark:text-white placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          {/* Right side: Refresh + Columns */}
          <div className="flex items-center gap-1">
            {/* Refresh */}
            <button
              onClick={onExport}
              title="Refresh"
              className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </button>

            {/* Table/Grid Toggle */}
            <div className="relative">
              <button
                onClick={() => setColumnMenuOpen(!columnMenuOpen)}
                title="Column settings"
                className="p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"
                  />
                </svg>
              </button>
              <FilterDropdown
                isOpen={columnMenuOpen}
                onClose={() => setColumnMenuOpen(false)}
              >
                <ColumnToggle
                  columns={columns}
                  onToggle={(id) => {
                    onColumnToggle?.(id);
                  }}
                  onShowAll={() => {
                    columns.forEach((col) => {
                      if (col.visible === false) onColumnToggle?.(col.id);
                    });
                  }}
                  onHideAll={() => {
                    columns.forEach((col) => {
                      if (col.visible !== false) onColumnToggle?.(col.id);
                    });
                  }}
                />
              </FilterDropdown>
            </div>
          </div>
        </div>

        {/* Table Container */}
        <div className="overflow-auto" style={{ maxHeight }}>
          <table className="w-full min-w-[600px]">
            <thead className="sticky top-0 bg-white dark:bg-neutral-800 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-neutral-200 dark:border-neutral-700"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white whitespace-nowrap bg-white dark:bg-neutral-800"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </th>
                  ))}
                  <th className="w-12 bg-white dark:bg-neutral-800"></th>
                </tr>
              ))}
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={table.getVisibleLeafColumns().length + 1}
                    className="px-4 py-12 text-center"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <svg
                        className="w-8 h-8 animate-spin text-primary-500"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                      </svg>
                      <span className="text-neutral-500">
                        Loading data...
                      </span>
                    </div>
                  </td>
                </tr>
              ) : table.getRowModel().rows.length > 0 ? (
                <>
                  {table.getRowModel().rows.map((row) => (
                    <tr
                      key={row.id}
                      className="border-b border-neutral-100 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700/50 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <td
                          key={cell.id}
                          className="px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300"
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      ))}
                      {/* Row Action Menu */}
                      <td className="px-2 py-3 text-right relative">
                        <button
                          onClick={() =>
                            setRowMenuOpen(
                              rowMenuOpen === row.index ? null : row.index
                            )
                          }
                          className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-500"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
                          </svg>
                        </button>
                        {rowMenuOpen === row.index && (
                          <>
                            <div
                              className="fixed inset-0 z-40"
                              onClick={() => setRowMenuOpen(null)}
                            />
                            <div className="absolute right-0 top-full mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 min-w-32 py-1">
                              <button
                                onClick={() => {
                                  onRowAction?.("edit", row.original);
                                  setRowMenuOpen(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => {
                                  onRowAction?.("delete", row.original);
                                  setRowMenuOpen(null);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-error hover:bg-neutral-50 dark:hover:bg-neutral-700"
                              >
                                Delete
                              </button>
                            </div>
                          </>
                        )}
                      </td>
                    </tr>
                  ))}
                </>
              ) : (
                <tr>
                  <td
                    colSpan={table.getVisibleLeafColumns().length + 1}
                    className="px-4 py-12 text-center text-neutral-500"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-4xl">🔍</span>
                      <p className="font-medium">No results found</p>
                      <p className="text-sm">Try adjusting the filter</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-neutral-200 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800/50">
          {/* Left side: Page info */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Showing{" "}
              {table.getState().pagination.pageIndex *
                table.getState().pagination.pageSize +
                1}{" "}
              to{" "}
              {Math.min(
                (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
                totalCount ?? filteredData.length
              )}{" "}
              of {totalCount ?? filteredData.length} items
            </span>
          </div>

          {/* Right side: Pagination controls */}
          <div className="flex items-center gap-2">
            {/* Page size selector */}
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => table.setPageSize(Number(e.target.value))}
              className="px-2 py-1 text-sm border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
            >
              {[10, 20, 30, 50, 100].map((size) => (
                <option key={size} value={size}>
                  {size} / page
                </option>
              ))}
            </select>

            {/* First page */}
            <button
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="First page"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Previous page */}
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Previous page"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            {/* Page indicator */}
            <span className="px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </span>

            {/* Next page */}
            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Next page"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>

            {/* Last page */}
            <button
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="p-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Last page"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 5l7 7-7 7M5 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
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
