import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

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

function DialogDemo(props: DialogStoryProps) {
  const [open, setOpen] = useState(false);
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <button
        onClick={() => setOpen(true)}
        className="ui:cursor-pointer ui:rounded-md ui:bg-neutral-900 ui:px-4 ui:py-2 ui:font-medium ui:text-white dark:ui:bg-white dark:ui:text-neutral-900"
      >
        Open {props.title || "Dialog"}
      </button>
      <Dialog open={open} onOpenChange={setOpen} {...props} />
    </StorySurface>
  );
}

/**
 * ## Default Confirm Dialog
 * Useful for asking user permission before continuing an action.
 */
export const Default: Story = {
  render: () => (
    <DialogDemo
      title="Edit Profile"
      description="Make changes to your profile here. Click save when you're done."
      preset="confirm"
    />
  ),
};

/**
 * ## Destructive Action
 * Warn the user before they do something irreversible.
 */
export const Destructive: Story = {
  render: () => (
    <DialogDemo
      title="Delete Account"
      description="Are you absolutely sure you want to delete your account? This action cannot be undone."
      preset="confirm"
      variant="destructive"
      confirmLabel="Delete forever"
    />
  ),
};

/**
 * ## Various Animations
 * The Dialog supports numerous robust Framer Motion animations.
 */
export const Animations: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:flex ui:flex-wrap ui:gap-4">
        <DialogDemo title="Scale Animation" animation="scale" preset="alert" />
        <DialogDemo
          title="Bounce Animation"
          animation="bounce"
          preset="alert"
        />
        <DialogDemo title="Flip Animation" animation="flip" preset="alert" />
      </div>
    </StorySurface>
  ),
};

/**
 * ## Alert Notice
 * Good for informational dialogs that only need a single acknowledgement action.
 */
export const AlertNotice: Story = {
  render: () => (
    <DialogDemo
      title="Inventory sync complete"
      description="All branch counts have been reconciled and the queue is ready for the next import."
      preset="alert"
      variant="success"
      confirmLabel="Continue"
    />
  ),
};

/**
 * ## Custom Content Dialog
 * Demonstrates a richer body and custom footer for embedded form flows.
 */
export const CustomContent: Story = {
  render: () => (
    <DialogDemo
      title="Create approval policy"
      description="Define who needs to sign off before a transfer is released."
      preset="custom"
      widthClassName="ui:max-w-2xl"
      footer={
        <div className="ui:flex ui:justify-end ui:gap-3">
          <button className="ui:rounded-md ui:border ui:border-border ui:px-4 ui:py-2 ui:text-sm ui:font-medium">
            Cancel
          </button>
          <button className="ui:rounded-md ui:bg-neutral-900 ui:px-4 ui:py-2 ui:text-sm ui:font-medium ui:text-white dark:ui:bg-white dark:ui:text-neutral-900">
            Save policy
          </button>
        </div>
      }
    >
      <div className="ui:grid ui:gap-4 md:ui:grid-cols-2">
        <div className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-foreground">
            Trigger
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Transfer amount exceeds $5,000.
          </p>
        </div>
        <div className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-foreground">
            Approvers
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Operations lead, finance controller.
          </p>
        </div>
      </div>
    </DialogDemo>
  ),
};

/**
 * ## Async Confirm
 * Simulates a confirm action that briefly enters a loading state.
 */
export const AsyncConfirm: Story = {
  render: () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <button
          onClick={() => setOpen(true)}
          className="ui:cursor-pointer ui:rounded-md ui:bg-neutral-900 ui:px-4 ui:py-2 ui:font-medium ui:text-white dark:ui:bg-white dark:ui:text-neutral-900"
        >
          Open async confirm
        </button>

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
};
