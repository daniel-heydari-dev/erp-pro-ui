import { AreaChart, AreaChartData } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const financeData: AreaChartData[] = [
  { name: "Jan", revenue: 4200, expenses: 2500 },
  { name: "Feb", revenue: 3950, expenses: 2200 },
  { name: "Mar", revenue: 4600, expenses: 2800 },
  { name: "Apr", revenue: 5100, expenses: 3000 },
  { name: "May", revenue: 5450, expenses: 3250 },
  { name: "Jun", revenue: 5900, expenses: 3480 },
  { name: "Jul", revenue: 6400, expenses: 3700 },
];

const financeCategories = [
  { key: "revenue", color: "#7367f0" },
  { key: "expenses", color: "#ff4c51" },
];

const demandData: AreaChartData[] = [
  { name: "Week 1", inbound: 120, outbound: 90, returns: 22 },
  { name: "Week 2", inbound: 148, outbound: 106, returns: 26 },
  { name: "Week 3", inbound: 166, outbound: 124, returns: 20 },
  { name: "Week 4", inbound: 154, outbound: 132, returns: 18 },
  { name: "Week 5", inbound: 182, outbound: 148, returns: 24 },
];

const demandCategories = [
  { key: "inbound", color: "#00cfe8" },
  { key: "outbound", color: "#28c76f" },
  { key: "returns", color: "#ff9f43" },
];

const AreaChartDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Area Chart</h1>
      <p className="docs-paragraph">
        Area charts are useful when you want trend readability from a line chart
        while also emphasizing volume over time.
      </p>

      <h2 className="docs-category-subtitle">Revenue vs Expenses</h2>
      <p className="docs-paragraph mb-4">
        A two-series area chart works well for executive summaries where users
        need to compare upside and operational spend at the same time.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <AreaChart
            data={financeData}
            categories={financeCategories}
            height={360}
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { AreaChart, AreaChartData } from 'erp-pro-ui';

const data: AreaChartData[] = [
  { name: 'Jan', revenue: 4200, expenses: 2500 },
  { name: 'Feb', revenue: 3950, expenses: 2200 },
  { name: 'Mar', revenue: 4600, expenses: 2800 },
];

const categories = [
  { key: 'revenue', color: '#7367f0' },
  { key: 'expenses', color: '#ff4c51' },
];

export function RevenueAreaChartExample() {
  return <AreaChart data={data} categories={categories} height={360} />;
}`}
      />

      <h2 className="docs-category-subtitle">Multi-Series Demand Tracking</h2>
      <p className="docs-paragraph mb-4">
        Add more categories when the user needs to compare related operational
        flows in the same visual frame.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <AreaChart
            data={demandData}
            categories={demandCategories}
            height={360}
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { AreaChart, AreaChartData } from 'erp-pro-ui';

const demandData: AreaChartData[] = [
  { name: 'Week 1', inbound: 120, outbound: 90, returns: 22 },
  { name: 'Week 2', inbound: 148, outbound: 106, returns: 26 },
  { name: 'Week 3', inbound: 166, outbound: 124, returns: 20 },
];

export function DemandTrackingAreaChartExample() {
  return (
    <AreaChart
      data={demandData}
      categories={[
        { key: 'inbound', color: '#00cfe8' },
        { key: 'outbound', color: '#28c76f' },
        { key: 'returns', color: '#ff9f43' },
      ]}
      height={360}
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Minimal Presentation</h2>
      <p className="docs-paragraph mb-4">
        Hide the grid for denser dashboards or branded analytics screens where
        the background needs to stay visually quieter.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <AreaChart
            data={financeData}
            categories={[{ key: "revenue", color: "#7367f0" }]}
            height={320}
            showGrid={false}
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { AreaChart, AreaChartData } from 'erp-pro-ui';

const financeData: AreaChartData[] = [
  { name: 'Jan', revenue: 4200 },
  { name: 'Feb', revenue: 3950 },
  { name: 'Mar', revenue: 4600 },
];

export function MinimalAreaChartExample() {
  return (
    <AreaChart
      data={financeData}
      categories={[{ key: 'revenue', color: '#7367f0' }]}
      height={320}
      showGrid={false}
    />
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
              <td className="docs-prop-name">data</td>
              <td>
                <span className="docs-prop-type">AreaChartData[]</span>
              </td>
              <td>-</td>
              <td>
                Array of items containing a name field plus one or more numeric
                series
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">categories</td>
              <td>
                <span className="docs-prop-type">
                  {"{ key: string; color: string }[]"}
                </span>
              </td>
              <td>-</td>
              <td>
                Determines which data keys are rendered and what color each
                series uses
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>300</td>
              <td>Height of the responsive chart container</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showGrid</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Toggles the background grid lines</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>''</td>
              <td>Additional classes for the outer chart container</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Skeleton", route: "/ui-basics/skeleton" }}
        next={{ label: "Bar Chart", route: "/ui-basics/bar-chart" }}
      />
    </section>
  );
};

export default AreaChartDoc;
