import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import DataTable, { type FilterOption } from './DataTable';

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
    id: '1',
    name: 'Alice Security',
    status: 'Active',
    role: 'Admin',
    location: 'Berlin',
    lastSeen: '2026-03-29',
  },
  {
    id: '2',
    name: 'Bob Developer',
    status: 'Inactive',
    role: 'User',
    location: 'Hamburg',
    lastSeen: '2026-03-24',
  },
  {
    id: '3',
    name: 'Charlie Operations',
    status: 'Active',
    role: 'Operator',
    location: 'Amsterdam',
    lastSeen: '2026-03-30',
  },
  {
    id: '4',
    name: 'Diana Manager',
    status: 'Active',
    role: 'Manager',
    location: 'Berlin',
    lastSeen: '2026-03-28',
  },
  {
    id: '5',
    name: 'Evan Design',
    status: 'Inactive',
    role: 'User',
    location: 'Paris',
    lastSeen: '2026-03-18',
  },
  {
    id: '6',
    name: 'Fatima Supply',
    status: 'Active',
    role: 'Analyst',
    location: 'Lisbon',
    lastSeen: '2026-03-27',
  },
];

const columns = [
  { id: 'name', label: 'Full Name', filterable: true, priority: 1 },
  { id: 'status', label: 'Status', filterable: true, priority: 1 },
  { id: 'role', label: 'Role', filterable: true, multiFilter: true, priority: 2 },
  { id: 'location', label: 'Location', filterable: true, priority: 2 },
  { id: 'lastSeen', label: 'Last Seen', filterable: false, priority: 3 },
];

const filterOptions: FilterOption[] = [
  {
    id: 'status',
    label: 'Status',
    type: 'select',
    options: ['Active', 'Inactive'],
  },
  {
    id: 'role',
    label: 'Role',
    type: 'combobox',
    multiple: true,
    options: ['Admin', 'Manager', 'Operator', 'Analyst', 'User'],
  },
  {
    id: 'location',
    label: 'Location',
    type: 'select',
    options: ['Berlin', 'Hamburg', 'Amsterdam', 'Paris', 'Lisbon'],
  },
];

const meta: Meta<typeof DataTable> = {
  title: 'Data Display/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Operational table with search, filters, pagination, and responsive column handling for back-office workflows.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default Workspace Table
 * A broad example with responsive width so the table docs feel closer to a real admin page.
 */
export const Default: Story = {
  args: {
    data: sampleData,
    columns,
    pageSize: 5,
    searchPlaceholder: 'Search team members...',
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <DataTable {...args} />
    </StorySurface>
  ),
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
