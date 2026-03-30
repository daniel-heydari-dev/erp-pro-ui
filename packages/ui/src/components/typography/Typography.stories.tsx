import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StorySurface } from '../shared/storybook';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Opinionated typography primitives for headlines, body text, captions, and gradient-driven marketing emphasis.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'body1',
        'body2',
        'caption',
        'overline',
      ],
      description: 'Predefined sizing and font weight presets.',
    },
    align: {
      control: 'inline-radio',
      options: ['left', 'center', 'right', 'justify'],
      description: 'Text alignment.',
    },
    weight: {
      control: 'select',
      options: [
        'thin',
        'extralight',
        'light',
        'normal',
        'medium',
        'semibold',
        'bold',
        'extrabold',
        'black',
      ],
      description: 'Font weight overrides.',
    },
    tracking: {
      control: 'select',
      options: ['tighter', 'tight', 'normal', 'wide', 'wider', 'widest'],
      description: 'Letter spacing overrides.',
    },
    italic: {
      control: 'boolean',
      description: 'Whether to apply italic styling.',
    },
    gradient: {
      control: 'select',
      options: [
        false,
        true,
        'primary',
        'ocean',
        'sunset',
        'aurora',
        'neon',
        'forest',
        'galaxy',
      ],
      description: 'Apply a text gradient to the typography.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function HeroSpecimenExample() {
  const [sampleText, setSampleText] = useState('Build for precision.');

  return (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-6xl"
      className="ui:block ui:p-0"
    >
      <div className="ui:relative ui:flex ui:h-[30rem] ui:items-center ui:justify-center ui:overflow-hidden ui:rounded-3xl ui:bg-neutral-950 ui:px-4">
        <div
          className="ui:absolute ui:inset-0 ui:opacity-20"
          style={{
            backgroundImage:
              'radial-gradient(#ffffff 0.5px, transparent 0.5px)',
            backgroundSize: '24px 24px',
          }}
        />
        <Typography
          variant="h1"
          align="center"
          weight="black"
          tracking="tighter"
          gradient="galaxy"
          className="ui:z-10 ui:px-4 ui:text-7xl md:ui:text-9xl normal-case! not-italic!"
        >
          {sampleText}
        </Typography>
        <div className="ui:absolute ui:bottom-8 ui:left-1/2 ui:w-full ui:max-w-2xl ui:-translate-x-1/2 ui:px-4 ui:z-20">
          <div className="ui:flex ui:items-center ui:gap-4 ui:rounded-2xl ui:border ui:border-white/10 ui:bg-white/5 ui:px-6 ui:py-3 ui:backdrop-blur-xl">
            <input
              value={sampleText}
              onChange={(event) => setSampleText(event.target.value)}
              className="ui:flex-1 ui:bg-transparent ui:text-sm ui:text-white ui:outline-none ui:placeholder:text-white/30"
              placeholder="Type something..."
            />
          </div>
        </div>
      </div>
    </StorySurface>
  );
}

/**
 * ## Default
 * Basic body text.
 */
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog.',
    variant: 'body1',
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Typography {...args} />
    </StorySurface>
  ),
};

/**
 * ## Headings
 * Showcase of different heading variants.
 */
export const Headings: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:flex ui:flex-col ui:gap-4">
        <Typography variant="h1">Heading 1</Typography>
        <Typography variant="h2">Heading 2</Typography>
        <Typography variant="h3">Heading 3</Typography>
        <Typography variant="h4">Heading 4</Typography>
        <Typography variant="h5">Heading 5</Typography>
        <Typography variant="h6">Heading 6</Typography>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Body and Labels
 * Useful for paragraphs, captions, and secondary information.
 */
export const BodyAndLabels: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:flex ui:flex-col ui:gap-4">
        <Typography variant="body1">
          Body 1: Standard paragraph text.
        </Typography>
        <Typography variant="body2">Body 2: Smaller paragraph text.</Typography>
        <Typography variant="caption">
          Caption: Tiny descriptive text.
        </Typography>
        <Typography variant="overline">
          Overline: Super tiny uppercase text.
        </Typography>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Gradients
 * Typography components support applying rich text-clip gradients easily.
 */
