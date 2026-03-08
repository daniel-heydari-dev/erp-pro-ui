import { DataTable, type FilterOption } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const DataTableDoc = () => {
  const sampleData = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', amount: 500, joinedDate: '2023-01-15', active: true, tags: ['frontend', 'leader'] },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'Inactive', amount: 250, joinedDate: '2023-02-20', active: false, tags: ['backend'] },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com', role: 'Editor', status: 'Active', amount: 350, joinedDate: '2023-03-10', active: true, tags: ['design', 'frontend'] },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'User', status: 'Active', amount: 450, joinedDate: '2023-04-05', active: true, tags: ['frontend'] },
    { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', role: 'User', status: 'Pending', amount: 150, joinedDate: '2023-05-12', active: false, tags: ['backend', 'devops'] },
    { id: 6, name: 'David Miller', email: 'david@example.com', role: 'Admin', status: 'Active', amount: 750, joinedDate: '2023-06-18', active: true, tags: ['leader', 'fullstack'] },
    { id: 7, name: 'Eve Garden', email: 'eve@example.com', role: 'Editor', status: 'Inactive', amount: 300, joinedDate: '2023-07-22', active: false, tags: ['design'] },
  ];

  const columns = [
    { id: 'name', label: 'Name' },
    { id: 'email', label: 'Email' },
    { id: 'role', label: 'Role' },
    { id: 'status', label: 'Status' },
    { id: 'amount', label: 'Amount' },
    { id: 'joinedDate', label: 'Joined' },
  ];

  const filterOptions: FilterOption[] = [
    {
      id: 'email',
      label: 'Search Email',
      type: 'text',
      placeholder: 'Enter email...'
    },
    {
      id: 'role',
      label: 'Filter Role',
      type: 'combobox',
      multiple: true,
      options: ['Admin', 'User', 'Editor']
    },
    {
      id: 'status',
      label: 'Status',
      type: 'select',
      options: ['Active', 'Inactive', 'Pending']
    },
    {
      id: 'joinedDate',
      label: 'Joined Date',
      type: 'date-range'
    },
    {
      id: 'amount',
      label: 'Amount Range',
      type: 'number-range'
    },
    {
      id: 'active',
      label: 'Active Only',
      type: 'switch'
    }
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Data Table</h1>
      <p className="docs-paragraph">
        A powerful component for displaying tabular data with support for custom rendering, sorting, and advanced filtering with project components.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Advanced Filtering</h2>
      <p className="docs-paragraph mb-4">
        This example demonstrates various filter types including partial text search, multi-select, dropdowns, date ranges, and numeric ranges.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full overflow-hidden rounded-xl border border-neutral-200 dark:border-neutral-800">
          <DataTable
            data={sampleData}
            columns={columns}
            filterOptions={filterOptions}
          />
        </div>
      </div>

      <CodeBlock code={`import { DataTable, type FilterOption } from 'erp-pro-ui';

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
/>`} />

      <CodeBlock code={`// Filter configuration types:
// "text": Search field for partial matches
// "select": Classic dropdown for exact matches
// "combobox": Searchable dropdown (supports multiple: true)
// "switch" / "checkbox": Boolean toggles
// "date-range": Start and end date picker
// "number-range": Min and Max numeric inputs`} />

      <DocsButtonBar
        prev={{ label: 'Form', route: '/ui-basics/form' }}
        next={{ label: 'Loading', route: '/ui-basics/loading' }}
      />
    </section>
  );
};

export default DataTableDoc;
