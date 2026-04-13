import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../../forms/button";
import { StorySurface } from "../../shared/storybook";
import { Dialog } from "./Dialog";
import type { DialogProps } from "./types";

const meta = {
  title: "Overlays/Dialog",
  component: Dialog,
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: {
      description: {
        component:
          "Controlled overlay surface with preset action layouts and multiple motion variants.",
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "success", "warning", "info"],
      description: "Controls the styling and intent of the preset buttons.",
    },
    preset: {
      control: "radio",
      options: ["custom", "alert", "confirm"],
      description: "Changes the built-in footer configuration.",
    },
    animation: {
      control: "select",
      options: [
        "fade",
        "scale",
        "slideUp",
        "slideDown",
        "slideLeft",
        "slideRight",
        "elastic",
        "bounce",
        "flip",
        "zoom",
      ],
      description: "Choose the entrance/exit animation of the Dialog.",
    },
    closeOnOverlay: {
      control: "boolean",
      description: "Whether clicking the backdrop closes the dialog.",
    },
    showClose: {
      control: "boolean",
      description: "Whether the top-right close icon is visible.",
    },
    confirmLabel: {
      control: "text",
      description: "Primary action label for alert/confirm presets.",
    },
    cancelLabel: {
      control: "text",
      description: "Secondary action label for confirm preset.",
    },
    title: { control: "text" },
    description: { control: "text" },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

type DialogStoryProps = Omit<DialogProps, "open" | "onOpenChange">;

const confirmationFlowSource = `import { useState } from 'react';
import { Button, Dialog } from 'erp-pro-ui';

export function ConfirmationFlow() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open confirmation" primary onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Edit profile"
        description="Make changes to your profile here. Click save when you're done."
        preset="confirm"
      />
    </>
  );
}`;

const destructiveReviewSource = `import { useState } from 'react';
import { Button, Dialog, type DialogVariant } from 'erp-pro-ui';

const variant: DialogVariant = 'destructive';

export function DestructiveReviewFlow() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Delete account" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Delete account"
        description="This action cannot be undone."
        preset="confirm"
        variant={variant}
        confirmLabel="Delete forever"
      />
    </>
  );
}`;

const motionPresetsSource = `import { useState } from 'react';
import {
  Button,
  Dialog,
  type DialogAnimation,
} from 'erp-pro-ui';

const animations: DialogAnimation[] = ['scale', 'bounce', 'flip'];

export function MotionPresets() {
  const [openAnimation, setOpenAnimation] = useState<DialogAnimation | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {animations.map((animation) => (
          <Button
            key={animation}
            label={animation}
            onClick={() => setOpenAnimation(animation)}
          />
        ))}
      </div>

      <Dialog
        open={openAnimation !== null}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            setOpenAnimation(null);
          }
        }}
        title="Motion preset"
        description="Preview the selected dialog entrance animation."
        preset="alert"
        animation={openAnimation ?? 'scale'}
      />
    </>
  );
}`;

const alertNoticeSource = `import { useState } from 'react';
import { Button, Dialog } from 'erp-pro-ui';

export function AlertNoticeFlow() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open alert" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Inventory sync complete"
        description="All branch counts have been reconciled and the queue is ready for the next import."
        preset="alert"
        variant="success"
        confirmLabel="Continue"
      />
    </>
  );
}`;

const customPolicySource = `import { useState } from 'react';
import { Button, Dialog } from 'erp-pro-ui';

export function CustomPolicyDialog() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Create approval policy" primary onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Create approval policy"
        description="Define who needs to sign off before a transfer is released."
        preset="custom"
        widthClassName="max-w-2xl"
        footer={
          <div className="flex justify-end gap-3">
            <Button label="Cancel" onClick={() => setOpen(false)} />
            <Button label="Save policy" primary onClick={() => setOpen(false)} />
          </div>
        }
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4">
            <p className="text-sm font-medium text-neutral-900">Trigger</p>
            <p className="mt-1 text-sm text-neutral-500">Transfer amount exceeds $5,000.</p>
          </div>
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4">
            <p className="text-sm font-medium text-neutral-900">Approvers</p>
            <p className="mt-1 text-sm text-neutral-500">Operations lead, finance controller.</p>
          </div>
        </div>
      </Dialog>
    </>
  );
}`;

const asyncConfirmSource = `import { useState } from 'react';
import { Button, Dialog } from 'erp-pro-ui';

export function AsyncConfirmFlow() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button label="Open async confirm" primary onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        onOpenChange={setOpen}
        title="Confirm transfer"
        description="Approve this transfer to release inventory from reserve stock."
        preset="confirm"
        variant="warning"
        confirmLabel="Approve transfer"
        loading={loading}
        closeOnOverlay={!loading}
        showClose={!loading}
        onConfirm={() => {
          setLoading(true);
          window.setTimeout(() => {
            setLoading(false);
            setOpen(false);
          }, 1200);
        }}
      />
    </>
  );
}`;

function DialogPreview(props: DialogStoryProps) {
  const [open, setOpen] = useState(false);
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Button primary onClick={() => setOpen(true)}>
        Open {props.title || "Dialog"}
      </Button>
      <Dialog open={open} onOpenChange={setOpen} {...props} />
    </StorySurface>
  );
}

