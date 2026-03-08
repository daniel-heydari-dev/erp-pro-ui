import { useState } from 'react';
import { Chip, ChipVariant, ChipColor, ChipSize, Select, Checkbox } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const ChipDoc = () => {
  const [variant, setVariant] = useState<ChipVariant>('soft');
  const [size, setSize] = useState<ChipSize>('md');
  const [removable, setRemovable] = useState(true);

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Chip</h1>
      <p className="docs-paragraph">
        Compact elements that represent an input, attribute, or action.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Interactive Playground</h2>

      <div className="docs-controls">
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Variant</label>
          <Select
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            className="w-48"
            options={[
              { label: 'Filled', value: 'filled' },
              { label: 'Outlined', value: 'outlined' },
              { label: 'Soft', value: 'soft' },
              { label: 'Glass', value: 'glass' },
            ]}
          />
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Size</label>
          <Select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="w-48"
            options={[
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ]}
          />
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Options</label>
          <Checkbox
            checked={removable}
            onChange={(e) => setRemovable(e.target.checked)}
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
            onRemove={removable ? () => alert('Removed!') : undefined}
          >
            Default
          </Chip>
          <Chip
            variant={variant}
            size={size}
            color="primary"
            onRemove={removable ? () => alert('Removed!') : undefined}
          >
            Primary
          </Chip>
          <Chip
            variant={variant}
            size={size}
            color="success"
            dot
          >
            Online
          </Chip>
        </div>
      </div>

      <CodeBlock code={`import { Chip } from '@erp-pro/ui';

<Chip 
  variant="${variant}" 
  size="${size}" 
  color="primary"
  ${removable ? 'onRemove={() => {}}' : ''}
>
  Label
</Chip>`} />

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
        Chips can feature a pulse dot indicator, perfect for showing live status or connectivity.
      </p>
      <div className="docs-showcase-card flex-wrap gap-3">
        <Chip color="success" dot>Live Now</Chip>
        <Chip color="error" dot dotColor="#ff0000">System Error</Chip>
        <Chip color="info" dot>Processing</Chip>
      </div>

      <CodeBlock code={`<Chip color="success" dot>Live Now</Chip>
<Chip color="error" dot dotColor="#ff0000">System Error</Chip>`} />

      {/* Clickable Actions */}
      <h2 className="docs-category-subtitle">Interactive Actions</h2>
      <p className="docs-paragraph">
        Add an <code>onClick</code> handler to use chips as compact action buttons or filter toggles.
      </p>
      <div className="docs-showcase-card flex-wrap gap-3">
        <Chip
          variant="outlined"
          color="primary"
          onClick={() => alert('Filter applied!')}
          startIcon={<span>🔍</span>}
        >
          Search Filter
        </Chip>
        <Chip
          variant="glass"
          onClick={() => alert('Settings opened')}
          startIcon={<span>⚙️</span>}
        >
          Manage
        </Chip>
      </div>

      <CodeBlock code={`<Chip 
  variant="outlined" 
  onClick={() => {}}
>
  Clickable Action
</Chip>`} />

      {/* Removable Tags */}
      <h2 className="docs-category-subtitle">Removable Tags</h2>
      <p className="docs-paragraph">
        Use <code>onRemove</code> to display a close button, ideal for multi-select filters and tags.
      </p>
      <div className="docs-showcase-card flex-wrap gap-3">
        <Chip color="secondary" onRemove={() => alert('Removed React')}>React</Chip>
        <Chip color="secondary" onRemove={() => alert('Removed TypeScript')}>TypeScript</Chip>
        <Chip color="secondary" onRemove={() => alert('Removed Tailwind')}>Tailwind</Chip>
      </div>

      <CodeBlock code={`<Chip onRemove={() => handleRemove(tag.id)}>
  {tag.name}
</Chip>`} />

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
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">'filled' | 'outlined' | 'soft' | 'glass'</span></td>
              <td>'soft'</td>
              <td>Visual style</td>
            </tr>
            <tr>
              <td className="docs-prop-name">color</td>
              <td><span className="docs-prop-type">ChipColor</span></td>
              <td>'default'</td>
              <td>Color theme</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td><span className="docs-prop-type">'sm' | 'md' | 'lg'</span></td>
              <td>'md'</td>
              <td>Size of the chip</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onRemove</td>
              <td><span className="docs-prop-type">() =&gt; void</span></td>
              <td>-</td>
              <td>Function called when remove button is clicked</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Stepper', route: '/ui-basics/stepper' }}
        next={{ label: 'Calendar', route: '/ui-basics/calendar' }}
      />
    </section>
  );
};

export default ChipDoc;
