import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StorySurface,
} from "../../shared/storybook";
import {
  Skeleton,
  SkeletonCard,
  SkeletonListItem,
  SkeletonMetricCard,
  SkeletonTableRow,
} from "./Skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "Data Display/Skeleton",
  component: Skeleton,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Skeleton placeholders preserve layout while real content is loading across cards, lists, tables, and profile blocks.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["text", "circular", "rectangular", "rounded"],
    },
    animation: {
      control: "select",
      options: ["pulse", "wave", "none"],
    },
    tone: {
      control: "select",
      options: [
        "default",
        "subtle",
        "accent",
        "success",
        "warning",
        "danger",
        "info",
      ],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    speed: {
      control: "select",
      options: ["slow", "normal", "fast"],
    },
    width: { control: "number" },
    height: { control: "number" },
  },
  args: {
    animation: "wave",
    tone: "accent",
    radius: "md",
    lines: 3,
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Basic Blocks
 * Build out your own loading layouts block by block.
 */
export const Default: Story = {
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <StorySection>
        <StoryIntro
          title="Theme-aware building block"
          description="Tune the tone, radius, and speed to match the content surface instead of showing the same neutral block everywhere."
        />
        <StoryPanel className="ui:w-full ui:max-w-3xl">
          <Skeleton
            {...args}
            width="100%"
            height={14}
            lineGap={12}
            lastLineWidth="58%"
          />
        </StoryPanel>
      </StorySection>
    </StorySurface>
  ),
};

/**
 * ## Prefabricated Card
 * Easily render skeleton cards while waiting for rich media.
 */
export const ToneMatrix: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:w-full ui:gap-4 md:ui:grid-cols-2 xl:ui:grid-cols-4">
        {[
          {
            label: "Default",
            tone: "default" as const,
            speed: "normal" as const,
          },
          { label: "Accent", tone: "accent" as const, speed: "fast" as const },
          {
            label: "Success",
            tone: "success" as const,
            speed: "normal" as const,
          },
          { label: "Info", tone: "info" as const, speed: "slow" as const },
        ].map((item) => (
          <StoryPanel key={item.label} className="ui:space-y-4 ui:rounded-md">
            <StoryIntro
              title={item.label}
              description={`Wave animation with ${item.speed} timing.`}
            />
            <Skeleton
              tone={item.tone}
              animation="wave"
              width="38%"
              height={12}
            />
            <Skeleton
              tone={item.tone}
              animation="wave"
              width="64%"
              height={28}
            />
            <Skeleton
              tone={item.tone}
              animation="wave"
              lines={3}
              height={12}
              lineGap={10}
              speed={item.speed}
              lastLineWidth="48%"
            />
          </StoryPanel>
        ))}
      </div>
    </StorySurface>
  ),
};

/**
 * ## Light And Dark Modes
 * Validate the same skeleton presets against both token modes without changing the component API.
 */
export const LightAndDarkModes: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:gap-4 lg:ui:grid-cols-2">
        {(
          [
            { mode: "light", label: "Light mode" },
            { mode: "dark", label: "Dark mode" },
          ] as const
        ).map((item) => (
          <section
            key={item.mode}
            data-mode={item.mode}
            className="ui:rounded-md ui:border ui:border-border ui:bg-canvas ui:p-4 ui:shadow-sm"
          >
            <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
              <StoryIntro
                title={item.label}
                description="Shared semantic tokens drive the skeleton fill and shimmer in both modes."
              />
              <span className="ui:rounded-full ui:bg-accent-subtle ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:text-accent">
                {item.mode}
              </span>
            </div>

            <div className="ui:space-y-4">
              <div className="ui:grid ui:gap-4 md:ui:grid-cols-2">
                <SkeletonMetricCard tone="accent" />
                <SkeletonMetricCard tone="info" showTrend={false} />
              </div>

              <StoryPanel className="ui:rounded-md ui:space-y-4 ui:p-4">
                <Skeleton
                  lines={4}
                  height={12}
                  lineGap={10}
                  lastLineWidth="56%"
                  tone="subtle"
                  animation="wave"
                />
                <SkeletonListItem animation="wave" showAction tone="accent" />
              </StoryPanel>
            </div>
          </section>
        ))}
      </div>
    </StorySurface>
  ),
};

/**
 * ## Prefabricated List
 * Easily render skeleton lists while waiting for arrays to fetch.
 */
export const DashboardPreview: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-7xl">
      <div className="ui:grid ui:w-full ui:gap-4 xl:ui:grid-cols-[1.35fr_0.95fr]">
        <div className="ui:space-y-4">
          <div className="ui:grid ui:gap-4 md:ui:grid-cols-3">
            <SkeletonMetricCard />
            <SkeletonMetricCard tone="success" />
            <SkeletonMetricCard tone="info" showTrend={false} />
          </div>

          <StoryPanel className="ui:rounded-md ui:p-4">
            <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
              <Skeleton width="26%" height={18} tone="subtle" />
              <Skeleton width={120} height={36} radius="md" tone="accent" />
            </div>
            {Array.from({ length: 5 }).map((_, index) => (
              <SkeletonTableRow
                key={index}
                columns={5}
                animation="wave"
                className="ui:border-b ui:border-border last:ui:border-b-0"
              />
            ))}
          </StoryPanel>
        </div>

        <div className="ui:space-y-4">
          <SkeletonCard showAvatar showActions animation="wave" tone="accent" />
          <StoryPanel className="ui:rounded-md ui:space-y-4 ui:p-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <SkeletonListItem
                key={index}
                animation="wave"
                showAction
                tone="subtle"
              />
            ))}
          </StoryPanel>
        </div>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Content Presets
 * Use the ready-made presets when you want modern loading states without rebuilding the layout each time.
 */
export const PrefabricatedComponents: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:gap-4 lg:ui:grid-cols-3">
        <SkeletonMetricCard className="ui:h-full" />
        <SkeletonCard
          showAvatar
          showActions
          animation="wave"
          tone="default"
          className="ui:h-full"
        />
        <StoryPanel className="ui:rounded-md ui:p-4">
          <div className="ui:space-y-4">
            <SkeletonListItem animation="wave" tone="subtle" />
            <SkeletonListItem animation="wave" tone="subtle" />
            <SkeletonListItem
              animation="wave"
              showSecondaryText={false}
              showAction
              tone="accent"
            />
          </div>
        </StoryPanel>
      </div>
    </StorySurface>
  ),
};
