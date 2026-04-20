import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Button } from "../../forms/button";
import { SplitChip, StatusDotChip } from "../chip";
import { MiniNeonSparkline } from "../charts";
import { CircularProgress, ProgressBar } from "../progress-bar";
import { StorySurface } from "../../shared/storybook";
import { ArrowDownIcon, ArrowUpIcon } from "../../icons";
import {
  DataTable,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  ToolbarIconButton,
  type FilterOption,
} from "./index";

type UserRow = {
  id: string;
  name: string;
  status: string;
  role: string;
  location: string;
  shift: string;
  team: string;
  isRemote: boolean;
  isOnCall: boolean;
  workload: number;
  lastSeen: string;
};

const sampleData: UserRow[] = [
  {
    id: "1",
    name: "Alice Security",
    status: "Active",
    role: "Admin",
    location: "Berlin",
    shift: "Morning",
    team: "Security",
    isRemote: false,
    isOnCall: true,
    workload: 68,
    lastSeen: "2026-03-29",
  },
  {
    id: "2",
    name: "Bob Developer",
    status: "Inactive",
    role: "User",
    location: "Hamburg",
    shift: "Evening",
    team: "Engineering",
    isRemote: true,
    isOnCall: false,
    workload: 34,
    lastSeen: "2026-03-24",
  },
  {
    id: "3",
    name: "Charlie Operations",
    status: "Active",
    role: "Operator",
    location: "Amsterdam",
    shift: "Night",
    team: "Operations",
    isRemote: false,
    isOnCall: true,
    workload: 82,
    lastSeen: "2026-03-30",
  },
  {
    id: "4",
    name: "Diana Manager",
    status: "Active",
    role: "Manager",
    location: "Berlin",
    shift: "Morning",
    team: "Logistics",
    isRemote: true,
    isOnCall: false,
    workload: 57,
    lastSeen: "2026-03-28",
  },
  {
    id: "5",
    name: "Evan Design",
    status: "Inactive",
    role: "User",
    location: "Paris",
    shift: "Evening",
    team: "Design",
    isRemote: true,
    isOnCall: false,
    workload: 41,
    lastSeen: "2026-03-18",
  },
  {
    id: "6",
    name: "Fatima Supply",
    status: "Active",
    role: "Analyst",
    location: "Lisbon",
    shift: "Night",
    team: "Supply",
    isRemote: false,
    isOnCall: true,
    workload: 76,
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

const advancedColumns = [
  { id: "name", label: "Full Name", filterable: true, priority: 1 },
  { id: "status", label: "Status", filterable: true, priority: 1 },
  {
    id: "role",
    label: "Role",
    filterable: true,
    multiFilter: true,
    priority: 1,
  },
  { id: "team", label: "Team", filterable: true, priority: 2 },
  { id: "location", label: "Location", filterable: true, priority: 2 },
  { id: "shift", label: "Shift", filterable: true, priority: 2 },
  { id: "isRemote", label: "Remote", filterable: true, priority: 3 },
  { id: "isOnCall", label: "On Call", filterable: true, priority: 3 },
  { id: "workload", label: "Workload %", filterable: true, priority: 3 },
  { id: "lastSeen", label: "Last Seen", filterable: true, priority: 3 },
  { id: "l", label: "    ", filterable: false, priority: 3 },
];

const advancedFilterOptions: FilterOption[] = [
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
    id: "isRemote",
    label: "Remote",
    type: "checkbox",
  },
  {
    id: "isOnCall",
    label: "On Call",
    type: "switch",
  },
  {
    id: "lastSeen",
    label: "Last Seen",
    type: "date-range",
  },
  {
    id: "workload",
    label: "Workload %",
    type: "number-range",
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

type InventoryDashboardRow = {
  id: string;
  sku: string;
  product: string;
  stockStatus: "In Stock" | "Low Stock" | "Out of Stock";
  healthScore: number;
  trend: Array<{ label: string; value: number }>;
  updatedAt: string;
};

type ProductRow = {
  id: string;
  sku: string;
  name: string;
  category: string;
  status: string;
  warehouse: string;
  vendor: string;
  country: string;
  price: number;
  stock: number;
  reorderLevel: number;
  rating: number;
  trend: Array<{ label: string; value: number }>;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
};

const productColumns = [
  {
    id: "sku",
    label: "SKU",
    filterable: true,
    priority: 1,
    renderCell: ({ value }: { value: unknown }) => (
      <SplitChip
        leftLabel="SKU"
        rightLabel={String(value ?? "")}
        truncateRight
        rightMaxWidth="8.5rem"
      />
    ),
  },
  { id: "name", label: "Name", filterable: true, priority: 1 },
  { id: "category", label: "Category", filterable: true, priority: 1 },
  {
    id: "status",
    label: "Status",
    filterable: true,
    multiFilter: true,
    priority: 1,
    renderCell: ({ value }: { value: unknown }) => {
      const status = String(value ?? "Draft");
      const tone =
        status === "Active"
          ? "success"
          : status === "Backorder"
            ? "warning"
            : status === "Discontinued"
              ? "danger"
              : "info";

      return <StatusDotChip tone={tone} label={status} />;
    },
  },
  { id: "warehouse", label: "Warehouse", filterable: true, priority: 2 },
  { id: "vendor", label: "Vendor", filterable: true, priority: 2 },
  { id: "country", label: "Country", filterable: true, priority: 2 },
  { id: "price", label: "Price", filterable: true, priority: 2 },
  {
    id: "stock",
    label: "Stock",
    filterable: true,
    priority: 2,
    renderCell: ({ value, row }: { value: unknown; row: ProductRow }) => {
      const stockValue = typeof value === "number" ? value : 0;
      const stockPercent = Math.max(
        0,
        Math.min(100, (stockValue / Math.max(row.reorderLevel * 3, 1)) * 100),
      );
      const tone =
        stockValue <= row.reorderLevel
          ? "danger"
          : stockValue <= row.reorderLevel * 1.5
            ? "warning"
            : "success";

      return (
        <div className="ui:flex ui:items-center ui:gap-2">
          <CircularProgress
            value={stockPercent}
            max={100}
            size={22}
            strokeWidth={3}
            tone={tone}
            ariaLabel="Stock level"
          />
          <span className="ui:text-xs ui:font-medium ui:text-ds-1">
            {stockValue}
          </span>
        </div>
      );
    },
  },
  { id: "reorderLevel", label: "Reorder", filterable: true, priority: 3 },
  {
    id: "rating",
    label: "Trend",
    filterable: true,
    priority: 3,
    renderCell: ({ row }: { row: ProductRow }) => (
      <div className="ui:w-[110px]">
        <MiniNeonSparkline
          data={row.trend}
          height={30}
          showTooltip={false}
          tone="default"
        />
      </div>
    ),
  },
  { id: "isActive", label: "Active", filterable: true, priority: 3 },
  { id: "isFeatured", label: "Featured", filterable: true, priority: 3 },
  { id: "createdAt", label: "Created", filterable: true, priority: 3 },
  { id: "updatedAt", label: "Updated", filterable: true, priority: 3 },
];

const productFilterOptions: FilterOption[] = [
  { id: "name", label: "Name", type: "text", placeholder: "Search product..." },
  {
    id: "category",
    label: "Category",
    type: "select",
    options: ["Hardware", "Software", "Accessories", "Services"],
  },
  {
    id: "status",
    label: "Status",
    type: "combobox",
    multiple: true,
    options: ["Draft", "Active", "Backorder", "Discontinued"],
  },
  { id: "isActive", label: "Active", type: "checkbox" },
  { id: "isFeatured", label: "Featured", type: "switch" },
  { id: "createdAt", label: "Created at", type: "date" },
  { id: "updatedAt", label: "Updated range", type: "date-range" },
  { id: "price", label: "Price range", type: "number-range" },
  { id: "stock", label: "Stock range", type: "number-range" },
];

const allProductsData: ProductRow[] = Array.from({ length: 54 }, (_, index) => {
  const number = index + 1;
  const categories = ["Hardware", "Software", "Accessories", "Services"];
  const statuses = ["Draft", "Active", "Backorder", "Discontinued"];
  const warehouses = ["Berlin-A", "Paris-B", "Lisbon-C", "Madrid-D"];
  const vendors = ["Globex", "Initech", "Umbrella", "Stark"];
  const countries = ["DE", "FR", "PT", "ES", "NL"];

  return {
    id: `prod-${number}`,
    sku: `SKU-${String(number).padStart(4, "0")}`,
    name: `Product ${number}`,
    category: categories[index % categories.length],
    status: statuses[index % statuses.length],
    warehouse: warehouses[index % warehouses.length],
    vendor: vendors[index % vendors.length],
    country: countries[index % countries.length],
    price: 45 + (index % 12) * 17,
    stock: 12 + (index % 20) * 3,
    reorderLevel: 10 + (index % 5) * 5,
    rating: 2 + (index % 4),
    trend: [
      { label: "M", value: 18 + ((index * 3) % 30) },
      { label: "T", value: 16 + ((index * 5) % 32) },
      { label: "W", value: 20 + ((index * 4) % 28) },
      { label: "T", value: 22 + ((index * 6) % 26) },
      { label: "F", value: 19 + ((index * 7) % 31) },
    ],
    isActive: index % 3 !== 0,
    isFeatured: index % 5 === 0,
    createdAt: `2026-02-${String((index % 27) + 1).padStart(2, "0")}`,
    updatedAt: `2026-03-${String((index % 27) + 1).padStart(2, "0")}`,
  };
});

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

const inventoryDashboardRows: InventoryDashboardRow[] = [
  {
    id: "inv-1",
    sku: "ABC-001234-BL",
    product: "Wireless Sensor",
    stockStatus: "In Stock",
    healthScore: 88,
    trend: [
      { label: "M", value: 41 },
      { label: "T", value: 44 },
      { label: "W", value: 46 },
      { label: "T", value: 49 },
      { label: "F", value: 53 },
    ],
    updatedAt: "2026-03-29",
  },
  {
    id: "inv-2",
    sku: "QWE-009941-SR",
    product: "Rack Switch",
    stockStatus: "Low Stock",
    healthScore: 56,
    trend: [
      { label: "M", value: 39 },
      { label: "T", value: 33 },
      { label: "W", value: 31 },
      { label: "T", value: 28 },
      { label: "F", value: 30 },
    ],
    updatedAt: "2026-03-27",
  },
  {
    id: "inv-3",
    sku: "NXT-177777-XL",
    product: "Cooling Module",
    stockStatus: "Out of Stock",
    healthScore: 24,
    trend: [
      { label: "M", value: 27 },
      { label: "T", value: 24 },
      { label: "W", value: 20 },
      { label: "T", value: 18 },
      { label: "F", value: 16 },
    ],
    updatedAt: "2026-03-24",
  },
  {
    id: "inv-4",
    sku: "TUR-540231-PRO-LONG",
    product: "Power Relay",
    stockStatus: "In Stock",
    healthScore: 73,
    trend: [
      { label: "M", value: 37 },
      { label: "T", value: 40 },
      { label: "W", value: 42 },
      { label: "T", value: 43 },
      { label: "F", value: 45 },
    ],
    updatedAt: "2026-03-22",
  },
];

const inventoryDashboardColumns = [
  {
    id: "sku",
    label: "SKU",
    filterable: true,
    priority: 1,
    renderCell: ({ value }: { value: unknown }) => (
      <SplitChip
        leftLabel="SKU"
        rightLabel={String(value ?? "")}
        truncateRight
        rightMaxWidth="9rem"
      />
    ),
  },
  { id: "product", label: "Product", filterable: true, priority: 1 },
  {
    id: "stockStatus",
    label: "Stock",
    filterable: true,
    priority: 1,
    renderCell: ({ value }: { value: unknown }) => {
      const status = String(value ?? "In Stock");
      const tone =
        status === "In Stock"
          ? "success"
          : status === "Low Stock"
            ? "warning"
            : "danger";

      return <StatusDotChip tone={tone} label={status} />;
    },
  },
  {
    id: "healthScore",
    label: "Health",
    filterable: false,
    priority: 2,
    renderCell: ({ value }: { value: unknown }) => (
      <div className="ui:flex ui:items-center ui:gap-2">
        <CircularProgress
          value={typeof value === "number" ? value : 0}
          max={100}
          size={24}
          strokeWidth={3}
          tone={
            typeof value === "number" && value < 40
              ? "danger"
              : typeof value === "number" && value < 65
                ? "warning"
                : "success"
          }
          ariaLabel="Inventory health score"
        />
        <span className="ui:text-xs ui:font-semibold ui:text-ds-1">
          {typeof value === "number" ? `${Math.round(value)}%` : "0%"}
        </span>
      </div>
    ),
  },
  {
    id: "trend",
    label: "Trend",
    filterable: false,
    priority: 2,
    renderCell: ({ value }: { value: unknown }) => {
      const trendData = Array.isArray(value) ? value : [];
      return (
        <div className="ui:w-[120px]">
          <MiniNeonSparkline
            data={trendData}
            height={34}
            showTooltip={false}
            showArea
          />
        </div>
      );
    },
  },
  { id: "updatedAt", label: "Last Update", filterable: true, priority: 3 },
];

const inventoryDashboardFilters: FilterOption[] = [
  { id: "product", label: "Product", type: "text" },
  {
    id: "stockStatus",
    label: "Stock",
    type: "select",
    options: ["In Stock", "Low Stock", "Out of Stock"],
  },
  { id: "updatedAt", label: "Updated", type: "date-range" },
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
          <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:px-4 ui:py-3 ui:text-sm ui:text-ds-1">
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
 * ## RTL Workspace (Persian / Arabic)
 * Verifies search, sticky action column, dropdown anchoring, and pagination controls in RTL layouts.
 */
export const RtlWorkspace: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <div dir="rtl">
        <DataTable
          data={sampleData}
          columns={columns}
          pageSize={4}
          maxHeight="420px"
          searchPlaceholder="جستجو در کاربران..."
          filterOptions={filterOptions}
          labels={{
            columns: "ستون‌ها",
            showAll: "نمایش همه",
            hideAll: "پنهان‌سازی همه",
            showFilters: "فیلترها",
            addFilter: "افزودن فیلتر",
            clearFilters: "پاک کردن فیلترها",
            filterProfiles: "پروفایل فیلتر",
            saveNewFilterProfile: "ذخیره پروفایل جدید",
          }}
        />
      </div>
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
 * ## Dashboard Cells (Chips + Circular + Mini Chart)
 * Uses SplitChip, StatusDotChip, CircularProgress, and MiniNeonSparkline in compact table cells.
 */
export const DashboardCellComponents: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={inventoryDashboardRows}
        columns={inventoryDashboardColumns}
        pageSize={4}
        maxHeight="380px"
        searchPlaceholder="Search SKU or product..."
        filterOptions={inventoryDashboardFilters}
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

/**
 * ## Composable Primitives
 * Example of building your own table structure with exported primitives.
 */
export const ComposablePrimitives: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:overflow-hidden ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1">
        <Table className="ui:min-w-[520px]">
          <TableCaption className="ui:py-3 ui:text-ds-1">
            Team access overview
          </TableCaption>
          <TableHeader>
            <TableRow className="ui:border-b ui:border-ds-border-2">
              <TableHead className="ui:px-4 ui:py-3 ui:text-left">
                Name
              </TableHead>
              <TableHead className="ui:px-4 ui:py-3 ui:text-left">
                Status
              </TableHead>
              <TableHead className="ui:px-4 ui:py-3 ui:text-left">
                Role
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sampleData.slice(0, 4).map((row) => (
              <TableRow
                key={row.id}
                className="ui:border-b ui:border-ds-border-2/70 ui:transition-colors ui:hover:bg-ds-surface-3/50"
              >
                <TableCell className="ui:px-4 ui:py-3">{row.name}</TableCell>
                <TableCell className="ui:px-4 ui:py-3">{row.status}</TableCell>
                <TableCell className="ui:px-4 ui:py-3">{row.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Styled DataTable Slots
 * Shows how consumers can customize DataTable styles without changing internals.
 */
export const StyledDataTableSlots: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={sampleData}
        columns={columns}
        pageSize={5}
        caption="Security team roster"
        className="ui:rounded-2xl ui:bg-linear-to-r ui:from-slate-50 ui:to-cyan-50 ui:p-2 ui:dark:from-slate-950 ui:dark:to-cyan-950"
        tableClassName="ui:min-w-[720px]"
        headerClassName="ui:backdrop-blur-sm"
        headerRowClassName="ui:bg-cyan-50/70 ui:dark:bg-cyan-900/30"
        headClassName="ui:text-cyan-900 ui:dark:text-cyan-100"
        rowClassName="ui:hover:bg-cyan-50/70 ui:dark:hover:bg-cyan-950/50"
        cellClassName="ui:font-medium"
      />
    </StorySurface>
  ),
};

/**
 * ## All Filter Types + Extended Columns
 * Demonstrates many columns and different filter control types from the library API.
 */
export const AllFilterTypesAndExtendedColumns: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={sampleData}
        columns={advancedColumns}
        pageSize={5}
        maxHeight="430px"
        searchPlaceholder="Search by name, team, location..."
        filterOptions={advancedFilterOptions}
        renderToolbarActions={
          <>
            <ToolbarIconButton title="Import data">
              <ArrowDownIcon className="ui:h-[18px] ui:w-[18px] shrink-0" />
            </ToolbarIconButton>
            <ToolbarIconButton title="Export data">
              <ArrowUpIcon className="ui:h-[18px] ui:w-[18px] shrink-0" />
            </ToolbarIconButton>
          </>
        }
      />
    </StorySurface>
  ),
};

/**
 * ## Custom Empty State
 * Shows how an app can render custom centered content when no rows exist.
 */
export const CustomEmptyState: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={[]}
        columns={advancedColumns}
        pageSize={5}
        searchPlaceholder="Search products..."
        renderEmptyState={() => (
          <div className="ui:flex ui:flex-col ui:items-center ui:gap-3">
            <p className="ui:text-lg ui:font-semibold ui:text-neutral-900 ui:dark:text-white">
              You have no products
            </p>
            <p className="ui:text-sm ui:text-neutral-500 ui:dark:text-neutral-300">
              Add your first product to get started.
            </p>
            <Button primary size="small">
              Add product
            </Button>
          </div>
        )}
      />
    </StorySurface>
  ),
};

/**
 * ## Empty Products (Fully Custom)
 * Empty state + toolbar actions + labels + 12+ columns + mixed filter types.
 */
export const EmptyProductsWorkspace: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={[]}
        columns={productColumns}
        pageSize={10}
        maxHeight="460px"
        searchPlaceholder="Search products..."
        filterOptions={productFilterOptions}
        labels={{
          showFilters: "PRODUCT FILTERS",
          columns: "PRODUCT COLUMNS",
          showAll: "SHOW ALL",
          hideAll: "HIDE ALL",
        }}
        renderToolbarActions={
          <>
            <ToolbarIconButton title="Import products">
              <ArrowDownIcon className="ui:h-[18px] ui:w-[18px] ui:shrink-0" />
            </ToolbarIconButton>
            <ToolbarIconButton title="Export products">
              <ArrowUpIcon className="ui:h-[18px] ui:w-[18px] ui:shrink-0" />
            </ToolbarIconButton>
          </>
        }
        renderFilterRowActions={
          <Button size="small" className="ui:text-xs">
            Save view
          </Button>
        }
        renderEmptyState={() => (
          <div className="ui:flex ui:flex-col ui:items-center ui:gap-3">
            <p className="ui:text-lg ui:font-semibold ui:text-neutral-900 ui:dark:text-white">
              You have no products
            </p>
            <p className="ui:text-sm ui:text-neutral-500 ui:dark:text-neutral-300">
              Add your first product to start managing inventory.
            </p>
            <Button primary size="small">
              Add product
            </Button>
          </div>
        )}
      />
    </StorySurface>
  ),
};

