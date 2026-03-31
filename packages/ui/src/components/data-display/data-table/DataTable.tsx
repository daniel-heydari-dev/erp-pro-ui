import React from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
  type ColumnDef,
  type PaginationState,
  type Table,
} from '@tanstack/react-table';
import { Combobox } from '../../forms/combobox';
import { MultiSelectCombobox } from '../../forms/multi-select-combobox';
import { Checkbox } from '../../forms/checkbox';
import { Input } from '../../forms/input';
import { Select } from '../../forms/select';
import { Switch } from '../../forms/switch';
import {
  DatePicker,
  type DatePickerValue,
  type DateRangeValue,
} from '../../forms/date-picker';

// Filter option type - can be static or async
export interface FilterOption {
  id: string;
  label: string;
  type?:
    | 'text'
    | 'select'
    | 'combobox'
    | 'checkbox'
    | 'switch'
    | 'date'
    | 'date-range'
    | 'number-range';
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
    className={`p-2 rounded-lg transition-colors ${
      hasActive
        ? 'bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-400'
        : 'text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-700'
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
  const [profileName, setProfileName] = React.useState('');

  const handleSave = () => {
    if (profileName.trim()) {
      onSaveProfile(profileName);
      setProfileName('');
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
          onKeyPress={(e) => e.key === 'Enter' && handleSave()}
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

type AsyncFilterOptionsState = Record<
  string,
  { options: string[]; isLoading: boolean }
>;

type NumberRangeFilterValue = { min?: number; max?: number };

const ICON_BUTTON_CLASS_NAME =
  'p-2 rounded-lg text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors';
const DISABLED_ICON_BUTTON_CLASS_NAME = `${ICON_BUTTON_CLASS_NAME} disabled:opacity-40 disabled:cursor-not-allowed`;

const isFilterValueEmpty = (value?: FilterValue | null): boolean => {
  if (value === undefined || value === null) {
    return true;
  }

  if (typeof value === 'string') {
    return value === '';
  }

  if (Array.isArray(value)) {
    return value.length === 0;
  }

  if (value instanceof Date || typeof value === 'boolean') {
    return false;
  }

  if ('start' in value || 'end' in value) {
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
  typeof value === 'string' ? value : '';

const getMultiStringFilterValue = (value?: FilterValue): string[] => {
  if (Array.isArray(value)) {
    return value;
  }

  return typeof value === 'string' && value ? [value] : [];
};

const getNumberRangeFilterValue = (
  value?: FilterValue,
): NumberRangeFilterValue => {
  if (
    !value ||
    typeof value !== 'object' ||
    'start' in value ||
    'end' in value
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
    typeof value === 'object' &&
    'start' in value &&
    'end' in value
  ) {
    return value as DateRangeValue;
  }

  return { start: null, end: null };
};

function buildGeneratedFilterOptions<T>(
  columns: DataTableProps<T>['columns'],
  data: T[],
): FilterOption[] {
  return columns
    .filter((column) => column.filterable !== false)
    .map((column) => {
      const uniqueValues = new Set<string>();

      data.forEach((row) => {
        const value = (row as Record<string, unknown>)[column.id];
        if (value !== undefined && value !== null && value !== '') {
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
  columns: DataTableProps<T>['columns'],
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
    case 'text':
      return String(rowValue)
        .toLowerCase()
        .includes(String(filterValue).toLowerCase());
    case 'number-range': {
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
    case 'date-range': {
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
    case 'date': {
      const selectedDate = filterValue as Date;
      const rowDate = new Date(rowValue as string | number | Date);
      return selectedDate.toDateString() === rowDate.toDateString();
    }
    case 'switch':
    case 'checkbox':
      return Boolean(rowValue) === Boolean(filterValue);
    default: {
      const rowValueString = String(rowValue).toLowerCase();
      if (Array.isArray(filterValue)) {
        return filterValue.some(
          (value) => String(value).toLowerCase() === rowValueString,
        );
      }

      return typeof filterValue !== 'string'
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
        value={value.min ?? ''}
        onChange={(event) => {
          const min =
            event.target.value === '' ? undefined : Number(event.target.value);
          onChange({ ...value, min });
        }}
        className="h-9 px-2 text-xs"
      />
      <span className="text-neutral-400">-</span>
      <Input
        type="number"
        placeholder="Max"
        value={value.max ?? ''}
        onChange={(event) => {
          const max =
            event.target.value === '' ? undefined : Number(event.target.value);
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

  const activeClassName = isActive ? 'border-primary-500' : '';

  switch (filter.type) {
    case 'text':
      return (
        <Input
          value={getStringFilterValue(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={filter.placeholder || filter.label}
          className={activeClassName}
        />
      );
    case 'select':
      return (
        <Select
          value={getStringFilterValue(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={filter.placeholder || filter.label}
          options={toSelectOptions(filter.options)}
          className={activeClassName}
        />
      );
    case 'switch':
    case 'checkbox':
      return (
        <Switch
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          label={filter.label}
        />
      );
    case 'date':
      return (
        <DatePicker
          mode="single"
          value={getDateFilterValue(value)}
          onChange={(nextValue) => onChange(nextValue)}
          placeholder={filter.placeholder || filter.label}
        />
      );
    case 'date-range':
      return (
        <DatePicker
          mode="range"
          value={getDateRangeFilterValue(value)}
          onChange={(nextValue) => onChange(nextValue)}
          placeholder={filter.placeholder || filter.label}
        />
      );
    case 'number-range':
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
          className={isActive ? 'border-primary-500 border-2' : ''}
        />
      ) : (
        <Combobox
          value={getStringFilterValue(value)}
          onChange={(nextValue) => onChange(nextValue)}
          placeholder={filter.placeholder || filter.label}
          options={toSelectOptions(filter.options)}
          className={isActive ? 'border-primary-500 border-2' : ''}
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
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={
        disabled ? DISABLED_ICON_BUTTON_CLASS_NAME : ICON_BUTTON_CLASS_NAME
      }
    >
      {children}
    </button>
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
      <svg
        className="pointer-events-none absolute left-4 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-neutral-400"
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
      <Input
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        style={{ paddingLeft: '2.75rem' }}
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
      <button
        onClick={() => onToggle(rowIndex)}
        className="p-1 rounded hover:bg-neutral-100 dark:hover:bg-neutral-600 text-neutral-500"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
        </svg>
      </button>
      {isOpen ? (
        <>
          <div className="fixed inset-0 z-40" onClick={onClose} />
          <div className="absolute right-0 top-full mt-1 bg-white dark:bg-neutral-800 rounded-lg shadow-lg border border-neutral-200 dark:border-neutral-700 z-50 min-w-32 py-1">
            <button
              onClick={() => {
                onRowAction?.('edit', row);
                onClose();
              }}
              className="w-full text-left px-4 py-2 text-sm hover:bg-neutral-50 dark:hover:bg-neutral-700"
            >
              Edit
            </button>
            <button
              onClick={() => {
                onRowAction?.('delete', row);
                onClose();
              }}
              className="w-full text-left px-4 py-2 text-sm text-error hover:bg-neutral-50 dark:hover:bg-neutral-700"
            >
              Delete
            </button>
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

      <div className="flex items-center gap-2">
        <select
          value={pageSize}
          onChange={(event) => table.setPageSize(Number(event.target.value))}
          className="px-2 py-1 text-sm border border-neutral-200 dark:border-neutral-600 rounded-lg bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
        >
          {[10, 20, 30, 50, 100].map((size) => (
            <option key={size} value={size}>
              {size} / page
            </option>
          ))}
        </select>

        <ToolbarIconButton
          title="First page"
          onClick={() => table.setPageIndex(0)}
          disabled={!table.getCanPreviousPage()}
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
        </ToolbarIconButton>

        <ToolbarIconButton
          title="Previous page"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
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
        </ToolbarIconButton>

        <span className="px-3 py-1 text-sm text-neutral-700 dark:text-neutral-300">
          Page {pageIndex + 1} of {table.getPageCount()}
        </span>

        <ToolbarIconButton
          title="Next page"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
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
        </ToolbarIconButton>

        <ToolbarIconButton
          title="Last page"
          onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          disabled={!table.getCanNextPage()}
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
            onChange={(event) =>
              onToggleFilter(filter.id, event.target.checked)
            }
            className="w-4 h-4 rounded cursor-pointer accent-primary-500"
          />
          <span className="text-sm text-neutral-700 dark:text-neutral-300">
            {filter.label}
          </span>
        </label>
      ))}
      <div className="flex gap-2 pt-2 border-t border-neutral-200 dark:border-neutral-700">
        <button
          onClick={onShowAll}
          className="flex-1 text-xs font-semibold text-primary-500 hover:text-primary-600 py-1"
        >
          SHOW ALL
        </button>
        <button
          onClick={onHideAll}
          className="flex-1 text-xs font-semibold text-neutral-500 hover:text-neutral-600 py-1"
        >
          HIDE ALL
        </button>
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
  columns: DataTableProps<T>['columns'];
  onColumnToggle?: (columnId: string) => void;
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
}: DataTableToolbarProps<T>) {
  const hasSelectedRows = selectedCount > 0;

  return (
    <div className="border-b border-neutral-200 px-4 py-3 dark:border-neutral-700">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          {bulkDeleteEnabled ? (
            <FilterButton
              icon={
                <svg
                  fill="none"
                  stroke="currentColor"
                  className="h-6.5 w-6.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M4.25 10V18.85A1.25 1.25 0 005.5 20.1H14"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M7 5.75h10A1.25 1.25 0 0118.25 7v10A1.25 1.25 0 0117 18.25H7A1.25 1.25 0 015.75 17V7A1.25 1.25 0 017 5.75z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="m9.25 12 2.25 2.25 4.25-4.5"
                  />
                </svg>
              }
              label={
                bulkSelectionActive
                  ? 'Disable bulk selection'
                  : 'Enable bulk selection'
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
          </ToolbarIconButton>

          <div className="relative">
            <ToolbarIconButton
              onClick={onToggleColumnMenu}
              title="Column settings"
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
                  d="M4 6h16M7 12h10m-7 6h4"
                />
              </svg>
            </ToolbarIconButton>

            <FilterDropdown isOpen={columnMenuOpen} onClose={onCloseColumnMenu}>
              <ColumnToggle
                columns={columns}
                onToggle={(columnId) => {
                  onColumnToggle?.(columnId);
                }}
              />
            </FilterDropdown>
          </div>
        </div>
      </div>

      {bulkSelectionActive && hasSelectedRows
        ? (bulkActionCard ?? (
            <div className="mt-3 flex flex-col gap-3 rounded-xl border border-neutral-200/80 bg-white/90 px-4 py-3 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-neutral-900/70 dark:shadow-black/20 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex min-w-0 flex-wrap items-center gap-2">
                <span className="inline-flex items-center rounded-full border border-primary-200 bg-primary-100/80 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-primary-700 dark:border-primary-400/20 dark:bg-primary-500/15 dark:text-primary-200">
                  Bulk actions
                </span>
                <p className="text-sm font-medium text-neutral-900 dark:text-white">
                  {selectedCount} {selectedCount === 1 ? 'row' : 'rows'}{' '}
                  selected
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {bulkActionsContent}
                {bulkDeleteEnabled ? (
                  <button
                    type="button"
                    onClick={onBulkDeleteSelected}
                    className="inline-flex items-center gap-2 rounded-lg border border-primary-400/30 bg-primary px-3 py-2 text-sm font-medium text-primary-foreground shadow-lg shadow-primary-500/20 transition-colors hover:bg-primary-600"
                  >
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7V4a1 1 0 011-1h4a1 1 0 011 1v3m-7 0h8"
                      />
                    </svg>
                    Delete selected
                  </button>
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
) => totalCount !== undefined || typeof onPaginationChange === 'function';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function DataTable<T = Record<string, any>>({
  columns,
  data,
  isLoading = false,
  onColumnToggle,
  pageSize = 10,
  maxHeight = '500px',
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
  searchPlaceholder = 'Search ...',
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
  const [searchQuery, setSearchQuery] = React.useState('');

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

  const visibleColumns = React.useMemo(
    () => columns.filter((column) => column.visible !== false),
    [columns],
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        cell: (info: any) => info.getValue() || '-',
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
          typeof updater === 'function' ? updater(previous) : updater;

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
  const bulkDeleteEnabled = typeof onBulkDelete === 'function';
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

      const previousKeys = Object.keys(previous).sort().join('|');
      const nextKeys = Object.keys(nextSelection).sort().join('|');

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
      <div className="flex items-center justify-between gap-4 py-4 px-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded-lg mb-4">
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
                      ? 'pl-3 border-l border-neutral-200 dark:border-neutral-600'
                      : ''
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
          </ToolbarIconButton>

          <div className="relative">
            <ToolbarIconButton
              onClick={handleToggleProfileMenu}
              title="Filter profiles"
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
            </ToolbarIconButton>
            <FilterDropdown
              isOpen={profileMenuOpen}
              onClose={() => setProfileMenuOpen(false)}
            >
              <div className="p-2 min-w-48">
                <button
                  onClick={handleOpenProfile}
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
          columns={columns}
          onColumnToggle={onColumnToggle}
        />

        {/* Table Container */}
        <div className="overflow-auto" style={{ maxHeight }}>
          <table className="w-full min-w-[600px]">
            <thead className="sticky top-0 bg-white dark:bg-neutral-800 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-neutral-200 dark:border-neutral-700"
                >
                  {bulkSelectionActive ? (
                    <th className="w-12 px-4 py-3 bg-white dark:bg-neutral-800">
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
                      className="px-4 py-3 text-left text-sm font-semibold text-neutral-900 dark:text-white whitespace-nowrap bg-white dark:bg-neutral-800"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </th>
                  ))}
                  <th className="w-12 bg-white dark:bg-neutral-800"></th>
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
