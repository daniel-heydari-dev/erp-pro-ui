import { useState } from 'react';
import { Accordion } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const AccordionDoc = () => {
  const [separated, setSeparated] = useState(false);
  const [type, setType] = useState<'single' | 'multiple'>('single');

  const defaultItems = [
    {
      id: "item-1",
      title: "Is it accessible?",
      content: "Yes. It adheres to the WAI-ARIA design pattern.",
    },
    {
      id: "item-2",
      title: "Is it styled?",
      content: "Yes. It comes with default styles that matches the other components' aesthetic.",
    },
    {
      id: "item-3",
      title: "Is it animated?",
      content: "Yes. It's animated by default, but you can disable it if you prefer.",
    },
  ];

  const separatedItems = [
    {
      id: "sep-1",
      title: "Card-like Styling",
      description: "Items can be visually separated",
      content: "When the 'separated' prop is true, each item is rendered in its own container, creating a more distinct card-like appearance.",
    },
    {
      id: "sep-2",
      title: "Modern Aesthetic",
      description: "Perfect for dashboard sections",
      content: "This style works exceptionally well when you want to group complex settings or FAQ sections compactly but with clear boundaries.",
    },
  ];

  const advancedItems = [
    {
      id: "acc-1",
      title: "Personal Information",
      description: "Manage your personal details",
      content: (
        <div className="space-y-4 pt-2">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
              <p className="text-xs text-neutral-500 mb-1">First Name</p>
              <p className="text-sm font-medium">Jane</p>
            </div>
            <div className="bg-neutral-100 dark:bg-neutral-800 p-3 rounded-lg">
              <p className="text-xs text-neutral-500 mb-1">Last Name</p>
              <p className="text-sm font-medium">Doe</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "acc-2",
      title: "Account Settings",
      description: "Manage your account preferences",
      content: "Secure your account with 2FA and password management.",
    },
    {
      id: "acc-3",
      title: "Notifications",
      description: "Manage your notification settings",
      content: "Choose how you want to be notified about updates and activity.",
      disabled: true,
    },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Accordion</h1>
      <p className="docs-paragraph">
        A vertically stacked set of interactive headings that each reveal a section of content.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md">
          <Accordion items={defaultItems} />
        </div>
      </div>

      <CodeBlock code={`import { Accordion } from '@erp-pro/ui';

const items = [
  {
    id: "item-1",
    title: "Is it accessible?",
    content: "Yes. It adheres to the WAI-ARIA design pattern.",
  },
  // ...
];

<Accordion items={items} />`} />

      {/* Multi-selection Usage */}
      <h2 className="docs-category-subtitle">Multiple Items Open</h2>
      <p className="docs-paragraph">
        Set <code>type="multiple"</code> to allow multiple accordion items to be open at the same time.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md">
          <Accordion items={defaultItems} type="multiple" />
        </div>
      </div>

      <CodeBlock code={`<Accordion items={items} type="multiple" />`} />

      {/* Separated Styling */}
      <h2 className="docs-category-subtitle">Separated Styling</h2>
      <p className="docs-paragraph">
        Use the <code>separated</code> prop to give each item its own container, enhancing visual hierarchy.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-md">
          <Accordion items={separatedItems} separated />
        </div>
      </div>

      <CodeBlock code={`<Accordion items={items} separated />`} />

      {/* Advanced Usage */}
      <h2 className="docs-category-subtitle">Advanced Usage</h2>
      <p className="docs-paragraph">
        Support for descriptions, custom content, disabled items, and separated styling.
      </p>

      <div className="docs-controls">
        <div className="docs-control-group">
          <label className="docs-control-label">Type</label>
          <div className="flex gap-2">
            <button
              onClick={() => setType('single')}
              className={`docs-button ${type === 'single' ? 'docs-button-primary' : 'docs-button-secondary'}`}
            >
              Single
            </button>
            <button
              onClick={() => setType('multiple')}
              className={`docs-button ${type === 'multiple' ? 'docs-button-primary' : 'docs-button-secondary'}`}
            >
              Multiple
            </button>
          </div>
        </div>
        <div className="docs-control-group">
          <label className="docs-control-label">Style</label>
          <label className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400 cursor-pointer">
            <input
              type="checkbox"
              checked={separated}
              onChange={(e) => setSeparated(e.target.checked)}
              className="rounded border-neutral-300 text-primary focus:ring-primary"
            />
            Separated
          </label>
        </div>
      </div>

      <div className="docs-showcase-card">
        <div className="w-full max-w-md">
          <Accordion
            items={advancedItems}
            type={type}
            separated={separated}
          />
        </div>
      </div>

      <CodeBlock code={`<Accordion
  items={items}
  type="${type}"
  separated={${separated}}
/>`} />

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
              <td className="docs-prop-name">items</td>
              <td><span className="docs-prop-type">AccordionItemConfig[]</span></td>
              <td>-</td>
              <td>Array of accordion items</td>
            </tr>
            <tr>
              <td className="docs-prop-name">type</td>
              <td><span className="docs-prop-type">'single' | 'multiple'</span></td>
              <td>'single'</td>
              <td>Whether multiple items can be open at once</td>
            </tr>
            <tr>
              <td className="docs-prop-name">separated</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Applies separate styling to each item</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td><span className="docs-prop-type">string[]</span></td>
              <td>-</td>
              <td>Controlled value (array of open item IDs)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onValueChange</td>
              <td><span className="docs-prop-type">{`(ids: string[]) => void`}</span></td>
              <td>-</td>
              <td>Callback when value changes</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Tooltip', route: '/ui-basics/tooltip' }}
        next={{ label: 'Card', route: '/ui-basics/card' }}
      />
    </section>
  );
};

export default AccordionDoc;
