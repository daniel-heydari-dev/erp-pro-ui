import { useState } from "react";
import { Button, Input, Tooltip } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const TooltipDoc = () => {
  const [isControlledOpen, setIsControlledOpen] = useState(false);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Tooltip</h1>
      <p className="docs-paragraph">
        A compact hint surface for small amounts of contextual guidance around
        actions and form fields.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Tooltip content="This is a helpful tip!">
          <Button label="Hover Me" />
        </Tooltip>
      </div>

      <CodeBlock
        code={`import { Tooltip, Button } from 'erp-pro-ui';

<Tooltip content="This is a helpful tip!">
  <Button label="Hover Me" />
</Tooltip>`}
      />

      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        Tooltips can be positioned <span className="docs-highlight">top</span>,{" "}
        <span className="docs-highlight">bottom</span>,{" "}
        <span className="docs-highlight">left</span>, or{" "}
        <span className="docs-highlight">right</span>.
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

      <CodeBlock
        code={`<Tooltip position="top" content="...">
  <Button label="Top" />
</Tooltip>`}
      />

      <h2 className="docs-category-subtitle">Triggers</h2>
      <p className="docs-paragraph">
        Define how the tooltip is activated:{" "}
        <span className="docs-highlight">hover</span> (default),{" "}
        <span className="docs-highlight">click</span>, or{" "}
        <span className="docs-highlight">focus</span>.
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
          <div className="w-56">
            <Input placeholder="Focus me" />
          </div>
        </Tooltip>
      </div>

      <CodeBlock
        code={`<Tooltip trigger="click" content="...">
  <Button label="Click Me" />
</Tooltip>`}
      />

      <h2 className="docs-category-subtitle">Form Hint</h2>
      <p className="docs-paragraph">
        Tooltips work well next to dense configuration labels when you need
        short explanatory copy without cluttering the form.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-lg space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-neutral-900 dark:text-white">
              Reorder threshold
            </span>
            <Tooltip content="When stock drops below this number, the SKU appears in the replenishment queue.">
              <Button
                aria-label="Threshold help"
                className="h-6 w-6 rounded-full border-neutral-300 px-0 py-0 text-xs font-semibold shadow-none hover:bg-transparent hover:opacity-100 dark:border-neutral-700"
              >
                ?
              </Button>
            </Tooltip>
          </div>
          <div className="rounded-md border border-neutral-200 px-3 py-2 text-sm text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
            24 units
          </div>
        </div>
      </div>

      <CodeBlock
        code={`<div className="flex items-center gap-2">
  <span>Reorder threshold</span>
  <Tooltip content="When stock drops below this number, the SKU appears in the replenishment queue.">
    <Button aria-label="Threshold help">?</Button>
  </Tooltip>
</div>`}
      />

      <h2 className="docs-category-subtitle">Controlled Visibility</h2>
      <p className="docs-paragraph">
        Use <span className="docs-highlight">open</span> and{" "}
        <span className="docs-highlight">onOpenChange</span> when the tooltip
        should follow external state, such as onboarding tours or row-by-row
        validation feedback.
      </p>

      <div className="docs-showcase-card flex-wrap gap-3">
        <Button
          label={isControlledOpen ? "Hide Tooltip" : "Show Tooltip"}
          onClick={() => setIsControlledOpen((prev) => !prev)}
        />
        <Tooltip
          content="Controlled tooltips are useful when visibility depends on parent-level workflow state."
          open={isControlledOpen}
          onOpenChange={setIsControlledOpen}
          trigger="click"
          position="right"
        >
          <Button label="Controlled Target" />
        </Tooltip>
      </div>

      <CodeBlock
        code={`const [open, setOpen] = useState(false);

<Tooltip
  content="Controlled tooltip"
  open={open}
  onOpenChange={setOpen}
  trigger="click"
>
  <Button label="Target" />
</Tooltip>`}
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
              <td className="docs-prop-name">content</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Content to display in tooltip</td>
            </tr>
            <tr>
              <td className="docs-prop-name">position</td>
              <td>
                <span className="docs-prop-type">
                  'top' | 'bottom' | 'right' | 'left'
                </span>
              </td>
              <td>'top'</td>
              <td>Popover position</td>
            </tr>
            <tr>
              <td className="docs-prop-name">trigger</td>
              <td>
                <span className="docs-prop-type">
                  'hover' | 'click' | 'focus'
                </span>
              </td>
              <td>'hover'</td>
              <td>Interaction trigger</td>
            </tr>
            <tr>
              <td className="docs-prop-name">delayShow</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>200</td>
              <td>Delay before showing (ms)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">delayHide</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>0</td>
              <td>Delay before hiding (ms)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Disables tooltip interactions and visibility</td>
            </tr>
            <tr>
              <td className="docs-prop-name">arrow</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Shows or hides the directional arrow</td>
            </tr>
            <tr>
              <td className="docs-prop-name">maxWidth</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>250</td>
              <td>Maximum width in pixels</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Additional classes for custom tooltip surface styles</td>
            </tr>
            <tr>
              <td className="docs-prop-name">open</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>-</td>
              <td>Controlled visibility state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onOpenChange</td>
              <td>
                <span className="docs-prop-type">
                  {"{(open: boolean) => void}"}
                </span>
              </td>
              <td>-</td>
              <td>Callback fired when tooltip open state changes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Toast", route: "/ui-basics/toast" }}
        next={{ label: "Accordion", route: "/ui-basics/accordion" }}
      />
    </section>
  );
};

export default TooltipDoc;
