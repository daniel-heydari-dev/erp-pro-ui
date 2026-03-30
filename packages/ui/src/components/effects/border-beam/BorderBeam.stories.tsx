import type { Meta, StoryObj } from '@storybook/react-vite';

import { StorySurface } from '../../shared/storybook';
import { BorderBeam } from './BorderBeam';

const meta: Meta<typeof BorderBeam> = {
  title: 'Effects/BorderBeam',
  component: BorderBeam,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Decorative animated beam that travels around a bordered container for emphasis on cards, promos, and feature callouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: { control: 'number' },
    duration: { control: 'number' },
    borderWidth: { control: 'number' },
    anchor: { control: 'number' },
    colorFrom: { control: 'color' },
    colorTo: { control: 'color' },
    delay: { control: 'number' },
    className: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const FeatureCard: Story = {
  args: {
    size: 160,
    duration: 12,
    borderWidth: 1,
    colorFrom: '#ffaa40',
    colorTo: '#9c40ff',
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:relative ui:overflow-hidden ui:rounded-3xl ui:border ui:border-white/10 ui:bg-neutral-950 ui:p-10 ui:text-white">
        <BorderBeam {...args} />
        <p className="ui:text-xs ui:uppercase ui:tracking-[0.2em] ui:text-white/50">
          Live release
        </p>
        <h3 className="ui:mt-4 ui:text-3xl ui:font-black">
          Automated branch reconciliation
        </h3>
        <p className="ui:mt-3 ui:max-w-xl ui:text-sm ui:text-white/70">
          Use BorderBeam to add subtle motion emphasis around high-priority
          cards without turning the whole surface into an animation demo.
        </p>
      </div>
    </StorySurface>
  ),
};

export const BeamVariants: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl" className="ui:block">
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-2">
        <div className="ui:relative ui:overflow-hidden ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
          <BorderBeam colorFrom="#00cfe8" colorTo="#7367f0" duration={10} />
          <p className="ui:text-sm ui:font-medium">Cool signal</p>
        </div>
        <div className="ui:relative ui:overflow-hidden ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-8">
          <BorderBeam
            colorFrom="#ff9f43"
            colorTo="#ff4c51"
            duration={8}
            size={140}
          />
          <p className="ui:text-sm ui:font-medium">Urgent highlight</p>
        </div>
      </div>
    </StorySurface>
  ),
};
