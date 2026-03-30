import { useState } from 'react';
import { Accordion } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const AccordionDoc = () => {
  const [mode, setMode] = useState<'single' | 'multiple'>('single');
  const [openIds, setOpenIds] = useState<string[]>(['returns']);

  const faqItems = [
    {
      id: 'shipping',
      title: 'How long does shipping take?',
      content:
        'Standard shipping takes 3-5 business days. Priority shipping takes 1-2 business days.',
    },
    {
      id: 'returns',
      title: 'What is the return policy?',
      content:
        'Returns are accepted within 30 days for unused items in original packaging.',
    },
    {
      id: 'billing',
      title: 'Do you provide invoices?',
      content:
        'Yes. Invoices are generated automatically and emailed after each successful payment.',
    },
  ];

  const policyItems = [
    {
      id: 'sla',
      title: 'Service Level Targets',
      description: 'Operational commitments for enterprise plans',
      content:
        'Critical incidents receive a response in under 30 minutes. Standard requests receive a response within one business day.',
    },
    {
      id: 'security',
      title: 'Security & Compliance',
      description: 'Data handling and governance controls',
      content:
        'Data is encrypted at rest and in transit. Audit logging is enabled by default for account-level actions.',
    },
  ];

  const settingsItems = [
    {
      id: 'profile',
      title: 'Profile Visibility',
      description: 'Control what collaborators can see',
      content: (
        <div className="space-y-3 pt-2">
          <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500">Visibility</p>
            <p className="text-sm font-medium">Team only</p>
          </div>
          <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            <p className="text-xs text-neutral-500">Search indexing</p>
            <p className="text-sm font-medium">Disabled</p>
          </div>
        </div>
      ),
    },
    {
      id: 'notifications',
      title: 'Notification Preferences',
      description: 'Set cadence for alerts and summaries',
      content: (
        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            <span className="text-sm">Daily digest</span>
            <span className="text-xs text-primary">Enabled</span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
            <span className="text-sm">Incident SMS</span>
            <span className="text-xs text-neutral-500">Disabled</span>
          </div>
        </div>
      ),
    },
    {
      id: 'danger',
      title: 'Close Workspace',
      description: 'Restricted to organization owners',
      content:
        'This action archives active projects and revokes pending invitations. Contact support before continuing.',
      disabled: true,
    },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Accordion</h1>
      <p className="docs-paragraph">
        Accordion groups related information into collapsible sections so users
        can scan headings first and open details only when needed.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="w-full max-w-2xl">
          <Accordion items={faqItems} />
        </div>
      </div>

      <CodeBlock
        code={`import { Accordion } from 'erp-pro-ui';

const items = [
  {
    id: 'shipping',
    title: 'How long does shipping take?',
    content: 'Standard shipping takes 3-5 business days.',
  },
  {
    id: 'returns',
    title: 'What is the return policy?',
    content: 'Returns are accepted within 30 days.',
  },
];

<Accordion items={items} />`}
      />

      <h2 className="docs-category-subtitle">Single vs Multiple</h2>
      <p className="docs-paragraph">
        Use <code>type="single"</code> when only one section should stay open.
        Switch to <code>type="multiple"</code> when users often compare
        information across panels.
      </p>

      <div className="docs-controls">
        <div className="docs-control-group">
          <label className="docs-control-label">Mode</label>
          <div className="flex gap-2">
            <button
              onClick={() => setMode('single')}
              className={`docs-button ${mode === 'single' ? 'docs-button-primary' : 'docs-button-secondary'}`}
            >
              Single
            </button>
            <button
              onClick={() => setMode('multiple')}
              className={`docs-button ${mode === 'multiple' ? 'docs-button-primary' : 'docs-button-secondary'}`}
            >
              Multiple
            </button>
          </div>
        </div>
      </div>

      <div className="docs-showcase-card">
        <div className="w-full max-w-2xl">
          <Accordion items={faqItems} type={mode} />
        </div>
      </div>

      <CodeBlock code={`<Accordion items={items} type="multiple" />`} />

      <h2 className="docs-category-subtitle">Separated Cards</h2>
      <p className="docs-paragraph">
        Enable <code>separated</code> to make each panel feel like an individual
        card, useful for policy pages and dashboard settings.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-2xl">
          <Accordion items={policyItems} separated />
        </div>
      </div>

      <CodeBlock code={`<Accordion items={items} separated />`} />

      <h2 className="docs-category-subtitle">Controlled State</h2>
      <p className="docs-paragraph">
        Use <code>value</code> and <code>onValueChange</code> when open panels
        need to stay in sync with external state.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-2xl">
          <Accordion
            items={settingsItems}
            type="multiple"
            separated
            value={openIds}
            onValueChange={setOpenIds}
          />
          <p className="mt-3 text-xs text-neutral-500 dark:text-neutral-400">
            Open panel IDs: {openIds.length ? openIds.join(', ') : 'none'}
          </p>
        </div>
      </div>

      <CodeBlock
        code={`const [openIds, setOpenIds] = useState<string[]>(['profile']);

<Accordion
  items={items}
  type="multiple"
  value={openIds}
  onValueChange={setOpenIds}
/>`}
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
              <td className="docs-prop-name">items</td>
              <td>
                <span className="docs-prop-type">AccordionItemConfig[]</span>
              </td>
              <td>-</td>
              <td>
                List of panels. Each item accepts <code>id</code>,
                <code>title</code>, <code>content</code>, optional
                <code>description</code>, and optional <code>disabled</code>.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">type</td>
              <td>
                <span className="docs-prop-type">'single' | 'multiple'</span>
              </td>
              <td>'single'</td>
              <td>Controls whether one or many panels can be open.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">defaultOpenIds</td>
              <td>
                <span className="docs-prop-type">string[]</span>
              </td>
              <td>
                first item ID in <code>single</code> mode, otherwise []
              </td>
              <td>Initial open state when using the uncontrolled pattern.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">value</td>
              <td>
                <span className="docs-prop-type">string[]</span>
              </td>
              <td>-</td>
              <td>Controlled list of open panel IDs.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onValueChange</td>
              <td>
                <span className="docs-prop-type">
                  (ids: string[]) =&gt; void
                </span>
              </td>
              <td>-</td>
              <td>Fires whenever the set of open panels changes.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">separated</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Applies more distinct per-item card separation.</td>
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
