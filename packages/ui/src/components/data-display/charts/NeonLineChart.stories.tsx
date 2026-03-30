import type { Meta, StoryObj } from '@storybook/react-vite';

import { StoryStack, StorySurface } from '../../shared/storybook';
import { NeonLineChart } from './NeonLineChart';

const latencyData = [
  { name: 'Mon', value: 42 },
  { name: 'Tue', value: 38 },
  { name: 'Wed', value: 45 },
  { name: 'Thu', value: 34 },
  { name: 'Fri', value: 31 },
  { name: 'Sat', value: 36 },
  { name: 'Sun', value: 29 },
];

const throughputData = [
  { name: '00:00', value: 18 },
  { name: '04:00', value: 24 },
  { name: '08:00', value: 42 },
  { name: '12:00', value: 58 },
  { name: '16:00', value: 51 },
  { name: '20:00', value: 33 },
];

const retentionData = [
  { name: 'Week 1', value: 76 },
  { name: 'Week 2', value: 72 },
  { name: 'Week 3', value: 69 },
  { name: 'Week 4', value: 65 },
  { name: 'Week 5', value: 67 },
  { name: 'Week 6', value: 70 },
];

const meta: Meta<typeof NeonLineChart> = {
  title: 'Data Display/NeonLineChart',
  component: NeonLineChart,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Stylized single-series line chart for premium dashboards and visually prominent activity views.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    height: { control: 'number' },
    lineColorStop1: { control: 'color' },
    lineColorStop2: { control: 'color' },
    glowColor: { control: 'text' },
    data: { control: false, description: 'Single glowing series data.' },
    className: {
      control: false,
      description: 'Custom classes for the outer container.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultNeonStyling: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StoryStack className="ui:gap-5">
        <div className="ui:flex ui:flex-col ui:gap-4 ui:md:flex-row ui:md:items-end ui:md:justify-between">
          <div>
            <p className="ui:text-sm ui:font-semibold ui:text-foreground">
              Latency tracking with the default neon treatment
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
              The stock gradient and glow already read as a focal chart without
              extra styling work.
            </p>
          </div>
          <div className="ui:grid ui:grid-cols-3 ui:gap-3">
            {[
              { label: 'Current', value: '29 ms' },
              { label: 'Peak', value: '45 ms' },
              { label: 'Target', value: '< 35 ms' },
            ].map((metric) => (
              <div
                key={metric.label}
                className="ui:rounded-xl ui:border ui:border-border ui:bg-muted/35 ui:px-4 ui:py-3"
              >
                <p className="ui:text-[11px] ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
                  {metric.label}
                </p>
                <p className="ui:mt-2 ui:text-lg ui:font-semibold ui:text-foreground">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <NeonLineChart data={latencyData} height={340} className="ui:px-2" />
      </StoryStack>
    </StorySurface>
  ),
};

export const CustomBrandGlow: Story = {
  render: () => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-6xl"
      className="ui:border-none ui:bg-gradient-to-br ui:from-slate-950 ui:via-slate-900 ui:to-slate-950"
    >
      <StoryStack className="ui:gap-5">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-white">
            Brand-specific glow treatment
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-white/65">
            Override the gradient stops when the chart needs to align with a
            product palette or campaign frame.
          </p>
        </div>
        <NeonLineChart
          data={throughputData}
          height={340}
          lineColorStop1="#00cfe8"
          lineColorStop2="#7367f0"
          glowColor="rgba(115, 103, 240, 0.45)"
          className="ui:px-2"
        />
      </StoryStack>
    </StorySurface>
  ),
};

export const CompactActivityWidget: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-5 ui:md:grid-cols-[0.8fr_1.2fr]">
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-muted/35 ui:p-5">
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Retention health
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            A tighter chart can still keep the neon treatment when used in KPI
            side panels.
          </p>
          <div className="ui:mt-6 ui:space-y-4">
            {[
              { label: '6-week average', value: '69.8%' },
              { label: 'Best week', value: '76%' },
              { label: 'Trend', value: '+5 pts recovery' },
            ].map((item) => (
              <div key={item.label}>
                <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
                  {item.label}
                </p>
                <p className="ui:mt-1 ui:text-xl ui:font-semibold ui:text-foreground">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-background ui:p-3">
          <NeonLineChart
            data={retentionData}
            height={280}
            lineColorStop1="#14b8a6"
            lineColorStop2="#22c55e"
            glowColor="rgba(20, 184, 166, 0.35)"
            className="ui:px-1"
          />
        </div>
      </div>
    </StorySurface>
  ),
};
