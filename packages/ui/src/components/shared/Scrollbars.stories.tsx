import type { CSSProperties } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StoryStack,
  StorySurface,
} from "./storybook";

type OverflowMode = "auto" | "hidden" | "scroll";

interface ScrollbarPlaygroundProps {
  readonly hideScrollbar: boolean;
  readonly overflowX: OverflowMode;
  readonly overflowY: OverflowMode;
  readonly panelHeight: number;
  readonly scrollbarSize: number;
  readonly trackColor: string;
  readonly thumbColor: string;
  readonly thumbHoverColor: string;
}

type ScrollbarVars = CSSProperties & {
  "--ds-scrollbar-size": string;
  "--ds-scrollbar-track": string;
  "--ds-scrollbar-track-shadow": string;
  "--ds-scrollbar-thumb": string;
  "--ds-scrollbar-thumb-hover": string;
};

const queueCards = [
  {
    title: "Ops Queue",
    metric: "18 ready",
    note: "Shipment approvals waiting for finance sign-off.",
  },
  {
    title: "Regional Launch",
    metric: "6 markets",
    note: "Content variants lined up for staggered release windows.",
  },
  {
    title: "QA Sweep",
    metric: "92% pass",
    note: "Remaining issues are visual polish and empty-state copy.",
  },
  {
    title: "Customer Voice",
    metric: "241 notes",
    note: "Clustered feedback imported from support and sales handoff.",
  },
  {
    title: "Forecast",
    metric: "+14%",
    note: "Pipeline momentum increased after the pricing update.",
  },
  {
    title: "Retention",
    metric: "4 cohorts",
    note: "Enterprise churn is stable; SMB needs a new activation pass.",
  },
  {
    title: "Billing",
    metric: "3 flags",
    note: "Tax region mappings still need a manual review before export.",
  },
  {
    title: "Inventory",
    metric: "28 alerts",
    note: "Low-stock items are concentrated in the north warehouse.",
  },
  {
    title: "Insights",
    metric: "11 feeds",
    note: "Analysts requested a cleaner hidden-scrollbar mode for boards.",
  },
];

const laneLabels = [
  "Pipeline",
  "Finance",
  "Content",
  "Automation",
  "Support",
  "Risk",
  "Growth",
  "Fulfillment",
  "AI Ops",
  "Mobile",
];

function getScrollbarStyle(args: ScrollbarPlaygroundProps): ScrollbarVars {
  return {
    "--ds-scrollbar-size": `${args.scrollbarSize}px`,
    "--ds-scrollbar-track": args.trackColor,
    "--ds-scrollbar-track-shadow": `inset 0 0 0 1px color-mix(in oklch, ${args.trackColor} 36%, transparent)`,
    "--ds-scrollbar-thumb": args.thumbColor,
    "--ds-scrollbar-thumb-hover": args.thumbHoverColor,
    height: `${args.panelHeight}px`,
    overflowX: args.overflowX,
    overflowY: args.overflowY,
  };
}

