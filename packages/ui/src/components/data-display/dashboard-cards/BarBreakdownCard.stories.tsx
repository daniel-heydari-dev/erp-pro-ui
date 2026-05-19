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
          "currency/value headlines, a stacked bar chart, and optional right-column " +
          "metric rows. Use `variant=\"compact\"` for a lighter card showing only " +
          "the period selector and chart.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BarBreakdownCard>;

// ── Shared data ───────────────────────────────────────────────────────────────

const CURRENCY_CATEGORIES = [
  { key: "euro",    label: "Euro",           color: "#1C3A5F" },
  { key: "dollari", label: "Dollari",        color: "#3B82C4" },
  { key: "sterline",label: "Sterline",       color: "#93C5E8" },
  { key: "franchi", label: "Franchi svizzeri", color: "#C9E3F5" },
];

const SECURITY_CATEGORIES = [
  { key: "secure",   label: "Secure",   color: "#1C3A5F" },
  { key: "unsecure", label: "Unsecure", color: "#3B82C4" },
  { key: "visa",     label: "Visa",     color: "#93C5E8" },
  { key: "paypal",   label: "Paypal",   color: "#C9E3F5" },
];

function makeCurrencyData(n = 30) {
  return Array.from({ length: n }, (_, i) => ({
    name: i % 10 === 0 ? `${String(i + 1).padStart(2, "0")} Mag 20` : "",
    euro:    Math.round(20 + Math.random() * 35),
    dollari: Math.round(10 + Math.random() * 25),
    sterline:Math.round(5  + Math.random() * 20),
    franchi: Math.round(2  + Math.random() * 10),
  }));
}

function makeSecurityData(n = 20) {
  return Array.from({ length: n }, (_, i) => ({
    name: i % 10 === 0 ? `${String(i + 1).padStart(2, "0")} Mag 20` : "",
    secure:   Math.round(25 + Math.random() * 30),
    unsecure: Math.round(8  + Math.random() * 18),
    visa:     Math.round(5  + Math.random() * 15),
    paypal:   Math.round(2  + Math.random() * 10),
  }));
}

const CURRENCY_DATA    = makeCurrencyData();
const SECURITY_DATA    = makeSecurityData();

const CURRENCY_METRICS = [
  { label: "Scontrino Medio", badge: { value: "12%", direction: "up" as const }, primary: "€ 237,20", secondary: "/ € 135,00" },
  { label: "Pagamenti Riusciti", badge: { value: "12%", direction: "up" as const }, primary: "92%", secondary: "/ € 135,00" },
];

const ITALIAN_PERIODS = ["Ultimi 30 giorni", "Ultimi 7 giorni", "Ultimi 90 giorni", "Quest'anno"];

// ── Stories — Italian finance reproductions ────────────────────────────────────

export const AltreValuteFull: Story = {
  name: "ALTRE VALUTE — full (headlines + chart + metrics)",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='BarBreakdownCard variant="full"'
        description="Two currency headlines on the left, period selector on the right, stacked bar chart in the center, and metric rows in a right column."
      />
      <StorySection title="Wide card">
        <BarBreakdownCard
          title="ALTRE VALUTE"
          variant="full"
          headlines={[
            { flag: "🇪🇺", label: "Euro",    value: "€ 25.470,20" },
            { flag: "🇬🇧", label: "Sterline", value: "£ 18.320,70" },
          ]}
          categories={CURRENCY_CATEGORIES}
          data={CURRENCY_DATA}
          periodLabel="Date"
          periods={ITALIAN_PERIODS}
          defaultPeriod="Ultimi 30 giorni"
          metrics={CURRENCY_METRICS}
        />
      </StorySection>
    </StoryPanel>
  ),
};

