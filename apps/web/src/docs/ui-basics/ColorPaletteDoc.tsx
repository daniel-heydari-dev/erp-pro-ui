import { ColorPalette } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const ColorPaletteDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Color Palette</h1>
      <p className="docs-paragraph">
        A reference guide for the Antigravity UI design system colors.
      </p>

      {/* Full Palette */}
      <h2 className="docs-category-subtitle">System Palette</h2>
      <div className="docs-showcase-card h-auto p-4 block">
        <ColorPalette
          theme="all"
          showGradients={true}
          showUsageExamples={false}
        />
      </div>

      <CodeBlock
        code={`import { ColorPalette } from 'erp-pro-ui';

/* Show the entire system palette */
<ColorPalette theme="all" />

/* Show specific theme only */
<ColorPalette theme="dark" />`}
      />

      {/* Usage Example Section */}
      <h2 className="docs-category-subtitle">Implementation Guide</h2>
      <p className="docs-paragraph">
        Reference for using these colors via CSS variables or Tailwind.
      </p>
      <div className="docs-showcase-card h-auto p-4 block">
        <ColorPalette
          groups={[]}
          showUsageExamples={true}
          showGradients={false}
        />
      </div>

      <CodeBlock
        code={`/* Customizing color groups */
const myGroups = [
  {
    name: "Brand Colors",
    colors: [
      { name: "brand-pink", value: "#FF0077" },
      { name: "brand-cyan", value: "#00E0FF" },
    ]
  }
];

<ColorPalette groups={myGroups} />`}
      />

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
              <td className="docs-prop-name">theme</td>
              <td>
                <span className="docs-prop-type">'light' | 'dark' | 'all'</span>
              </td>
              <td>'all'</td>
              <td>Which theme colors to display</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showGradients</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Whether to show the gradient section</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showUsageExamples</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Whether to show code snippets for usage</td>
            </tr>
            <tr>
              <td className="docs-prop-name">groups</td>
              <td>
                <span className="docs-prop-type">ColorGroup[]</span>
              </td>
              <td>-</td>
              <td>Custom color groups to override defaults</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Chroma Grid", route: "/ui-basics/chroma-grid" }}
        next={{ label: "Gradual Blur", route: "/ui-basics/gradual-blur" }}
      />
    </section>
  );
};

export default ColorPaletteDoc;
