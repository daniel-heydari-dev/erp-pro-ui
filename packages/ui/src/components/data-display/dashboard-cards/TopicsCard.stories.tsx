import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { TopicsCard } from "./TopicsCard";
import type { TopicItem } from "./TopicsCard";

const sixTopics: TopicItem[] = [
  { label: "Technology", percentage: 42, color: "var(--ds-chart-2)" },
  { label: "Business", percentage: 35, color: "var(--ds-chart-4)" },
  { label: "Design", percentage: 28, color: "var(--ds-chart-1)" },
  { label: "Marketing", percentage: 21, color: "var(--ds-chart-3)" },
  { label: "Finance", percentage: 18, color: "var(--ds-chart-5)" },
  { label: "Operations", percentage: 14, color: "var(--ds-chart-15)" },
];

const threeTopics: TopicItem[] = [
  { label: "Software", percentage: 56, color: "var(--ds-chart-2)" },
  { label: "Hardware", percentage: 31, color: "var(--ds-chart-4)" },
  { label: "Services", percentage: 13, color: "var(--ds-chart-1)" },
];

const meta: Meta<typeof TopicsCard> = {
  title: "Data Display/Dashboard Cards/TopicsCard",
  component: TopicsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Horizontal bar chart with color-coded bars and a 2-column legend grid — ideal for categorical percentage breakdowns.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    items: {
      control: false,
      description: "Array of TopicItem: { label, percentage (0–100), color }.",
    },
    xTickFormatter: {
      control: false,
      description: "X-axis tick formatter. Defaults to 'N%' format.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { TopicsCard } from 'erp-pro-ui';
import type { TopicItem } from 'erp-pro-ui';

const items: TopicItem[] = [
  { label: 'Technology', percentage: 42, color: 'var(--ds-chart-2)' },
  { label: 'Business', percentage: 35, color: 'var(--ds-chart-4)' },
  { label: 'Design', percentage: 28, color: 'var(--ds-chart-1)' },
  { label: 'Marketing', percentage: 21, color: 'var(--ds-chart-3)' },
  { label: 'Finance', percentage: 18, color: 'var(--ds-chart-5)' },
  { label: 'Operations', percentage: 14, color: 'var(--ds-chart-15)' },
];

export function TopicsCardExample() {
  return <TopicsCard items={items} />;
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <TopicsCard items={sixTopics} />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const fewItemsSource = `import { TopicsCard } from 'erp-pro-ui';
import type { TopicItem } from 'erp-pro-ui';

const items: TopicItem[] = [
  { label: 'Software', percentage: 56, color: 'var(--ds-chart-2)' },
  { label: 'Hardware', percentage: 31, color: 'var(--ds-chart-4)' },
  { label: 'Services', percentage: 13, color: 'var(--ds-chart-1)' },
];

export function TopicsCardFewItemsExample() {
  return <TopicsCard title="Product Categories" items={items} />;
}`;

export const FewItems: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Three items"
          description="Works equally well with fewer categories. The chart height adapts to the number of items."
        />
        <StorySection>
          <TopicsCard title="Product Categories" items={threeTopics} />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: fewItemsSource } },
  },
};
