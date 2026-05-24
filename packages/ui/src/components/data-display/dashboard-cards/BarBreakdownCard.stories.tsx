import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoryIntro, StoryPanel, StorySection } from "../../shared/storybook";
import { BarBreakdownCard } from "./BarBreakdownCard";

const meta: Meta<typeof BarBreakdownCard> = {
  title: "Data Display / Dashboard Cards / Inventory / BarBreakdownCard",
  component: BarBreakdownCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Stacked-bar breakdown card. Use `variant=\"full\"` for a layout with " +
          "value headlines, a stacked bar chart, and optional right-column metric rows. " +
          "Use `variant=\"compact\"` for a lighter card showing only the period selector and chart. " +
          "Pass `dataByPeriod` to automatically swap the chart dataset when a period is selected.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarBreakdownCard>;

// ── SaaS color palette ────────────────────────────────────────────────────────

const PLAN_CATEGORIES = [
  { key: "enterprise", label: "Enterprise", color: "#8B5CF6" },
  { key: "business",   label: "Business",   color: "#3B82F6" },
  { key: "pro",        label: "Pro",        color: "#06B6D4" },
  { key: "starter",    label: "Starter",    color: "#10B981" },
];

const CHANNEL_CATEGORIES = [
  { key: "organic",   label: "Organic",   color: "#3B82F6" },
  { key: "paid",      label: "Paid Ads",  color: "#8B5CF6" },
  { key: "referral",  label: "Referral",  color: "#10B981" },
  { key: "direct",    label: "Direct",    color: "#F59E0B" },
];

const SEAT_CATEGORIES = [
  { key: "billed", label: "Billed", color: "#6366f1" },
  { key: "active", label: "Active", color: "#22c55e" },
];

const SAAS_PERIODS = ["Today", "This Week", "This Month", "This Year"];

// ── MRR data generators ───────────────────────────────────────────────────────

function makeMRRToday() {
  return Array.from({ length: 24 }, (_, i) => ({
    name: i % 6 === 0 ? `${String(i).padStart(2, "0")}h` : "",
    enterprise: Math.round(4 + Math.random() * 4),
    business:   Math.round(3 + Math.random() * 3),
    pro:        Math.round(2 + Math.random() * 3),
    starter:    Math.round(1 + Math.random() * 2),
  }));
}

function makeMRRWeek() {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((name) => ({
    name,
    enterprise: Math.round(840 + Math.random() * 280),
    business:   Math.round(560 + Math.random() * 220),
    pro:        Math.round(420 + Math.random() * 180),
    starter:    Math.round(140 + Math.random() * 120),
  }));
}

function makeMRRMonth() {
  return Array.from({ length: 30 }, (_, i) => ({
    name: (i + 1) % 5 === 1 ? `${i + 1}` : "",
    enterprise: Math.round(120 + Math.random() * 60),
    business:   Math.round(80  + Math.random() * 50),
    pro:        Math.round(60  + Math.random() * 40),
    starter:    Math.round(20  + Math.random() * 30),
  }));
}

function makeMRRYear() {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((name) => ({
    name,
    enterprise: Math.round(3600 + Math.random() * 1400),
    business:   Math.round(2400 + Math.random() * 1000),
    pro:        Math.round(1800 + Math.random() * 800),
    starter:    Math.round(600  + Math.random() * 600),
  }));
}

// ── Signup data generators ────────────────────────────────────────────────────

function makeSignupToday() {
  return Array.from({ length: 24 }, (_, i) => ({
    name: i % 6 === 0 ? `${String(i).padStart(2, "0")}h` : "",
    organic:  Math.round(1 + Math.random() * 4),
    paid:     Math.round(1 + Math.random() * 3),
    referral: Math.round(0 + Math.random() * 2),
    direct:   Math.round(0 + Math.random() * 2),
  }));
}

function makeSignupWeek() {
  return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((name) => ({
    name,
    organic:  Math.round(18 + Math.random() * 22),
    paid:     Math.round(10 + Math.random() * 18),
    referral: Math.round(5  + Math.random() * 12),
    direct:   Math.round(3  + Math.random() * 8),
  }));
}

function makeSignupMonth() {
  return Array.from({ length: 30 }, (_, i) => ({
    name: (i + 1) % 5 === 1 ? `${i + 1}` : "",
    organic:  Math.round(18 + Math.random() * 22),
    paid:     Math.round(10 + Math.random() * 18),
    referral: Math.round(5  + Math.random() * 12),
    direct:   Math.round(3  + Math.random() * 8),
  }));
}

function makeSignupYear() {
  return ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((name) => ({
    name,
    organic:  Math.round(480 + Math.random() * 200),
    paid:     Math.round(280 + Math.random() * 160),
    referral: Math.round(140 + Math.random() * 100),
    direct:   Math.round(80  + Math.random() * 80),
  }));
}

// ── Static data (computed once) ───────────────────────────────────────────────

const MRR_BY_PERIOD = {
  "Today":      makeMRRToday(),
  "This Week":  makeMRRWeek(),
  "This Month": makeMRRMonth(),
  "This Year":  makeMRRYear(),
};

const SIGNUP_BY_PERIOD = {
  "Today":      makeSignupToday(),
  "This Week":  makeSignupWeek(),
  "This Month": makeSignupMonth(),
  "This Year":  makeSignupYear(),
};

const SEAT_DATA = [
  { name: "Ent.",    billed: 2400, active: 2310 },
  { name: "Biz",     billed: 3200, active: 2980 },
  { name: "Pro",     billed: 6450, active: 5820 },
  { name: "Starter", billed: 6100, active: 5200 },
  { name: "Free",    billed: 1001, active: 603  },
];

// ── Stories ───────────────────────────────────────────────────────────────────

export const MRRByPlan: Story = {
  name: "MRR by Plan — full",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="MRR by Plan"
        description="MRR split across subscription tiers. Switch the period to zoom from today's hourly activity to full-year monthly totals."
      />
      <StorySection title="Revenue breakdown">
        <BarBreakdownCard
          title="MRR BREAKDOWN"
          variant="full"
          headlines={[
            { label: "MRR", value: "$198,400" },
            { label: "ARR", value: "$2.38M"   },
          ]}
          categories={PLAN_CATEGORIES}
          data={MRR_BY_PERIOD["This Month"]}
          dataByPeriod={MRR_BY_PERIOD}
          periods={SAAS_PERIODS}
          defaultPeriod="This Month"
          metrics={[
            { label: "Avg Rev / Account", badge: { value: "9.2%", direction: "up" }, primary: "$49.60" },
            { label: "Expansion MRR",     badge: { value: "5.1%", direction: "up" }, primary: "$21,840" },
          ]}
        />
      </StorySection>
    </StoryPanel>
  ),
};