function BackendPaginationStory() {
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  const pageStart = pagination.pageIndex * pagination.pageSize;
  const pageEnd = pageStart + pagination.pageSize;
  const currentPageRows = allProductsData.slice(pageStart, pageEnd);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={currentPageRows}
        columns={productColumns}
        pageSize={pagination.pageSize}
        totalCount={allProductsData.length}
        onPaginationChange={(pageIndex, pageSize) => {
          setPagination({ pageIndex, pageSize });
        }}
        searchPlaceholder="Backend-managed pagination..."
      />
    </StorySurface>
  );
}

/**
 * ## Backend Pagination
 * Pagination state managed outside the table (backend-ready mode).
 */
export const BackendManagedPagination: Story = {
  render: () => <BackendPaginationStory />,
};

/**
 * ## Custom Row Actions
 * Demonstrates custom 3-dots menu actions like copy/delete/archive.
 */
export const CustomRowActionsMenu: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable
        data={sampleData}
        columns={advancedColumns}
        pageSize={5}
        maxHeight="430px"
        searchPlaceholder="Search by name, team, location..."
        filterOptions={advancedFilterOptions}
        rowActions={[
          { id: "copy", label: "Copy row" },
          { id: "publish", label: "Publish product" },
          { id: "archive", label: "Archive" },
          { id: "delete", label: "Delete", variant: "destructive" },
        ]}
        onRowAction={(action, row) => {
          // Demo handler
          // eslint-disable-next-line no-console
          console.log("row action", action, row.id);
        }}
      />
    </StorySurface>
  ),
};

