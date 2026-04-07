import { useState } from "react";
import {
  Button,
  Dialog,
  type DialogVariant,
  type DialogAnimation,
} from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const DialogDoc = () => {
  const [openBasic, setOpenBasic] = useState(false);
  const [variantOpen, setVariantOpen] = useState(false);
  const [currentVariant, setCurrentVariant] =
    useState<DialogVariant>("default");
  const [presetOpen, setPresetOpen] = useState(false);
  const [animationOpen, setAnimationOpen] = useState(false);
  const [currentAnimation, setCurrentAnimation] =
    useState<DialogAnimation>("scale");
  const [alertOpen, setAlertOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);
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
        A flexible dialog component for displaying content or requesting
        confirmation overlaying the main view. It supports multiple animations,
        preset footers, and intent-driven variants. The shared implementation is
        portaled to <code>document.body</code> with an app-top z-index so it
        stays above the entire web application instead of getting trapped by
        local stacking contexts.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Basic Usage</h2>
      <div className="docs-showcase-card">
        <Button
          label="Open Dialog"
          primary
          onClick={() => setOpenBasic(true)}
        />

        <Dialog
          open={openBasic}
          onOpenChange={setOpenBasic}
          title="Basic Dialog"
          description="This is a simple dialog with custom content."
        >
          <p className="text-neutral-600 dark:text-neutral-300">
            You can put any content here. It uses a crystal glass effect by
            default.
          </p>
          <div className="flex justify-end mt-4">
            <Button label="Close" onClick={() => setOpenBasic(false)} />
          </div>
        </Dialog>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Dialog, Button } from 'erp-pro-ui';

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
}`}
      />

      {/* Variants Section */}
      <h2 className="docs-category-subtitle">Variants</h2>
      <p className="docs-paragraph">
        Built-in styles for common feedback types:{" "}
        <span className="docs-highlight">default</span>,{" "}
        <span className="docs-highlight">info</span>,{" "}
        <span className="docs-highlight">success</span>,{" "}
        <span className="docs-highlight">warning</span>, and{" "}
        <span className="docs-highlight">destructive</span>.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-wrap gap-4">
          <Button label="Default" onClick={() => openVariant("default")} />
          <Button label="Info" onClick={() => openVariant("info")} />
          <Button label="Success" onClick={() => openVariant("success")} />
          <Button label="Warning" onClick={() => openVariant("warning")} />
          <Button
            label="Destructive"
            onClick={() => openVariant("destructive")}
          />
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

      <CodeBlock
        code={`import { useState } from 'react';
import { Dialog, type DialogVariant } from 'erp-pro-ui';

const variant: DialogVariant = 'destructive';

