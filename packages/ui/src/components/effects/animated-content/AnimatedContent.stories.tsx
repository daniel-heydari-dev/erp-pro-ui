import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";

import { Button } from "../../forms/button";
import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StorySurface,
} from "../../shared/storybook";
import { AnimatedContent } from "./AnimatedContent";

const comparisonPresets = [
  { preset: "fade", label: "Fade" },
  { preset: "scale", label: "Scale" },
  { preset: "slideUp", label: "Slide Up" },
  { preset: "bounce", label: "Bounce" },
  { preset: "flip", label: "Flip" },
  { preset: "zoom", label: "Zoom" },
] as const;

const staggeredMetrics = [
  { label: "New leads", value: "184" },
  { label: "Qualified", value: "72" },
  { label: "Closed", value: "29" },
] as const;

const meta: Meta<typeof AnimatedContent> = {
  title: "Visuals/AnimatedContent",
  component: AnimatedContent,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reusable entrance animation wrapper for cards, hero content, and staggered dashboards.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    preset: {
      control: "select",
      options: [
        "fade",
        "scale",
        "slideUp",
        "slideDown",
        "slideLeft",
        "slideRight",
        "elastic",
        "bounce",
        "flip",
        "zoom",
        "custom",
      ],
    },
    ease: { control: "text" },
    duration: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const animatedDefaultSource = `import { AnimatedContent } from 'erp-pro-ui';

export function DefaultAnimatedContentExample() {
  return (
    <AnimatedContent preset="slideUp" duration={0.5}>
      <div className="rounded-2xl border bg-ds-canvas p-5 shadow-lg">
        <h3 className="mb-2 text-lg font-semibold">Animated Block</h3>
        <p className="text-neutral-500">I reveal myself gracefully.</p>
      </div>
    </AnimatedContent>
  );
}`;

const animatedStaggeredSource = `import { AnimatedContent } from 'erp-pro-ui';

export function StaggeredAnimatedBlocksExample() {
  return (
    <div className="flex flex-wrap gap-4">
      {[1, 2, 3].map((index) => (
        <AnimatedContent key={index} preset="bounce" delay={index * 0.15}>
          <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-ds-accent text-2xl font-bold text-ds-on-accent shadow-lg">
            {index}
          </div>
        </AnimatedContent>
      ))}
    </div>
  );
}`;

const animatedPresetGallerySource = `import { useState } from 'react';
import { AnimatedContent, Button } from 'erp-pro-ui';

const presets = [
  { preset: 'fade', label: 'Fade' },
  { preset: 'scale', label: 'Scale' },
  { preset: 'slideUp', label: 'Slide Up' },
  { preset: 'bounce', label: 'Bounce' },
  { preset: 'flip', label: 'Flip' },
  { preset: 'zoom', label: 'Zoom' },
] as const;

export function AnimatedPresetGalleryExample() {
  const [instanceKey, setInstanceKey] = useState(0);

  return (
    <div className="space-y-5">
      <Button label="Replay Animations" onClick={() => setInstanceKey((current) => current + 1)} />
      <div key={instanceKey} className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {presets.map((item, index) => (
          <AnimatedContent key={item.label} preset={item.preset} delay={index * 0.12} duration={0.8}>
            <div className="flex min-h-32 flex-col items-center justify-center rounded-2xl border bg-ds-canvas p-5 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-ds-accent-subtle text-sm font-bold text-ds-1">{item.label}</div>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </div>
  );
}`;

const animatedEasingSource = `import { useState } from 'react';
import { AnimatedContent, Button } from 'erp-pro-ui';

export function AnimatedEasingExample() {
  const [instanceKey, setInstanceKey] = useState(0);

  return (
    <div className="space-y-5">
      <Button label="Replay Curves" onClick={() => setInstanceKey((current) => current + 1)} />
      <div key={instanceKey} className="flex flex-wrap gap-6">
        <AnimatedContent preset="slideRight" ease="backOut" duration={1}><div className="rounded-2xl border px-6 py-4 font-semibold">Back Out</div></AnimatedContent>
        <AnimatedContent preset="slideRight" ease="anticipate" duration={1} delay={0.2}><div className="rounded-2xl border px-6 py-4 font-semibold">Anticipate</div></AnimatedContent>
      </div>
    </div>
  );
}`;

const animatedBoardSource = `import { AnimatedContent } from 'erp-pro-ui';

const metrics = [
  { label: 'New leads', value: '184' },
  { label: 'Qualified', value: '72' },
  { label: 'Closed', value: '29' },
];

export function AnimatedMetricsBoardExample() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {metrics.map((card, index) => (
        <AnimatedContent key={card.label} preset="slideUp" delay={index * 0.14}>
          <div className="rounded-2xl border p-5">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-ds-2">{card.label}</p>
            <p className="mt-3 text-3xl font-semibold text-ds-1">{card.value}</p>
          </div>
        </AnimatedContent>
      ))}
    </div>
  );
}`;

export const Default: Story = {
  args: {
    preset: "slideUp",
    duration: 0.5,
  },
  render: (args: ComponentProps<typeof AnimatedContent>) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <AnimatedContent {...args}>
        <StoryPanel className="ui:shadow-lg">
          <h3 className="ui:mb-2 ui:text-lg ui:font-semibold">
            Animated Block
          </h3>
          <p className="ui:text-neutral-500">I reveal myself gracefully.</p>
        </StoryPanel>
      </AnimatedContent>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: animatedDefaultSource } } },
};

