import { BarChart, BarChartData } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const monthlyData: BarChartData[] = [
  { name: "Jan", fulfilled: 420, delayed: 38 },
  { name: "Feb", fulfilled: 465, delayed: 29 },
  { name: "Mar", fulfilled: 510, delayed: 34 },
  { name: "Apr", fulfilled: 548, delayed: 22 },
  { name: "May", fulfilled: 592, delayed: 18 },
  { name: "Jun", fulfilled: 625, delayed: 26 },
];

const monthlyCategories = [
  { key: "fulfilled", color: "#00cfe8" },
  { key: "delayed", color: "#ff9f43" },
];

const rankingData: BarChartData[] = [
  { name: "North Distribution Hub", transfers: 128 },
  { name: "Central Returns Team", transfers: 102 },
  { name: "West Picking Zone", transfers: 94 },
  { name: "Airport Forwarding Desk", transfers: 77 },
];

const BarChartDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Bar Chart</h1>
      <p className="docs-paragraph">
        Bar charts are the right choice when the user is comparing distinct
        buckets rather than reading continuous change.
      </p>

      <h2 className="docs-category-subtitle">Monthly Comparison</h2>
      <p className="docs-paragraph mb-4">
        The default horizontal layout works well for monthly or sequential
        reporting where categories follow a natural order.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <BarChart
            data={monthlyData}
            categories={monthlyCategories}
            height={360}
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { BarChart, BarChartData } from 'erp-pro-ui';

const data: BarChartData[] = [
  { name: 'Jan', fulfilled: 420, delayed: 38 },
  { name: 'Feb', fulfilled: 465, delayed: 29 },
  { name: 'Mar', fulfilled: 510, delayed: 34 },
];

const categories = [
  { key: 'fulfilled', color: '#00cfe8' },
  { key: 'delayed', color: '#ff9f43' },
];

<BarChart data={data} categories={categories} height={360} />`}
      />

      <h2 className="docs-category-subtitle">Ranking Layout</h2>
      <p className="docs-paragraph mb-4">
        Switch to the vertical layout when labels are longer or when you want a
        leaderboard-style presentation.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <BarChart
            data={rankingData}
            categories={[{ key: "transfers", color: "#28c76f" }]}
            height={360}
            layout="vertical"
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`<BarChart
  data={rankingData}
  categories={[{ key: 'transfers', color: '#28c76f' }]}
  height={360}
  layout="vertical"
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
              <td className="docs-prop-name">data</td>
              <td>
                <span className="docs-prop-type">BarChartData[]</span>
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
                Maps chart series keys to the bar colors that should be rendered
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">layout</td>
              <td>
                <span className="docs-prop-type">
                  'horizontal' | 'vertical'
                </span>
              </td>
              <td>'horizontal'</td>
              <td>
                Controls whether categories run across the X axis or down the Y
                axis
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>300</td>
              <td>Height of the responsive chart wrapper</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>''</td>
              <td>Optional classes applied to the outer chart container</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Area Chart", route: "/ui-basics/area-chart" }}
        next={{ label: "Pie Chart", route: "/ui-basics/pie-chart" }}
      />
    </section>
  );
};

export default BarChartDoc;
