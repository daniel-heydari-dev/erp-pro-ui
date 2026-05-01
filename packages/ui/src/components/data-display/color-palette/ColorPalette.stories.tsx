import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import ColorPalette, {
  accentGroup,
  borderGroup,
  defaultGroups,
  statusGroup,
  surfaceGroup,
  textGroup,
  type TokenSwatch,
} from "./ColorPalette";

const meta: Meta<typeof ColorPalette> = {
  title: "Data Display/ColorPalette",
  component: ColorPalette,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Design-token color reference. All swatches resolve live CSS variables — toggle dark mode in Storybook to see both themes. Click any swatch to copy the Tailwind class.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    groups: { control: false },
    className: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// ---------------------------------------------------------------------------
// 1) Full palette
// ---------------------------------------------------------------------------

export const FullPalette: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl" className="ui:block ui:p-8">
      <div className="ui:mb-8">
        <h2 className="ui:text-2xl ui:font-bold ui:text-ds-1">Color tokens</h2>
        <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
          Semantic design tokens used across all components. Click any swatch to copy its Tailwind class.
        </p>
      </div>
      <ColorPalette groups={defaultGroups} />
    </StorySurface>
  ),
};

// ---------------------------------------------------------------------------
// 2) Design System Showcase (dashboard / market style)
// ---------------------------------------------------------------------------

function HeroSwatch({ swatch }: { swatch: TokenSwatch }) {
  return (
    <div className="ui:flex ui:flex-col ui:gap-2">
      <div
        className="ui:h-14 ui:rounded-lg ui:border ui:border-ds-border-2"
        style={{ backgroundColor: swatch.cssVar }}
      />
      <div>
        <p className="ui:text-xs ui:font-semibold ui:font-mono ui:text-ds-1">{swatch.twClass}</p>
        <p className="ui:text-[10px] ui:text-ds-3">{swatch.role}</p>
      </div>
    </div>
  );
}

function StatusPill({ swatch }: { swatch: TokenSwatch }) {
  return (
    <div
      className="ui:flex ui:items-center ui:gap-2.5 ui:rounded-lg ui:px-3 ui:py-2.5 ui:border ui:border-ds-border-2"
    >
      <span
        className="ui:h-3 ui:w-3 ui:rounded-full ui:shrink-0"
        style={{ backgroundColor: swatch.cssVar }}
      />
      <div className="ui:min-w-0">
        <p className="ui:text-xs ui:font-semibold ui:text-ds-1">{swatch.role}</p>
        <p className="ui:text-[10px] ui:font-mono ui:text-ds-3 ui:truncate">{swatch.twClass}</p>
      </div>
    </div>
  );
}

