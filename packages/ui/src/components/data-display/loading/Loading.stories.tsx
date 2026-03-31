import type { Meta, StoryObj } from "@storybook/react-vite";
import Loading from "./Loading";
import { StorySurface } from "../../shared/storybook";

const meta: Meta<typeof Loading> = {
  title: "Data Display/Loading",
  component: Loading,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Loading covers compact inline indicators, overlay states, and lightweight skeleton placeholders.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["spinner", "dots", "pulse", "bars", "ring", "bounce", "wave"],
      description: "Animation type.",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    text: { control: "text", description: "Optional loading message." },
    color: { control: "color", description: "Override default theme color." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * ## Default
 * An essential loading spinner for generic asynchronous actions.
 */
export const Default: Story = {
  args: {
    variant: "spinner",
    size: "md",
    color: "#3b82f6",
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:flex ui:min-h-40 ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:border-border ui:bg-card">
        <Loading {...args} />
      </div>
    </StorySurface>
  ),
};

/**
 * ## Visual Variations
 * You can pick the animation that best matches your aesthetic.
 */
export const Variations: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:w-full ui:gap-4 sm:ui:grid-cols-2 xl:ui:grid-cols-4">
        {[
          {
            label: "Spinner",
            element: <Loading variant="spinner" size="lg" />,
          },
          { label: "Dots", element: <Loading variant="dots" size="lg" /> },
          { label: "Pulse", element: <Loading variant="pulse" size="lg" /> },
          { label: "Bars", element: <Loading variant="bars" size="lg" /> },
          { label: "Ring", element: <Loading variant="ring" size="lg" /> },
          { label: "Bounce", element: <Loading variant="bounce" size="lg" /> },
          { label: "Wave", element: <Loading variant="wave" size="lg" /> },
          {
            label: "Skeleton",
            element: (
              <Loading
                variant="skeleton"
                skeletonWidth="5rem"
                skeletonHeight="1rem"
              />
            ),
          },
        ].map((item) => (
          <div
            key={item.label}
            className="ui:flex ui:min-h-40 ui:flex-col ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6 ui:text-center"
          >
            <div className="ui:flex ui:min-h-12 ui:items-center ui:justify-center">
              {item.element}
            </div>
            <p className="ui:mt-4 ui:text-sm ui:font-medium ui:text-muted-foreground">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </StorySurface>
  ),
};

/**
 * ## With Appended Text
 * Loading components can render context alongside the animation.
 */
export const WithText: Story = {
  args: {
    variant: "dots",
    text: "Syncing your workspace...",
    color: "#000000",
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:flex ui:min-h-40 ui:items-center ui:justify-center ui:rounded-2xl ui:border ui:border-border ui:bg-card">
        <Loading {...args} />
      </div>
    </StorySurface>
  ),
};

/**
 * ## Inline Status Messaging
 * Use loading text when the user needs confirmation about what is happening.
 */
export const InlineStatusMessaging: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <div className="ui:grid ui:w-full ui:gap-4 lg:ui:grid-cols-3">
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <Loading variant="spinner" text="Saving supplier profile" />
        </div>
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <Loading
            variant="ring"
            size="lg"
            text="Generating weekly summary"
            textPosition="bottom"
          />
        </div>
        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-card ui:p-6">
          <Loading
            variant="wave"
            color="#00cfe8"
            text="Publishing branch updates"
          />
        </div>
      </div>
    </StorySurface>
  ),
};

/**
 * ## Contained Overlay
 * Shows a temporary lock state over existing content.
 */
export const ContainedOverlay: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:relative ui:w-full ui:overflow-hidden ui:rounded-2xl ui:border ui:border-border ui:bg-card">
        <div className="ui:grid ui:gap-3 ui:p-6 md:ui:grid-cols-3">
          <div className="ui:rounded-xl ui:border ui:border-border ui:bg-muted ui:p-4">
            <p className="ui:text-sm ui:font-medium">Pending approvals</p>
            <p className="ui:mt-2 ui:text-3xl ui:font-semibold">18</p>
          </div>
          <div className="ui:rounded-xl ui:border ui:border-border ui:bg-muted ui:p-4">
            <p className="ui:text-sm ui:font-medium">Transfers queued</p>
            <p className="ui:mt-2 ui:text-3xl ui:font-semibold">42</p>
          </div>
          <div className="ui:rounded-xl ui:border ui:border-border ui:bg-muted ui:p-4">
            <p className="ui:text-sm ui:font-medium">Branch sync</p>
            <p className="ui:mt-2 ui:text-3xl ui:font-semibold">94%</p>
          </div>
        </div>
        <Loading
          overlay
          variant="dots"
          size="lg"
          text="Refreshing operations queue"
        />
      </div>
    </StorySurface>
  ),
};
