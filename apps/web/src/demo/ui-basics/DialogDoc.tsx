import { useState } from 'react';
import { Button, Dialog, type DialogVariant, type DialogAnimation } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const DialogDoc = () => {
  const [openBasic, setOpenBasic] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState<DialogVariant>('default');
  const [presetOpen, setPresetOpen] = useState(false);
  const [animationOpen, setAnimationOpen] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<DialogAnimation>('scale');
  const [loading, setLoading] = useState(false);

  // Variant handler
  const openVariant = (variant: DialogVariant) => {
    setCurrentVariant(variant);
    setVariantOpen(true);
  };

  // Animation handler
  const openAnimation = (anim: DialogAnimation) => {
    setCurrentAnimation(anim);
    setAnimationOpen(true);
  };

  // Async action simulation
  const handleConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPresetOpen(false);
    }, 1500);
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Dialog</h1>
      <p className="docs-paragraph">
        A flexible dialog component for displaying content or requesting confirmation overlaying the main view.
        Supports multiple animations, presets, and variants.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Button label="Open Dialog" primary onClick={() => setOpenBasic(true)} />

        <Dialog
          open={openBasic}
          onOpenChange={setOpenBasic}
          title="Basic Dialog"
          description="This is a simple dialog with custom content."
        >
          <p className="text-neutral-600 dark:text-neutral-300">
            You can put any content here. It uses a crystal glass effect by default.
          </p>
          <div className="flex justify-end mt-4">
            <Button label="Close" onClick={() => setOpenBasic(false)} />
          </div>
        </Dialog>
      </div>

      <CodeBlock code={`import { useState } from 'react';
import { Dialog, Button } from '@erp-pro/ui';

const Example = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open" onClick={() => setOpen(true)} />
      
      <Dialog 
        open={open} 
        onOpenChange={setOpen}
        title="Basic Dialog"
        description="This is a simple dialog."
      >
        <p>Custom content goes here.</p>
        <Button label="Close" onClick={() => setOpen(false)} />
      </Dialog>
    </>
  );
}`} />

      {/* Variants Section */}
      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Built-in styles for common feedback types: <span className="docs-highlight">default</span>, <span className="docs-highlight">info</span>, <span className="docs-highlight">success</span>, <span className="docs-highlight">warning</span>, and <span className="docs-highlight">destructive</span>.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-wrap gap-4">
          <Button label="Default" onClick={() => openVariant('default')} />
          <Button label="Info" onClick={() => openVariant('info')} />
          <Button label="Success" onClick={() => openVariant('success')} />
          <Button label="Warning" onClick={() => openVariant('warning')} />
          <Button label="Destructive" onClick={() => openVariant('destructive')} />
        </div>

        <Dialog
          open={variantOpen}
          onOpenChange={setVariantOpen}
          variant={currentVariant}
          preset="confirm"
          title={`${currentVariant.charAt(0).toUpperCase() + currentVariant.slice(1)} Dialog`}
          description={`This demonstrates the ${currentVariant} variant style.`}
          onConfirm={() => setVariantOpen(false)}
        />
      </div>

      <CodeBlock code={`<Dialog
  open={open}
  onOpenChange={setOpen}
  variant="destructive"
  preset="confirm"
  title="Delete Account?"
  description="This action cannot be undone."
  onConfirm={handleDelete}
/>`} />

      {/* Preset & Loading Section */}
      <h2 className="docs-category-subtitle">Presets & Loading</h2>
      <p className="docs-paragraph">
        Use <span className="docs-highlight">preset="confirm"</span> for standard confirmation dialogs. Handles loading state on the confirm button automatically.
      </p>

      <div className="docs-showcase-card">
        <Button label="Confirm Action (Async)" primary onClick={() => setPresetOpen(true)} />

        <Dialog
          open={presetOpen}
          onOpenChange={setPresetOpen}
          preset="confirm"
          title="Confirm Action"
          description="This dialog simulates an asynchronous action on confirm."
          confirmLabel="Proccessing..."
          loading={loading}
          onConfirm={handleConfirm}
        >
          <p className="text-sm text-neutral-500 mb-2">
            Click confirm to see the loading spinner.
          </p>
        </Dialog>
      </div>

      <CodeBlock code={`<Dialog
  open={open}
  onOpenChange={setOpen}
  preset="confirm"
  loading={isLoading}
  onConfirm={handleAsyncAction}
  title="Confirm"
  description="Please confirm your action."
/>`} />

      {/* Animations Section */}
      <h2 className="docs-category-subtitle">Animations</h2>
      <p className="docs-paragraph">
        Supports various entrance animations powered by Framer Motion.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-wrap gap-3">
          {(['scale', 'fade', 'slideUp', 'slideDown', 'slideLeft', 'slideRight', 'elastic', 'bounce', 'flip', 'zoom'] as DialogAnimation[]).map((anim) => (
            <button
              key={anim}
              onClick={() => openAnimation(anim)}
              className="px-3 py-1.5 text-sm rounded-md bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {anim}
            </button>
          ))}
        </div>

        <Dialog
          open={animationOpen}
          onOpenChange={setAnimationOpen}
          animation={currentAnimation}
          title={`${currentAnimation} Animation`}
          description="Click outside or confirm to close."
          preset="confirm"
          onConfirm={() => setAnimationOpen(false)}
        />
      </div>

      <CodeBlock code={`<Dialog
  open={open}
  animation="elastic"
  title="Bouncy Dialog"
  // ...
/>`} />

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
              <td className="docs-prop-name">open</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Controlled open state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onOpenChange</td>
              <td><span className="docs-prop-type">{'{(open: boolean) => void}'}</span></td>
              <td>-</td>
              <td>State change handler</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">DialogVariant</span></td>
              <td>'default'</td>
              <td>Visual style (default, destructive, success, etc.)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">preset</td>
              <td><span className="docs-prop-type">'custom' | 'confirm'</span></td>
              <td>'custom'</td>
              <td>Layout preset. 'confirm' adds standard footer buttons</td>
            </tr>
            <tr>
              <td className="docs-prop-name">animation</td>
              <td><span className="docs-prop-type">DialogAnimation</span></td>
              <td>'scale'</td>
              <td>Entrance animation style</td>
            </tr>
            <tr>
              <td className="docs-prop-name">loading</td>
              <td><span className="docs-prop-type">boolean</span></td>
              <td>false</td>
              <td>Shows spinner on confirm button</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Label', route: '/ui-basics/label' }}
        next={{ label: 'Drawer', route: '/ui-basics/drawer' }}
      />
    </section>
  );
};

export default DialogDoc;
