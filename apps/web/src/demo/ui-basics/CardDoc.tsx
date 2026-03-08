import { Card } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const CardDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Card</h1>
      <p className="docs-paragraph">
        Displays content in a contained, elevated container with a glassmorphism effect.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Card
          title="Notifications"
          description="You have 3 unread messages."
        />
      </div>

      <CodeBlock code={`import { Card } from '@erp-pro/ui';

<Card 
  title="Notifications" 
  description="You have 3 unread messages." 
/>`} />

      {/* Interactive Card */}
      <h2 className="docs-category-subtitle">Interactive Card</h2>
      <p className="docs-paragraph">
        Cards can handle clicks and feature subtle hover animations for a premium feel.
      </p>
      <div className="docs-showcase-card">
        <Card
          title="Clickable Project"
          description="Click this card to learn more about the implementation details and architecture."
        />
      </div>

      <CodeBlock code={`<Card 
  title="Clickable Project" 
  description="..." 
  onClick={() => console.log('Card clicked')}
/>`} />

      {/* Grid Example */}
      <h2 className="docs-category-subtitle">Grid Layout</h2>
      <p className="docs-paragraph">
        Cards work perfectly in responsive grids for dashboards and feed layouts.
      </p>

      <div className="docs-showcase-card">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <Card
            title="Revenue"
            description="$45,231.89"
          />
          <Card
            title="Subscriptions"
            description="+2,350"
          />
        </div>
      </div>

      <CodeBlock code={`<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <Card title="Revenue" description="..." />
  <Card title="Subscriptions" description="..." />
</div>`} />

      {/* Media & Custom Content */}
      <h2 className="docs-category-subtitle">Custom Content</h2>
      <p className="docs-paragraph">
        Since cards are flexible, you can nest complex layouts and media inside them.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-sm">
          <Card
            title="User Profile"
            description="Manage your account settings and preferences here."
          />
          <div className="mt-[-20px] px-6 pb-6 pt-0">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-800/50 border border-neutral-200 dark:border-white/5">
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">JD</div>
              <div>
                <p className="text-sm font-semibold">Jane Doe</p>
                <p className="text-xs text-neutral-500">Product Designer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CodeBlock code={`<Card title="User Profile" description="...">
  {/* Custom content can be nested alongside or inside */}
</Card>`} />

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
              <td className="docs-prop-name">title</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Card heading</td>
            </tr>
            <tr>
              <td className="docs-prop-name">description</td>
              <td><span className="docs-prop-type">string</span></td>
              <td>-</td>
              <td>Card content text</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Accordion', route: '/ui-basics/accordion' }}
        next={{ label: 'Stepper', route: '/ui-basics/stepper' }}
      />
    </section>
  );
};

export default CardDoc;
