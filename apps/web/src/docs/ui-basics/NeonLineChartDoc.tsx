import { NeonLineChart } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const NeonLineChartDoc = () => {
  const latencyData = [
    { name: "Mon", value: 42 },
    { name: "Tue", value: 38 },
    { name: "Wed", value: 45 },
    { name: "Thu", value: 34 },
    { name: "Fri", value: 31 },
    { name: "Sat", value: 36 },
    { name: "Sun", value: 29 },
  ];

  const throughputData = [
    { name: "00:00", value: 18 },
    { name: "04:00", value: 24 },
    { name: "08:00", value: 42 },
    { name: "12:00", value: 58 },
    { name: "16:00", value: 51 },
    { name: "20:00", value: 33 },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Neon Line Chart</h1>
      <p className="docs-paragraph">
        NeonLineChart is a stylized line chart for premium dashboards, live
        activity views, or any reporting surface where the chart should read as
        a visual focal point.
      </p>

      <h2 className="docs-category-subtitle">Default Neon Styling</h2>
      <p className="docs-paragraph mb-4">
        The default gradient and glow already produce a strong visual treatment
        without extra CSS.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <NeonLineChart data={latencyData} height={340} className="px-2" />
        </div>
      </div>

      <CodeBlock
        code={`import { NeonLineChart } from 'erp-pro-ui';

const data = [
  { name: 'Mon', value: 42 },
  { name: 'Tue', value: 38 },
  { name: 'Wed', value: 45 },
];

export function DefaultNeonLineChartExample() {
  return <NeonLineChart data={data} height={340} />;
}`}
      />

      <h2 className="docs-category-subtitle">Custom Brand Glow</h2>
      <p className="docs-paragraph mb-4">
        Override the gradient stops and outer glow when the chart needs to match
        a product-specific palette or campaign theme.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <NeonLineChart
            data={throughputData}
            height={340}
            lineColorStop1="#00cfe8"
            lineColorStop2="#7367f0"
            glowColor="rgba(115, 103, 240, 0.45)"
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { NeonLineChart } from 'erp-pro-ui';

const throughputData = [
  { name: '00:00', value: 18 },
  { name: '04:00', value: 24 },
  { name: '08:00', value: 42 },
  { name: '12:00', value: 58 },
];

export function BrandedNeonLineChartExample() {
  return (
    <NeonLineChart
      data={throughputData}
      height={340}
      lineColorStop1="#00cfe8"
      lineColorStop2="#7367f0"
      glowColor="rgba(115, 103, 240, 0.45)"
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
                <span className="docs-prop-type">
                  {"{ name: string; value: number }[]"}
                </span>
              </td>
              <td>-</td>
              <td>Timeline data rendered as a single glowing series</td>
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
              <td className="docs-prop-name">
                lineColorStop1 / lineColorStop2
              </td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'#00f0ff' / '#ff00e5'</td>
              <td>Gradient endpoints used for the main line stroke</td>
            </tr>
            <tr>
              <td className="docs-prop-name">glowColor</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'rgba(255, 0, 229, 0.4)'</td>
              <td>Primary shadow color used in the glow filter</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>''</td>
              <td>Optional classes for the outer chart wrapper</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Pie Chart", route: "/ui-basics/pie-chart" }}
        next={{
          label: "Stacked Bar Chart",
          route: "/ui-basics/stacked-bar-chart",
        }}
      />
    </section>
  );
};

export default NeonLineChartDoc;
