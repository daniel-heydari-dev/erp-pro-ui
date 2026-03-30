import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { AreaChart } from './AreaChart';

const financeData = [
  { name: 'Jan', revenue: 4200, expenses: 2500 },
  { name: 'Feb', revenue: 3950, expenses: 2200 },
  { name: 'Mar', revenue: 4600, expenses: 2800 },
  { name: 'Apr', revenue: 5100, expenses: 3000 },
  { name: 'May', revenue: 5450, expenses: 3250 },
  { name: 'Jun', revenue: 5900, expenses: 3480 },
  { name: 'Jul', revenue: 6400, expenses: 3700 },
];

const financeCategories = [
  { key: 'revenue', color: '#7367f0' },
  { key: 'expenses', color: '#ff4c51' },
];

const demandData = [
  { name: 'Week 1', inbound: 120, outbound: 90, returns: 22 },
  { name: 'Week 2', inbound: 148, outbound: 106, returns: 26 },
  { name: 'Week 3', inbound: 166, outbound: 124, returns: 20 },
  { name: 'Week 4', inbound: 154, outbound: 132, returns: 18 },
  { name: 'Week 5', inbound: 182, outbound: 148, returns: 24 },
];

const demandCategories = [
  { key: 'inbound', color: '#00cfe8' },
  { key: 'outbound', color: '#28c76f' },
  { key: 'returns', color: '#ff9f43' },
];

const meta: Meta<typeof AreaChart> = {
  title: 'Data Display/AreaChart',
  component: AreaChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Area chart for trend readability with extra emphasis on volume over time.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'number' },
    showGrid: { control: 'boolean' },
    data: {
      control: false,
      description: 'Timeline data with one or more numeric series.',
    },
    categories: {
      control: false,
      description: 'Series keys and their colors.',
    },
    className: {
      control: false,
      description: 'Custom classes for the outer container.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const RevenueVsExpenses: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <AreaChart
        data={financeData}
        categories={financeCategories}
        height={360}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};

export const MultiSeriesDemandTracking: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <AreaChart
        data={demandData}
        categories={demandCategories}
        height={360}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};

export const MinimalPresentation: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <AreaChart
        data={financeData}
        categories={[{ key: 'revenue', color: '#7367f0' }]}
        height={320}
        showGrid={false}
        className="ui:px-2"
      />
    </StorySurface>
  ),
};
