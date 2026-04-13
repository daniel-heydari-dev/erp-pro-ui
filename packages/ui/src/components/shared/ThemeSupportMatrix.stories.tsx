import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Alert } from "../feedback/alert";
import { PieChart } from "../data-display/charts/PieChart";
import { ThinBreakdownBar } from "../data-display/charts/ThinBreakdownBar";
import { Chip } from "../data-display/chip";
import { Card } from "../data-display/card";
import { Button } from "../forms/button";
import { Checkbox } from "../forms/checkbox";
import { Input } from "../forms/input";
import { Radio } from "../forms/radio";
import { Switch } from "../forms/switch";
import { Textarea } from "../forms/textarea";
import { Accordion } from "../navigation/accordion";
import { Stepper } from "../navigation/stepper";
import { Dialog } from "../overlays/dialog";
import { Drawer } from "../overlays/drawer";
import { Tooltip } from "../overlays/tooltip";
import { StorySurface } from "./storybook";

const brands = ["purple", "teal", "yellow", "green"] as const;
const modes = ["light", "dark"] as const;
const themeBreakdown = [
  { label: "Accent", value: 42, color: "var(--ds-color-accent)" },
  { label: "Info", value: 23, color: "var(--ds-color-info)" },
  { label: "Success", value: 19, color: "var(--ds-color-success)" },
  { label: "Warning", value: 10, color: "var(--ds-color-warning)" },
  { label: "Danger", value: 6, color: "var(--ds-color-danger)" },
] as const;
const themeDistribution = [
  { name: "Accent", value: 38 },
  { name: "Success", value: 24 },
  { name: "Warning", value: 18 },
  { name: "Info", value: 12 },
  { name: "Danger", value: 8 },
] as const;
const themeDistributionColors = [
  "var(--ds-color-accent)",
  "var(--ds-color-success)",
  "var(--ds-color-warning)",
  "var(--ds-color-info)",
  "var(--ds-color-danger)",
];
const navigationSteps = [
  { id: "scope", title: "Scope", description: "Select branches" },
  { id: "review", title: "Review", description: "Validate rules" },
  { id: "launch", title: "Launch", description: "Release workflow" },
];
const navigationItems = [
  {
    id: "nav-1",
    title: "Release notes",
    description: "Current rollout summary",
    content:
      "Navigation surfaces should preserve readable borders, muted labels, and active accent emphasis under every theme pair.",
  },
  {
    id: "nav-2",
    title: "Approval routing",
    content:
      "Accordions and steppers should keep hierarchy and progress legibility without depending on a single hardcoded hue.",
  },
];

const meta: Meta = {
  title: "Verification/ThemeSupport",
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Brand and mode verification matrix for core form and feedback primitives. Each tile applies data-brand and data-mode directly to validate accent, status, border, and foreground tokens under every supported theme pair.",
      },
    },
  },
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof meta>;

function ThemeSupportCard({
  brand,
  mode,
}: {
  brand: (typeof brands)[number];
  mode: (typeof modes)[number];
}) {
  return (
    <section
      data-brand={brand}
      data-mode={mode}
      className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4 ui:shadow-sm"
    >
      <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">{brand}</p>
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
            {mode}
          </p>
        </div>
        <span className="ui:rounded-full ui:bg-ds-accent-subtle ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:text-ds-1">
          accent
        </span>
      </div>

      <div className="ui:space-y-4 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4">
        <div className="ui:space-y-3">
          <Input
            label="Workspace name"
            placeholder="Northstar Retail"
            helperText="Uses accent hover and focus states from the active brand."
          />
          <Input
            label="Approval code"
            placeholder="INV-204"
            error="Required before publishing changes."
          />
          <Textarea
            label="Launch notes"
            rows={3}
            placeholder="Summarize rollout constraints and support handoff details."
          />
        </div>

        <div className="ui:flex ui:flex-wrap ui:gap-4">
          <Checkbox label="Email summary" checked readOnly />
          <Radio label="Default brand" checked readOnly />
          <Switch label="Live sync" checked readOnly />
        </div>

        <div className="ui:flex ui:flex-wrap ui:gap-2">
          <Button primary label="Save changes" />
          <Button label="Cancel" />
        </div>

        <div className="ui:space-y-2">
          <Alert
            variant="info"
            title="Sync queued"
            description="Background processing picks up changes in under 2 minutes."
          />
          <Alert
            variant="success"
            title="Validation passed"
            description="Accent, success, and border tokens are aligned for this theme pair."
          />
          <Alert
            variant="destructive"
            title="Billing action required"
            description="Critical states keep semantic danger styling independent from brand hue."
          />
        </div>
      </div>
    </section>
  );
}

