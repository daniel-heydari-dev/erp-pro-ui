import type { CSSProperties } from "react";
import { useState } from "react";

import { Input, Select, Switch } from "erp-pro-ui";

import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

type OverflowMode = "auto" | "hidden" | "scroll";

type ScrollbarVars = CSSProperties & {
  "--ds-scrollbar-size": string;
  "--ds-scrollbar-track": string;
  "--ds-scrollbar-track-shadow": string;
  "--ds-scrollbar-thumb": string;
  "--ds-scrollbar-thumb-hover": string;
};

const overflowOptions = [
  { value: "auto", label: "auto" },
  { value: "scroll", label: "scroll" },
  { value: "hidden", label: "hidden" },
] as const;

const queueCards = [
  {
    title: "Ops Queue",
    metric: "18 ready",
    note: "Shipment approvals are waiting for finance sign-off before release.",
  },
  {
    title: "Regional Launch",
    metric: "6 markets",
    note: "Content variants are lined up for staggered go-live windows.",
  },
  {
    title: "QA Sweep",
    metric: "92% pass",
    note: "Remaining issues are mostly visual polish and empty-state copy.",
  },
  {
    title: "Customer Voice",
    metric: "241 notes",
    note: "Support and sales handoff notes are ready for clustering.",
  },
  {
    title: "Forecast",
    metric: "+14%",
    note: "Pipeline momentum increased after the packaging and pricing update.",
  },
  {
    title: "Retention",
    metric: "4 cohorts",
    note: "Enterprise churn is stable; SMB needs a tighter activation pass.",
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

function getScrollbarStyle(options: {
  panelHeight: number;
  scrollbarSize: number;
  trackColor: string;
  thumbColor: string;
  thumbHoverColor: string;
  overflowX: OverflowMode;
  overflowY: OverflowMode;
}): ScrollbarVars {
  return {
    "--ds-scrollbar-size": `${options.scrollbarSize}px`,
    "--ds-scrollbar-track": options.trackColor,
    "--ds-scrollbar-track-shadow": `inset 0 0 0 1px color-mix(in oklch, ${options.trackColor} 36%, transparent)`,
    "--ds-scrollbar-thumb": options.thumbColor,
    "--ds-scrollbar-thumb-hover": options.thumbHoverColor,
    height: `${options.panelHeight}px`,
    overflowX: options.overflowX,
    overflowY: options.overflowY,
  };
}

const ScrollbarDoc = () => {
  const [hideScrollbar, setHideScrollbar] = useState(false);
  const [overflowX, setOverflowX] = useState<OverflowMode>("auto");
  const [overflowY, setOverflowY] = useState<OverflowMode>("auto");
  const [panelHeight, setPanelHeight] = useState(360);
  const [scrollbarSize, setScrollbarSize] = useState(4);
  const [trackColor, setTrackColor] = useState(
    "color-mix(in oklch, var(--ds-color-border) 55%, transparent)",
  );
  const [thumbColor, setThumbColor] = useState(
    "color-mix(in oklch, var(--ds-color-accent) 72%, var(--ds-color-bg-surface))",
  );
  const [thumbHoverColor, setThumbHoverColor] = useState(
    "var(--ds-color-accent-hover)",
  );

  const previewClassName = [
    "rounded-2xl border border-neutral-200 bg-white p-4 shadow-inner transition dark:border-neutral-800 dark:bg-neutral-900",
    hideScrollbar ? "scrollbar-none" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Scrollbar</h1>
      <p className="docs-paragraph">
        The shared stylesheet now includes themed scrollbar tokens plus a
        reusable <code>scrollbar-none</code> utility. Use this page to compare
        visible and hidden scrollbar behavior before you settle on the version
        you want in product screens.
      </p>

      <h2 className="docs-category-subtitle">Interactive Playground</h2>
      <p className="docs-paragraph mb-4">
        Toggle hidden mode, change overflow behavior, and adjust the token
        values that drive the shared scrollbar styling.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-6 xl:grid-cols-[minmax(0,1fr)_22rem]">
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {laneLabels.map((label) => (
                <span
                  key={label}
                  className="rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  {label}
                </span>
              ))}
            </div>

            <div
              className={previewClassName}
              style={getScrollbarStyle({
                panelHeight,
                scrollbarSize,
                trackColor,
                thumbColor,
                thumbHoverColor,
                overflowX,
                overflowY,
              })}
            >
              <div className="min-w-230 space-y-3 pr-3">
                {queueCards.map((card) => (
                  <article
                    key={card.title}
                    className="grid grid-cols-[11rem_minmax(0,1fr)] gap-4 rounded-xl border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-950"
                  >
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-neutral-500 dark:text-neutral-400">
                        {card.title}
                      </p>
                      <p className="mt-2 text-2xl font-semibold text-accent">
                        {card.metric}
                      </p>
                    </div>
                    <p className="text-sm leading-6 text-neutral-600 dark:text-neutral-300">
                      {card.note}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="mb-4 text-sm font-semibold text-neutral-900 dark:text-white">
                Playground controls
              </p>
              <div className="space-y-4">
                <Switch
                  label="Hide scrollbar chrome"
                  checked={hideScrollbar}
                  onChange={(event) => setHideScrollbar(event.target.checked)}
                />
                <Select
                  label="Overflow X"
                  value={overflowX}
                  onChange={(event) =>
                    setOverflowX(event.target.value as OverflowMode)
                  }
                  options={overflowOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                />
                <Select
                  label="Overflow Y"
                  value={overflowY}
                  onChange={(event) =>
                    setOverflowY(event.target.value as OverflowMode)
                  }
                  options={overflowOptions.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                />
                <Input
                  label="Panel height"
                  type="number"
                  value={String(panelHeight)}
                  onChange={(event) =>
                    setPanelHeight(Number(event.target.value) || 0)
                  }
                />
                <Input
                  label="Scrollbar size"
                  type="number"
                  value={String(scrollbarSize)}
                  onChange={(event) =>
                    setScrollbarSize(Number(event.target.value) || 0)
                  }
                />
                <Input
                  label="Track color"
                  value={trackColor}
                  onChange={(event) => setTrackColor(event.target.value)}
                />
                <Input
                  label="Thumb color"
                  value={thumbColor}
                  onChange={(event) => setThumbColor(event.target.value)}
                />
                <Input
                  label="Thumb hover color"
                  value={thumbHoverColor}
                  onChange={(event) => setThumbHoverColor(event.target.value)}
                />
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
              <p className="text-sm font-semibold text-neutral-900 dark:text-white">
                Current mode
              </p>
              <dl className="mt-3 space-y-2 text-sm text-neutral-600 dark:text-neutral-300">
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium text-neutral-900 dark:text-white">
                    utility
                  </dt>
                  <dd>{hideScrollbar ? "scrollbar-none" : "themed default"}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium text-neutral-900 dark:text-white">
                    overflow-x
                  </dt>
                  <dd>{overflowX}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium text-neutral-900 dark:text-white">
                    overflow-y
                  </dt>
                  <dd>{overflowY}</dd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <dt className="font-medium text-neutral-900 dark:text-white">
                    size
                  </dt>
                  <dd>{scrollbarSize}px</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock
        code={`/* Shared utility from erp-pro-ui/styles.css */
.scrollbar-none {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.scrollbar-none::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}`}
      />

      <CodeBlock
        code={`<div
  className="scrollbar-none"
  style={{
    overflowX: '${overflowX}',
    overflowY: '${overflowY}',
    '--ds-scrollbar-size': '${scrollbarSize}px',
    '--ds-scrollbar-thumb': '${thumbColor}',
  }}
>
  ...scroll content
</div>`}
      />

      <DocsButtonBar
        prev={{ label: "Search", route: "/ui-basics/search" }}
        next={{ label: "Preview", route: "/ui-basics/preview" }}
      />
    </section>
  );
};

export default ScrollbarDoc;
