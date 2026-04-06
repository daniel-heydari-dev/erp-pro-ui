import { useState } from "react";
import { Button, Drawer, type DrawerPosition } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const DrawerDoc = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>("right");
  const [title, setTitle] = useState("Drawer Title");
  const [settingsOpen, setSettingsOpen] = useState(false);

  const openDrawer = (pos: DrawerPosition) => {
    setPosition(pos);
    setTitle(`${pos.charAt(0).toUpperCase() + pos.slice(1)} Drawer`);
    setOpen(true);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Drawer</h1>
      <p className="docs-paragraph">
        Drawers are overlay panels that slide in from the edge of the screen.
        They work well for settings, mobile navigation, filters, and secondary
        workflows.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Button label="Open Drawer" onClick={() => openDrawer("right")} />

        <Drawer
          open={open}
          onOpenChange={setOpen}
          title={title}
          description="Click outside or the close button to dismiss."
          position={position}
        >
          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-300">
              This is the primary drawer content area. It supports long forms,
              stacked controls, and contextual details.
            </p>
            <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Branch filters
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Review transfer rules, approval thresholds, and pending
                exceptions from one side panel.
              </p>
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <Button label="Close" onClick={() => setOpen(false)} />
            <Button label="Confirm" primary onClick={() => setOpen(false)} />
          </div>
        </Drawer>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Button, Drawer, type DrawerPosition } from 'erp-pro-ui';

const position: DrawerPosition = 'right';

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} label="Open" />
      <Drawer 
        open={open} 
        onOpenChange={setOpen}
        title="Drawer Title"
        position={position}
      >
        <p>Content goes here...</p>
      </Drawer>
    </>
  );
}`}
      />

      {/* Positions Section */}
      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        The component supports all four viewport edges:{" "}
        <span className="docs-highlight">left</span>,{" "}
        <span className="docs-highlight">right</span>,{" "}
        <span className="docs-highlight">top</span>, and{" "}
        <span className="docs-highlight">bottom</span>.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-wrap gap-4">
          <Button label="Left" onClick={() => openDrawer("left")} />
          <Button label="Right" onClick={() => openDrawer("right")} />
          <Button label="Top" onClick={() => openDrawer("top")} />
          <Button label="Bottom" onClick={() => openDrawer("bottom")} />
        </div>
      </div>

      <CodeBlock
        code={`import { Drawer, type DrawerPosition } from 'erp-pro-ui';

const drawerPositions: DrawerPosition[] = ['left', 'right', 'top', 'bottom'];

drawerPositions.map((position) => (
  <Drawer key={position} position={position} />
));`}
      />

      <h2 className="docs-category-subtitle">Settings Panel</h2>
      <p className="docs-paragraph">
        A realistic drawer flow with structured content and footer actions. Keep
        drawer state controlled in the parent so actions can also close the
        panel after save events.
      </p>
      <div className="docs-showcase-card">
        <Button
          label="Open Settings Panel"
          primary
          onClick={() => setSettingsOpen(true)}
        />

        <Drawer
          open={settingsOpen}
          onOpenChange={setSettingsOpen}
          title="Workspace settings"
          description="Adjust notifications, approval behavior, and transfer visibility from one panel."
          position="right"
          footer={
            <div className="flex justify-end gap-2">
              <Button label="Cancel" onClick={() => setSettingsOpen(false)} />
              <Button
                label="Save changes"
                primary
                onClick={() => setSettingsOpen(false)}
              />
            </div>
          }
        >
          <div className="space-y-4">
            <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Approval threshold
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Require a second approver for transfers above $5,000.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Restock notifications
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Send a digest every 2 hours to branch managers and operations
                leads.
              </p>
            </div>
          </div>
        </Drawer>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Button, Drawer } from 'erp-pro-ui';

export function WorkspaceSettingsDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open settings" primary onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title="Workspace settings"
        description="Adjust notifications, approval behavior, and transfer visibility from one panel."
        footer={
          <div className="flex justify-end gap-2">
            <Button label="Cancel" onClick={() => setOpen(false)} />
            <Button label="Save changes" primary onClick={() => setOpen(false)} />
          </div>
        }
      >
        <div className="space-y-4">...</div>
      </Drawer>
    </>
  );
}`}
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
              <td className="docs-prop-name">open</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Controlled open state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onOpenChange</td>
              <td>
                <span className="docs-prop-type">
                  {"{(open: boolean) => void}"}
                </span>
              </td>
              <td>-</td>
              <td>State change handler</td>
            </tr>
            <tr>
              <td className="docs-prop-name">position</td>
              <td>
                <span className="docs-prop-type">
                  'left' | 'right' | 'top' | 'bottom'
                </span>
              </td>
              <td>'right'</td>
              <td>Slide-in direction</td>
            </tr>
            <tr>
              <td className="docs-prop-name">title</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Header title</td>
            </tr>
            <tr>
              <td className="docs-prop-name">description</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Header description</td>
            </tr>
            <tr>
              <td className="docs-prop-name">footer</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Optional footer area for actions</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Dialog", route: "/ui-basics/dialog" }}
        next={{ label: "Alert", route: "/ui-basics/alert" }}
      />
    </section>
  );
};

export default DrawerDoc;
