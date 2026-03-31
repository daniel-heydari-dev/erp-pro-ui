import { useState } from "react";
import { Chip, ChipVariant, ChipSize, Select, Checkbox } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const chipVariantOptions: Array<{ label: string; value: ChipVariant }> = [
  { label: "Filled", value: "filled" },
  { label: "Outlined", value: "outlined" },
  { label: "Soft", value: "soft" },
  { label: "Glass", value: "glass" },
];

const chipSizeOptions: Array<{ label: string; value: ChipSize }> = [
  { label: "Small", value: "sm" },
  { label: "Medium", value: "md" },
  { label: "Large", value: "lg" },
];

const ChipDoc = () => {
  const [variant, setVariant] = useState<ChipVariant>("soft");
  const [size, setSize] = useState<ChipSize>("md");
  const [removable, setRemovable] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "review">(
    "all",
  );
  const [tags, setTags] = useState(["Berlin", "Enterprise", "Priority"]);
  const [lastAction, setLastAction] = useState("None yet");

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Chip</h1>
      <p className="docs-paragraph">
        Compact tokens for status, filtering, assignments, and removable
        selections in dense UI surfaces.
      </p>

      <h2 className="docs-category-subtitle">Interactive Playground</h2>

      <div className="docs-controls">
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Variant</label>
          <Select
            value={variant}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setVariant(e.target.value as ChipVariant)
            }
            className="w-48"
            options={chipVariantOptions}
          />
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Size</label>
          <Select
            value={size}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSize(e.target.value as ChipSize)
            }
            className="w-48"
            options={chipSizeOptions}
          />
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Options</label>
          <Checkbox
            checked={removable}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRemovable(e.target.checked)
            }
            label="Removable"
          />
        </div>
      </div>

      <div className="docs-showcase-card flex-col gap-4">
        <div className="flex flex-wrap gap-3">
          <Chip
            variant={variant}
            size={size}
            color="default"
            onRemove={
              removable
                ? () => setLastAction("Removed the default preview chip")
                : undefined
            }
          >
            Default
          </Chip>
          <Chip
            variant={variant}
            size={size}
            color="primary"
            onRemove={
              removable
                ? () => setLastAction("Removed the primary preview chip")
                : undefined
            }
          >
            Primary
          </Chip>
          <Chip variant={variant} size={size} color="success" dot>
            Online
          </Chip>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Last action: {lastAction}
        </p>
      </div>

      <CodeBlock
        code={`import { Chip } from 'erp-pro-ui';

<Chip 
  variant="${variant}" 
  size="${size}" 
  color="primary"
  ${removable ? "onRemove={() => {}}" : ""}
>
  Label
</Chip>`}
      />

      {/* Colors Section */}
      <h2 className="docs-category-subtitle">Colors</h2>
      <div className="docs-showcase-card flex-wrap gap-3">
        <Chip color="default">Default</Chip>
        <Chip color="primary">Primary</Chip>
        <Chip color="secondary">Secondary</Chip>
        <Chip color="success">Success</Chip>
        <Chip color="warning">Warning</Chip>
        <Chip color="error">Error</Chip>
        <Chip color="info">Info</Chip>
      </div>

      {/* Status Indicators */}
      <h2 className="docs-category-subtitle">Status & Dots</h2>
      <p className="docs-paragraph">
        Chips can feature a pulse dot indicator, perfect for showing live status
        or connectivity.
      </p>
      <div className="docs-showcase-card flex-wrap gap-3">
        <Chip color="success" dot>
          Live Now
        </Chip>
        <Chip color="error" dot dotColor="#ff0000">
          System Error
        </Chip>
        <Chip color="info" dot>
          Processing
        </Chip>
      </div>

      <CodeBlock
        code={`<Chip color="success" dot>Live Now</Chip>
<Chip color="error" dot dotColor="#ff0000">System Error</Chip>`}
      />

      <h2 className="docs-category-subtitle">Interactive Filters</h2>
      <p className="docs-paragraph">
        Chips can also act as compact filter toggles or action shortcuts.
      </p>
      <div className="docs-showcase-card flex-wrap gap-3">
        <Chip
          variant={activeFilter === "all" ? "filled" : "outlined"}
          color="primary"
          onClick={() => setActiveFilter("all")}
          startIcon={<span>🔍</span>}
        >
          All orders
        </Chip>
        <Chip
          variant={activeFilter === "active" ? "filled" : "outlined"}
          color="success"
          onClick={() => setActiveFilter("active")}
          startIcon={<span>●</span>}
        >
          Active only
        </Chip>
        <Chip
          variant={activeFilter === "review" ? "filled" : "outlined"}
          color="warning"
          onClick={() => setActiveFilter("review")}
          startIcon={<span>⏳</span>}
        >
          Pending review
        </Chip>
      </div>

      <CodeBlock
        code={`<Chip 
  variant="outlined" 
  onClick={() => setFilter('active')}
>
  Active only
</Chip>`}
      />

      <h2 className="docs-category-subtitle">Removable Tags</h2>
      <p className="docs-paragraph">
        Use <code>onRemove</code> to display a close button, ideal for
        multi-select filters and tags.
      </p>
      <div className="docs-showcase-card flex-wrap gap-3">
        {tags.map((tag) => (
          <Chip
            key={tag}
            color="secondary"
            onRemove={() =>
              setTags((current) => current.filter((item) => item !== tag))
            }
          >
            {tag}
          </Chip>
        ))}
      </div>

      <CodeBlock
        code={`<Chip onRemove={() => handleRemove(tag.id)}>
  {tag.name}
</Chip>`}
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
              <td className="docs-prop-name">children</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Visible label content inside the chip.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td>
                <span className="docs-prop-type">
                  'filled' | 'outlined' | 'soft' | 'glass'
                </span>
              </td>
              <td>'soft'</td>
              <td>Visual style</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td>
                <span className="docs-prop-type">ChipColor</span>
              </td>
              <td>'default'</td>
              <td>Color theme</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td>
                <span className="docs-prop-type">'sm' | 'md' | 'lg'</span>
              </td>
              <td>'md'</td>
              <td>Size of the chip.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onRemove</td>
              <td>
                <span className="docs-prop-type">() =&gt; void</span>
              </td>
              <td>-</td>
              <td>Shows remove button and handles remove action.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onClick</td>
              <td>
                <span className="docs-prop-type">() =&gt; void</span>
              </td>
              <td>-</td>
              <td>
                Makes the chip interactive (filter toggles, quick actions).
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">disabled</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Disables interaction and remove action.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">startIcon</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Optional leading icon.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">endIcon</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>
                Optional trailing icon when <code>onRemove</code> is not set.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">dot</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Shows a pulsing status dot indicator.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">dotColor</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>From color</td>
              <td>Custom dot color (hex/rgb/css value).</td>
            </tr>
            <tr>
              <td className="docs-prop-name">maxWidth</td>
              <td>
                <span className="docs-prop-type">number | string</span>
              </td>
              <td>-</td>
              <td>Constrains width and truncates text with ellipsis.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">className</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Custom class name for the root chip element.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Stepper", route: "/ui-basics/stepper" }}
        next={{ label: "Calendar", route: "/ui-basics/calendar" }}
      />
    </section>
  );
};

export default ChipDoc;
