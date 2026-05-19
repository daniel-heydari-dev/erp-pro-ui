import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { SupportTrackerCard } from "./SupportTrackerCard";
import type { SupportItem } from "./SupportTrackerCard";

const defaultItems: SupportItem[] = [
  {
    icon: "✅",
    iconColor: "var(--ds-color-success)",
    label: "New Tickets",
    value: "142 opened",
  },
  {
    icon: "🔄",
    iconColor: "var(--ds-color-info)",
    label: "Open Tickets",
    value: "28 in progress",
  },
  {
    icon: "⏱️",
    iconColor: "var(--ds-color-warning)",
    label: "Response Time",
    value: "Avg 2.4 hrs",
  },
  {
    icon: "⭐",
    iconColor: "var(--ds-color-accent)",
    label: "CSAT Score",
    value: "4.8 / 5",
  },
];

const meta: Meta<typeof SupportTrackerCard> = {
  title: "Data Display / Dashboard Cards / Contacts / SupportTrackerCard",
  component: SupportTrackerCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Support KPI card with a segmented arc gauge showing ticket completion percentage.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    subtitle: { control: "text", description: "Secondary subtitle beneath the title." },
    total: {
      control: "number",
      description: "Large headline number, e.g. total ticket count.",
    },
    totalLabel: {
      control: "text",
      description: "Label shown beneath the total number.",
    },
    items: {
      control: false,
      description: "Up to 4 stat rows shown on the left: icon, iconColor, label, value.",
    },
    percentage: {
      control: { type: "number", min: 0, max: 100 },
      description: "0–100 — drives the gauge arc fill.",
    },
    completedLabel: {
      control: "text",
      description: "Label inside the gauge below the percentage.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { SupportTrackerCard } from 'erp-pro-ui';

export function SupportTrackerExample() {
  return (
    <SupportTrackerCard
      total={164}
      totalLabel="Total Tickets"
      percentage={85}
      items={[
        { icon: '✅', iconColor: 'var(--ds-color-success)', label: 'New Tickets', value: '142 opened' },
        { icon: '🔄', iconColor: 'var(--ds-color-info)', label: 'Open Tickets', value: '28 in progress' },
        { icon: '⏱️', iconColor: 'var(--ds-color-warning)', label: 'Response Time', value: 'Avg 2.4 hrs' },
        { icon: '⭐', iconColor: 'var(--ds-color-accent)', label: 'CSAT Score', value: '4.8 / 5' },
      ]}
    />
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <SupportTrackerCard
        total={164}
        totalLabel="Total Tickets"
        percentage={85}
        items={defaultItems}
      />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

export const HighCompletion: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="High completion — 95%"
          description="Use when the support team is nearly finished with their ticket backlog."
        />
        <StorySection>
          <SupportTrackerCard
            title="Support Tracker"
            subtitle="This Week"
            total={210}
            totalLabel="Total Tickets"
            percentage={95}
            completedLabel="Completed Task"
            items={defaultItems}
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: `<SupportTrackerCard total={210} percentage={95} items={items} />` } },
  },
};

export const LowCompletion: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-lg">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Low completion — 42%"
          description="The gauge clearly communicates when a large backlog remains unresolved."
        />
        <StorySection>
          <SupportTrackerCard
            title="Support Tracker"
            subtitle="This Week"
            total={320}
            totalLabel="Total Tickets"
            percentage={42}
            completedLabel="Completed Task"
            items={defaultItems}
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: `<SupportTrackerCard total={320} percentage={42} items={items} />` } },
  },
};
