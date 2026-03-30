import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { HoverBorderGradient } from './HoverBorderGradient';

const meta: Meta<typeof HoverBorderGradient> = {
  title: 'Visuals/HoverBorderGradient',
  component: HoverBorderGradient,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Generic hoverable frame with animated gradient emphasis for buttons, cards, or stat pills.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    duration: {
      control: 'number',
      description: 'Animation duration in seconds',
    },
    clockwise: { control: 'boolean', description: 'Direction of rotation' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Interactive Border Gradient
 * A button wrapper that animates a radiant gradient along its border when idle, and highlights the entire border on hover.
 */
export const Default: Story = {
  args: {
    duration: 1,
    clockwise: true,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div
        style={
          {
            '--color-hover-gradient': 'rgba(99, 102, 241, 0.8)',
          } as React.CSSProperties
        }
      >
        <HoverBorderGradient {...args}>
          <span className="ui:font-semibold">Hover me to highlight</span>
        </HoverBorderGradient>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Action Row
 * Shows how the wrapper behaves around several small CTAs on the same surface.
 */
export const ActionRow: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        <HoverBorderGradient>
          <span className="ui:font-medium">Review order</span>
        </HoverBorderGradient>
        <HoverBorderGradient clockwise={false} duration={1.5}>
          <span className="ui:font-medium">Assign auditor</span>
        </HoverBorderGradient>
      </div>
    </StorySurface>
  ),
};
