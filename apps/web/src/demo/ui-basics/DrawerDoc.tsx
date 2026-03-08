import { useState } from 'react';
import { Button, Drawer, type DrawerPosition } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const DrawerDoc = () => {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<DrawerPosition>('right');
  const [title, setTitle] = useState('Drawer Title');

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
        Ideal for mobile navigation, detailed filters, or complex forms.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Button label="Open Drawer" onClick={() => openDrawer('right')} />

        <Drawer
          open={open}
          onOpenChange={setOpen}
          title={title}
          description="Click outside or the close button to dismiss."
          position={position}
        >
          <div className="space-y-4">
            <p className="text-neutral-600 dark:text-neutral-300">
              This is the drawer content area. It supports scrolling for long content.
            </p>
            <div className="h-32 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center text-neutral-400">
              Placeholder Content
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <Button label="Close" onClick={() => setOpen(false)} />
            <Button label="Confirm" primary onClick={() => setOpen(false)} />
          </div>
        </Drawer>
      </div>

      <CodeBlock code={`import { useState } from 'react';
import { Drawer, Button } from 'erp-pro-ui';

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)} label="Open" />
      <Drawer 
        open={open} 
        onOpenChange={setOpen}
        title="Drawer Title"
        position="right"
      >
        <p>Content goes here...</p>
      </Drawer>
    </>
  );
}`} />

      {/* Positions Section */}
      <h2 className="docs-category-subtitle">Positions</h2>
      <p className="docs-paragraph">
        The drawer can slide in from any of the four edges: <span className="docs-highlight">left</span>, <span className="docs-highlight">right</span>, <span className="docs-highlight">top</span>, or <span className="docs-highlight">bottom</span>.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-wrap gap-4">
          <Button label="Left" onClick={() => openDrawer('left')} />
          <Button label="Right" onClick={() => openDrawer('right')} />
          <Button label="Top" onClick={() => openDrawer('top')} />
          <Button label="Bottom" onClick={() => openDrawer('bottom')} />
        </div>
      </div>

      <CodeBlock code={`<Drawer position="left" ... />
<Drawer position="right" ... />
<Drawer position="top" ... />
<Drawer position="bottom" ... />`} />

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
              <td className="docs-prop-name">open</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Controlled open state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onOpenChange</td>
              <td><span className="docs-prop-type">{'{(open: boolean) => void}'}</span></td>
              <td>-</td>
              <td>State change handler</td>
            </tr>
            <tr>
              <td className="docs-prop-name">position</td>
              <td><span className="docs-prop-type">'left' | 'right' | 'top' | 'bottom'</span></td>
              <td>'right'</td>
              <td>Slide-in direction</td>
            </tr>
            <tr>
              <td className="docs-prop-name">title</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Header title</td>
            </tr>
            <tr>
              <td className="docs-prop-name">description</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Header description</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Dialog', route: '/ui-basics/dialog' }}
        next={{ label: 'Alert', route: '/ui-basics/alert' }}
      />
    </section>
  );
};

export default DrawerDoc;