function ScrollbarPlayground(args: ScrollbarPlaygroundProps) {
  const previewClassName = [
    "ui:rounded-2xl ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4 ui:shadow-inner ui:outline-none focus-visible:ui:ring-2 focus-visible:ui:ring-ds-focus",
    args.hideScrollbar ? "scrollbar-none" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl">
      <StoryStack className="ui:gap-5">
        <StoryIntro
          title="Scrollbar playground"
          description="Use the controls to compare the shared themed scrollbar with the hidden-scrollbar utility and choose the overflow behavior you want in web and Storybook."
        />

        <div className="ui:grid ui:gap-4 xl:ui:grid-cols-[minmax(0,1fr)_320px]">
          <StoryPanel className="ui:space-y-4 ui:p-4">
            <div className="ui:flex ui:flex-wrap ui:gap-2">
              {laneLabels.map((label) => (
                <span
                  key={label}
                  className="ui:rounded-full ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:text-ds-1"
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              aria-label="Scrollbar preview"
              className={previewClassName}
              style={getScrollbarStyle(args)}
              tabIndex={0}
            >
              <div className="ui:min-w-[920px] ui:space-y-3 ui:pr-3">
                {queueCards.map((card) => (
                  <article
                    key={card.title}
                    className="ui:grid ui:grid-cols-[180px_minmax(0,1fr)] ui:gap-4 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4"
                  >
                    <div>
                      <p className="ui:text-xs ui:font-semibold ui:uppercase ui:tracking-[0.16em] ui:text-ds-2">
                        {card.title}
                      </p>
                      <p className="ui:mt-2 ui:text-2xl ui:font-semibold ui:text-ds-1">
                        {card.metric}
                      </p>
                    </div>
                    <p className="ui:text-sm ui:leading-6 ui:text-ds-2">
                      {card.note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </StoryPanel>

          <StorySection className="ui:space-y-4">
            <StoryPanel className="ui:space-y-3 ui:p-5">
              <StoryIntro
                title="Current setup"
                description="These values map directly to the shared foundation CSS custom properties."
              />
              <dl className="ui:space-y-2 ui:text-sm ui:text-ds-2">
                <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
                  <dt className="ui:font-medium ui:text-ds-1">hide utility</dt>
                  <dd>
                    {args.hideScrollbar ? "scrollbar-none" : "themed default"}
                  </dd>
                </div>
                <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
                  <dt className="ui:font-medium ui:text-ds-1">overflow-x</dt>
                  <dd>{args.overflowX}</dd>
                </div>
                <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
                  <dt className="ui:font-medium ui:text-ds-1">overflow-y</dt>
                  <dd>{args.overflowY}</dd>
                </div>
                <div className="ui:flex ui:items-center ui:justify-between ui:gap-3">
                  <dt className="ui:font-medium ui:text-ds-1">size</dt>
                  <dd>{args.scrollbarSize}px</dd>
                </div>
              </dl>
            </StoryPanel>

            <StoryPanel className="ui:space-y-3 ui:p-5">
              <StoryIntro
                title="Use in app code"
                description="Keep scrolling enabled with overflow auto or lock it completely with overflow hidden."
              />
              <pre className="ui:overflow-x-auto ui:rounded-xl ui:bg-slate-950 ui:p-4 ui:text-xs ui:leading-6 ui:text-slate-100">
                {`<div className="scrollbar-none" style={{ overflowX: "${args.overflowX}", overflowY: "${args.overflowY}" }}>
  ...content
</div>`}
              </pre>
            </StoryPanel>
          </StorySection>
        </div>
      </StoryStack>
    </StorySurface>
  );
}

const meta = {
  title: "Foundations/Scrollbar",
  component: ScrollbarPlayground,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Shared scrollbar foundation styles for the package. The default behavior uses the themed scrollbar tokens, and the `scrollbar-none` utility hides the browser chrome while preserving scroll unless you explicitly switch overflow to hidden.",
      },
    },
  },
  args: {
    hideScrollbar: false,
    overflowX: "auto",
    overflowY: "auto",
    panelHeight: 360,
    scrollbarSize: 4,
    trackColor: "color-mix(in oklch, var(--ds-color-border) 55%, transparent)",
    thumbColor:
      "color-mix(in oklch, var(--ds-color-accent) 72%, var(--ds-color-bg-surface))",
    thumbHoverColor: "var(--ds-color-accent-hover)",
  },
  argTypes: {
    hideScrollbar: { control: "boolean" },
    overflowX: {
      control: "select",
      options: ["auto", "scroll", "hidden"],
    },
    overflowY: {
      control: "select",
      options: ["auto", "scroll", "hidden"],
    },
    panelHeight: {
      control: { type: "number", min: 220, max: 560, step: 20 },
    },
    scrollbarSize: {
      control: { type: "number", min: 0, max: 16, step: 1 },
    },
    trackColor: { control: "text" },
    thumbColor: { control: "text" },
    thumbHoverColor: { control: "text" },
  },
} satisfies Meta<typeof ScrollbarPlayground>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const HiddenScrollbar: Story = {
  args: {
    hideScrollbar: true,
  },
};

export const OverflowLocked: Story = {
  args: {
    hideScrollbar: true,
    overflowX: "hidden",
    overflowY: "hidden",
  },
};
