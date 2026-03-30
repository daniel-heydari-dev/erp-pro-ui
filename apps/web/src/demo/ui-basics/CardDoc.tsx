import { Card } from 'erp-pro-ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const CardDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Card</h1>
      <p className="docs-paragraph">
        A compact summary surface for highlights, empty states, and lightweight dashboard content.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Card
          title="Project Update"
          description="The new UI component package has been deployed to the staging environment."
        />
      </div>

      <CodeBlock code={`import { Card } from 'erp-pro-ui';

<Card 
  title="Project Update" 
  description="The new UI component package has been deployed to the staging environment." 
/>`} />

      <h2 className="docs-category-subtitle">Dashboard Summaries</h2>
      <p className="docs-paragraph">
        Cards are well suited for compact KPI rows and status summaries.
      </p>
      <div className="docs-showcase-card">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 w-full max-w-4xl">
          <Card
            title="Orders Reviewed"
            description="124 purchase orders were verified in the last 24 hours."
          />
          <Card
            title="Stock Alerts"
            description="8 SKUs require replenishment before the next delivery wave."
          />
          <Card
            title="Warehouse Health"
            description="Cycle-count completion is currently at 96% across all active zones."
          />
        </div>
      </div>

      <CodeBlock code={`<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
  <Card title="Orders Reviewed" description="124 purchase orders were verified in the last 24 hours." />
  <Card title="Stock Alerts" description="8 SKUs require replenishment before the next delivery wave." />
  <Card title="Warehouse Health" description="Cycle-count completion is currently at 96% across all active zones." />
</div>`} />

      <h2 className="docs-category-subtitle">Long-Form Content</h2>
      <p className="docs-paragraph">
        The component still reads cleanly when the description needs more operational detail.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-xl">
          <Card
            title="Migration Checklist"
            description="Before enabling the new ERP workspace for every branch, confirm role mappings, import the supplier catalog, verify audit retention settings, and schedule a final permission review with operations leadership."
          />
        </div>
      </div>

      <CodeBlock code={`<Card
  title="Migration Checklist"
  description="Before enabling the new ERP workspace for every branch, confirm role mappings, import the supplier catalog, verify audit retention settings, and schedule a final permission review with operations leadership."
/>`} />

      <h2 className="docs-category-subtitle">Core Props</h2>
      <p className="docs-paragraph">
        This card intentionally keeps a minimal API: pass concise text through
        <span className="docs-highlight"> title </span> and
        <span className="docs-highlight"> description </span>, then compose layout around the card with your own containers.
      </p>
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
              <td>Supporting content shown below the title</td>
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
