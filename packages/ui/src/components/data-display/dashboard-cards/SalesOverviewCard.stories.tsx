import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { SalesOverviewCard } from "./SalesOverviewCard";
import type { SalesMetric } from "./SalesOverviewCard";

const ordersMetric: SalesMetric = {
  icon: "🛒",
  label: "Orders",
  percentage: "62.2%",
  count: "6,440",
  color: "var(--ds-color-accent)",
};

const visitorsMetric: SalesMetric = {
  icon: "👥",
  label: "Visitors",
  percentage: "37.8%",
  count: "3,914",
  color: "var(--ds-color-info)",
};

const webMetric: SalesMetric = {
  icon: "🌐",
  label: "Web",
  percentage: "70.5%",
  count: "18,420",
  color: "var(--ds-color-success)",
};

const mobileMetric: SalesMetric = {
  icon: "📱",
  label: "Mobile",
  percentage: "29.5%",
  count: "7,710",
  color: "var(--ds-color-warning)",
};

const meta: Meta<typeof SalesOverviewCard> = {
  title: "Data Display / Dashboard Cards / Sales / SalesOverviewCard",
  component: SalesOverviewCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Two-metric card with a VS divider and dual-color progress bar for comparing orders vs visitors.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    badge: {
      control: false,
      description: "Trend badge with value and direction shown next to the title.",
    },
    value: { control: "text", description: "Hero value displayed below the title." },
    leftMetric: {
      control: false,
      description: "Left side metric: icon, label, percentage, count, and color.",
    },
    rightMetric: {
      control: false,
      description: "Right side metric: icon, label, percentage, count, and color.",
    },
    leftProgress: {
      control: { type: "number", min: 0, max: 100 },
      description:
        "Explicit split point for the dual progress bar (0–100). Derived from percentages when omitted.",
    },
    vsLabel: {
      control: "text",
      description: "Label of the center VS divider badge.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { SalesOverviewCard } from 'erp-pro-ui';

export function SalesOverviewExample() {
  return (
    <SalesOverviewCard
      value="$42.5k"
      badge={{ value: "+18.2%", direction: "up" }}
      leftMetric={{
        icon: '🛒',
        label: 'Orders',
        percentage: '62.2%',
        count: '6,440',
        color: 'var(--ds-color-accent)',
      }}
      rightMetric={{
        icon: '👥',
        label: 'Visitors',
        percentage: '37.8%',
        count: '3,914',
        color: 'var(--ds-color-info)',
      }}
    />
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <SalesOverviewCard
        value="$42.5k"
        badge={{ value: "+18.2%", direction: "up" }}
        leftMetric={ordersMetric}
        rightMetric={visitorsMetric}
      />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const differentChannelsSource = `import { SalesOverviewCard } from 'erp-pro-ui';

export function ChannelSalesOverviewExample() {
  return (
    <SalesOverviewCard
      title="Channel Split"
      value="26,130 sessions"
      leftMetric={{
        icon: '🌐',
        label: 'Web',
        percentage: '70.5%',
        count: '18,420',
        color: 'var(--ds-color-success)',
      }}
      rightMetric={{
        icon: '📱',
        label: 'Mobile',
        percentage: '29.5%',
        count: '7,710',
        color: 'var(--ds-color-warning)',
      }}
      vsLabel="VS"
    />
  );
}`;

export const DifferentChannels: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-sm">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Web vs Mobile channel split"
          description="Replace any two competing metrics. The dual progress bar updates automatically based on the percentage values."
        />
        <StorySection>
          <SalesOverviewCard
            title="Channel Split"
            value="26,130 sessions"
            leftMetric={webMetric}
            rightMetric={mobileMetric}
            vsLabel="VS"
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: differentChannelsSource } },
  },
};
