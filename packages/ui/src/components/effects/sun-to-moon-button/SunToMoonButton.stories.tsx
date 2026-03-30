import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import SunToMoonButton from './SunToMoonButton';

const meta = {
  title: 'Foundations/Theme/SunToMoonButton',
  component: SunToMoonButton,
  parameters: {
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      description: {
        component:
          'Animated theme toggle. Storybook provides ThemeProvider globally so this control behaves like the real app and can be tested in both display modes.',
      },
    },
  },
  argTypes: {
    showLabelAndImage: { control: 'boolean' },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof SunToMoonButton>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Advanced Theme Toggle
 * A beautiful animated toggle for light/dark mode.
 */
export const Default: Story = {
  args: {
    showLabelAndImage: true,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <SunToMoonButton {...args} />
    </StorySurface>
  ),
};

export const IconOnly: Story = {
  args: { showLabelAndImage: false },
};

/**
 * ## Toolbar Placement
 * Demonstrates how the control sits alongside other top-bar actions.
 */
export const ToolbarPlacement: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <div className="ui:flex ui:items-center ui:justify-between ui:rounded-xl ui:border ui:border-border ui:bg-card ui:px-4 ui:py-3">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Workspace header
          </p>
          <p className="ui:text-sm ui:text-muted-foreground">
            Theme toggle aligned with other global controls.
          </p>
        </div>
        <SunToMoonButton showLabelAndImage={false} />
      </div>
    </StorySurface>
  ),
};
