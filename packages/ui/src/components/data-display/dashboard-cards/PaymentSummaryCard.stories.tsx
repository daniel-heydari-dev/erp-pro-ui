import type { Meta, StoryObj } from "@storybook/react-vite";

import { StoryIntro, StoryPanel, StorySection, StoryStack } from "../../shared/storybook";
import { PaymentSummaryCard } from "./PaymentSummaryCard";

// ── Shared data ───────────────────────────────────────────────────────────────

const SICUREZZA_DATA = [
  { name: "Autorizzati",  value: 62, color: "#1C3A5F" },
  { name: "Rimborsati",   value: 18, color: "#3B82C4" },
  { name: "Catturati",    value: 12, color: "#93C5E8" },
  { name: "Altro",        value:  8, color: "#C9E3F5" },
];

const SICUREZZA_FALLITI_DATA = [
  { name: "Autorizzati",  value: 56, color: "#1C3A5F" },
  { name: "Falliti",      value: 22, color: "#3B82C4" },
  { name: "Catturati",    value: 14, color: "#93C5E8" },
  { name: "Altro",        value:  8, color: "#C9E3F5" },
];

const METODI_DATA = [
  { name: "Carte di credito", value: 48, color: "#1C3A5F" },
  { name: "Wallet",           value: 28, color: "#3B82C4" },
  { name: "QR Code",          value: 16, color: "#93C5E8" },
  { name: "Altro",            value:  8, color: "#C9E3F5" },
];

const SICUREZZA_METRICS = [
  {
    label: "Scontrino Medio",
    badge: { value: "12%", direction: "up" as const },
    primary: "€ 237,20",
    secondary: "/ € 135,00",
  },
  {
    label: "Pagamenti Riusciti",
    badge: { value: "12%", direction: "up" as const },
    primary: "92%",
    secondary: "/ € 135,00",
  },
];

// ── Meta ──────────────────────────────────────────────────────────────────────

const meta: Meta<typeof PaymentSummaryCard> = {
  title: "Data Display / Dashboard Cards / Dashboard / PaymentSummaryCard",
  component: PaymentSummaryCard,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Financial summary card combining a donut chart, period selector, and optional metric rows. " +
          "Use `variant=\"full\"` for a two-column layout with a value headline and metrics column, " +
          "or `variant=\"compact\"` for a lighter card showing only the period selector and chart.",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PaymentSummaryCard>;

// ── Stories ───────────────────────────────────────────────────────────────────

export const FullVariant: Story = {
  name: 'variant="full" — value + donut + metrics',
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='PaymentSummaryCard variant="full"'
        description="Two-column layout. Left: section label, value headline, donut chart with legend. Right: period selector and metric rows."
      />
      <StorySection title="SICUREZZA — Rimborsati legend">
        <div className="max-w-[560px]">
          <PaymentSummaryCard
            title="SICUREZZA"
            variant="full"
            valueLabel="Entrate nel periodo"
            valueBadge={{ value: "12%", direction: "up" }}
            value="€ 925.470,20"
            periodLabel="Date"
            periods={["Ultimi 30 giorni", "Ultimi 7 giorni", "Ultimi 90 giorni", "Quest'anno"]}
            defaultPeriod="Ultimi 30 giorni"
            data={SICUREZZA_DATA}
            metrics={SICUREZZA_METRICS}
          />
        </div>
      </StorySection>

      <StorySection title="SICUREZZA — Falliti legend">
        <div className="max-w-[560px]">
          <PaymentSummaryCard
            title="SICUREZZA"
            variant="full"
            valueLabel="Entrate nel periodo"
            valueBadge={{ value: "12%", direction: "up" }}
            value="€ 925.470,20"
            periodLabel="Date"
            defaultPeriod="Ultimi 30 giorni"
            data={SICUREZZA_FALLITI_DATA}
            metrics={SICUREZZA_METRICS}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

export const CompactVariant: Story = {
  name: 'variant="compact" — period + legend + donut',
  render: () => (
    <StoryPanel>
      <StoryIntro
        title='PaymentSummaryCard variant="compact"'
        description="Single-column layout. Period selector at top, legend and donut chart below. No value headline or metrics."
      />
      <StorySection title="METODI — Payment methods">
        <div className="max-w-[280px]">
          <PaymentSummaryCard
            title="METODI"
            variant="compact"
            periodLabel="Data"
            defaultPeriod="Ultimi 30 giorni"
            data={METODI_DATA}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};

export const ScreenshotReproduction: Story = {
  name: "Screenshot reproduction — 3-card row",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "Reproduces the three-card row from the design reference: two SICUREZZA full cards and one METODI compact card.",
      },
    },
  },
  render: () => (
    <div className="flex flex-wrap gap-4 bg-ds-canvas p-8">
      {/* Card 1 — SICUREZZA / Rimborsati */}
      <div className="flex-1 min-w-[420px]">
        <PaymentSummaryCard
          title="SICUREZZA"
          variant="full"
          valueLabel="Entrate nel periodo"
          valueBadge={{ value: "12%", direction: "up" }}
          value="€ 925.470,20"
          periodLabel="Date"
          defaultPeriod="Ultimi 30 giorni"
          data={SICUREZZA_DATA}
          metrics={SICUREZZA_METRICS}
        />
      </div>

      {/* Card 2 — SICUREZZA / Falliti */}
      <div className="flex-1 min-w-[420px]">
        <PaymentSummaryCard
          title="SICUREZZA"
          variant="full"
          valueLabel="Entrate nel periodo"
          valueBadge={{ value: "12%", direction: "up" }}
          value="€ 925.470,20"
          periodLabel="Date"
          defaultPeriod="Ultimi 30 giorni"
          data={SICUREZZA_FALLITI_DATA}
          metrics={SICUREZZA_METRICS}
        />
      </div>

      {/* Card 3 — METODI / compact */}
      <div className="w-[260px] shrink-0">
        <PaymentSummaryCard
          title="METODI"
          variant="compact"
          periodLabel="Data"
          defaultPeriod="Ultimi 30 giorni"
          data={METODI_DATA}
        />
      </div>
    </div>
  ),
};

export const DownTrend: Story = {
  name: "Down-trend badge",
  render: () => (
    <StoryPanel>
      <StoryIntro
        title="Down-trend"
        description="valueBadge direction=down renders in danger color."
      />
      <StorySection title="Example">
        <div className="max-w-[560px]">
          <PaymentSummaryCard
            title="RICAVI"
            variant="full"
            valueLabel="Entrate nel periodo"
            valueBadge={{ value: "3%", direction: "down" }}
            value="€ 412.880,00"
            periodLabel="Date"
            defaultPeriod="Ultimi 7 giorni"
            data={[
              { name: "Autorizzati",  value: 48, color: "#1C3A5F" },
              { name: "Rimborsati",   value: 28, color: "#3B82C4" },
              { name: "Falliti",      value: 16, color: "#EA5455" },
              { name: "Altro",        value:  8, color: "#C9E3F5" },
            ]}
            metrics={[
              { label: "Scontrino Medio", badge: { value: "3%", direction: "down" }, primary: "€ 198,40", secondary: "/ € 204,00" },
              { label: "Tasso Successo",  badge: { value: "1%", direction: "down" }, primary: "88%",       secondary: "/ 92%" },
            ]}
          />
        </div>
      </StorySection>
    </StoryPanel>
  ),
};
