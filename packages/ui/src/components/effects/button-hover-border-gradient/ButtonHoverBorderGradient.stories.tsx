import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { ButtonHoverBorderGradient } from './ButtonHoverBorderGradient';

const meta: Meta<typeof ButtonHoverBorderGradient> = {
  title: 'Visuals/ButtonHoverBorderGradient',
  component: ButtonHoverBorderGradient,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Prebuilt CTA button with animated border emphasis for marketing or media-trigger actions.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Prefabricated Implementation
 * An implementation of HoverBorderGradient built specifically for text CTA buttons.
 */
export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div
        style={
          {
            '--color-hover-gradient': 'rgba(236, 72, 153, 0.8)',
          } as React.CSSProperties
        }
      >
        <ButtonHoverBorderGradient>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ui:w-5 ui:h-5"
          >
            <polygon points="5 3 19 12 5 21 5 3"></polygon>
          </svg>
          <span className="ui:font-bold">Play Video</span>
        </ButtonHoverBorderGradient>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Action Set
 * Useful when a page needs multiple emphasized CTAs with different visual intent.
 */
export const ActionSet: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        <div
          style={
            {
              '--color-hover-gradient': 'rgba(59, 130, 246, 0.8)',
            } as React.CSSProperties
          }
        >
          <ButtonHoverBorderGradient>
            <span className="ui:font-semibold">Watch Demo</span>
          </ButtonHoverBorderGradient>
        </div>
        <div
          style={
            {
              '--color-hover-gradient': 'rgba(16, 185, 129, 0.8)',
            } as React.CSSProperties
          }
        >
          <ButtonHoverBorderGradient>
            <span className="ui:font-semibold">Start Trial</span>
          </ButtonHoverBorderGradient>
        </div>
      </div>
    </StorySurface>
  ),
};
