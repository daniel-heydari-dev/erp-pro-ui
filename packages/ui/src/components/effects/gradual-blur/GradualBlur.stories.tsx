import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../../forms/button";
import { StorySurface } from "../../shared/storybook";
import { GradualBlur } from "./GradualBlur";

const meta: Meta<typeof GradualBlur> = {
  title: "Visuals/GradualBlur",
  component: GradualBlur,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Blur-and-reveal motion wrapper for hero copy, feature panels, and staged content sections.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["none", "top", "bottom", "left", "right"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const scrollRevealSource = `import { GradualBlur } from 'erp-pro-ui';

export function ScrollRevealBlurExample() {
  return (
    <GradualBlur blur={12} duration={1} className="max-w-sm rounded-2xl border bg-background p-8 text-center shadow-xl">
      <h3 className="text-2xl font-bold text-foreground">Revealed Content</h3>
      <p className="mt-2 text-sm text-muted-foreground">This card clears from blur as it enters view.</p>
    </GradualBlur>
  );
}`;

const directionalBlurSource = `import { GradualBlur } from 'erp-pro-ui';

export function DirectionalBlurGalleryExample() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <GradualBlur direction="top" distance={40} delay={0.1}><div className="rounded-2xl border p-6">Up</div></GradualBlur>
      <GradualBlur direction="bottom" distance={40} delay={0.2}><div className="rounded-2xl border p-6">Down</div></GradualBlur>
      <GradualBlur direction="left" distance={40} delay={0.3}><div className="rounded-2xl border p-6">Left</div></GradualBlur>
      <GradualBlur direction="right" distance={40} delay={0.4}><div className="rounded-2xl border p-6">Right</div></GradualBlur>
    </div>
  );
}`;

const manualBlurSource = `import { useState } from 'react';
import { Button, GradualBlur } from 'erp-pro-ui';

export function ManualBlurTriggerExample() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center gap-6">
      <Button primary onClick={() => setVisible((current) => !current)}>
        {visible ? 'Hide' : 'Show'} Component
      </Button>
      <GradualBlur triggerOnView={false} visible={visible} blur={20} duration={0.8}>
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-6 py-5 text-center text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          Manually Triggered
        </div>
      </GradualBlur>
    </div>
  );
}`;

export const ScrollReveal: Story = {
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:space-y-4">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Viewport-triggered reveal
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            This mirrors the docs scroll behavior inside a bounded container so
            the effect can be tested directly in Storybook.
          </p>
        </div>
        <div className="ui:flex ui:h-[400px] ui:items-center ui:justify-center ui:overflow-y-auto ui:rounded-2xl ui:bg-muted/40 ui:p-6">
          <div className="ui:flex ui:min-h-[800px] ui:w-full ui:flex-col ui:items-center ui:justify-center ui:gap-20">
            <div className="ui:text-sm ui:italic ui:text-muted-foreground">
              Scroll down inside this panel to trigger the reveal
            </div>
            <GradualBlur
              {...args}
              blur={12}
              duration={1}
              className="ui:max-w-sm ui:rounded-2xl ui:border ui:border-border ui:bg-background ui:p-8 ui:text-center ui:shadow-xl"
            >
              <h3 className="ui:text-2xl ui:font-bold ui:text-foreground">
                Revealed Content
              </h3>
              <p className="ui:mt-2 ui:text-sm ui:text-muted-foreground">
                This card clears from blur as it enters view, which works well
                for product sections and editorial blocks.
              </p>
            </GradualBlur>
          </div>
        </div>
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: scrollRevealSource } } },
};

export const DirectionalGallery: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:space-y-4">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Directional reveal comparisons
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Combine blur with movement to stage feature tiles, metric
            highlights, or onboarding steps.
          </p>
        </div>
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-2 xl:ui:grid-cols-4">
          {[
            {
              direction: "top",
              label: "Up",
              accent:
                "ui:border-blue-500/20 ui:bg-blue-500/10 ui:text-blue-600 dark:ui:text-blue-400",
              arrow: "↑",
            },
            {
              direction: "bottom",
              label: "Down",
              accent:
                "ui:border-purple-500/20 ui:bg-purple-500/10 ui:text-purple-600 dark:ui:text-purple-400",
              arrow: "↓",
            },
            {
              direction: "left",
              label: "Left",
              accent:
                "ui:border-emerald-500/20 ui:bg-emerald-500/10 ui:text-emerald-600 dark:ui:text-emerald-400",
              arrow: "←",
            },
            {
              direction: "right",
              label: "Right",
              accent:
                "ui:border-amber-500/20 ui:bg-amber-500/10 ui:text-amber-600 dark:ui:text-amber-400",
              arrow: "→",
            },
          ].map((item, index) => (
            <GradualBlur
              key={item.label}
              direction={item.direction as "top" | "left" | "right" | "bottom"}
              distance={40}
              delay={0.1 + index * 0.1}
            >
              <div
                className={`ui:flex ui:h-32 ui:flex-col ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:shadow-sm ${item.accent}`}
              >
                <span className="ui:text-3xl ui:font-semibold">
                  {item.arrow}
                </span>
                <span className="ui:mt-2 ui:text-xs ui:font-bold ui:uppercase ui:tracking-[0.18em]">
                  {item.label}
                </span>
              </div>
            </GradualBlur>
          ))}
        </div>
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: directionalBlurSource } } },
};

export const ManualTrigger: Story = {
  render: () => {
    const [visible, setVisible] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
        <div className="ui:flex ui:min-h-[260px] ui:flex-col ui:items-center ui:justify-center ui:gap-6">
          <Button primary onClick={() => setVisible((current) => !current)}>
            {visible ? "Hide" : "Show"} Component
          </Button>

          <GradualBlur
            triggerOnView={false}
            visible={visible}
            blur={20}
            duration={0.8}
          >
            <div className="ui:rounded-xl ui:border ui:border-emerald-500/20 ui:bg-emerald-500/10 ui:px-6 ui:py-5 ui:text-center ui:text-sm ui:font-semibold ui:text-emerald-600 dark:ui:text-emerald-400">
              Manually Triggered
            </div>
          </GradualBlur>
        </div>
      </StorySurface>
    );
  },
  parameters: { docs: { source: { code: manualBlurSource } } },
};
