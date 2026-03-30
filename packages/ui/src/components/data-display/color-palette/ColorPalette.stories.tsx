import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import ColorPalette from './ColorPalette';

const meta: Meta<typeof ColorPalette> = {
  title: 'Data Display/ColorPalette',
  component: ColorPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Reference palette for the design system color tokens, gradients, and implementation examples.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    theme: { control: 'radio', options: ['light', 'dark', 'all'] },
    showGradients: { control: 'boolean' },
    showUsageExamples: { control: 'boolean' },
    groups: { control: false, description: 'Optional custom color groups.' },
    className: {
      control: false,
      description: 'Custom class for the root palette.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## System Palette
 * Shows the full theme token set.
 */
export const SystemPalette: Story = {
  args: {
    theme: 'all',
    showGradients: true,
    showUsageExamples: false,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## Implementation Guide
 * Focuses on usage guidance rather than the full palette display.
 */
export const ImplementationGuide: Story = {
  args: {
    groups: [],
    showUsageExamples: true,
    showGradients: false,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <ColorPalette {...args} />
    </StorySurface>
  ),
};

/**
 * ## Brand Override Example
 * Demonstrates replacing the defaults with custom groups.
 */
export const BrandOverrideExample: Story = {
  args: {
    groups: [
      {
        name: 'Brand Colors',
        colors: [
          { name: 'brand-pink', value: '#FF0077' },
          { name: 'brand-cyan', value: '#00E0FF' },
        ],
      },
    ],
    showGradients: false,
    showUsageExamples: false,
  },
  render: (args) => (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-4xl"
      className="ui:block ui:p-6"
    >
      <ColorPalette {...args} />
    </StorySurface>
  ),
};