function DataDisplayThemeCard({
  brand,
  mode,
}: {
  brand: (typeof brands)[number];
  mode: (typeof modes)[number];
}) {
  return (
    <section
      data-brand={brand}
      data-mode={mode}
      className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4 ui:shadow-sm"
    >
      <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">{brand}</p>
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
            {mode}
          </p>
        </div>
        <Chip variant="soft" color="primary">
          data display
        </Chip>
      </div>

      <div className="ui:space-y-4 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4">
        <Card
          title="Fulfillment health"
          description="Summary cards, chips, and proportion bars should inherit the same accent and status semantics as forms."
        />

        <div className="ui:flex ui:flex-wrap ui:gap-2">
          <Chip variant="filled" color="primary" dot>
            Default brand
          </Chip>
          <Chip variant="soft" color="success">
            97.8% on time
          </Chip>
          <Chip variant="outlined" color="warning">
            Review queue
          </Chip>
          <Chip variant="glass" color="info">
            Synced now
          </Chip>
        </div>

        <div className="ui:space-y-2">
          <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
            <p className="ui:text-sm ui:font-medium ui:text-ds-1">
              Semantic distribution
            </p>
            <p className="ui:text-xs ui:text-ds-2">Status mix</p>
          </div>
          <ThinBreakdownBar data={[...themeBreakdown]} showLabels={false} />
        </div>
      </div>
    </section>
  );
}

function ChartThemeCard({
  brand,
  mode,
}: {
  brand: (typeof brands)[number];
  mode: (typeof modes)[number];
}) {
  return (
    <section
      data-brand={brand}
      data-mode={mode}
      className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4 ui:shadow-sm"
    >
      <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">{brand}</p>
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
            {mode}
          </p>
        </div>
        <span className="ui:rounded-full ui:bg-info-subtle ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:text-info">
          charts
        </span>
      </div>

      <div className="ui:space-y-4 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4">
        <div className="ui:flex ui:flex-wrap ui:gap-2">
          <Chip variant="soft" color="primary">
            Accent
          </Chip>
          <Chip variant="soft" color="success">
            Success
          </Chip>
          <Chip variant="soft" color="warning">
            Warning
          </Chip>
        </div>

        <PieChart
          data={[...themeDistribution]}
          colors={themeDistributionColors}
          variant="donut"
          height={190}
        />
      </div>
    </section>
  );
}

function NavigationThemeCard({
  brand,
  mode,
}: {
  brand: (typeof brands)[number];
  mode: (typeof modes)[number];
}) {
  return (
    <section
      data-brand={brand}
      data-mode={mode}
      className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4 ui:shadow-sm"
    >
      <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">{brand}</p>
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
            {mode}
          </p>
        </div>
        <Chip variant="soft" color="primary">
          navigation
        </Chip>
      </div>

      <div className="ui:space-y-4 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4">
        <Stepper
          steps={navigationSteps}
          currentStep={1}
          completedSteps={[0]}
          orientation="vertical"
          variant="outlined"
          size="sm"
          showConnector
        />

        <Accordion items={navigationItems} defaultOpenIds={["nav-1"]} />
      </div>
    </section>
  );
}

function OverlayThemeCard({
  brand,
  mode,
}: {
  brand: (typeof brands)[number];
  mode: (typeof modes)[number];
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <section
      data-brand={brand}
      data-mode={mode}
      className="ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4 ui:shadow-sm"
    >
      <div className="ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-3">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">{brand}</p>
          <p className="ui:text-xs ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
            {mode}
          </p>
        </div>
        <span className="ui:rounded-full ui:bg-warning-subtle ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:text-warning">
          overlays
        </span>
      </div>

      <div className="ui:space-y-4 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4">
        <div className="ui:flex ui:flex-wrap ui:gap-2">
          <Tooltip
            content="Tooltip chrome should follow the active card theme too."
            position="top"
          >
            <Button label="Inspect tooltip" />
          </Tooltip>
          <Button
            label="Open dialog"
            primary
            onClick={() => setDialogOpen(true)}
          />
          <Button label="Open drawer" onClick={() => setDrawerOpen(true)} />
        </div>

        <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-surface-2 ui:p-3">
          <p className="ui:text-sm ui:font-medium ui:text-ds-1">
            Interactive overlay check
          </p>
          <p className="ui:mt-1 ui:text-xs ui:text-ds-2">
            Open the dialog or drawer from this tile to inspect overlay chrome,
            actions, and text against the current brand and mode.
          </p>
        </div>

        <Dialog
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          title="Approve rollout"
          description="Confirm this release window before the workflow moves into execution."
          preset="confirm"
          variant="info"
          confirmLabel="Approve"
          cancelLabel="Back"
        />

        <Drawer
          open={drawerOpen}
          onOpenChange={setDrawerOpen}
          position="right"
          title="Theme verification drawer"
          description="This side panel inherits the same semantic tokens from the active verification tile."
          footer={
            <div className="ui:flex ui:justify-end ui:gap-3">
              <Button label="Close" onClick={() => setDrawerOpen(false)} />
              <Button
                label="Apply"
                primary
                onClick={() => setDrawerOpen(false)}
              />
            </div>
          }
        >
          <div className="ui:space-y-3">
            <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
              <p className="ui:text-sm ui:font-medium ui:text-ds-1">
                Approval routing
              </p>
              <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
                Operations lead and finance reviewer must both confirm before
                release.
              </p>
            </div>
            <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
              <p className="ui:text-sm ui:font-medium ui:text-ds-1">Timing</p>
              <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
                Scheduled for 18:30 local time with stakeholder notification 15
                minutes before start.
              </p>
            </div>
          </div>
        </Drawer>
      </div>
    </section>
  );
}

