import React from "react";
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
import type { FilterOption, FilterValue, FilterValues } from "./DataTable";

type NumberRangeFilterValue = { min?: number; max?: number };

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

type FilterableColumn = {
  id: string;
  label: string;
  filterable?: boolean;
  multiFilter?: boolean;
};

function buildGeneratedFilterOptions<T>(
  columns: FilterableColumn[],
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

export function resolveFilterOptions<T>(
  columns: FilterableColumn[],
  data: T[],
  externalFilterOptions: FilterOption[] | undefined,
  asyncFilterOptions: Record<string, { options: string[]; isLoading: boolean }>,
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

  const lowerCasedSearch = searchQuery.toLowerCase();
  return Object.values(row as Record<string, unknown>).some((value) =>
    String(value).toLowerCase().includes(lowerCasedSearch),
  );
}

function matchesFilterValue(
  rowValue: unknown,
  filterValue: FilterValue,
  filterType: FilterOption["type"],
): boolean {
  if (typeof filterValue === "string") {
    if (!filterValue) return true;

    const rowText = String(rowValue).toLowerCase();
    const filterText = filterValue.toLowerCase();
    return rowText.includes(filterText);
  }

  if (Array.isArray(filterValue)) {
    if (!filterValue.length) return true;

    const rowText = String(rowValue).toLowerCase();
    return filterValue.some((value) => rowText.includes(value.toLowerCase()));
  }

  if (typeof filterValue === "boolean") {
    return Boolean(rowValue) === filterValue;
  }

  if (filterType === "date" && filterValue instanceof Date) {
    const rowDate = new Date(String(rowValue));
    return rowDate.toDateString() === filterValue.toDateString();
  }

  if (
    filterType === "date-range" &&
    typeof filterValue === "object" &&
    filterValue !== null &&
    "start" in filterValue
  ) {
    const rangeValue = filterValue as DateRangeValue;
    const rowDate = new Date(String(rowValue));

    if (Number.isNaN(rowDate.getTime())) {
      return false;
    }

    if (rangeValue.start && rowDate < rangeValue.start) return false;
    if (rangeValue.end) {
      const endDate = new Date(rangeValue.end);
      endDate.setHours(23, 59, 59, 999);
      if (rowDate > endDate) return false;
    }

    return true;
  }

  if (
    filterType === "number-range" &&
    typeof filterValue === "object" &&
    filterValue !== null &&
    !("start" in filterValue)
  ) {
    const rangeValue = filterValue as NumberRangeFilterValue;
    const rowNumber = Number(rowValue);

    if (Number.isNaN(rowNumber)) {
      return false;
    }

    if (rangeValue.min !== undefined && rowNumber < rangeValue.min) return false;
    if (rangeValue.max !== undefined && rowNumber > rangeValue.max) return false;

    return true;
  }

  return true;
}

export function filterClientData<T>(
  data: T[],
  activeFilters: FilterValues,
  searchQuery: string,
  serverSideFiltering: boolean,
  filterOptions: FilterOption[],
): T[] {
  if (serverSideFiltering) {
    return data;
  }

  return data.filter((row) => {
    if (!matchesSearchQuery(row, searchQuery)) {
      return false;
    }

    return Object.entries(activeFilters).every(([filterId, filterValue]) => {
      if (isFilterValueEmpty(filterValue)) {
        return true;
      }

      const filterOption = filterOptions.find((filter) => filter.id === filterId);
      const rowValue = (row as Record<string, unknown>)[filterId];

      return matchesFilterValue(rowValue, filterValue, filterOption?.type);
    });
  });
}

export function useAsyncFilterOptions(
  filterOptions: FilterOption[] | undefined,
  isSelectorOpen: boolean,
) {
  const [asyncOptions, setAsyncOptions] = React.useState<
    Record<string, { options: string[]; isLoading: boolean }>
  >({});

  React.useEffect(() => {
    if (!isSelectorOpen || !filterOptions?.length) return;

    filterOptions.forEach((filter) => {
      if (filter.fetchOptions && !asyncOptions[filter.id]) {
        setAsyncOptions((previous) => ({
          ...previous,
          [filter.id]: { options: filter.options || [], isLoading: true },
        }));

        filter
          .fetchOptions()
          .then((options) => {
            setAsyncOptions((previous) => ({
              ...previous,
              [filter.id]: { options, isLoading: false },
            }));
          })
          .catch(() => {
            setAsyncOptions((previous) => ({
              ...previous,
              [filter.id]: {
                options: filter.options || [],
                isLoading: false,
              },
            }));
          });
      }
    });
  }, [filterOptions, isSelectorOpen, asyncOptions]);

  return asyncOptions;
}

export const isFilterValueEmpty = (value?: FilterValue | null): boolean => {
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

export const isFilterActive = (value?: FilterValue): boolean =>
  !isFilterValueEmpty(value);

function LoadingFilterField({ label }: { label: string }) {
  return (
    <div className="min-w-[200px] space-y-2 rounded-[10px] border border-neutral-200 bg-neutral-100/60 px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800/60">
      <div className="h-3 w-24 animate-pulse rounded bg-neutral-300 dark:bg-neutral-600" />
      <div className="h-10 w-full animate-pulse rounded bg-neutral-200 dark:bg-neutral-700" />
      <p className="text-xs text-neutral-500 dark:text-neutral-400">
        Loading {label.toLowerCase()} options...
      </p>
    </div>
  );
}

interface NumberRangeFilterProps {
  value: NumberRangeFilterValue;
  onChange: (value: NumberRangeFilterValue) => void;
}

function NumberRangeFilter({ value, onChange }: NumberRangeFilterProps) {
  return (
    <div className="flex gap-2">
      <Input
        type="number"
        placeholder="Min"
        value={value.min?.toString() || ""}
        onChange={(e) =>
          onChange({
            ...value,
            min: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="w-20"
      />
      <Input
        type="number"
        placeholder="Max"
        value={value.max?.toString() || ""}
        onChange={(e) =>
          onChange({
            ...value,
            max: e.target.value ? Number(e.target.value) : undefined,
          })
        }
        className="w-20"
      />
    </div>
  );
}

interface FilterFieldControlProps {
  filter: FilterOption;
  value: FilterValue | undefined;
  isActive: boolean;
  onChange: (value: FilterValue) => void;
}

export function FilterFieldControl({
  filter,
  value,
  isActive,
  onChange,
}: FilterFieldControlProps) {
  if (filter.isLoading) {
    return <LoadingFilterField label={filter.label} />;
  }

  switch (filter.type) {
    case "text":
      return (
        <Input
          value={getStringFilterValue(value)}
          onChange={(event) => onChange(event.target.value)}
          placeholder={filter.placeholder || filter.label}
          className={isActive ? "border-accent border-2" : ""}
        />
      );
    case "select":
      return (
        <Select
          value={getStringFilterValue(value)}
          onChange={(event) => onChange(event.target.value)}
          options={toSelectOptions(filter.options)}
          placeholder={filter.placeholder || filter.label}
        />
      );
    case "combobox":
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
    case "checkbox":
      return (
        <div className="flex h-10 items-center px-2">
          <Checkbox
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
            label={filter.label}
          />
        </div>
      );
    case "switch":
      return (
        <div className="flex h-10 items-center px-2">
          <Switch
            checked={Boolean(value)}
            onChange={(event) => onChange(event.target.checked)}
          />
        </div>
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
