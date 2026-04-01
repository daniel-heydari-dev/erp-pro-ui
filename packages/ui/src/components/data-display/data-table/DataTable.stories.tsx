import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../forms/button";
import { ProgressBar } from "../progress-bar";
import { StorySurface } from "../../shared/storybook";
import DataTable, { type FilterOption } from "./DataTable";

type UserRow = {
  id: string;
  name: string;
  status: string;
  role: string;
  location: string;
  lastSeen: string;
};

const sampleData: UserRow[] = [
  {
    id: "1",
    name: "Alice Security",
    status: "Active",
    role: "Admin",
    location: "Berlin",
    lastSeen: "2026-03-29",
  },
  {
    id: "2",
    name: "Bob Developer",
    status: "Inactive",
    role: "User",
    location: "Hamburg",
    lastSeen: "2026-03-24",
  },
  {
    id: "3",
    name: "Charlie Operations",
    status: "Active",
    role: "Operator",
    location: "Amsterdam",
    lastSeen: "2026-03-30",
  },
  {
    id: "4",
    name: "Diana Manager",
    status: "Active",
    role: "Manager",
    location: "Berlin",
    lastSeen: "2026-03-28",
  },
  {
    id: "5",
    name: "Evan Design",
    status: "Inactive",
    role: "User",
    location: "Paris",
    lastSeen: "2026-03-18",
  },
  {
    id: "6",
    name: "Fatima Supply",
    status: "Active",
    role: "Analyst",
    location: "Lisbon",
    lastSeen: "2026-03-27",
  },
];

const columns = [
  { id: "name", label: "Full Name", filterable: true, priority: 1 },
  { id: "status", label: "Status", filterable: true, priority: 1 },
  {
    id: "role",
    label: "Role",
    filterable: true,
    multiFilter: true,
    priority: 2,
  },
  { id: "location", label: "Location", filterable: true, priority: 2 },
  { id: "lastSeen", label: "Last Seen", filterable: false, priority: 3 },
];

const filterOptions: FilterOption[] = [
  {
    id: "status",
    label: "Status",
    type: "select",
    options: ["Active", "Inactive"],
  },
  {
    id: "role",
    label: "Role",
    type: "combobox",
    multiple: true,
    options: ["Admin", "Manager", "Operator", "Analyst", "User"],
  },
  {
    id: "location",
    label: "Location",
    type: "select",
    options: ["Berlin", "Hamburg", "Amsterdam", "Paris", "Lisbon"],
  },
];

type CapacityRow = {
  id: string;
  zone: string;
  owner: string;
  status: string;
  usedUnits: number;
  capacityPercent: number;
};

const capacityData: CapacityRow[] = [
  {
    id: "zone-1",
    zone: "North Rack A",
    owner: "A. Security",
    status: "Stable",
    usedUnits: 142,
    capacityPercent: 71,
  },
  {
    id: "zone-2",
    zone: "Cold Storage B",
    owner: "F. Supply",
    status: "Watch",
    usedUnits: 176,
    capacityPercent: 88,
  },
  {
    id: "zone-3",
    zone: "Overflow C",
    owner: "C. Operations",
    status: "Healthy",
    usedUnits: 96,
    capacityPercent: 48,
  },
  {
    id: "zone-4",
    zone: "Dispatch D",
    owner: "D. Manager",
    status: "Stable",
    usedUnits: 118,
    capacityPercent: 59,
  },
];

const capacityColumns = [
  { id: "zone", label: "Zone", filterable: true, priority: 1 },
  { id: "owner", label: "Owner", filterable: true, priority: 2 },
  { id: "status", label: "Status", filterable: true, priority: 2 },
  {
    id: "capacityPercent",
    label: "Utilization",
    priority: 1,
    renderCell: ({ value, row }: { value: unknown; row: CapacityRow }) => (
      <div className="min-w-55">
        <ProgressBar
          value={typeof value === "number" ? value : 0}
          max={100}
          label={`${row.usedUnits} units`}
          size="sm"
          tone={
            typeof value === "number" && value >= 85 ? "warning" : "default"
          }
        />
      </div>
    ),
  },
];