/**
 * ## Default Confirm Dialog
 * Useful for asking user permission before continuing an action.
 */
export const Default: Story = {
  name: "Confirmation Flow",
  render: () => (
    <DialogPreview
      title="Edit Profile"
      description="Make changes to your profile here. Click save when you're done."
      preset="confirm"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: confirmationFlowSource,
      },
    },
  },
};

/**
 * ## Destructive Action
 * Warn the user before they do something irreversible.
 */
export const Destructive: Story = {
  name: "Destructive Review Flow",
  render: () => (
    <DialogPreview
      title="Delete Account"
      description="Are you absolutely sure you want to delete your account? This action cannot be undone."
      preset="confirm"
      variant="destructive"
      confirmLabel="Delete forever"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: destructiveReviewSource,
      },
    },
  },
};

/**
 * ## Various Animations
 * The Dialog supports numerous robust Framer Motion animations.
 */
export const Animations: Story = {
  name: "Motion Presets",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        <DialogPreview
          title="Scale Animation"
          animation="scale"
          preset="alert"
        />
        <DialogPreview
          title="Bounce Animation"
          animation="bounce"
          preset="alert"
        />
        <DialogPreview title="Flip Animation" animation="flip" preset="alert" />
      </div>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: motionPresetsSource,
      },
    },
  },
};

/**
 * ## Alert Notice
 * Good for informational dialogs that only need a single acknowledgement action.
 */
export const AlertNotice: Story = {
  name: "Alert Notice",
  render: () => (
    <DialogPreview
      title="Inventory sync complete"
      description="All branch counts have been reconciled and the queue is ready for the next import."
      preset="alert"
      variant="success"
      confirmLabel="Continue"
    />
  ),
  parameters: {
    docs: {
      source: {
        code: alertNoticeSource,
      },
    },
  },
};

/**
 * ## Custom Content Dialog
 * Demonstrates a richer body and custom footer for embedded form flows.
 */
export const CustomContent: Story = {
  name: "Custom Policy Dialog",
  render: () => (
    <DialogPreview
      title="Create approval policy"
      description="Define who needs to sign off before a transfer is released."
      preset="custom"
      widthClassName="ui:max-w-2xl"
      footer={
        <div className="ui:flex ui:justify-end ui:gap-3">
          <Button label="Cancel" />
          <Button label="Save policy" primary />
        </div>
      }
    >
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-2">
        <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-ds-1">Trigger</p>
          <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
            Transfer amount exceeds $5,000.
          </p>
        </div>
        <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-ds-1">Approvers</p>
          <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
            Operations lead, finance controller.
          </p>
        </div>
      </div>
    </DialogPreview>
  ),
  parameters: {
    docs: {
      source: {
        code: customPolicySource,
      },
    },
  },
};

/**
 * ## Async Confirm
 * Simulates a confirm action that briefly enters a loading state.
 */
export const AsyncConfirm: Story = {
  name: "Async Confirm Flow",
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Button primary onClick={() => setOpen(true)}>
          Open async confirm
        </Button>

        <Dialog
          open={open}
          onOpenChange={setOpen}
          title="Confirm transfer"
          description="Approve this transfer to release inventory from reserve stock."
          preset="confirm"
          variant="warning"
          confirmLabel="Approve transfer"
          loading={loading}
          closeOnOverlay={!loading}
          showClose={!loading}
          onConfirm={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              setOpen(false);
            }, 1200);
          }}
        />
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: asyncConfirmSource,
      },
    },
  },
};
