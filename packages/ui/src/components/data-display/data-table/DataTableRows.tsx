import React from "react";
import { flexRender, type Table as TanStackTable } from "@tanstack/react-table";
import { Checkbox } from "../../forms/checkbox";
import { LoaderIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";
import { TableCell, TableRow } from "./TablePrimitives";

export interface DataTableEmptyStateContext {
  isLoading: boolean;
  hasActiveFilters: boolean;
  searchQuery: string;
}

interface TableStateRowProps {
  colSpan: number;
  children: React.ReactNode;
  rowClassName?: string;
  cellClassName?: string;
}

function TableStateRow({
  colSpan,
  children,
  rowClassName,
  cellClassName,
}: TableStateRowProps) {
  return (
    <TableRow className={rowClassName}>
      <TableCell
        colSpan={colSpan}
        className={mergeClassNames(
          "px-4 py-12 text-center text-neutral-500",
          cellClassName,
        )}
      >
        {children}
      </TableCell>
    </TableRow>
  );
}

function LoadingTableState({
  colSpan,
  rowClassName,
  cellClassName,
}: {
  colSpan: number;
  rowClassName?: string;
  cellClassName?: string;
}) {
  return (
    <TableStateRow
      colSpan={colSpan}
      rowClassName={rowClassName}
      cellClassName={cellClassName}
    >
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

function EmptyTableState({
  colSpan,
  rowClassName,
  cellClassName,
  children,
}: {
  colSpan: number;
  rowClassName?: string;
  cellClassName?: string;
  children?: React.ReactNode;
}) {
  return (
    <TableStateRow
      colSpan={colSpan}
      rowClassName={rowClassName}
      cellClassName={cellClassName}
    >
      {children ?? (
        <div className="flex flex-col items-center gap-2">
          <span className="text-4xl">🔍</span>
          <p className="font-medium">No results found</p>
          <p className="text-sm">Try adjusting the filter</p>
        </div>
      )}
    </TableStateRow>
  );
}

export interface DataTableRowsProps<T> {
  table: TanStackTable<T>;
  isLoading: boolean;
  bulkSelectionActive: boolean;
  selectedRowIds: Record<string, boolean>;
  onToggleRowSelection: (rowId: string, checked: boolean) => void;
  rowMenuOpen: number | null;
  onToggleRowMenu: (rowIndex: number) => void;
  onCloseRowMenu: () => void;
  onRowAction?: (action: string, row: T) => void;
  rowClassName?: string;
  cellClassName?: string;
  hasActiveFilters: boolean;
  searchQuery: string;
  renderEmptyState?: (context: DataTableEmptyStateContext) => React.ReactNode;
  renderRowActionsCell: (context: {
    rowIndex: number;
    row: T;
    isOpen: boolean;
    openDirection: "up" | "down";
    onToggle: (rowIndex: number) => void;
    onClose: () => void;
    onRowAction?: (action: string, row: T) => void;
  }) => React.ReactNode;
}

export function DataTableRows<T>({
  table,
  isLoading,
  bulkSelectionActive,
  selectedRowIds,
  onToggleRowSelection,
  rowMenuOpen,
  onToggleRowMenu,
  onCloseRowMenu,
  onRowAction,
  rowClassName,
  cellClassName,
  hasActiveFilters,
  searchQuery,
  renderEmptyState,
  renderRowActionsCell,
}: DataTableRowsProps<T>) {
  const colSpan =
    table.getVisibleLeafColumns().length + (bulkSelectionActive ? 2 : 1);

  if (isLoading) {
    return (
      <LoadingTableState
        colSpan={colSpan}
        rowClassName={rowClassName}
        cellClassName={cellClassName}
      />
    );
  }

  if (table.getRowModel().rows.length === 0) {
    const customEmptyState = renderEmptyState?.({
      isLoading,
      hasActiveFilters,
      searchQuery,
    });

    return (
      <EmptyTableState
        colSpan={colSpan}
        rowClassName={rowClassName}
        cellClassName={cellClassName}
      >
        {customEmptyState}
      </EmptyTableState>
    );
  }

  return (
    <>
      {table.getRowModel().rows.map((row) => (
        <TableRow
          key={row.id}
          className={mergeClassNames(
            "border-b border-neutral-100 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-700/50",
            rowClassName,
          )}
        >
          {bulkSelectionActive ? (
            <TableCell
              className={mergeClassNames(
                "w-12 px-4 py-3 align-middle",
                cellClassName,
              )}
            >
              <Checkbox
                aria-label={`Select row ${row.id}`}
                checked={Boolean(selectedRowIds[row.id])}
                onChange={(event) =>
                  onToggleRowSelection(row.id, event.target.checked)
                }
              />
            </TableCell>
          ) : null}
          {row.getVisibleCells().map((cell) => (
            <TableCell
              key={cell.id}
              className={mergeClassNames(
                "px-4 py-3 text-sm text-neutral-700 dark:text-neutral-300",
                cellClassName,
              )}
            >
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </TableCell>
          ))}
          {renderRowActionsCell({
            rowIndex: row.index,
            row: row.original,
            isOpen: rowMenuOpen === row.index,
            openDirection:
              row.index >= table.getRowModel().rows.length - 2 ? "up" : "down",
            onToggle: onToggleRowMenu,
            onClose: onCloseRowMenu,
            onRowAction,
          })}
        </TableRow>
      ))}
    </>
  );
}