export function DeleteAccountDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      variant={variant}
      preset="confirm"
      title="Delete Account?"
      description="This action cannot be undone."
      onConfirm={() => setOpen(false)}
    />
  );
}`}
      />

      {/* Preset & Loading Section */}
      <h2 className="docs-category-subtitle">Presets & Loading</h2>
      <p className="docs-paragraph">
        Use <span className="docs-highlight">preset="confirm"</span> for
        standard confirmation dialogs. Handles loading state on the confirm
        button automatically.
      </p>

      <div className="docs-showcase-card">
        <Button
          label="Confirm Action (Async)"
          primary
          onClick={() => setPresetOpen(true)}
        />

        <Dialog
          open={presetOpen}
          onOpenChange={setPresetOpen}
          preset="confirm"
          title="Confirm Action"
          description="This dialog simulates an asynchronous action on confirm."
          confirmLabel="Approve transfer"
          loading={loading}
          onConfirm={handleConfirm}
        >
          <p className="text-sm text-neutral-500 mb-2">
            Click confirm to see the loading spinner.
          </p>
        </Dialog>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Button, Dialog } from 'erp-pro-ui';

export function AsyncConfirmDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button label="Open confirm dialog" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        preset="confirm"
        loading={loading}
        onConfirm={() => {
          setLoading(true);
          window.setTimeout(() => {
            setLoading(false);
            setOpen(false);
          }, 1200);
        }}
        title="Confirm"
        description="Please confirm your action."
      />
    </>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Alert & Custom Layouts</h2>
      <p className="docs-paragraph">
        Use <span className="docs-highlight">preset="alert"</span> for simple
        acknowledgements or{" "}
        <span className="docs-highlight">preset="custom"</span> when the body
        contains a richer form flow.
      </p>

      <div className="docs-showcase-card flex-wrap gap-4">
        <Button label="Open Alert" onClick={() => setAlertOpen(true)} />
        <Button
          label="Open Custom Dialog"
          primary
          onClick={() => setCustomOpen(true)}
        />

        <Dialog
          open={alertOpen}
          onOpenChange={setAlertOpen}
          preset="alert"
          variant="success"
          title="Inventory sync complete"
          description="All branch counts have been reconciled and the queue is ready for the next import."
          confirmLabel="Continue"
        />

        <Dialog
          open={customOpen}
          onOpenChange={setCustomOpen}
          preset="custom"
          title="Create approval policy"
          description="Define who needs to sign off before a transfer is released."
          widthClassName="max-w-2xl"
          footer={
            <div className="flex justify-end gap-2">
              <Button label="Cancel" onClick={() => setCustomOpen(false)} />
              <Button
                label="Save policy"
                primary
                onClick={() => setCustomOpen(false)}
              />
            </div>
          }
        >
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Trigger
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Transfer amount exceeds $5,000.
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800">
              <p className="text-sm font-medium text-neutral-900 dark:text-white">
                Approvers
              </p>
              <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                Operations lead and finance controller.
              </p>
            </div>
          </div>
        </Dialog>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Button, Dialog } from 'erp-pro-ui';

export function AlertAndCustomDialogs() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [customOpen, setCustomOpen] = useState(false);

  return (
    <>
      <Button label="Open alert" onClick={() => setAlertOpen(true)} />
      <Button label="Open custom dialog" primary onClick={() => setCustomOpen(true)} />

      <Dialog
        open={alertOpen}
        onOpenChange={setAlertOpen}
        preset="alert"
        variant="success"
        title="Inventory sync complete"
        description="All branch counts have been reconciled and the queue is ready for the next import."
      />

      <Dialog
        open={customOpen}
        onOpenChange={setCustomOpen}
        preset="custom"
        title="Create approval policy"
        footer={<div>Custom actions</div>}
      >
        <div>Policy editor content</div>
      </Dialog>
    </>
  );
}`}
      />

      <h2 className="docs-category-subtitle">Animations</h2>
      <p className="docs-paragraph">
        Supports various entrance animations powered by Framer Motion.
      </p>

      <div className="docs-showcase-card">
        <div className="flex flex-wrap gap-3">
          {(
            [
              "scale",
              "fade",
              "slideUp",
              "slideDown",
              "slideLeft",
              "slideRight",
              "elastic",
              "bounce",
              "flip",
              "zoom",
            ] as DialogAnimation[]
          ).map((anim) => (
            <Button
              key={anim}
              onClick={() => openAnimation(anim)}
              size="small"
              className="bg-neutral-100 px-3 py-1.5 text-sm shadow-none hover:bg-neutral-200 hover:opacity-100 dark:bg-neutral-800 dark:hover:bg-neutral-700"
            >
              {anim}
            </Button>
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

      <CodeBlock
        code={`import { useState } from 'react';
import { Dialog, type DialogAnimation } from 'erp-pro-ui';

const animation: DialogAnimation = 'elastic';

export function ElasticDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
      animation={animation}
      title="Bouncy Dialog"
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
              <td className="docs-prop-name">open</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Controlled open state</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onOpenChange</td>
              <td>
                <span className="docs-prop-type">
                  {"{(open: boolean) => void}"}
                </span>
              </td>
              <td>-</td>
              <td>State change handler</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td>
                <span className="docs-prop-type">DialogVariant</span>
              </td>
              <td>'default'</td>
              <td>Visual style (default, destructive, success, etc.)</td>
            </tr>
            <tr>
              <td className="docs-prop-name">preset</td>
              <td>
                <span className="docs-prop-type">
                  'custom' | 'alert' | 'confirm'
                </span>
              </td>
              <td>'custom'</td>
              <td>
                Layout preset. 'alert' renders one action, while 'confirm'
                renders cancel and confirm buttons
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">animation</td>
              <td>
                <span className="docs-prop-type">DialogAnimation</span>
              </td>
              <td>'scale'</td>
              <td>Entrance animation style</td>
            </tr>
            <tr>
              <td className="docs-prop-name">loading</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Shows spinner on confirm button</td>
            </tr>
            <tr>
              <td className="docs-prop-name">closeOnOverlay</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Controls whether clicking the backdrop closes the dialog</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showClose</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Shows or hides the top-right close icon</td>
            </tr>
            <tr>
              <td className="docs-prop-name">footer</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>
                Custom action area. Overrides preset buttons when provided
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">confirmLabel</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'OK'</td>
              <td>Primary action label for alert and confirm presets</td>
            </tr>
            <tr>
              <td className="docs-prop-name">cancelLabel</td>
              <td>
                <span className="docs-prop-type">string</span>
              </td>
              <td>'Cancel'</td>
              <td>Secondary action label for confirm presets</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onConfirm / onCancel</td>
              <td>
                <span className="docs-prop-type">{"{() => void}"}</span>
              </td>
              <td>-</td>
              <td>Callbacks fired by preset footer buttons</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Label", route: "/ui-basics/label" }}
        next={{ label: "Drawer", route: "/ui-basics/drawer" }}
      />
    </section>
  );
};

export default DialogDoc;
