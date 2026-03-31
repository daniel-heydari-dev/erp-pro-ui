import type { Meta, StoryObj } from "@storybook/react-vite";
import { StorySurface } from "../../shared/storybook";
import { Skeleton, SkeletonCard, SkeletonListItem } from "./Skeleton";

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
    width: { control: "number" },
    height: { control: "number" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Basic Blocks
 * Build out your own loading layouts block by block.
 */
export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:w-full ui:max-w-3xl ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
        <Skeleton lines={4} height={14} lineGap={12} lastLineWidth="58%" />
      </div>
    </StorySurface>
  ),
};

/**
 * ## Prefabricated Card
 * Easily render skeleton cards while waiting for rich media.
 */
export const CardSkeleton: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:w-full ui:gap-4 lg:ui:grid-cols-2">
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <div className="ui:flex ui:items-start ui:gap-4">
            <Skeleton variant="circular" width={56} height={56} />
            <div className="ui:flex-1">
              <Skeleton width="45%" height={16} />
              <Skeleton width="68%" height={14} className="ui:mt-3" />
              <Skeleton width="85%" height={14} className="ui:mt-3" />
            </div>
          </div>
        </div>
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <Skeleton
            variant="rounded"
            width="100%"
            height={180}
            animation="wave"
          />
          <Skeleton
            width="40%"
            height={16}
            className="ui:mt-4"
            animation="wave"
          />
          <Skeleton
            lines={2}
            height={14}
            lineGap={10}
            className="ui:mt-3"
            animation="wave"
          />
        </div>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Prefabricated List
 * Easily render skeleton lists while waiting for arrays to fetch.
 */
export const ListSkeleton: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:w-full ui:overflow-hidden ui:rounded-2xl ui:border ui:border-border ui:bg-card">
        <div className="ui:grid ui:grid-cols-4 ui:gap-4 ui:border-b ui:border-border ui:px-6 ui:py-4">
          <Skeleton width="60%" height={12} />
          <Skeleton width="50%" height={12} />
          <Skeleton width="55%" height={12} />
          <Skeleton width="45%" height={12} />
        </div>
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="ui:grid ui:grid-cols-4 ui:gap-4 ui:border-b ui:border-border ui:px-6 ui:py-4 last:ui:border-b-0"
          >
            <Skeleton width="70%" height={14} />
            <Skeleton width="65%" height={14} />
            <Skeleton width="50%" height={14} />
            <Skeleton width="40%" height={14} />
          </div>
        ))}
      </div>
    </StorySurface>
  ),
};

/**
 * ## Prefabricated Components
 * Use the provided card and list item helpers for faster scaffolding.
 */
export const PrefabricatedComponents: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div className="ui:grid ui:gap-6 lg:ui:grid-cols-2">
        <div className="ui:w-80">
          <SkeletonCard showAvatar showActions animation="wave" />
        </div>
        <div className="ui:rounded-xl ui:border ui:border-border ui:bg-card ui:p-4 ui:space-y-4">
          <SkeletonListItem animation="wave" />
          <SkeletonListItem animation="wave" />
          <SkeletonListItem animation="wave" showSecondaryText={false} />
        </div>
      </div>
    </StorySurface>
  ),
};
