import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";

import { EarningReportsTabsCard } from "./EarningReportsTabsCard";
import type { EarningTab } from "./EarningReportsTabsCard";

const yearlyData = [
  { name: "Jan", value: 16000 },
  { name: "Feb", value: 21000 },
  { name: "Mar", value: 25000 },
  { name: "Apr", value: 19000 },
  { name: "May", value: 32000, highlighted: true },
  { name: "Jun", value: 27000 },
  { name: "Jul", value: 34000 },
  { name: "Aug", value: 29000 },
  { name: "Sep", value: 38000 },
  { name: "Oct", value: 41000 },
  { name: "Nov", value: 36000 },
  { name: "Dec", value: 44000, highlighted: true },
];

const salesData = yearlyData.map((d) => ({ ...d, value: Math.round(d.value * 0.7) }));
const profitData = yearlyData.map((d) => ({ ...d, value: Math.round(d.value * 0.3) }));
const incomeData = yearlyData.map((d) => ({ ...d, value: Math.round(d.value * 1.2) }));

const tabs: EarningTab[] = [
  { id: "orders", icon: "📦", label: "Orders", chartData: yearlyData },
  { id: "sales", icon: "💰", label: "Sales", chartData: salesData },
  { id: "profit", icon: "📈", label: "Profit", chartData: profitData },
  { id: "income", icon: "🏦", label: "Income", chartData: incomeData },
];

const meta: Meta<typeof EarningReportsTabsCard> = {
  title: "Data Display/Dashboard Cards/EarningReportsTabsCard",
  component: EarningReportsTabsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Yearly earnings bar chart with an icon tab switcher for switching between report categories.",
      },
    },
  },
  argTypes: {
    title: { control: "text", description: "Card heading label." },
    subtitle: { control: "text", description: "Secondary subtitle beneath the title." },
    tabs: {
      control: false,
      description: "Array of EarningTab: { id, icon, label, chartData }.",
    },
    selectedTabId: {
      control: false,
      description: "Controlled: currently selected tab id.",
    },
    onTabChange: {
      control: false,
      description: "Callback fired when the user selects a different tab.",
    },
    defaultTabId: {
      control: "text",
      description: "Default selected tab id for uncontrolled usage.",
    },
    showAddTab: {
      control: "boolean",
      description: "Show a '+' add-tab button at the end of the tabs row.",
    },
    yAxisFormatter: {
      control: false,
      description: "Format Y-axis tick labels. Defaults to '28k' style.",
    },
    className: { control: false, description: "Custom classes for the outer container." },
    onMenuClick: { control: false, description: "Callback for the ellipsis menu button." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const defaultSource = `import { EarningReportsTabsCard } from 'erp-pro-ui';
import type { EarningTab } from 'erp-pro-ui';

const tabs: EarningTab[] = [
  { id: 'orders', icon: '📦', label: 'Orders', chartData: ordersData },
  { id: 'sales', icon: '💰', label: 'Sales', chartData: salesData },
  { id: 'profit', icon: '📈', label: 'Profit', chartData: profitData },
  { id: 'income', icon: '🏦', label: 'Income', chartData: incomeData },
];

export function EarningReportsTabsCardExample() {
  return (
    <EarningReportsTabsCard
      tabs={tabs}
      defaultTabId="orders"
      yAxisFormatter={(v) => v >= 1000 ? \`\${Math.round(v / 1000)}k\` : String(v)}
    />
  );
}`;

export const Default: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <EarningReportsTabsCard
        tabs={tabs}
        defaultTabId="orders"
        yAxisFormatter={(v) => (v >= 1000 ? `${Math.round(v / 1000)}k` : String(v))}
      />
    </StorySurface>
  ),
  parameters: {
    docs: { source: { code: defaultSource } },
  },
};

const controlledSource = `import { useState } from 'react';
import { EarningReportsTabsCard } from 'erp-pro-ui';

export function ControlledEarningReportsExample() {
  const [activeTab, setActiveTab] = useState('sales');
  return (
    <EarningReportsTabsCard
      tabs={tabs}
      selectedTabId={activeTab}
      onTabChange={setActiveTab}
      showAddTab={false}
    />
  );
}`;

export const Controlled: Story = {
  render: () => {
    const [activeTab, setActiveTab] = useState("sales");
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
        <StoryStack className="ui:gap-5">
          <StoryIntro
            title="Controlled tab selection"
            description={`Active tab: "${activeTab}". Use selectedTabId + onTabChange to control the tab from a parent component.`}
          />
          <StorySection>
            <EarningReportsTabsCard
              tabs={tabs}
              selectedTabId={activeTab}
              onTabChange={setActiveTab}
              showAddTab={false}
            />
          </StorySection>
        </StoryStack>
      </StorySurface>
    );
  },
  parameters: {
    docs: { source: { code: controlledSource } },
  },
};
