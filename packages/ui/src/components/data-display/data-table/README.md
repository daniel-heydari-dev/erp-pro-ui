# DataTable Component

A powerful, flexible data table component with built-in filtering, search, pagination, and column management.

## Installation

```bash
pnpm add design-system.lib
# or
npm install design-system.lib
# or
yarn add design-system.lib
```

## Quick Start

```tsx
import { DataTable } from "design-system.lib";
import "design-system.lib/styles.css";

function MyComponent() {
  const columns = [
    { id: "name", label: "Name", visible: true, filterable: true },
    { id: "email", label: "Email", visible: true },
    { id: "status", label: "Status", visible: true, filterable: true },
  ];

  const data = [
    { name: "John Doe", email: "john@example.com", status: "Active" },
    { name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  ];

  return <DataTable columns={columns} data={data} />;
}
```

## Features

- 🔍 **Search** - Real-time search across all columns
- 🎛️ **Filters** - Dropdown filters with search capability
- 📄 **Pagination** - Configurable page size with backend-friendly pagination callbacks
- 📊 **Column Toggle** - Show/hide columns dynamically
- ⚡ **Async Support** - Server-side filtering with loading states
- 🎨 **Theming** - Full dark mode support
- 📱 **Responsive** - Works on all screen sizes

## Props

| Prop                  | Type                                            | Default        | Description                           |
| --------------------- | ----------------------------------------------- | -------------- | ------------------------------------- |
| `columns`             | `Column[]`                                      | required       | Array of column definitions           |
| `data`                | `T[]`                                           | required       | Array of data objects                 |
| `isLoading`           | `boolean`                                       | `false`        | Show loading spinner                  |
| `pageSize`            | `number`                                        | `10`           | Initial page size                     |
| `maxHeight`           | `string`                                        | `'500px'`      | Max height for the scrollable table   |
| `filterOptions`       | `FilterOption[]`                                | auto           | Custom filter options                 |
| `serverSideFiltering` | `boolean`                                       | `false`        | Enable server-side filtering mode     |
| `searchPlaceholder`   | `string`                                        | `'Search ...'` | Search input placeholder              |
| `totalCount`          | `number`                                        | -              | Total rows available from the backend |
| `onSearch`            | `(query: string) => void`                       | -              | Search callback                       |
| `onFilterChange`      | `(filters: FilterValues) => void`               | -              | Filter change callback                |
| `onFiltersApply`      | `(filters: FilterValues) => void`               | -              | Server-side filter callback           |
| `onPaginationChange`  | `(pageIndex: number, pageSize: number) => void` | -              | Backend pagination callback           |
| `onColumnToggle`      | `(columnId: string) => void`                    | -              | Column visibility callback            |
| `onExport`            | `() => void`                                    | -              | Export or refresh callback            |
| `onRowAction`         | `(action: string, row: T) => void`              | -              | Row action callback                   |

## Column Definition

```tsx
interface Column {
  id: string; // Unique identifier, matches data key
  label: string; // Display name in header
  visible?: boolean; // Show/hide column (default: true)
  filterable?: boolean; // Enable filter for this column
  multiFilter?: boolean; // Enable multi-select filter for this column
}
```

## Filter Option Definition

```tsx
interface FilterOption {
  id: string; // Filter identifier (matches column id)
  label: string; // Display label
  options?: string[]; // Static options array
  multiple?: boolean; // Enable multi-select mode
  fetchOptions?: () => Promise<string[]>; // Async options loader
  isLoading?: boolean; // Loading state (managed internally)
}
```

## Multi-Select Filters

You can enable multi-select on filters to allow users to select multiple values at once. When using multi-select, the filter will match rows that contain ANY of the selected values.

### Option 1: Using Column Definition

Set `multiFilter: true` on columns:

```tsx
const columns = [
  { id: "name", label: "Name", filterable: true },
  { id: "role", label: "Role", filterable: true, multiFilter: true }, // Multi-select
  { id: "status", label: "Status", filterable: true, multiFilter: true }, // Multi-select
];
```

### Option 2: Using Filter Options

Set `multiple: true` on filter options:

```tsx
const filterOptions: FilterOption[] = [
  {
    id: "role",
    label: "Role",
    options: ["Admin", "Editor", "Viewer"],
    multiple: true, // Multi-select enabled
  },
  {
    id: "status",
    label: "Status",
    options: ["Active", "Inactive", "Pending"],
    multiple: true, // Multi-select enabled
  },
];
```

### Filter Values with Multi-Select

When using multi-select, filter values can be arrays:

```tsx
<DataTable
  columns={columns}
  data={data}
  onFilterChange={(filters) => {
    // filters can be:
    // { role: ["Admin", "Editor"], status: ["Active"] }
    // or single values:
    // { name: "John" }
  }}
/>
```

## Examples

