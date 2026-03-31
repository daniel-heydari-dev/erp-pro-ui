import { HoverCard } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const HoverCardDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Hover Card</h1>
      <p className="docs-paragraph">
        Rich hover preview surface for profiles, metadata, and linked entities
        where a tooltip would be too small.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[250px] flex items-center justify-center">
        <HoverCard
          content={
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                EP
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  ERP PRO
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  The ultimate SaaS component library for building
                  high-performance professional tools.
                </p>
                <div className="flex gap-4 mt-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                    12.8k users
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] font-medium text-neutral-500 dark:text-neutral-400">
                    <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                    v2.4.0
                  </div>
                </div>
              </div>
            </div>
          }
        >
          <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4 cursor-pointer hover:decoration-primary transition-all duration-300">
            erp pro
          </span>
        </HoverCard>
      </div>

      <CodeBlock
        code={`import { HoverCard } from 'erp-pro-ui';

<HoverCard
  content={
    <div className="p-2">
      <h4 className="font-bold">Title</h4>
      <p className="text-sm">Description goes here.</p>
    </div>
  }
>
  <span>Hover me</span>
</HoverCard>`}
      />

      <h2 className="docs-category-subtitle">Team Member Preview</h2>
      <p className="docs-paragraph">
        Hover cards are ideal for assignees, reviewers, or owners in tables and
        kanban views.
      </p>
      <div className="docs-showcase-card h-[280px] flex items-center justify-center">
        <HoverCard
          position="right"
          align="start"
          content={
            <div className="w-72 space-y-3">
              <div>
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">
                  Mina Chen
                </h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Inventory Operations Lead
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Location
                  </p>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    Berlin Hub
                  </p>
                </div>
                <div>
                  <p className="text-neutral-500 dark:text-neutral-400">
                    Open tasks
                  </p>
                  <p className="font-semibold text-neutral-900 dark:text-white">
                    12
                  </p>
                </div>
              </div>
              <p className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                Owns receiving audits, transfer approvals, and supplier
                escalation for the central warehouse.
              </p>
            </div>
          }
        >
          <button className="docs-button docs-button-secondary">
            Hover Mina Chen
          </button>
        </HoverCard>
      </div>

      <CodeBlock
        code={`<HoverCard
  position="right"
  align="start"
  content={<ProfilePreview />}
>
  <button>Hover Mina Chen</button>
</HoverCard>`}
      />

      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        Supports all four cardinal directions and multiple alignments.
      </p>
      <div className="docs-showcase-card h-[300px] flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8">
          <HoverCard
            position="top"
            content={<div className="text-sm">Hover Card on Top</div>}
          >
            <button className="docs-button docs-button-secondary">Top</button>
          </HoverCard>
          <HoverCard
            position="bottom"
            content={<div className="text-sm">Hover Card on Bottom</div>}
          >
            <button className="docs-button docs-button-secondary">
              Bottom
            </button>
          </HoverCard>
          <HoverCard
            position="left"
            content={<div className="text-sm">Hover Card on Left</div>}
          >
            <button className="docs-button docs-button-secondary">Left</button>
          </HoverCard>
          <HoverCard
            position="right"
            content={<div className="text-sm">Hover Card on Right</div>}
          >
            <button className="docs-button docs-button-secondary">Right</button>
          </HoverCard>
        </div>
      </div>

      <CodeBlock
        code={`<HoverCard position="right" align="center" content="...">
  <button>Trigger</button>
</HoverCard>`}
      />

      <h2 className="docs-category-subtitle">Delay & Width Control</h2>
      <p className="docs-paragraph">
        Tune <code>openDelay</code>, <code>closeDelay</code>, and width props
        for dense data tables where users move quickly.
      </p>
      <div className="docs-showcase-card h-60 flex items-center justify-center">
        <HoverCard
          position="bottom"
          align="start"
          openDelay={350}
          closeDelay={100}
          width={300}
          maxWidth={360}
          arrow={false}
          content={
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                Supplier Snapshot
              </h4>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Last shipment arrived 2 days ago. 97% on-time delivery this
                quarter.
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Next expected delivery: Friday, 10:30.
              </p>
            </div>
          }
        >
          <button className="docs-button docs-button-secondary">
            Hover Supplier #204
          </button>
        </HoverCard>
      </div>

      <CodeBlock
        code={`<HoverCard
  openDelay={350}
  closeDelay={100}
  width={300}
  maxWidth={360}
  arrow={false}
  content={<SupplierSnapshot />}
>
  <button>Hover Supplier #204</button>
</HoverCard>`}
      />

      <h2 className="docs-category-subtitle">Core Props</h2>
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
              <td className="docs-prop-name">children</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Trigger element users hover to open the card.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">content</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Rich content rendered inside the hover surface.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">position</td>
              <td>
                <span className="docs-prop-type">
                  'top' | 'bottom' | 'left' | 'right'
                </span>
              </td>
              <td>'bottom'</td>
              <td>Card position relative to its trigger.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">align</td>
              <td>
                <span className="docs-prop-type">
                  'start' | 'center' | 'end'
                </span>
              </td>
              <td>'center'</td>
              <td>Cross-axis alignment for the positioned card.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">openDelay</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>200</td>
              <td>Delay before opening in milliseconds.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">closeDelay</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>150</td>
              <td>Delay before closing in milliseconds.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Disables hover behavior and keeps the card closed.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">arrow</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Shows or hides the directional arrow.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">width</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>-</td>
              <td>Fixed width for the card container.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">maxWidth</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>320</td>
              <td>Maximum width constraint for responsive cards.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Custom class name for the card container.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">triggerClassName</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Custom class name for the trigger wrapper.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{
          label: "Multi Select Combobox",
          route: "/ui-basics/multi-select-combobox",
        }}
        next={{ label: "Spotlight Card", route: "/ui-basics/spotlight-card" }}
      />
    </section>
  );
};

export default HoverCardDoc;
