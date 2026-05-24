import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StorySurface,
  StorySection,
  StoryStack,
  StoryIntro,
} from "../../shared/storybook";
import { AIFeatureAdoptionCard } from "./AIFeatureAdoptionCard";
import type { AIFeature } from "./AIFeatureAdoptionCard";

const meta: Meta<typeof AIFeatureAdoptionCard> = {
  title: "Data Display / Dashboard Cards / SaaS / AIFeatureAdoptionCard",
  component: AIFeatureAdoptionCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Radial ring chart showing per-feature AI adoption rates across the platform — with progress bars, MoM trend, active account counts, and a bottom stats strip.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  name: "Default — 6 AI features",
  render: () => (
    <StorySurface>
      <AIFeatureAdoptionCard />
    </StorySurface>
  ),
};

const earlyAdoptionFeatures: AIFeature[] = [
  {
    id: 1,
    name: "AI Copywriter",
    shortName: "Copywriter",
    adoption: 31,
    trend: +42.1,
    activeAccounts: 620,
    color: "#8B5CF6",
    icon: "✍️",
  },
  {
    id: 2,
    name: "AI Analytics",
    shortName: "Analytics",
    adoption: 24,
    trend: +38.6,
    activeAccounts: 480,
    color: "#3B82F6",
    icon: "📊",
  },
  {
    id: 3,
    name: "AI Support Bot",
    shortName: "Support",
    adoption: 18,
    trend: +29.4,
    activeAccounts: 360,
    color: "#06B6D4",
    icon: "🤖",
  },
  {
    id: 4,
    name: "AI Code Review",
    shortName: "Code",
    adoption: 12,
    trend: +61.2,
    activeAccounts: 240,
    color: "#10B981",
    icon: "🔍",
  },
  {
    id: 5,
    name: "AI SEO Optimizer",
    shortName: "SEO",
    adoption: 9,
    trend: +18.3,
    activeAccounts: 180,
    color: "#F59E0B",
    icon: "🎯",
  },
  {
    id: 6,
    name: "AI Image Gen",
    shortName: "Image",
    adoption: 6,
    trend: +84.0,
    activeAccounts: 120,
    color: "#EF4444",
    icon: "🖼️",
  },
];

export const EarlyAdoption: Story = {
  name: "Early adoption — low rates, high growth",
  render: () => (
    <StorySurface>
      <StoryStack>
        <StoryIntro
          title="Early adoption scenario"
          description="Low absolute adoption but explosive MoM growth — typical in the first 2–3 months after AI feature launch."
        />
        <StorySection>
          <AIFeatureAdoptionCard
            features={earlyAdoptionFeatures}
            totalSessions={18400}
            sessionsGrowth={61.2}
            satisfactionScore={91}
          />
        </StorySection>
      </StoryStack>
    </StorySurface>
  ),
};
