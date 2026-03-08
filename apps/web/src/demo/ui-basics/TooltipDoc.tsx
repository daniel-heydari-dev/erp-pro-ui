import { Tooltip, Button, type TooltipPosition, type TooltipTrigger } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const TooltipDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Tooltip</h1>
      <p className="docs-paragraph">
        A lightweight popup that displays information related to an element when the user hovers, focuses, or clicks.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Tooltip content="This is a helpful tip!">
          <Button label="Hover Me" />
        </Tooltip>
      </div>

      <CodeBlock code={`import { Tooltip, Button } from '@erp-pro/ui';

<Tooltip content="This is a helpful tip!">
  <Button label="Hover Me" />
</Tooltip>`} />

      {/* Positions Section */}
      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        Tooltips can be positioned <span className="docs-highlight">top</span>, <span className="docs-highlight">bottom</span>, <span className="docs-highlight">left</span>, or <span className="docs-highlight">right</span>.
      </p>

      <div className="docs-showcase-card">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          <Tooltip content="Tooltip on Top" position="top">
            <Button label="Top" size="small" />
          </Tooltip>
          <Tooltip content="Tooltip on Bottom" position="bottom">
            <Button label="Bottom" size="small" />
          </Tooltip>
          <Tooltip content="Tooltip on Left" position="left">
            <Button label="Left" size="small" />
          </Tooltip>
          <Tooltip content="Tooltip on Right" position="right">
            <Button label="Right" size="small" />
          </Tooltip>
        </div>
      </div>

      <CodeBlock code={`<Tooltip position="top" content="...">
  <Button label="Top" />
</Tooltip>`} />

      {/* Triggers Section */}
      <h2 className="docs-category-subtitle">Triggers</h2>
      <p className="docs-paragraph">
        Define how the tooltip is activated: <span className="docs-highlight">hover</span> (default), <span className="docs-highlight">click</span>, or <span className="docs-highlight">focus</span>.
      </p>

      <div className="docs-showcase-card flex-wrap gap-8">
        <Tooltip content="Triggered by Hover" trigger="hover">
          <Button label="Hover" />
        </Tooltip>
        <Tooltip content="Triggered by Click" trigger="click">
          <Button label="Click" />
        </Tooltip>
        {/* Focus requires tab navigation to test properly */}
        <Tooltip content="Triggered by Focus" trigger="focus">
          <input
            type="text"
            placeholder="Focus me"
            className="px-3 py-2 border rounded-md dark:bg-neutral-800 dark:border-neutral-700"
          />
        </Tooltip>
      </div>

      <CodeBlock code={`<Tooltip trigger="click" content="...">
  <Button label="Click Me" />
</Tooltip>`} />

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
              <td className="docs-prop-name">content</td>
              <td><span className="docs-prop-type">ReactNode</span></td>
              <td>-</td>
              <td>Content to display in tooltip</td>
            </tr>
            <tr>
              <td className="docs-prop-name">position</td>
              <td><span className="docs-prop-type">'top' | 'bottom' | 'right' | 'left'</span></td>
              <td>'top'</td>
              <td>Popover position</td>
            </tr>
            <tr>
              <td className="docs-prop-name">trigger</td>
              <td><span className="docs-prop-type">'hover' | 'click' | 'focus'</span></td>
              <td>'hover'</td>
              <td>Interaction trigger</td>
            </tr>
            <tr>
              <td className="docs-prop-name">delayShow</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>200</td>
              <td>Delay before showing (ms)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">maxWidth</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>250</td>
              <td>Maximum width in pixels</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Toast', route: '/ui-basics/toast' }}
        next={{ label: 'Accordion', route: '/ui-basics/accordion' }}
      />
    </section>
  );
};

export default TooltipDoc;
