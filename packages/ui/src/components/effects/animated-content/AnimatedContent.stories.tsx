import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type ComponentProps } from "react";

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
};

export const Staggered: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        {[1, 2, 3].map((i) => (
          <AnimatedContent key={i} preset="bounce" delay={i * 0.15}>
            <div className="ui:flex ui:h-24 ui:w-24 ui:items-center ui:justify-center ui:rounded-xl ui:bg-primary-500 ui:text-2xl ui:font-bold ui:text-white ui:shadow-lg">
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
        <StorySection className="ui:space-y-5">
          <div className="ui:flex ui:flex-col ui:gap-3 ui:md:flex-row ui:md:items-center ui:md:justify-between">
            <StoryIntro
              title="Preset comparison"
              description="Replay multiple built-in entrance styles side by side when choosing motion for a section."
            />
            <button
              type="button"
              onClick={() => setInstanceKey((current) => current + 1)}
              className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:px-4 ui:py-2 ui:text-sm ui:font-medium ui:text-foreground"
            >
              Replay Animations
            </button>
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
                  <div className="ui:flex ui:h-16 ui:w-16 ui:items-center ui:justify-center ui:rounded-xl ui:bg-primary-100 ui:text-sm ui:font-bold ui:text-primary-500">
                    {item.label}
                  </div>
                  <p className="ui:mt-3 ui:text-xs ui:text-muted-foreground">
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
              <StoryPanel className="ui:px-6 ui:py-4 ui:font-semibold ui:text-foreground">
                Back Out
              </StoryPanel>
            </AnimatedContent>
            <AnimatedContent
              preset="slideRight"
              ease="anticipate"
              duration={1}
              delay={0.2}
            >
              <StoryPanel className="ui:px-6 ui:py-4 ui:font-semibold ui:text-foreground">
                Anticipate
              </StoryPanel>
            </AnimatedContent>
          </div>
        </StorySection>
      </StorySurface>
    );
  },
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
              <p className="ui:text-xs ui:font-medium ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
                {card.label}
              </p>
              <p className="ui:mt-3 ui:text-3xl ui:font-semibold ui:text-foreground">
                {card.value}
              </p>
            </StoryPanel>
          </AnimatedContent>
        ))}
      </div>
    </StorySurface>
  ),
};
