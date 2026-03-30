import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { ChromaGrid } from './ChromaGrid';

const launchItems = [
  {
    id: 'design-system',
    title: 'Design',
    description: 'A polished surface for launch campaigns and product reveals.',
    icon: '🎨',
  },
  {
    id: 'speed',
    title: 'Performance',
    description: 'Fast transitions with minimal layout overhead.',
    icon: '⚡',
  },
  {
    id: 'security',
    title: 'Security',
    description:
      'A larger focal card for trust, compliance, or differentiators.',
    icon: '🔒',
    size: 2 as const,
  },
  {
    id: 'global',
    title: 'Global',
    description:
      'Use compact cards for supporting benefits and supporting proof points.',
    icon: '🌐',
  },
  {
    id: 'insights',
    title: 'Insights',
    description: 'Mix small and large cards without losing rhythm.',
    icon: '📈',
  },
  {
    id: 'quality',
    title: 'Quality',
    description: 'Suitable for premium feature grids and showcase sections.',
    icon: '🏆',
  },
];

const operationsItems = [
  {
    id: 'fulfillment',
    title: 'Fulfillment',
    description: '98.4% same-day dispatch',
    icon: '📦',
  },
  {
    id: 'returns',
    title: 'Returns',
    description: '7 queues cleared before noon',
    icon: '↩️',
  },
  {
    id: 'revenue',
    title: 'Revenue Ops',
    description: 'Forecast adjusted across 3 regions',
    icon: '💹',
    size: 2 as const,
  },
  {
    id: 'risk',
    title: 'Risk',
    description: 'No payment exceptions in the last hour',
    icon: '🛡️',
  },
  {
    id: 'inventory',
    title: 'Inventory',
    description: '21 replenishment alerts resolved',
    icon: '🏷️',
  },
];

const pulseItems = [
  { id: 'north', title: 'North', description: '12 campaigns live', icon: '🧭' },
  { id: 'south', title: 'South', description: '8 regional promos', icon: '📣' },
  { id: 'east', title: 'East', description: '3 launches queued', icon: '🚀' },
  { id: 'west', title: 'West', description: '9 enterprise demos', icon: '🛰️' },
];

const meta: Meta<typeof ChromaGrid> = {
  title: 'Visuals/ChromaGrid',
  component: ChromaGrid,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'ChromaGrid builds animated feature mosaics for landing pages, launch sections, and dashboard overviews. These stories cover docs-aligned gradients, glass layouts, and animation-heavy compact boards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    items: { control: false },
    style: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FeatureHighlights: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:space-y-4">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Landing-page feature mosaic
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Mirrors the docs gradient treatment with mixed card sizes and a
            clear hero card.
          </p>
        </div>
        <ChromaGrid
          items={launchItems}
          columns={3}
          variant="gradient"
          animation="wave"
          hoverEffect="lift"
          spotlight
          minHeight={170}
          gap={18}
        />
      </div>
    </StorySurface>
  ),
};

export const GlassOperationsBoard: Story = {
  render: () => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-6xl"
      className="ui:border-none ui:bg-gradient-to-br ui:from-slate-950 ui:via-slate-900 ui:to-slate-950"
    >
      <div className="ui:space-y-4">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-white">
            Glass variant for premium dashboards
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-white/65">
            Works well when the grid needs to sit on top of an existing branded
            backdrop.
          </p>
        </div>
        <ChromaGrid
          items={operationsItems}
          columns={3}
          variant="glass"
          animation="fadeIn"
          hoverEffect="tilt"
          spotlight
          minHeight={160}
          gap={20}
        />
      </div>
    </StorySurface>
  ),
};

export const PulseStatusWall: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:space-y-4">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Compact animation-led layout
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            A tighter grid with pulse entrances for campaign status, regional
            rollouts, or alert clusters.
          </p>
        </div>
        <ChromaGrid
          items={pulseItems}
          columns={4}
          variant="solid"
          animation="pulse"
          hoverEffect="glow"
          spotlight={false}
          minHeight={150}
          gap={16}
          borderRadius="2xl"
        />
      </div>
    </StorySurface>
  ),
};
