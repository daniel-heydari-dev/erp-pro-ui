import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { ThinBreakdownBar } from './ThinBreakdownBar';

const infrastructureSegments = [
  { label: 'Compute', value: 45, color: '#7367f0' },
  { label: 'Database', value: 25, color: '#00cfe8' },
  { label: 'Queues', value: 15, color: '#28c76f' },
  { label: 'Storage', value: 10, color: '#ff9f43' },
  { label: 'Other', value: 5, color: '#ff4c51' },
];

const capacityRows = [
  {
    title: 'Warehouse A',
    segments: [
      { label: 'Available', value: 58, color: '#28c76f' },
      { label: 'Reserved', value: 27, color: '#7367f0' },
      { label: 'Blocked', value: 15, color: '#ff9f43' },
    ],
  },
  {
    title: 'Warehouse B',
    segments: [
      { label: 'Available', value: 36, color: '#28c76f' },
      { label: 'Reserved', value: 44, color: '#7367f0' },
      { label: 'Blocked', value: 20, color: '#ff9f43' },
    ],
  },
];

const meta: Meta<typeof ThinBreakdownBar> = {
  title: 'Data Display/ThinBreakdownBar',
  component: ThinBreakdownBar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Compact proportional indicator for showing how a total is divided across a few segments.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    showLabels: { control: 'boolean' },
    data: {
      control: false,
      description: 'Segments containing label, value, and color.',
    },
    className: {
      control: false,
      description: 'Custom classes for the outer container.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const AllocationOverview: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:w-full ui:space-y-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
        <div>
          <p className="ui:text-sm ui:font-medium">
            Infrastructure spend allocation
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Segment widths are derived from their share of the full spend
            profile.
          </p>
        </div>
        <ThinBreakdownBar data={infrastructureSegments} />
      </div>
    </StorySurface>
  ),
};

export const CompactCapacityRows: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:w-full ui:space-y-4 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
        {capacityRows.map((row) => (
          <div key={row.title} className="ui:space-y-2">
            <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
              <p className="ui:text-sm ui:font-medium">{row.title}</p>
              <p className="ui:text-xs ui:text-muted-foreground">
                Live capacity mix
              </p>
            </div>
            <ThinBreakdownBar data={row.segments} showLabels={false} />
          </div>
        ))}
      </div>
    </StorySurface>
  ),
};
