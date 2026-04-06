import {
  PositiveNegativeBarChart,
  type PositiveNegativeBarChartData,
} from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const monthlyNetContribution: PositiveNegativeBarChartData[] = [
  { name: "Jan", value: 14_800 },
  { name: "Feb", value: 9_600 },
  { name: "Mar", value: -4_200 },
  { name: "Apr", value: 12_500 },
  { name: "May", value: -2_600 },
  { name: "Jun", value: 18_200 },
  { name: "Jul", value: 7_400 },
  { name: "Aug", value: -1_900 },
];

const squadVariance: PositiveNegativeBarChartData[] = [
  { name: "Support", value: 8 },
  { name: "Growth", value: -3 },
  { name: "Finance", value: 5 },
  { name: "Ops", value: -7 },
  { name: "Platform", value: 11 },
];

const rolloutImpact: PositiveNegativeBarChartData[] = [
  { name: "Search", value: 3200 },
  { name: "Checkout", value: -1800 },
  { name: "Billing", value: 2400 },
  { name: "Inventory", value: -2600 },
  { name: "Reports", value: 1400 },
  { name: "Audit", value: 0 },
];

const formatCurrencyDelta = (value: number): string => {
  const absValue = Math.abs(value);
  const compact =
    absValue >= 1000 ? `${(absValue / 1000).toFixed(1)}k` : absValue.toString();

  return `${value >= 0 ? "+" : "-"}$${compact}`;
};

const formatPercentDelta = (value: number): string =>
  `${value >= 0 ? "+" : ""}${value}%`;

const PositiveNegativeBarChartDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Positive Negative Bar Chart</h1>
      <p className="docs-paragraph">
        PositiveNegativeBarChart is designed for signed deltas, profit-and-loss
        reporting, and any metric that needs a clear zero baseline between gains
        and losses.
      </p>

      <h2 className="docs-category-subtitle">Monthly Profit and Loss</h2>
      <p className="docs-paragraph mb-4">
        Use this pattern when the story is about movement above and below zero,
        not total throughput.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <PositiveNegativeBarChart
            data={monthlyNetContribution}
            height={360}
            valueFormatter={formatCurrencyDelta}
            tickFormatter={formatCurrencyDelta}
            seriesLabel="Net contribution"
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { PositiveNegativeBarChart, type PositiveNegativeBarChartData } from 'erp-pro-ui';

const data: PositiveNegativeBarChartData[] = [
  { name: 'Jan', value: 14800 },
  { name: 'Feb', value: 9600 },
  { name: 'Mar', value: -4200 },
  { name: 'Apr', value: 12500 },
];

const formatCurrencyDelta = (value: number) => {
  const absValue = Math.abs(value);
  const compact = absValue >= 1000 ? String((absValue / 1000).toFixed(1)) + 'k' : String(absValue);
  return String(value >= 0 ? '+' : '-') + '$' + compact;
};

export function MonthlyProfitLossExample() {
  return (
    <PositiveNegativeBarChart
      data={data}
      height={360}
      valueFormatter={formatCurrencyDelta}
      tickFormatter={formatCurrencyDelta}
      seriesLabel="Net contribution"
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Vertical Variance Ranking</h2>
      <p className="docs-paragraph mb-4">
        Vertical layout works well for department rankings and score deltas when
        category labels are longer than the chart is tall.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <PositiveNegativeBarChart
            data={squadVariance}
            height={330}
            layout="vertical"
            valueFormatter={formatPercentDelta}
            tickFormatter={formatPercentDelta}
            seriesLabel="Target variance"
            positiveColor="var(--ds-chart-2)"
            negativeColor="var(--ds-chart-5)"
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { PositiveNegativeBarChart, type PositiveNegativeBarChartData } from 'erp-pro-ui';

const data: PositiveNegativeBarChartData[] = [
  { name: 'Support', value: 8 },
  { name: 'Growth', value: -3 },
  { name: 'Finance', value: 5 },
  { name: 'Ops', value: -7 },
  { name: 'Platform', value: 11 },
];

const formatPercentDelta = (value: number) => String(value >= 0 ? '+' : '') + String(value) + '%';

export function VerticalVarianceExample() {
  return (
    <PositiveNegativeBarChart
      data={data}
      height={330}
      layout="vertical"
      valueFormatter={formatPercentDelta}
      tickFormatter={formatPercentDelta}
      seriesLabel="Target variance"
      positiveColor="var(--ds-chart-2)"
      negativeColor="var(--ds-chart-5)"
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Compact Release Impact</h2>
      <p className="docs-paragraph mb-4">
        Neutral values and opposite-moving modules still read clearly in tighter
        KPI cards when you remove the grid and use a compact height.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-5xl">
          <PositiveNegativeBarChart
            data={rolloutImpact}
            height={290}
            showGrid={false}
            valueFormatter={formatCurrencyDelta}
            tickFormatter={formatCurrencyDelta}
            seriesLabel="Release delta"
            positiveColor="var(--ds-chart-3)"
            negativeColor="var(--ds-chart-4)"
            neutralColor="var(--ds-chart-15)"
            className="px-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { PositiveNegativeBarChart, type PositiveNegativeBarChartData } from 'erp-pro-ui';

const data: PositiveNegativeBarChartData[] = [
  { name: 'Search', value: 3200 },
  { name: 'Checkout', value: -1800 },
  { name: 'Billing', value: 2400 },
  { name: 'Inventory', value: -2600 },
  { name: 'Reports', value: 1400 },
  { name: 'Audit', value: 0 },
];

const formatCurrencyDelta = (value: number) => {
  const absValue = Math.abs(value);
  const compact = absValue >= 1000 ? String((absValue / 1000).toFixed(1)) + 'k' : String(absValue);
  return String(value >= 0 ? '+' : '-') + '$' + compact;
};

export function ReleaseImpactExample() {
  return (
    <PositiveNegativeBarChart
      data={data}
      height={290}
      showGrid={false}
      valueFormatter={formatCurrencyDelta}
      tickFormatter={formatCurrencyDelta}
      seriesLabel="Release delta"
      positiveColor="var(--ds-chart-3)"
      negativeColor="var(--ds-chart-4)"
      neutralColor="var(--ds-chart-15)"
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
                  PositiveNegativeBarChartData[]
                </span>
              </td>
              <td>-</td>
              <td>Category rows with a signed numeric value field.</td>
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
                axis.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">
                positiveColor / negativeColor / neutralColor
              </td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>theme chart tokens</td>
              <td>
                Sets the fill color for positive, negative, and zero values.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">valueFormatter / tickFormatter</td>
              <td>
                <span className="docs-prop-type">
                  (value: number) =&gt; string
                </span>
              </td>
              <td>-</td>
              <td>
                Formats bars and axis ticks for currency, percentages, or signed
                KPI labels.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">height</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>300</td>
              <td>Height of the responsive chart container.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Bar Chart", route: "/ui-basics/bar-chart" }}
        next={{ label: "Pie Chart", route: "/ui-basics/pie-chart" }}
      />
    </section>
  );
};

export default PositiveNegativeBarChartDoc;