export const AltreValuteStandard: Story = {
  name: "ALTRE VALUTE — one headline, no metrics",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="BarBreakdownCard — single headline"
        description="One currency headline + period selector + chart. No right metrics column."
      />
      <StorySection title="Medium card">
        <div className="max-w-[480px]">
          <BarBreakdownCard
            title="ALTRE VALUTE"
            variant="full"
            headlines={[{ flag: "🇪🇺", label: "Euro", value: "€ 25.470,20" }]}
            categories={CURRENCY_CATEGORIES}
            data={CURRENCY_DATA}
            periodLabel="Date"
            periods={ITALIAN_PERIODS}
            defaultPeriod="Ultimi 30 giorni"
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

export const SicurezzaCompact: Story = {
  name: 'SICUREZZA — variant="compact"',
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='BarBreakdownCard variant="compact"'
        description="No headline metrics — only period selector and stacked bar chart."
      />
      <StorySection title="Compact card">
        <div className="max-w-[340px]">
          <BarBreakdownCard
            title="SICUREZZA"
            variant="compact"
            categories={SECURITY_CATEGORIES}
            data={SECURITY_DATA}
            periodLabel="Data"
            periods={ITALIAN_PERIODS}
            defaultPeriod="Ultimi 30 giorni"
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

export const ScreenshotReproduction: Story = {
  name: "Screenshot reproduction — 3-card row",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="flex flex-wrap gap-4 bg-ds-canvas p-8 items-start">
      {/* Wide — two headlines + metrics */}
      <div className="flex-[2] min-w-[500px]">
        <BarBreakdownCard
          title="ALTRE VALUTE"
          variant="full"
          headlines={[
            { flag: "🇪🇺", label: "Euro",    value: "€ 25.470,20" },
            { flag: "🇬🇧", label: "Sterline", value: "£ 18.320,70" },
          ]}
          categories={CURRENCY_CATEGORIES}
          data={CURRENCY_DATA}
          periodLabel="Date"
          periods={ITALIAN_PERIODS}
          defaultPeriod="Ultimi 30 giorni"
          metrics={CURRENCY_METRICS}
        />
      </div>
      {/* Medium — one headline */}
      <div className="flex-1 min-w-[320px]">
        <BarBreakdownCard
          title="ALTRE VALUTE"
          variant="full"
          headlines={[{ flag: "🇪🇺", label: "Euro", value: "€ 25.470,20" }]}
          categories={CURRENCY_CATEGORIES}
          data={CURRENCY_DATA}
          periodLabel="Date"
          periods={ITALIAN_PERIODS}
          defaultPeriod="Ultimi 30 giorni"
        />
      </div>
      {/* Compact — no headline */}
      <div className="w-[280px] shrink-0">
        <BarBreakdownCard
          title="SICUREZZA"
          variant="compact"
          categories={SECURITY_CATEGORIES}
          data={SECURITY_DATA}
          periodLabel="Data"
          periods={ITALIAN_PERIODS}
          defaultPeriod="Ultimi 30 giorni"
        />
      </div>
    </div>
  ),
};

// ── Stories — SaaS tools ───────────────────────────────────────────────────────

const PLAN_CATEGORIES = [
  { key: "enterprise", label: "Enterprise", color: "#1C3A5F" },
  { key: "business",   label: "Business",   color: "#3B82C4" },
  { key: "pro",        label: "Pro",        color: "#93C5E8" },
  { key: "starter",    label: "Starter",    color: "#C9E3F5" },
];

const CHANNEL_CATEGORIES = [
  { key: "organic",  label: "Organic",  color: "#1C3A5F" },
  { key: "paid",     label: "Paid Ads", color: "#3B82C4" },
  { key: "referral", label: "Referral", color: "#93C5E8" },
  { key: "direct",   label: "Direct",   color: "#C9E3F5" },
];

const SAAS_PERIODS = ["Last 30 days", "Last 7 days", "Last 90 days", "This year"];

function makeWeeklyData(keys: string[], n = 28) {
  return Array.from({ length: n }, (_, i) => {
    const entry: Record<string, string | number> = {
      name: i % 7 === 0 ? `Week ${Math.floor(i / 7) + 1}` : "",
    };
    keys.forEach((k) => { entry[k] = Math.round(5 + Math.random() * 40); });
    return entry;
  });
}

const PLAN_DATA    = makeWeeklyData(["enterprise", "business", "pro", "starter"]);
const CHANNEL_DATA = makeWeeklyData(["organic", "paid", "referral", "direct"]);

export const SaasRevenuePlan: Story = {
  name: "SaaS — Revenue by plan",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="SaaS — Revenue by plan"
        description="Monthly recurring revenue split across pricing tiers. Full variant with headline MRR value and key SaaS metrics."
      />
      <StorySection title="MRR breakdown">
        <BarBreakdownCard
          title="REVENUE"
          variant="full"
          headlines={[{ label: "MRR", value: "$128,400" }]}
          categories={PLAN_CATEGORIES}
          data={PLAN_DATA}
          periodLabel="Period"
          periods={SAAS_PERIODS}
          defaultPeriod="Last 30 days"
          metrics={[
            { label: "Avg Revenue / User", badge: { value: "9%", direction: "up" }, primary: "$94.20", secondary: "/ $86.00" },
            { label: "Expansion MRR",      badge: { value: "5%", direction: "up" }, primary: "$12,840" },
          ]}
        />
      </StorySection>
    </StoryPanel>
  ),
};

export const SaasSignupsByChannel: Story = {
  name: "SaaS — Signups by channel",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="SaaS — Signups by acquisition channel"
        description="Weekly signup volume broken down by acquisition channel. Compact variant for a narrow dashboard slot."
      />
      <StorySection title="Signups">
        <div className="max-w-[360px]">
          <BarBreakdownCard
            title="SIGNUPS"
            variant="compact"
            categories={CHANNEL_CATEGORIES}
            data={CHANNEL_DATA}
            periodLabel="Period"
            periods={SAAS_PERIODS}
            defaultPeriod="Last 30 days"
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

export const SaasDashboardRow: Story = {
  name: "SaaS — Dashboard row",
  parameters: { layout: "fullscreen" },
  render: () => (
    <div className="flex flex-wrap gap-4 bg-ds-canvas p-8 items-start">
      <div className="flex-[2] min-w-[480px]">
        <BarBreakdownCard
          title="REVENUE"
          variant="full"
          headlines={[{ label: "MRR", value: "$128,400" }]}
          categories={PLAN_CATEGORIES}
          data={PLAN_DATA}
          periodLabel="Period"
          periods={SAAS_PERIODS}
          defaultPeriod="Last 30 days"
          metrics={[
            { label: "Avg Revenue / User", badge: { value: "9%", direction: "up" }, primary: "$94.20", secondary: "/ $86.00" },
            { label: "Expansion MRR",      badge: { value: "5%", direction: "up" }, primary: "$12,840" },
          ]}
        />
      </div>
      <div className="flex-1 min-w-[280px]">
        <BarBreakdownCard
          title="SIGNUPS"
          variant="compact"
          categories={CHANNEL_CATEGORIES}
          data={CHANNEL_DATA}
          periodLabel="Period"
          periods={SAAS_PERIODS}
          defaultPeriod="Last 30 days"
        />
      </div>
    </div>
  ),
};
