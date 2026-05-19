import type { Meta, StoryObj } from "@storybook/react-vite";

import { ExpensesCard } from "./ExpensesCard";

const meta: Meta<typeof ExpensesCard> = {
  title: "Data Display / Dashboard Cards / Dashboard / ExpensesCard",
  component: ExpensesCard,
  tags: ["autodocs"],
  argTypes: {
    expenses:       { control: false },
    topExpenses:    { control: false },
    onPeriodChange: { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Donut chart showing operating expense distribution by category, " +
          "with a right-side legend and a top-expense 2×2 grid. " +
          "Helps finance managers spot budget overruns at a glance.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExpensesCard>;

// ── Nexus Commerce — May 2026 operating expenses ──────────────────────────────

export const OperatingCosts: Story = {
  name: "Nexus Commerce — Operating Costs",
  render: () => (
    <div className="w-[420px]">
      <ExpensesCard
        title="Operating Expenses"
        totalExpense="$142,300"
        expenses={[
          { label: "Payroll",        percentage: 52, color: "#7367F0" },
          { label: "Rent & Lease",   percentage: 18, color: "#00CFE8" },
          { label: "Inventory Cost", percentage: 12, color: "#28C76F" },
          { label: "Marketing",      percentage:  9, color: "#FF9F43" },
          { label: "Utilities",      percentage:  6, color: "#EA5455" },
          { label: "Software & IT",  percentage:  3, color: "#82868B" },
        ]}
        topExpenses={[
          { label: "Payroll",        value: "$74,036",  color: "#7367F0" },
          { label: "Rent & Lease",   value: "$25,614",  color: "#00CFE8" },
          { label: "Inventory Cost", value: "$17,076",  color: "#28C76F" },
          { label: "Marketing",      value: "$12,807",  color: "#FF9F43" },
        ]}
        defaultPeriod="Last 6 months"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "May MTD: payroll dominates at 52% ($74K), followed by rent and inventory costs. " +
          "Marketing at 9% is intentionally elevated — campaign month.",
      },
    },
  },
};

export const SaaSStartup: Story = {
  name: "SaaS Startup — Cloud-heavy cost structure",
  render: () => (
    <div className="w-[420px]">
      <ExpensesCard
        title="Monthly Burn"
        totalExpense="$38,400"
        expenses={[
          { label: "Salaries",          percentage: 58, color: "#7367F0" },
          { label: "Cloud & Infra",     percentage: 17, color: "#00CFE8" },
          { label: "Marketing & Ads",   percentage: 12, color: "#28C76F" },
          { label: "SaaS Tools",        percentage:  7, color: "#FF9F43" },
          { label: "Legal & Compliance", percentage:  4, color: "#EA5455" },
          { label: "Other",             percentage:  2, color: "#82868B" },
        ]}
        topExpenses={[
          { label: "Salaries",        value: "$22,272",  color: "#7367F0" },
          { label: "Cloud & Infra",   value: "$6,528",   color: "#00CFE8" },
          { label: "Marketing & Ads", value: "$4,608",   color: "#28C76F" },
          { label: "SaaS Tools",      value: "$2,688",   color: "#FF9F43" },
        ]}
        defaultPeriod="Last 3 months"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Early-stage SaaS burn rate breakdown: cloud infrastructure is 17% of costs " +
          "— a flag for the engineering team to review over-provisioned services.",
      },
    },
  },
};

export const RetailChain: Story = {
  name: "Retail Chain — High COGS structure",
  render: () => (
    <div className="w-[420px]">
      <ExpensesCard
        title="Store Operating Costs"
        totalExpense="$284,100"
        expenses={[
          { label: "COGS / Buying",   percentage: 44, color: "#7367F0" },
          { label: "Staff Wages",     percentage: 28, color: "#00CFE8" },
          { label: "Store Rent",      percentage: 14, color: "#28C76F" },
          { label: "Logistics",       percentage:  8, color: "#FF9F43" },
          { label: "Marketing",       percentage:  4, color: "#EA5455" },
          { label: "Other",           percentage:  2, color: "#82868B" },
        ]}
        topExpenses={[
          { label: "COGS / Buying",  value: "$124,924", color: "#7367F0" },
          { label: "Staff Wages",    value: "$79,548",  color: "#00CFE8" },
          { label: "Store Rent",     value: "$39,774",  color: "#28C76F" },
          { label: "Logistics",      value: "$22,728",  color: "#FF9F43" },
        ]}
        defaultPeriod="Last year"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multi-location retail: COGS dominates at 44% — standard for product businesses. " +
          "Logistics at 8% is a cost-reduction target; switching to regional 3PL could halve it.",
      },
    },
  },
};
