import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';

import { StorySurface } from '../../shared/storybook';
import { AnimatedContent } from './AnimatedContent';

const meta: Meta<typeof AnimatedContent> = {
  title: 'Visuals/AnimatedContent',
  component: AnimatedContent,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Reusable entrance animation wrapper for cards, hero content, and staggered dashboards.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    preset: {
      control: 'select',
      options: [
        'fade',
        'scale',
        'slideUp',
        'slideDown',
        'slideLeft',
        'slideRight',
        'elastic',
        'bounce',
        'flip',
        'zoom',
        'custom',
      ],
    },
    ease: { control: 'text' },
    duration: { control: 'number' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    preset: 'slideUp',
    duration: 0.5,
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <AnimatedContent {...args}>
        <div className="ui:rounded-xl ui:border ui:border-border ui:bg-card ui:p-6 ui:text-card-foreground ui:shadow-lg">
          <h3 className="ui:mb-2 ui:text-lg ui:font-semibold">
            Animated Block
          </h3>
          <p className="ui:text-neutral-500">I reveal myself gracefully.</p>
        </div>
      </AnimatedContent>
    </StorySurface>
  ),
};

export const Staggered: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        {[1, 2, 3].map((i) => (
          <AnimatedContent key={i} preset="bounce" delay={i * 0.15}>
            <div className="ui:flex ui:h-24 ui:w-24 ui:items-center ui:justify-center ui:rounded-xl ui:bg-primary ui:text-2xl ui:font-bold ui:text-white ui:shadow-lg">
              {i}
            </div>
          </AnimatedContent>
        ))}
      </div>
    </StorySurface>
  ),
};

export const PresetGallery: Story = {
  render: () => {
    const [instanceKey, setInstanceKey] = useState(0);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
        <div className="ui:space-y-5">
          <div className="ui:flex ui:flex-col ui:gap-3 ui:md:flex-row ui:md:items-center ui:md:justify-between">
            <div>
              <p className="ui:text-sm ui:font-semibold ui:text-foreground">
                Preset comparison
              </p>
              <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
                Replay multiple built-in entrance styles side by side when choosing motion for a section.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInstanceKey((current) => current + 1)}
              className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:px-4 ui:py-2 ui:text-sm ui:font-medium ui:text-foreground"
            >
              Replay Animations
            </button>
          </div>
          <div key={instanceKey} className="ui:grid ui:gap-4 md:ui:grid-cols-2 xl:ui:grid-cols-3">
        {[
          { preset: 'fade', label: 'Fade' },
          { preset: 'scale', label: 'Scale' },
          { preset: 'slideUp', label: 'Slide Up' },
          { preset: 'bounce', label: 'Bounce' },
          { preset: 'flip', label: 'Flip' },
          { preset: 'zoom', label: 'Zoom' },
        ].map((item, index) => (
          <AnimatedContent
            key={item.label}
            preset={
              item.preset as
                | 'fade'
                | 'scale'
                | 'slideUp'
                | 'bounce'
                | 'flip'
                | 'zoom'
            }
            delay={index * 0.12}
            duration={0.8}
          >
            <div className="ui:flex ui:min-h-32 ui:flex-col ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-border ui:bg-card ui:p-5 ui:text-center ui:shadow-sm">
              <div className="ui:flex ui:h-16 ui:w-16 ui:items-center ui:justify-center ui:rounded-xl ui:bg-primary/10 ui:text-sm ui:font-bold ui:text-primary">
                {item.label}
              </div>
              <p className="ui:mt-3 ui:text-xs ui:text-muted-foreground">{item.preset}</p>
            </div>
          </AnimatedContent>
        ))}
          </div>
        </div>
      </StorySurface>
    );
  },
};

export const EasingCurves: Story = {
  render: () => {
    const [instanceKey, setInstanceKey] = useState(0);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
        <div className="ui:space-y-5">
          <div className="ui:flex ui:flex-col ui:gap-3 ui:md:flex-row ui:md:items-center ui:md:justify-between">
            <div>
              <p className="ui:text-sm ui:font-semibold ui:text-foreground">
                Easing comparison
              </p>
              <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
                Easing changes the personality of the same preset without changing layout.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setInstanceKey((current) => current + 1)}
              className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:px-4 ui:py-2 ui:text-sm ui:font-medium ui:text-foreground"
            >
              Replay Curves
            </button>
          </div>
          <div key={instanceKey} className="ui:flex ui:flex-wrap ui:gap-6">
            <AnimatedContent preset="slideRight" ease="backOut" duration={1}>
              <div className="ui:rounded-xl ui:border ui:border-border ui:bg-card ui:px-6 ui:py-4 ui:font-semibold ui:text-foreground ui:shadow-sm">
                Back Out
              </div>
            </AnimatedContent>
            <AnimatedContent preset="slideRight" ease="anticipate" duration={1} delay={0.2}>
              <div className="ui:rounded-xl ui:border ui:border-border ui:bg-card ui:px-6 ui:py-4 ui:font-semibold ui:text-foreground ui:shadow-sm">
                Anticipate
              </div>
            </AnimatedContent>
          </div>
        </div>
      </StorySurface>
    );
  },
};

export const StaggeredBoard: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
        {[
          { label: 'New leads', value: '184' },
          { label: 'Qualified', value: '72' },
          { label: 'Closed', value: '29' },
        ].map((card, index) => (
          <AnimatedContent key={card.label} preset="slideUp" delay={index * 0.14}>
            <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-5 ui:shadow-sm">
              <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
                {card.label}
              </p>
              <p className="ui:mt-3 ui:text-3xl ui:font-semibold ui:text-foreground">
                {card.value}
              </p>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </StorySurface>
  ),
};
