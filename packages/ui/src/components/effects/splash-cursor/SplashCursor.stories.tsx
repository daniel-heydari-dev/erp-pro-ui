import type { Meta, StoryObj } from '@storybook/react-vite';

import { Button } from '../../forms/button';
import { SplashCursor } from './SplashCursor';

const meta: Meta<typeof SplashCursor> = {
  title: 'Visuals/SplashCursor',
  component: SplashCursor,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'SplashCursor adds pointer-reactive particles inside a bounded surface. These stories cover the docs variants, a branded customization example, and a more intentional hero treatment.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['splash', 'glow', 'trail', 'ripple'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function CanvasFrame({
  children,
  className = 'ui:h-[420px]',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`ui:w-full ui:rounded-[28px] ui:p-6 ${className}`}>
      {children}
    </div>
  );
}

export const HeroInteraction: Story = {
  args: { variant: 'splash' },
  render: (args) => (
    <div className="ui:p-6">
      <CanvasFrame className="ui:bg-neutral-950">
        <SplashCursor
          {...args}
          particleCount={20}
          duration={1000}
          className="ui:h-full ui:w-full ui:overflow-hidden ui:rounded-[22px] ui:border ui:border-white/10 ui:bg-[radial-gradient(circle_at_top,_rgba(115,103,240,0.3),_rgba(10,10,10,1)_55%)]"
        >
          <div className="ui:flex ui:h-full ui:flex-col ui:items-center ui:justify-center ui:px-6 ui:text-center ui:pointer-events-none">
            <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-[0.22em] ui:text-white/55">
              Cursor-Reactive Hero
            </p>
            <h2 className="ui:mt-4 ui:text-4xl ui:font-semibold ui:text-white md:ui:text-6xl">
              Move across the surface and click to burst particles.
            </h2>
            <p className="ui:mt-4 ui:max-w-2xl ui:text-sm ui:text-white/70 md:ui:text-base">
              Useful for launch sections, immersive demos, or branded
              interaction zones where motion should stay inside a deliberate
              canvas.
            </p>
          </div>
        </SplashCursor>
      </CanvasFrame>
    </div>
  ),
};

export const VariantGallery: Story = {
  render: () => (
    <div className="ui:grid ui:gap-6 ui:p-6 md:ui:grid-cols-2">
      {[
        {
          label: 'Trail',
          hint: 'Move to leave light traces.',
          variant: 'trail' as const,
          particleCount: 20,
        },
        {
          label: 'Ripple',
          hint: 'Click to generate expanding rings.',
          variant: 'ripple' as const,
          size: 'lg' as const,
        },
        {
          label: 'Glow',
          hint: 'Soft cursor halo for premium surfaces.',
          variant: 'glow' as const,
          blur: 20,
        },
        {
          label: 'Splash',
          hint: 'Burst particles on motion and click.',
          variant: 'splash' as const,
          particleCount: 30,
          duration: 1200,
        },
      ].map((demo) => (
        <div
          key={demo.label}
          className="ui:rounded-[24px] ui:bg-background ui:p-4 ui:shadow-sm"
        >
          <p className="ui:mb-2 ui:text-sm ui:font-semibold ui:text-foreground">
            {demo.label}
          </p>
          <SplashCursor
            variant={demo.variant}
            particleCount={demo.particleCount}
            size={demo.size}
            blur={demo.blur}
            duration={demo.duration}
            className="ui:flex ui:h-[220px] ui:w-full ui:items-center ui:justify-center ui:rounded-[20px] ui:border ui:border-dashed ui:border-border ui:bg-muted/30"
          >
            <span className="ui:pointer-events-none ui:text-sm ui:text-muted-foreground">
              {demo.hint}
            </span>
          </SplashCursor>
        </div>
      ))}
    </div>
  ),
};

export const BrandCustomization: Story = {
  render: () => (
    <div className="ui:p-6">
      <CanvasFrame className="ui:bg-gradient-to-br ui:from-fuchsia-50 ui:via-white ui:to-sky-50 dark:ui:from-neutral-950 dark:ui:via-neutral-900 dark:ui:to-neutral-950">
        <SplashCursor
          color="#ff0080"
          secondaryColor="#7928ca"
          size="lg"
          particleCount={15}
          variant="trail"
          blur={6}
          className="ui:flex ui:h-full ui:w-full ui:items-center ui:justify-center ui:rounded-[22px] ui:border ui:border-border ui:bg-white/60 dark:ui:bg-neutral-950/60"
        >
          <div className="ui:pointer-events-none ui:flex ui:flex-col ui:items-center ui:gap-4 ui:text-center">
            <div className="ui:rounded-full ui:bg-background ui:px-6 ui:py-3 ui:shadow-md">
              <span className="ui:font-semibold ui:text-foreground">
                Branded particle styling
              </span>
            </div>
            <Button
              label="Primary Action"
              primary
              className="ui:pointer-events-auto"
            />
          </div>
        </SplashCursor>
      </CanvasFrame>
    </div>
  ),
};