export const BrandAndModeMatrix: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <div className="ui:space-y-6">
        <div className="ui:max-w-3xl ui:space-y-2">
          <h2 className="ui:text-2xl ui:font-semibold ui:text-ds-1">
            Form and feedback theme verification
          </h2>
          <p className="ui:text-sm ui:text-ds-2">
            This matrix exercises real controls and status components instead of
            token swatches so visual regressions show up where users actually
            interact with the system.
          </p>
        </div>

        <div className="ui:grid ui:grid-cols-1 ui:gap-4 lg:ui:grid-cols-2 xl:ui:grid-cols-4">
          {brands.flatMap((brand) =>
            modes.map((mode) => (
              <ThemeSupportCard
                key={`${brand}-${mode}`}
                brand={brand}
                mode={mode}
              />
            )),
          )}
        </div>
      </div>
    </StorySurface>
  ),
};

export const DataDisplayBrandAndModeMatrix: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <div className="ui:space-y-6">
        <div className="ui:max-w-3xl ui:space-y-2">
          <h2 className="ui:text-2xl ui:font-semibold ui:text-ds-1">
            Data display theme verification
          </h2>
          <p className="ui:text-sm ui:text-ds-2">
            Cards, chips, and compact proportional bars are rendered under each
            supported brand and mode pair so accent and status tokens can be
            checked in the same contexts users see in dashboards.
          </p>
        </div>

        <div className="ui:grid ui:grid-cols-1 ui:gap-4 lg:ui:grid-cols-2 xl:ui:grid-cols-4">
          {brands.flatMap((brand) =>
            modes.map((mode) => (
              <DataDisplayThemeCard
                key={`${brand}-${mode}`}
                brand={brand}
                mode={mode}
              />
            )),
          )}
        </div>
      </div>
    </StorySurface>
  ),
};

export const ChartBrandAndModeMatrix: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <div className="ui:space-y-6">
        <div className="ui:max-w-3xl ui:space-y-2">
          <h2 className="ui:text-2xl ui:font-semibold ui:text-ds-1">
            Chart theme verification
          </h2>
          <p className="ui:text-sm ui:text-ds-2">
            Compact chart cards verify that semantic accent, success, warning,
            info, and danger palettes remain legible and consistent across all
            shipped brands and modes.
          </p>
        </div>

        <div className="ui:grid ui:grid-cols-1 ui:gap-4 lg:ui:grid-cols-2 xl:ui:grid-cols-4">
          {brands.flatMap((brand) =>
            modes.map((mode) => (
              <ChartThemeCard
                key={`${brand}-${mode}`}
                brand={brand}
                mode={mode}
              />
            )),
          )}
        </div>
      </div>
    </StorySurface>
  ),
};

export const NavigationBrandAndModeMatrix: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <div className="ui:space-y-6">
        <div className="ui:max-w-3xl ui:space-y-2">
          <h2 className="ui:text-2xl ui:font-semibold ui:text-ds-1">
            Navigation theme verification
          </h2>
          <p className="ui:text-sm ui:text-ds-2">
            Stepper and accordion states are rendered under every brand and mode
            pair so active progress, separators, muted text, and content
            hierarchy can be checked in realistic navigation flows.
          </p>
        </div>

        <div className="ui:grid ui:grid-cols-1 ui:gap-4 lg:ui:grid-cols-2 xl:ui:grid-cols-4">
          {brands.flatMap((brand) =>
            modes.map((mode) => (
              <NavigationThemeCard
                key={`${brand}-${mode}`}
                brand={brand}
                mode={mode}
              />
            )),
          )}
        </div>
      </div>
    </StorySurface>
  ),
};

export const OverlayBrandAndModeMatrix: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full" className="ui:block ui:p-6">
      <div className="ui:space-y-6">
        <div className="ui:max-w-3xl ui:space-y-2">
          <h2 className="ui:text-2xl ui:font-semibold ui:text-ds-1">
            Overlay theme verification
          </h2>
          <p className="ui:text-sm ui:text-ds-2">
            Each tile provides a tooltip plus live dialog and drawer triggers so
            overlay surfaces can be inspected under every supported brand and
            mode combination.
          </p>
        </div>

        <div className="ui:grid ui:grid-cols-1 ui:gap-4 lg:ui:grid-cols-2 xl:ui:grid-cols-4">
          {brands.flatMap((brand) =>
            modes.map((mode) => (
              <OverlayThemeCard
                key={`${brand}-${mode}`}
                brand={brand}
                mode={mode}
              />
            )),
          )}
        </div>
      </div>
    </StorySurface>
  ),
};
