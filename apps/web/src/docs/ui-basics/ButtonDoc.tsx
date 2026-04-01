import { useState } from "react";
import { Button } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const ButtonDoc = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleAsyncSave = () => {
    setSaved(false);
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSaved(true);
    }, 1500);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Button</h1>
      <p className="docs-paragraph">
        Button is the primary action trigger for forms, dialogs, cards, and
        table toolbars. It supports two visual variants, three sizes, and all
        native button attributes.
      </p>

      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <div className="flex flex-wrap items-center gap-3">
          <Button label="Save changes" primary />
          <Button label="Cancel" />
        </div>
      </div>

      <CodeBlock
        code={`import { Button } from 'erp-pro-ui';

<Button label="Save changes" primary />
<Button label="Cancel" />`}
      />

      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Use <code>primary</code> for the highest-priority action in a section.
        Keep secondary actions neutral to preserve clear hierarchy.
      </p>

      <div className="docs-showcase-grid">
        <div className="docs-showcase-card">
          <Button label="Publish" primary />
          <span className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Primary
          </span>
        </div>
        <div className="docs-showcase-card">
          <Button label="Preview" />
          <span className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Secondary
          </span>
        </div>
      </div>

      <CodeBlock
        code={`<Button label="Publish" primary />
<Button label="Preview" />`}
      />

      <h2 className="docs-category-subtitle">Sizes</h2>
      <p className="docs-paragraph">
        Size options help maintain rhythm across compact toolbars, standard
        forms, and high-emphasis call-to-actions.
      </p>

      <div className="docs-showcase-card flex-row items-end flex-wrap">
        <Button label="Small" size="small" primary />
        <Button label="Medium" size="medium" primary />
        <Button label="Large" size="large" primary />
      </div>

      <CodeBlock
        code={`<Button label="Small" size="small" primary />
<Button label="Medium" size="medium" primary />
<Button label="Large" size="large" primary />`}
      />

      <h2 className="docs-category-subtitle">Disabled and Icon-like Content</h2>
      <p className="docs-paragraph">
        The component supports children, so you can place leading symbols or
        short status markers next to the label.
      </p>

      <div className="docs-showcase-card flex-row gap-4">
        <Button disabled>
          <span aria-hidden>+</span>
          <span>Create report</span>
        </Button>
        <Button label="Saving disabled" primary disabled />
      </div>

      <CodeBlock
        code={`<Button disabled>
  <span aria-hidden>+</span>
  <span>Create report</span>
</Button>

<Button label="Saving disabled" primary disabled />`}
      />

      <h2 className="docs-category-subtitle">Async Submit Pattern</h2>
      <p className="docs-paragraph">
        Manage loading with local state by disabling the button during requests
        and swapping label text to communicate progress.
      </p>

      <div className="docs-showcase-card flex-col items-start gap-3">
        <Button
          label={isSubmitting ? "Saving..." : "Save profile"}
          primary
          disabled={isSubmitting}
          onClick={handleAsyncSave}
        />
        {saved && (
          <p className="text-sm text-accent">Profile saved successfully.</p>
        )}
      </div>

      <CodeBlock
        code={`const [isSubmitting, setIsSubmitting] = useState(false);

<Button
  label={isSubmitting ? 'Saving...' : 'Save profile'}
  primary
  disabled={isSubmitting}
  onClick={handleAsyncSave}
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
              <td className="docs-prop-name">label</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Optional text label rendered after children.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">primary</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Applies the filled primary visual treatment.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td>
                <span className="docs-prop-type">
                  'small' | 'medium' | 'large'
                </span>
              </td>
              <td>'medium'</td>
              <td>Controls vertical padding, font size, and width feel.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">backgroundColor</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>-</td>
              <td>Inline background color override for custom branding.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">children</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Optional custom content such as icons or badges.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">type</td>
              <td>
                <span className="docs-prop-type">
                  'button' | 'submit' | 'reset'
                </span>
              </td>
              <td>'button'</td>
              <td>
                Native button type. Set to <code>submit</code> in forms.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">...ButtonHTMLAttributes</td>
              <td>
                <span className="docs-prop-type">HTML props</span>
              </td>
              <td>-</td>
              <td>
                Supports native props like <code>disabled</code>,
                <code>onClick</code>, <code>aria-*</code>, and
                <code>className</code>.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar next={{ label: "Input", route: "/ui-basics/input" }} />
    </section>
  );
};

export default ButtonDoc;