function DefaultWorkspaceStory(props: Story["args"]) {
  const [rows, setRows] = useState(sampleData);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        {...props}
        data={rows}
        onBulkDelete={(selectedRows) => {
          const selectedIds = new Set(selectedRows.map((row) => row.id));
          setRows((previousRows) =>
            previousRows.filter((row) => !selectedIds.has(row.id)),
          );
        }}
      />
    </StorySurface>
  );
}

function BulkSelectionWorkspaceStory() {
  const [rows, setRows] = useState(sampleData);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={rows}
        columns={columns}
        pageSize={5}
        searchPlaceholder="Search team members..."
        onBulkDelete={(selectedRows) => {
          const selectedIds = new Set(selectedRows.map((row) => row.id));
          setRows((previousRows) =>
            previousRows.filter((row) => !selectedIds.has(row.id)),
          );
        }}
      />
    </StorySurface>
  );
}

function BulkSelectionCustomActionsStory() {
  const [rows, setRows] = useState(sampleData);
  const [reviewedIds, setReviewedIds] = useState<string[]>([]);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <div className="ui:space-y-4">
        <DataTable
          data={rows}
          columns={columns}
          pageSize={5}
          searchPlaceholder="Search team members..."
          renderBulkActions={({ selectedRows, clearSelection }) => (
            <Button
              onClick={() => {
                const nextReviewedIds = selectedRows.map((row) => row.id);
                setReviewedIds(nextReviewedIds);
                clearSelection();
              }}
              className="ui:text-sm"
            >
              Mark reviewed
            </Button>
          )}
          onBulkDelete={(selectedRows) => {
            const selectedIds = new Set(selectedRows.map((row) => row.id));
            setRows((previousRows) =>
              previousRows.filter((row) => !selectedIds.has(row.id)),
            );
          }}
        />

        {reviewedIds.length > 0 ? (
          <div className="ui:rounded-xl ui:border ui:border-border ui:bg-card ui:px-4 ui:py-3 ui:text-sm ui:text-card-foreground">
            Reviewed rows: {reviewedIds.join(", ")}
          </div>
        ) : null}
      </div>
    </StorySurface>
  );
}

const meta: Meta<typeof DataTable> = {
  title: "Data Display/DataTable",
  component: DataTable,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Operational table with search, filters, pagination, and responsive column handling for back-office workflows.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default Workspace Table
 * A broad example with responsive width so the table docs feel closer to a real admin page.
 */
export const Default: Story = {
  args: {
    columns,
    pageSize: 5,
    searchPlaceholder: "Search team members...",
  },
  render: (args: Story["args"]) => <DefaultWorkspaceStory {...args} />,
};

/**
 * ## Filtered Operations View
 * Shows explicit filter configuration for dashboards that need curated controls.
 */
export const FilteredOperationsView: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={sampleData}
        columns={columns}
        pageSize={4}
        maxHeight="420px"
        searchPlaceholder="Search operators, managers, or locations..."
        filterOptions={filterOptions}
      />
    </StorySurface>
  ),
};

/**
 * ## Compact Audit Queue
 * Useful when the table sits inside a dense analytics or review screen.
 */
export const CompactAuditQueue: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <DataTable
        data={sampleData.slice(0, 4)}
        columns={columns}
        pageSize={3}
        maxHeight="320px"
        searchPlaceholder="Search audit queue..."
      />
    </StorySurface>
  ),
};

/**
 * ## Capacity Monitoring
 * Shows a richer cell using the shared ProgressBar via columns[].renderCell.
 */
export const CapacityMonitoring: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={capacityData}
        columns={capacityColumns}
        pageSize={4}
        searchPlaceholder="Search zones or owners..."
      />
    </StorySurface>
  ),
};

/**
 * ## Bulk Selection Workspace
 * Demonstrates the optional bulk-selection mode and bulk delete action.
 */
export const BulkSelectionWorkspace: Story = {
  render: () => <BulkSelectionWorkspaceStory />,
};

/**
 * ## Bulk Selection With Custom Actions
 * Shows how consumers can add extra bulk-action buttons without replacing the default delete action.
 */
export const BulkSelectionWithCustomActions: Story = {
  render: () => <BulkSelectionCustomActionsStory />,
};
