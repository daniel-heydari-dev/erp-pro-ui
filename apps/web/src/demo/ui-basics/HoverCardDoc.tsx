import { HoverCard } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const HoverCardDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Hover Card</h1>
      <p className="docs-paragraph">
        For sighted users to preview content available behind a link or interactive element.
      </p>

      {/* Basic Usage */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card h-[250px] flex items-center justify-center">
        <HoverCard
          content={
            <div className="flex gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg border border-primary/20">
                EP
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-neutral-900 dark:text-white">ERP PRO</h4>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">
                  The ultimate SaaS component library for building high-performance professional tools.
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

      <CodeBlock code={`import { HoverCard } from '@erp-pro/ui';

<HoverCard
  content={
    <div className="p-2">
      <h4 className="font-bold">Title</h4>
      <p className="text-sm">Description goes here.</p>
    </div>
  }
>
  <span>Hover me</span>
</HoverCard>`} />

      {/* Positions */}
      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        Supports all four cardinal directions and multiple alignments.
      </p>
      <div className="docs-showcase-card h-[300px] flex items-center justify-center">
        <div className="grid grid-cols-2 gap-8">
          <HoverCard position="top" content={<div className="text-sm">Hover Card on Top</div>}>
            <button className="docs-button docs-button-secondary">Top</button>
          </HoverCard>
          <HoverCard position="bottom" content={<div className="text-sm">Hover Card on Bottom</div>}>
            <button className="docs-button docs-button-secondary">Bottom</button>
          </HoverCard>
          <HoverCard position="left" content={<div className="text-sm">Hover Card on Left</div>}>
            <button className="docs-button docs-button-secondary">Left</button>
          </HoverCard>
          <HoverCard position="right" content={<div className="text-sm">Hover Card on Right</div>}>
            <button className="docs-button docs-button-secondary">Right</button>
          </HoverCard>
        </div>
      </div>

      <CodeBlock code={`<HoverCard position="right" align="center" content="...">
  <button>Trigger</button>
</HoverCard>`} />

      {/* Props Reference */}
      <h2 className="docs-category-subtitle">Props</h2>
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
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>The trigger element</td>
            </tr>
            <tr>
              <td className="docs-prop-name">content</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>The content to display in the card</td>
            </tr>
            <tr>
              <td className="docs-prop-name">position</td>
              <td><span className="docs-prop-type">'top' | 'bottom' | 'left' | 'right'</span></td>
              <td>'bottom'</td>
              <td>Position relative to trigger</td>
            </tr>
            <tr>
              <td className="docs-prop-name">align</td>
              <td><span className="docs-prop-type">'start' | 'center' | 'end'</span></td>
              <td>'center'</td>
              <td>Alignment of the card</td>
            </tr>
            <tr>
              <td className="docs-prop-name">openDelay</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>200</td>
              <td>Delay before showing (ms)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">closeDelay</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>150</td>
              <td>Delay before hiding (ms)</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Multi Select Combobox', route: '/ui-basics/multi-select-combobox' }}
        next={{ label: 'Spotlight Card', route: '/ui-basics/spotlight-card' }}
      />
    </section>
  );
};

export default HoverCardDoc;