### 1. Basic Table with Auto-Generated Filters

Filters are automatically generated from unique column values when columns have `filterable: true`.

```tsx
import { DataTable } from "design-system.lib";
import { useState } from "react";

function UsersTable() {
  const [columns, setColumns] = useState([
    { id: "name", label: "Name", visible: true, filterable: true },
    { id: "email", label: "Email", visible: true, filterable: true },
    { id: "role", label: "Role", visible: true, filterable: true },
    { id: "status", label: "Status", visible: true, filterable: true },
  ]);

  const users = [
    {
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Editor",
      status: "Active",
    },
    {
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Viewer",
      status: "Inactive",
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={users}
      pageSize={10}
      onColumnToggle={(colId) => {
        setColumns((cols) =>
          cols.map((col) =>
            col.id === colId ? { ...col, visible: !col.visible } : col,
          ),
        );
      }}
      onRowAction={(action, row) => {
        if (action === "edit") console.log("Edit:", row);
        if (action === "delete") console.log("Delete:", row);
      }}
    />
  );
}
```

### 2. Custom Filter Options

Define your own filter options with specific values.

```tsx
import { DataTable, FilterOption } from "design-system.lib";

function OrdersTable() {
  const filterOptions: FilterOption[] = [
    {
      id: "status",
      label: "Order Status",
      options: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
    },
    {
      id: "paymentMethod",
      label: "Payment Method",
      options: ["Credit Card", "PayPal", "Bank Transfer", "Cash"],
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={orders}
      filterOptions={filterOptions}
      onFilterChange={(filters) => {
        console.log("Active filters:", filters);
        // { status: 'Pending', paymentMethod: 'Credit Card' }
      }}
    />
  );
}
```

### 3. Server-Side Filtering with Async Options

For large datasets where filtering happens on the backend.

```tsx
import { DataTable, FilterOption, FilterValues } from "design-system.lib";
import { useState } from "react";

function ServerSideTable() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  // Async filter options - loaded when dropdown opens
  const filterOptions: FilterOption[] = [
    {
      id: "role",
      label: "Role",
      options: [], // Initial empty, will be loaded
      fetchOptions: async () => {
        const response = await fetch("/api/roles");
        return response.json();
      },
    },
    {
      id: "department",
      label: "Department",
      options: [],
      fetchOptions: async () => {
        const response = await fetch("/api/departments");
        return response.json();
      },
    },
  ];

  // Handle filter application - fetch filtered data from server
  const handleFiltersApply = async (filters: FilterValues) => {
    setIsLoading(true);
    try {
      const result = await api.getUsers({ filters });
      setData(result.items);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      serverSideFiltering={true}
      filterOptions={filterOptions}
      onFiltersApply={handleFiltersApply}
    />
  );
}
```

### 4. With React Query

Best practice for production applications.

```tsx
import { DataTable, FilterOption, FilterValues } from "design-system.lib";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

function UsersTableWithReactQuery() {
  const [filters, setFilters] = useState<FilterValues>({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

  // Fetch table data with filters
  const { data, isLoading } = useQuery({
    queryKey: ["users", filters, pagination],
    queryFn: () =>
      api.getUsers({
        filters,
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      }),
  });

  // Fetch filter options (cached)
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: () => api.getRoles(),
  });

  const { data: departments } = useQuery({
    queryKey: ["departments"],
    queryFn: () => api.getDepartments(),
  });

  const filterOptions: FilterOption[] = [
    {
      id: "role",
      label: "Role",
      options: roles || [],
    },
    {
      id: "department",
      label: "Department",
      options: departments || [],
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data?.items || []}
      isLoading={isLoading}
      serverSideFiltering={true}
      filterOptions={filterOptions}
      onFiltersApply={setFilters}
      pageSize={pagination.pageSize}
      totalCount={data?.totalCount}
      onPaginationChange={(pageIndex, pageSize) => {
        setPagination({ pageIndex, pageSize });
      }}
    />
  );
}
```

## Filter Icons

The table includes three filter-related icons:

1. **Funnel** (🔽) - Opens filter selector to choose which filters to show
2. **Funnel with X** (🔽✕) - Clears all active filters
3. **Person with Funnel** (👤🔽) - Save/load filter profiles

## Styling

The component uses Tailwind CSS with the `ui:` prefix. Make sure to import the styles:

```tsx
import "design-system.lib/styles.css";
```

### Dark Mode

The component automatically supports dark mode through Tailwind's dark mode classes.

## TypeScript

Full TypeScript support with generics:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

<DataTable<User>
  columns={columns}
  data={users}
  onRowAction={(action, row) => {
    // row is typed as User
    console.log(row.name);
  }}
/>;
```

## Accessibility

- Keyboard navigation support
- ARIA labels for interactive elements
- Focus management for dropdowns
- Screen reader friendly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