/**
 * ## Custom Row Actions (RTL Persian)
 * Custom row action labels in Persian with RTL layout and correct menu alignment.
 */
export const CustomRowActionsMenuRtlPersian: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <div dir="rtl">
        <DataTable
          data={sampleData}
          columns={advancedColumns}
          direction="rtl"
          pageSize={5}
          maxHeight="480px"
          searchPlaceholder="جستجو بر اساس نام، تیم، موقعیت..."
          filterOptions={advancedFilterOptions}
          rowActions={[
            { id: "copy", label: "کپی ردیف" },
            { id: "publish", label: "انتشار محصول" },
            { id: "archive", label: "بایگانی" },
            { id: "delete", label: "حذف", variant: "destructive" },
          ]}
          labels={{
            columns: "ستون‌ها",
            showAll: "نمایش همه",
            hideAll: "پنهان‌سازی همه",
            showFilters: "فیلترها",
            addFilter: "افزودن فیلتر",
            clearFilters: "پاک کردن فیلترها",
            filterProfiles: "پروفایل فیلتر",
            saveNewFilterProfile: "ذخیره پروفایل جدید",
          }}
          onRowAction={(action, row) => {
            // Demo handler
            // eslint-disable-next-line no-console
            console.log("row action rtl", action, row.id);
          }}
        />
      </div>
    </StorySurface>
  ),
};
