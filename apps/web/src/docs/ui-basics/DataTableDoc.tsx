import { DataTable, ProgressBar, type FilterOption } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const DataTableDoc = () => {
  const sampleData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      amount: 500,
      joinedDate: "2023-01-15",
      active: true,
      tags: ["frontend", "leader"],
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
      amount: 250,
      joinedDate: "2023-02-20",
      active: false,
      tags: ["backend"],
    },
    {
      id: 3,
      name: "Bob Wilson",
      email: "bob@example.com",
      role: "Editor",
      status: "Active",
      amount: 350,
      joinedDate: "2023-03-10",
      active: true,
      tags: ["design", "frontend"],
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      role: "User",
      status: "Active",
      amount: 450,
      joinedDate: "2023-04-05",
      active: true,
      tags: ["frontend"],
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "charlie@example.com",
      role: "User",
      status: "Pending",
      amount: 150,
      joinedDate: "2023-05-12",
      active: false,
      tags: ["backend", "devops"],
    },
    {
      id: 6,
      name: "David Miller",
      email: "david@example.com",
      role: "Admin",
      status: "Active",
      amount: 750,
      joinedDate: "2023-06-18",
      active: true,
      tags: ["leader", "fullstack"],
    },
    {
      id: 7,
      name: "Eve Garden",
      email: "eve@example.com",
      role: "Editor",
      status: "Inactive",
      amount: 300,
      joinedDate: "2023-07-22",
      active: false,
      tags: ["design"],
    },
  ];

  const capacityRows = [
    {
      id: "zone-1",
      zone: "North Rack A",
      owner: "Alice Security",
      status: "Stable",
      usedUnits: 142,
      capacityPercent: 71,
    },
    {
      id: "zone-2",
      zone: "Cold Storage B",
      owner: "Fatima Supply",
      status: "Watch",
      usedUnits: 176,
      capacityPercent: 88,
    },
    {
      id: "zone-3",
      zone: "Overflow C",
      owner: "Charlie Operations",
      status: "Healthy",
      usedUnits: 96,
      capacityPercent: 48,
    },
  ];

  const columns = [
    { id: "name", label: "Name", filterable: true, priority: 1 },
    { id: "email", label: "Email", filterable: true, priority: 1 },
    {
      id: "role",
      label: "Role",
      filterable: true,
      multiFilter: true,
      priority: 2,
    },
    { id: "status", label: "Status", filterable: true, priority: 1 },
    { id: "amount", label: "Amount", filterable: false, priority: 2 },
    { id: "joinedDate", label: "Joined", filterable: false, priority: 3 },
  ];

  const filterOptions: FilterOption[] = [
    {
      id: "email",
      label: "Search Email",
      type: "text",
      placeholder: "Enter email...",
    },
    {
      id: "role",
      label: "Filter Role",
      type: "combobox",
      multiple: true,
      options: ["Admin", "User", "Editor"],
    },
    {
      id: "status",
      label: "Status",
      type: "select",
      options: ["Active", "Inactive", "Pending"],
    },
    {
      id: "joinedDate",
      label: "Joined Date",
      type: "date-range",
    },
    {
      id: "amount",
      label: "Amount Range",
      type: "number-range",
    },
    {
      id: "active",
      label: "Active Only",
      type: "switch",
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
      renderCell: ({
        value,
        row,
      }: {
        value: unknown;
        row: (typeof capacityRows)[number];
      }) => (
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

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Data Table</h1>
      <p className="docs-paragraph">
        A workspace-grade table for operational data with search, filtering,
        pagination, and responsive column management.
      </p>

      <h2 className="docs-category-subtitle">Default Workspace Table</h2>
      <p className="docs-paragraph mb-4">
        Use a wide layout when the table is the primary content on the page.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <DataTable
            data={sampleData}
            columns={columns}
            pageSize={5}
            searchPlaceholder="Search team members..."
          />
        </div>
      </div>

      <CodeBlock
        code={`<DataTable
  data={data}
  columns={columns}
  pageSize={5}
  searchPlaceholder="Search team members..."
/>`}
      />

      <h2 className="docs-category-subtitle">Advanced Filtering</h2>
      <p className="docs-paragraph mb-4">
        This example demonstrates text search, multi-select roles, dropdown
        filters, date ranges, number ranges, and boolean toggles.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <DataTable
            data={sampleData}
            columns={columns}
            filterOptions={filterOptions}
            pageSize={4}
            searchPlaceholder="Search users, roles, or statuses..."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { DataTable, type FilterOption } from 'erp-pro-ui';

const filterOptions: FilterOption[] = [
  { id: 'email', label: 'Search Email', type: 'text' },
  { id: 'role', label: 'Role', type: 'combobox', multiple: true, options: ['Admin', 'User', 'Editor'] },
  { id: 'joinedDate', label: 'Joined Date', type: 'date-range' },
  { id: 'amount', label: 'Amount Range', type: 'number-range' },
  { id: 'active', label: 'Active Only', type: 'switch' }
];

<DataTable 
  data={data} 
  columns={columns} 
  filterOptions={filterOptions} 
/>`}
      />

      <CodeBlock
        code={`// Filter configuration types:
// "text": Search field for partial matches
// "select": Classic dropdown for exact matches
// "combobox": Searchable dropdown (supports multiple: true)
// "switch" / "checkbox": Boolean toggles
// "date-range": Start and end date picker
// "number-range": Min and Max numeric inputs`}
      />

      <h2 className="docs-category-subtitle">Custom Progress Cells</h2>
      <p className="docs-paragraph mb-4">
        Use <span className="font-mono">columns[].renderCell</span> when a row
        needs richer UI than a plain value, such as a utilization meter.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <DataTable
            data={capacityRows}
            columns={capacityColumns}
            pageSize={3}
            searchPlaceholder="Search zones or owners..."
          />
        </div>
      </div>

      <CodeBlock
        code={`import { DataTable, ProgressBar } from 'erp-pro-ui';

const columns = [
  { id: 'zone', label: 'Zone' },
  {
    id: 'capacityPercent',
    label: 'Utilization',
    renderCell: ({ value, row }) => (
      <ProgressBar
        value={typeof value === 'number' ? value : 0}
        max={100}
        label={\`${"${row.usedUnits}"} units\`}
        size="sm"
      />
    ),
  },
];`}
      />

      <h2 className="docs-category-subtitle">Compact Audit Queue</h2>
      <p className="docs-paragraph mb-4">
        Reduce the height when the table sits inside a denser review screen or
        dashboard tab.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <DataTable
            data={sampleData.slice(0, 4)}
            columns={columns}
            pageSize={3}
            maxHeight="320px"
            searchPlaceholder="Search audit queue..."
          />
        </div>
      </div>

      <CodeBlock
        code={`<DataTable
  data={queueData}
  columns={columns}
  pageSize={3}
  maxHeight="320px"
  searchPlaceholder="Search audit queue..."
/>`}
      />

      <h2 className="docs-category-subtitle">Core Props</h2>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">data</td>
              <td>
                <span className="docs-prop-type">
                  Record&lt;string, unknown&gt;[]
                </span>
              </td>
              <td>-</td>
              <td>Array of row objects rendered by the table</td>
            </tr>
            <tr>
              <td className="docs-prop-name">columns</td>
              <td>
                <span className="docs-prop-type">ColumnConfig[]</span>
              </td>
              <td>-</td>
              <td>
                Column metadata including labels, priorities, and filter
                behavior
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">filterOptions</td>
              <td>
                <span className="docs-prop-type">FilterOption[]</span>
              </td>
              <td>auto-generated</td>
              <td>
                Optional custom filter controls for advanced table workflows
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">pageSize</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>10</td>
              <td>How many rows are shown per page</td>
            </tr>
            <tr>
              <td className="docs-prop-name">searchPlaceholder</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Placeholder text for the built-in search field</td>
            </tr>
            <tr>
              <td className="docs-prop-name">maxHeight</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'500px'</td>
              <td>Maximum height of the scrollable table region</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Form", route: "/ui-basics/form" }}
        next={{ label: "Loading", route: "/ui-basics/loading" }}
      />
    </section>
  );
};

export default DataTableDoc;
