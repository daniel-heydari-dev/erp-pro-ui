import { useState } from "react";
import { DraggableGrid, BarChart, StatCard, MiniNeonSparkline, Button } from "erp-pro-ui";
import type { DraggableGridItem } from "erp-pro-ui";
import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

// ── Shared data ───────────────────────────────────────────────────────────────

const sparklinePoints = [
  { label: "Mon", value: 320 },
  { label: "Tue", value: 410 },
  { label: "Wed", value: 380 },
  { label: "Thu", value: 510 },
  { label: "Fri", value: 470 },
  { label: "Sat", value: 540 },
  { label: "Sun", value: 490 },
];

const barData = [
  { name: "Mon", v: 40 },
  { name: "Tue", v: 60 },
  { name: "Wed", v: 35 },
  { name: "Thu", v: 80 },
  { name: "Fri", v: 55 },
  { name: "Sat", v: 20 },
  { name: "Sun", v: 45 },
];

const barCategories = [{ key: "v", color: "var(--ds-color-accent)" }];

const DEMO_ITEMS: DraggableGridItem[] = [
  {
    id: "revenue",
    title: "Total Revenue",
    variant: "default",
    size: "small",
    component: (
      <StatCard
        title="Total Revenue"
        value="$84,320"
        dateRange="Last 30 days"
        badge={{ value: "12%", direction: "up" }}
        size="sm"
      />
    ),
  },
  {
    id: "orders",
    title: "New Orders",
    variant: "default",
    size: "small",
    component: (
      <StatCard
        title="New Orders"
        value="1,240"
        dateRange="Last 30 days"
        badge={{ value: "4%", direction: "up" }}
        size="sm"
      />
    ),
  },
  {
    id: "churn",
    title: "Churn Rate",
    variant: "default",
    size: "small",
    component: (
      <StatCard
        title="Churn Rate"
        value="2.8%"
        dateRange="Last 30 days"
        badge={{ value: "1%", direction: "down" }}
        size="sm"
      />
    ),
  },
  {
    id: "sparkline",
    title: "Revenue Trend",
    variant: "default",
    size: "medium",
    component: (
      <StatCard
        title="Revenue Trend"
        value="$94,280"
        dateRange="Jan 1 – Jan 31"
        badge={{ value: "8.2%", direction: "up" }}
        size="md"
        chart={<MiniNeonSparkline data={sparklinePoints} tone="info" height={52} />}
      />
    ),
  },
  {
    id: "weekly-sales",
    title: "Weekly Sales",
    variant: "default",
    size: "medium",
    component: <BarChart data={barData} categories={barCategories} height={200} />,
  },
];

// ── Live demo with edit toggle ────────────────────────────────────────────────

function LiveDemo() {
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <Button
          variant="secondary"
          size="small"
          onClick={() => setEditMode((v) => !v)}
        >
          {editMode ? "Exit Edit Mode" : "Enter Edit Mode"}
        </Button>
        {editMode && (
          <span className="text-xs text-ds-3">Drag to reorder · S/M/L to resize</span>
        )}
      </div>
      <DraggableGrid
        items={DEMO_ITEMS}
        editMode={editMode}
        showItemMenu={editMode}
        storageKey="docs-draggable-grid-demo"
      />
    </div>
  );
}

// ── Doc page ──────────────────────────────────────────────────────────────────

const DraggableGridDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Draggable Grid</h1>
      <p className="docs-paragraph">
        A drag-and-drop card grid powered by{" "}
        <code>@dnd-kit/core</code> and <code>@dnd-kit/sortable</code>. Cards
        can be reordered by dragging and resized via S / M / L chips. The order
        is optionally persisted to <code>localStorage</code> via{" "}
        <code>storageKey</code>.
      </p>
      <p className="docs-paragraph">
        Each item supports two variants: <code>default</code> wraps the
        component in a titled shell card, while <code>bare</code> renders the
        component as-is — useful when the child already has its own card
        styling.
      </p>

      {/* ── Live demo ─────────────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">Interactive demo</h2>
      <p className="docs-paragraph">
        Toggle edit mode to expose drag handles and size chips. The order is
        saved to <code>localStorage</code> and restored on page load.
      </p>
      <div className="docs-showcase-card h-auto p-6 block">
        <LiveDemo />
      </div>

      <CodeBlock
        code={`import { DraggableGrid, type DraggableGridItem } from 'erp-pro-ui';

const items: DraggableGridItem[] = [
  {
    id: "revenue",
    title: "Revenue",
    variant: "default",   // wrapped in a shell card
    size: "small",
    component: <MyRevenueCard />,
  },
  {
    id: "chart",
    variant: "bare",      // rendered as-is
    size: "medium",
    component: <MyChartCard />,
  },
];

<DraggableGrid
  items={items}
  editMode={isEditing}
  showItemMenu={isEditing}
  storageKey="my-dashboard-grid"
/>`}
      />

      {/* ── Size classes ──────────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">Item sizes</h2>
      <p className="docs-paragraph">
        Each item has a <code>size</code> prop that controls its column span.
        In edit mode the S / M / L chips let users switch sizes at runtime.
      </p>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Size</th>
              <th>Width</th>
              <th>Min height</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">small</td>
              <td>Full → 50% → 25% (2xl)</td>
              <td>360 px</td>
            </tr>
            <tr>
              <td className="docs-prop-name">medium</td>
              <td>Full → 50% (xl)</td>
              <td>420 px</td>
            </tr>
            <tr>
              <td className="docs-prop-name">large</td>
              <td>Full width always</td>
              <td>560 px</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* ── Props reference ───────────────────────────────────────────────── */}
      <h2 className="docs-category-subtitle">Props — DraggableGrid</h2>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Prop</th>
              <th>Type</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">items</td>
              <td><span className="docs-prop-type">DraggableGridItem[]</span></td>
              <td>—</td>
              <td>Array of card definitions. Each item must have a unique <code>id</code>.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">editMode</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Shows drag handles. Without this, the grid is view-only.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showItemMenu</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Shows S/M/L size chips on each card (requires <code>editMode</code>).</td>
            </tr>
            <tr>
              <td className="docs-prop-name">storageKey</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>—</td>
              <td>When set, persists the card order to <code>localStorage</code> under this key.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onItemsChange</td>
              <td><span className="docs-prop-type">(items: DraggableGridItem[]) =&gt; void</span></td>
              <td>—</td>
              <td>Fires after a drag ends with the new ordered array.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onItemSizeChange</td>
              <td><span className="docs-prop-type">(id: string, size: DraggableGridItemSize) =&gt; void</span></td>
              <td>—</td>
              <td>Fires when a user changes an item's size via the chips.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>—</td>
              <td>Extra classes applied to the outer flex-wrap container.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="docs-category-subtitle">DraggableGridItem fields</h2>
      <div className="overflow-x-auto">
        <table className="docs-props-table">
          <thead>
            <tr>
              <th>Field</th>
              <th>Type</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="docs-prop-name">id</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>Unique identifier used for ordering and localStorage.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">component</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>The card content to render.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td><span className="docs-prop-type">"small" | "medium" | "large"</span></td>
              <td>Initial size. Can be changed at runtime via the size chips.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">title</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>Shell header text. Only shown when <code>variant="default"</code>.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">"default" | "bare"</span></td>
              <td><code>default</code> wraps in a shell card. <code>bare</code> renders the component directly.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="docs-category-subtitle">Peer dependencies</h2>
      <p className="docs-paragraph">
        <code>DraggableGrid</code> requires the dnd-kit packages as optional
        peer dependencies. Install them if you use this component:
      </p>
      <CodeBlock
        code={`pnpm add @dnd-kit/core @dnd-kit/sortable @dnd-kit/utilities`}
      />

      <DocsButtonBar
        previous={{ route: "/ui-basics/event-calendar", label: "Event Calendar" }}
      />
    </section>
  );
};

export default DraggableGridDoc;