export const Staggered: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        {[1, 2, 3].map((i) => (
          <AnimatedContent key={i} preset="bounce" delay={i * 0.15}>
            <div className="ui:flex ui:h-24 ui:w-24 ui:items-center ui:justify-center ui:rounded-xl ui:bg-ds-accent ui:text-2xl ui:font-bold ui:text-ds-on-accent ui:shadow-lg">
              {i}
            </div>
          </AnimatedContent>
        ))}
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: animatedStaggeredSource } } },
};

export const PresetGallery: Story = {
  render: () => {
    const [instanceKey, setInstanceKey] = useState(0);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
        <StorySection className="ui:space-y-5">
          <div className="ui:flex ui:flex-col ui:gap-3 ui:md:flex-row ui:md:items-center ui:md:justify-between">
            <StoryIntro
              title="Preset comparison"
              description="Replay multiple built-in entrance styles side by side when choosing motion for a section."
            />
            <Button
              label="Replay Animations"
              onClick={() => setInstanceKey((current) => current + 1)}
            />
          </div>
          <div
            key={instanceKey}
            className="ui:grid ui:gap-4 md:ui:grid-cols-2 xl:ui:grid-cols-3"
          >
            {comparisonPresets.map((item, index) => (
              <AnimatedContent
                key={item.label}
                preset={item.preset}
                delay={index * 0.12}
                duration={0.8}
              >
                <StoryPanel className="ui:flex ui:min-h-32 ui:flex-col ui:items-center ui:justify-center ui:p-5 ui:text-center">
                  <div className="ui:flex ui:h-16 ui:w-16 ui:items-center ui:justify-center ui:rounded-xl ui:bg-ds-accent-subtle ui:text-sm ui:font-bold ui:text-ds-1">
                    {item.label}
                  </div>
                  <p className="ui:mt-3 ui:text-xs ui:text-ds-2">
                    {item.preset}
                  </p>
                </StoryPanel>
              </AnimatedContent>
            ))}
          </div>
        </StorySection>
      </StorySurface>
    );
  },
  parameters: { docs: { source: { code: animatedPresetGallerySource } } },
};

export const EasingCurves: Story = {
  render: () => {
    const [instanceKey, setInstanceKey] = useState(0);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
        <StorySection className="ui:space-y-5">
          <div className="ui:flex ui:flex-col ui:gap-3 ui:md:flex-row ui:md:items-center ui:md:justify-between">
            <StoryIntro
              title="Easing comparison"
              description="Easing changes the personality of the same preset without changing layout."
            />
            <Button
              label="Replay Curves"
              onClick={() => setInstanceKey((current) => current + 1)}
            />
          </div>
          <div key={instanceKey} className="ui:flex ui:flex-wrap ui:gap-6">
            <AnimatedContent preset="slideRight" ease="backOut" duration={1}>
              <StoryPanel className="ui:px-6 ui:py-4 ui:font-semibold ui:text-ds-1">
                Back Out
              </StoryPanel>
            </AnimatedContent>
            <AnimatedContent
              preset="slideRight"
              ease="anticipate"
              duration={1}
              delay={0.2}
            >
              <StoryPanel className="ui:px-6 ui:py-4 ui:font-semibold ui:text-ds-1">
                Anticipate
              </StoryPanel>
            </AnimatedContent>
          </div>
        </StorySection>
      </StorySurface>
    );
  },
  parameters: { docs: { source: { code: animatedEasingSource } } },
};

export const StaggeredBoard: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
        {staggeredMetrics.map((card, index) => (
          <AnimatedContent
            key={card.label}
            preset="slideUp"
            delay={index * 0.14}
          >
            <StoryPanel className="ui:rounded-2xl ui:p-5">
              <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
                {card.label}
              </p>
              <p className="ui:mt-3 ui:text-3xl ui:font-semibold ui:text-ds-1">
                {card.value}
              </p>
            </StoryPanel>
          </AnimatedContent>
        ))}
      </div>
    </StorySurface>
  ),
  parameters: { docs: { source: { code: animatedBoardSource } } },
};
