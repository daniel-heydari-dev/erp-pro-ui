import type { Meta, StoryObj } from "@storybook/react-vite";

import { IncomeExpenseCard } from "./IncomeExpenseCard";

const meta: Meta<typeof IncomeExpenseCard> = {
  title: "Data Display/Dashboard Cards/IncomeExpenseCard",
  component: IncomeExpenseCard,
  tags: ["autodocs"],
  argTypes: {
    data:           { control: false },
    onPeriodChange: { control: false },
  },
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Paired income/expense headline metrics with trend indicators and a " +
          "grouped monthly bar chart. Highlighted bars mark the current active period. " +
          "Core finance view for understanding profitability trend at a glance.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof IncomeExpenseCard>;

// ── Nexus Commerce — Dec 2025–May 2026 ───────────────────────────────────────

export const NexusCommerce: Story = {
  name: "Nexus Commerce — 6-month P&L",
  render: () => (
    <div className="w-[500px]">
      <IncomeExpenseCard
        title="Income vs. Expenses"
        totalIncome="$487,250"
        incomeBadge={{ value: "18.3%", direction: "up" }}
        totalExpenses="$142,300"
        expensesBadge={{ value: "8.0%", direction: "up" }}
        data={[
          { month: "Dec",  income: 382000, expense: 291300 },
          { month: "Jan",  income: 348000, expense: 280200 },
          { month: "Feb",  income: 421000, expense: 308700 },
          { month: "Mar",  income: 456000, expense: 321400 },
          { month: "Apr",  income: 389000, expense: 299100 },
          { month: "May",  income: 215200, expense: 142533, highlighted: true },
        ]}
        defaultPeriod="Last 6 months"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Dec–May view: revenue peaked in March ($456K) then dipped in April before recovering. " +
          "May is MTD (20 days) — highlighted bar shows the current partial month. " +
          "Expense growth at 8% vs revenue growth at 18.3% confirms margin expansion.",
      },
    },
  },
};

export const HRStaffing: Story = {
  name: "HR — Labour cost vs. Revenue",
  render: () => (
    <div className="w-[500px]">
      <IncomeExpenseCard
        title="Revenue vs. Labour Cost"
        totalIncome="$487,250"
        incomeBadge={{ value: "18.3%", direction: "up" }}
        totalExpenses="$74,036"
        expensesBadge={{ value: "6.2%", direction: "up" }}
        incomeColor="var(--ds-color-accent)"
        expenseColor="#7367F0"
        data={[
          { month: "Dec", income: 382000, expense: 58400 },
          { month: "Jan", income: 348000, expense: 61200 },
          { month: "Feb", income: 421000, expense: 63800 },
          { month: "Mar", income: 456000, expense: 68400 },
          { month: "Apr", income: 389000, expense: 70100 },
          { month: "May", income: 215200, expense: 74036, highlighted: true },
        ]}
        defaultPeriod="Last 6 months"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Labour cost as a share of revenue: currently 15.2%. Growing but at a slower rate " +
          "than revenue — a healthy sign. Watch if labour cost exceeds 18% of revenue.",
      },
    },
  },
};

export const SaaSARR: Story = {
  name: "SaaS — MRR vs. Operating Costs",
  render: () => (
    <div className="w-[500px]">
      <IncomeExpenseCard
        title="MRR vs. Operating Costs"
        totalIncome="$84,200"
        incomeBadge={{ value: "12.4%", direction: "up" }}
        totalExpenses="$38,400"
        expensesBadge={{ value: "4.1%", direction: "up" }}
        incomeColor="#00CFE8"
        expenseColor="#FF9F43"
        data={[
          { month: "Dec", income: 58400,  expense: 34200 },
          { month: "Jan", income: 63100,  expense: 35100 },
          { month: "Feb", income: 68900,  expense: 35800 },
          { month: "Mar", income: 74800,  expense: 36700 },
          { month: "Apr", income: 79300,  expense: 37400 },
          { month: "May", income: 84200,  expense: 38400, highlighted: true },
        ]}
        defaultPeriod="Last 6 months"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "SaaS MRR growing steadily (+44% over 6 months) while costs remain nearly flat — " +
          "classic positive operating leverage. Net margin improved from 41% to 54%.",
      },
    },
  },
};
