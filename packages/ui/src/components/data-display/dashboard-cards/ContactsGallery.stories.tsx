import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface, StorySection, StoryStack, StoryIntro } from "../../shared/storybook";
import { CheckCircleIcon } from "../../icons/CheckCircleIcon";
import { AlertCircleIcon } from "../../icons/AlertCircleIcon";
import { CloseIcon } from "../../icons/CloseIcon";
import { ActivityIcon } from "../../icons/ActivityIcon";
import { SupportTrackerCard } from "./SupportTrackerCard";
import { TopicsCard } from "./TopicsCard";

import type { SupportItem } from "./SupportTrackerCard";
import type { TopicItem } from "./TopicsCard";

const meta: Meta = {
  title: "Data Display / Dashboard Cards / Contacts / Gallery",
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj;

const SUPPORT_ITEMS: SupportItem[] = [
  { icon: <CheckCircleIcon width={18} height={18} />, iconColor: "#22c55e", label: "Resolved tickets",  value: "148" },
  { icon: <ActivityIcon    width={18} height={18} />, iconColor: "#6366f1", label: "Open tickets",      value: "23"  },
  { icon: <AlertCircleIcon width={18} height={18} />, iconColor: "#f97316", label: "Pending review",    value: "11"  },
  { icon: <CloseIcon       width={18} height={18} />, iconColor: "#ef4444", label: "Escalated",         value: "4"   },
];

const TOPICS: TopicItem[] = [
  { label: "Warranty claim",      percentage: 82, color: "#ef4444" },
  { label: "Wrong item delivered",percentage: 61, color: "#f97316" },
  { label: "Return request",      percentage: 55, color: "#f59e0b" },
  { label: "Invoice query",       percentage: 44, color: "#6366f1" },
  { label: "Stock ETA query",     percentage: 38, color: "#22c55e" },
  { label: "Bulk pricing request",percentage: 29, color: "var(--ds-color-accent)" },
];

export const Default: Story = {
  name: "All Contacts Cards",
  render: () => (
    <StorySurface>
      <StoryIntro
        title="Contacts Cards"
        description="CRM, customer support, and communication intelligence cards for the tools store. Track ticket volume, resolution rates, and recurring contact topics."
      />

      <StorySection title="Support & CRM">
        <StoryStack direction="horizontal" wrap>
          <div className="w-[360px]">
            <SupportTrackerCard
              title="Support Overview"
              subtitle="May 2025 — all channels"
              total={186}
              totalLabel="Total tickets"
              items={SUPPORT_ITEMS}
              percentage={80}
            />
          </div>
          <div className="w-[360px]">
            <TopicsCard
              title="Contact Reasons"
              items={TOPICS}
            />
          </div>
        </StoryStack>
      </StorySection>
    </StorySurface>
  ),
};
