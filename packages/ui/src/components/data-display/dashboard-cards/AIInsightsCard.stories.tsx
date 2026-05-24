import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { AIInsightsCard } from "./AIInsightsCard";
import type { AIInsight } from "./AIInsightsCard";

const meta: Meta<typeof AIInsightsCard> = {
  title: "Data Display / Dashboard Cards / SaaS / AIInsightsCard",
  component: AIInsightsCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "AI-powered business intelligence card that surfaces churn risks, upsell opportunities, usage anomalies, revenue forecasts, and actionable recommendations — each with a confidence score, impact rating, and one-click action.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default — 5 insights",
  render: () => (
    <StorySurface>
      <AIInsightsCard />
    </StorySurface>
  ),
};

const fewInsights: AIInsight[] = [
  {
    id: 1,
    type: "churn_risk",
    title: "14 Pro accounts silent for 21+ days",
    description: "No logins recorded. Historical pattern shows 68% of silent accounts cancel within 30 days.",
    affectedCount: 14,
    affectedLabel: "accounts",
    confidence: 82,
    impact: "critical",
    actionLabel: "Send re-engagement",
  },
  {
    id: 2,
    type: "upsell_opportunity",
    title: "67 Starter accounts approaching seat limit",
    description: "Currently at 90%+ of included seats. Upgrade prompt at seat-cap = 28% conversion rate.",
    affectedCount: 67,
    affectedLabel: "accounts",
    confidence: 76,
    impact: "high",
    actionLabel: "Show upgrade prompt",
  },
  {
    id: 3,
    type: "recommendation",
    title: "Enable two-factor auth nudge for 210 accounts",
    description: "Accounts with 2FA enabled show 1.9× higher 12-month retention. None of these have 2FA.",
    affectedCount: 210,
    affectedLabel: "accounts",
    confidence: 69,
    impact: "medium",
    actionLabel: "Schedule nudge",
  },
];

export const Minimal: Story = {
  name: "Minimal — 3 insights, no footer",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="Minimal variant"
          description="Pass a shorter insights array and omit onViewAll to hide the footer link."
        />
        <StorySection>
          <AIInsightsCard
            title="Quick Signals"
            subtitle="Top AI recommendations"
            insights={fewInsights}
            totalInsights={3}
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