export const Gradients: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:flex ui:flex-col ui:gap-4">
        <Typography variant="h3" gradient="primary">
          Primary Gradient
        </Typography>
        <Typography variant="h3" gradient="ocean">
          Ocean Gradient
        </Typography>
        <Typography variant="h3" gradient="sunset">
          Sunset Gradient
        </Typography>
        <Typography variant="h3" gradient="aurora">
          Aurora Gradient
        </Typography>
        <Typography variant="h3" gradient="neon">
          Neon Gradient
        </Typography>
        <Typography variant="h3" gradient="forest">
          Forest Gradient
        </Typography>
        <Typography variant="h3" gradient="galaxy">
          Galaxy Gradient
        </Typography>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Styling Options
 * Overrides for weight, alignment, and tracking.
 */
export const StylingOptions: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:flex ui:flex-col ui:gap-4">
        <Typography variant="h4" italic>
          Italic Text
        </Typography>
        <Typography variant="h4" weight="light">
          Light Weight
        </Typography>
        <Typography variant="h4" weight="black">
          Black Weight
        </Typography>
        <Typography variant="h4" tracking="widest">
          Widest Tracking
        </Typography>
        <Typography variant="h4" align="center">
          Center Aligned
        </Typography>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Hero Composition
 * A fuller composition that shows headline, support copy, and meta text working together.
 */
export const HeroComposition: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:space-y-4">
        <Typography variant="overline">ERP Pro UI</Typography>
        <Typography variant="h1" gradient="galaxy">
          Move complex operations with visual clarity.
        </Typography>
        <Typography variant="body1" className="ui:max-w-2xl">
          Combine strong type hierarchy with brand gradients to make dense
          enterprise interfaces feel deliberate instead of heavy.
        </Typography>
        <Typography variant="caption">
          Suitable for landing heroes, release pages, and internal product
          announcements.
        </Typography>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Hero Specimen
 * A richer display composition mirroring the web documentation showcase.
 */
export const HeroSpecimen: Story = {
  render: () => <HeroSpecimenExample />,
};

/**
 * ## Hierarchy Layout
 * Demonstrates headline, supporting copy, and dashboard metrics together.
 */
export const HierarchyLayout: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:grid-cols-1 ui:gap-8 md:ui:grid-cols-2">
        <div className="ui:flex ui:flex-col ui:justify-center ui:gap-6 ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
          <Typography variant="overline" className="ui:text-indigo-500">
            Case Study
          </Typography>
          <Typography variant="h2" className="normal-case! not-italic!">
            Modern Banking for Modern Teams
          </Typography>
          <Typography variant="body1">
            Building a financial platform requires trust, speed, and obsessive
            attention to detail. Strong hierarchy keeps dense information
            legible.
          </Typography>
        </div>
        <div className="ui:relative ui:overflow-hidden ui:rounded-2xl ui:bg-neutral-950 ui:p-8">
          <Typography variant="h6" gradient="primary" className="ui:mb-2">
            Admin Dashboard
          </Typography>
          <div className="ui:mt-4 ui:flex ui:flex-col ui:gap-8">
            <div>
              <Typography variant="caption" className="ui:mb-1">
                Monthly Recurring Revenue
              </Typography>
              <Typography
                variant="h1"
                className="ui:text-5xl! ui:mb-0! not-italic!"
              >
                $42,900.00
              </Typography>
            </div>
            <div className="ui:grid ui:grid-cols-2 ui:gap-4">
              <div>
                <Typography variant="caption">New Users</Typography>
                <Typography variant="h4" className="ui:mb-0!">
                  1,204
                </Typography>
              </div>
              <div>
                <Typography variant="caption">Churn Rate</Typography>
                <Typography variant="h4" className="ui:mb-0!">
                  0.8%
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    </StorySurface>
  ),
};
