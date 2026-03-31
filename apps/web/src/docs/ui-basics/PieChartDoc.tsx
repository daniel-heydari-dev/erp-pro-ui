import { PieChart, PieChartData } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const productMixData: PieChartData[] = [
  { name: "Software", value: 420 },
  { name: "Hardware", value: 260 },
  { name: "Services", value: 210 },
  { name: "Cloud", value: 160 },
];

const resolutionData: PieChartData[] = [
  { name: "Resolved", value: 68 },
  { name: "Escalated", value: 18 },
  { name: "Pending", value: 14 },
];

const palette = ["#7367f0", "#00cfe8", "#28c76f", "#ff9f43"];
const compactPalette = ["#28c76f", "#ff9f43", "#ff4c51"];

const PieChartDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Pie Chart</h1>
      <p className="docs-paragraph">
        Pie and donut charts are useful for distribution summaries where the
        user needs share of total rather than time-based comparison.
      </p>

      <h2 className="docs-category-subtitle">Donut Distribution</h2>
      <p className="docs-paragraph mb-4">
        The donut style is often easier to place inside dashboards because it
        feels lighter and leaves more room for surrounding context.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-4xl">
          <PieChart
            data={productMixData}
            colors={palette}
            variant="donut"
            height={320}
          />
        </div>
      </div>

      <CodeBlock
        code={`import { PieChart, PieChartData } from 'erp-pro-ui';

const data: PieChartData[] = [
  { name: 'Software', value: 420 },
  { name: 'Hardware', value: 260 },
  { name: 'Services', value: 210 },
  { name: 'Cloud', value: 160 },
];

<PieChart
  data={data}
  colors={['#7367f0', '#00cfe8', '#28c76f', '#ff9f43']}
  variant="donut"
  height={320}
/>`}
      />

      <h2 className="docs-category-subtitle">Compact Status Split</h2>
      <p className="docs-paragraph mb-4">
        Use the solid pie when the chart is small and the visual separation
        between slices needs to stay strong.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-4xl">
          <PieChart
            data={resolutionData}
            colors={compactPalette}
            variant="pie"
            height={320}
          />
        </div>
      </div>

      <CodeBlock
        code={`<PieChart
  data={resolutionData}
  colors={['#28c76f', '#ff9f43', '#ff4c51']}
  variant="pie"
  height={320}
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
                <span className="docs-prop-type">PieChartData[]</span>
              </td>
              <td>-</td>
              <td>
                Array of items containing a display name and numeric value
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">colors</td>
              <td>
                <span className="docs-prop-type">string[]</span>
              </td>
              <td>-</td>
              <td>
                Color palette used for slices in the order they are rendered
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td>
                <span className="docs-prop-type">'pie' | 'donut'</span>
              </td>
              <td>'donut'</td>
              <td>Chooses whether the center stays solid or hollow</td>
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
              <td>Optional classes applied to the outer container</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Bar Chart", route: "/ui-basics/bar-chart" }}
        next={{ label: "Neon Line Chart", route: "/ui-basics/neon-line-chart" }}
      />
    </section>
  );
};

export default PieChartDoc;