export const SignupsByChannel: Story = {
  name: "Signups by Channel — compact",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="Signups by acquisition channel"
        description="Signup volume by channel. Period selector adapts chart granularity from hourly to yearly."
      />
      <StorySection title="Signups">
        <div className="max-w-[380px]">
          <BarBreakdownCard
            title="SIGNUPS"
            variant="compact"
            categories={CHANNEL_CATEGORIES}
            data={SIGNUP_BY_PERIOD["This Month"]}
            dataByPeriod={SIGNUP_BY_PERIOD}
            periods={SAAS_PERIODS}
            defaultPeriod="This Month"
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

export const SeatsBilledVsActive: Story = {
  name: "Seats: Billed vs Active",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="Seats: Billed vs Active by Tier"
        description="Seat utilization across subscription tiers — billed seats vs seats with active usage."
      />
      <StorySection title="Seat breakdown">
        <BarBreakdownCard
          title="SEAT UTILIZATION"
          variant="full"
          headlines={[
            { label: "Total Seats", value: "15,951" },
            { label: "Active",      value: "13,933" },
          ]}
          categories={SEAT_CATEGORIES}
          data={SEAT_DATA}
          periods={["Current Period"]}
          defaultPeriod="Current Period"
          metrics={[
            { label: "Utilization", badge: { value: "+0.9%", direction: "up" }, primary: "87.4%" },
            { label: "Available",   primary: "2,018" },
          ]}
        />
      </StorySection>
    </StoryPanel>
  ),
};

export const DashboardRow: Story = {
  name: "Dashboard row — full layout",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="flex flex-wrap gap-4 bg-ds-canvas p-8 items-start">
      <div className="flex-2 min-w-[480px]">
        <BarBreakdownCard
          title="MRR BREAKDOWN"
          variant="full"
          headlines={[
            { label: "MRR", value: "$198,400" },
            { label: "ARR", value: "$2.38M"   },
          ]}
          categories={PLAN_CATEGORIES}
          data={MRR_BY_PERIOD["This Month"]}
          dataByPeriod={MRR_BY_PERIOD}
          periods={SAAS_PERIODS}
          defaultPeriod="This Month"
          metrics={[
            { label: "Avg Rev / Account", badge: { value: "9.2%", direction: "up" }, primary: "$49.60" },
            { label: "Expansion MRR",     badge: { value: "5.1%", direction: "up" }, primary: "$21,840" },
          ]}
        />
      </div>
      <div className="flex-1 min-w-[280px]">
        <BarBreakdownCard
          title="SIGNUPS"
          variant="compact"
          categories={CHANNEL_CATEGORIES}
          data={SIGNUP_BY_PERIOD["This Month"]}
          dataByPeriod={SIGNUP_BY_PERIOD}
          periods={SAAS_PERIODS}
          defaultPeriod="This Month"
        />
      </div>
    </div>
  ),
};