function SurfaceStack() {
  const surfaces = surfaceGroup.swatches.slice(0, 4);
  return (
    <div className="ui:relative ui:h-32">
      {surfaces.map((s, i) => (
        <div
          key={s.twClass}
          className="ui:absolute ui:rounded-xl ui:border ui:border-ds-border-2 ui:px-3 ui:py-2 ui:flex ui:items-end"
          style={{
            backgroundColor: s.cssVar,
            inset: 0,
            margin: `${i * 10}px ${i * 14}px`,
            zIndex: surfaces.length - i,
          }}
        >
          {i === 0 && (
            <span className="ui:text-[10px] ui:font-mono ui:text-ds-2">{s.twClass}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export const DesignSystemShowcase: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full" className="ui:block">
      <div className="ui:bg-ds-canvas ui:min-h-screen ui:p-6 ui:space-y-6">

        {/* Header */}
        <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-6 ui:flex ui:items-start ui:justify-between ui:gap-6">
          <div>
            <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-widest ui:text-ds-3 ui:mb-1">Design System</p>
            <h1 className="ui:text-3xl ui:font-bold ui:text-ds-1">Color Tokens</h1>
            <p className="ui:mt-1.5 ui:text-sm ui:text-ds-2 ui:max-w-md">
              Semantic palette powering every component. All values resolve live from CSS variables — switch themes to see both modes.
            </p>
          </div>
          <div
            className="ui:shrink-0 ui:h-16 ui:w-24 ui:rounded-xl ui:shadow-lg"
            style={{ background: "linear-gradient(135deg, var(--ds-color-accent), var(--ds-color-accent-hover))" }}
          />
        </div>

        {/* Surfaces + Text side by side */}
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-2">

          {/* Surfaces */}
          <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-5 ui:space-y-4">
            <div>
              <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-widest ui:text-ds-3">Surfaces</p>
              <p className="ui:text-sm ui:text-ds-2 ui:mt-0.5">Background layers in z-order</p>
            </div>
            <SurfaceStack />
            <div className="ui:grid ui:grid-cols-2 ui:gap-2 ui:pt-2">
              {surfaceGroup.swatches.map((s) => (
                <HeroSwatch key={s.twClass} swatch={s} />
              ))}
            </div>
          </div>

          {/* Text + Borders */}
          <div className="ui:space-y-4">
            <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-5 ui:space-y-3">
              <div>
                <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-widest ui:text-ds-3">Text</p>
                <p className="ui:text-sm ui:text-ds-2 ui:mt-0.5">Foreground hierarchy</p>
              </div>
              <div className="ui:space-y-2">
                {textGroup.swatches.map((s) => (
                  <div key={s.twClass} className="ui:flex ui:items-center ui:gap-3">
                    <span className="ui:font-semibold ui:text-base" style={{ color: s.cssVar }}>Aa</span>
                    <div>
                      <p className="ui:text-xs ui:font-mono ui:font-semibold ui:text-ds-1">{s.twClass}</p>
                      <p className="ui:text-[10px] ui:text-ds-3">{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-5 ui:space-y-3">
              <div>
                <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-widest ui:text-ds-3">Borders</p>
                <p className="ui:text-sm ui:text-ds-2 ui:mt-0.5">Separator scale</p>
              </div>
              <div className="ui:space-y-2">
                {borderGroup.swatches.map((s) => (
                  <div key={s.twClass} className="ui:flex ui:items-center ui:gap-3">
                    <div className="ui:h-4 ui:w-8 ui:shrink-0 ui:rounded ui:border-2" style={{ borderColor: s.cssVar }} />
                    <div>
                      <p className="ui:text-xs ui:font-mono ui:font-semibold ui:text-ds-1">{s.twClass}</p>
                      <p className="ui:text-[10px] ui:text-ds-3">{s.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Accent + Status side by side */}
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-2">

          {/* Accent */}
          <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-5 ui:space-y-4">
            <div>
              <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-widest ui:text-ds-3">Accent</p>
              <p className="ui:text-sm ui:text-ds-2 ui:mt-0.5">Brand & interactive color</p>
            </div>
            <div
              className="ui:h-20 ui:rounded-xl ui:flex ui:items-center ui:justify-center ui:text-sm ui:font-semibold ui:text-ds-on-accent ui:shadow-md"
              style={{ background: "linear-gradient(135deg, var(--ds-color-accent) 0%, var(--ds-color-accent-hover) 100%)" }}
            >
              bg-ds-accent
            </div>
            <div className="ui:grid ui:grid-cols-3 ui:gap-2">
              {accentGroup.swatches.map((s) => (
                <HeroSwatch key={s.twClass} swatch={s} />
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-5 ui:space-y-4">
            <div>
              <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-widest ui:text-ds-3">Status</p>
              <p className="ui:text-sm ui:text-ds-2 ui:mt-0.5">Semantic feedback colors</p>
            </div>
            <div className="ui:grid ui:grid-cols-2 ui:gap-2">
              {statusGroup.swatches.map((s) => (
                <StatusPill key={s.twClass} swatch={s} />
              ))}
            </div>
            <div className="ui:grid ui:grid-cols-2 ui:gap-2">
              {statusGroup.swatches.map((s) => (
                <div key={s.twClass} className="ui:h-8 ui:rounded-lg" style={{ backgroundColor: s.cssVar }} />
              ))}
            </div>
          </div>
        </div>

      </div>
    </StorySurface>
  ),
};
