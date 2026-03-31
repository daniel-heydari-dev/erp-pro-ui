import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../../shared/storybook";
import { Drawer } from "./Drawer";
import type { DrawerPosition, DrawerProps } from "./types";

const meta: Meta<typeof Drawer> = {
  title: "Layout/Drawer",
  component: Drawer,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Edge-anchored overlay for settings panels, navigation trays, and mobile bottom sheets.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "radio",
      options: ["left", "right", "top", "bottom"],
    },
    title: { control: "text" },
    description: { control: "text" },
    footer: {
      control: false,
      description: "Optional custom footer area for action buttons.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

type DrawerStoryProps = Omit<DrawerProps, "open" | "onOpenChange"> & {
  position: DrawerPosition;
  triggerLabel?: string;
};

function DrawerDemo({ triggerLabel, ...props }: DrawerStoryProps) {
  const [open, setOpen] = useState(false);
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <button
        onClick={() => setOpen(true)}
        className="ui:px-4 ui:py-2 ui:bg-neutral-900 dark:ui:bg-white ui:text-white dark:ui:text-neutral-900 ui:font-medium ui:rounded-md ui:cursor-pointer"
      >
        {triggerLabel ?? `Open ${props.position} Drawer`}
      </button>
      <Drawer
        open={open}
        onOpenChange={setOpen}
        title={`Sliding ${props.position} Drawer`}
        description="This slides in dynamically from the edge of the viewport."
        {...props}
      >
        <div className="ui:p-6 ui:bg-neutral-100 dark:ui:bg-neutral-800 ui:rounded-lg ui:mt-4">
          <p className="ui:text-neutral-700 dark:ui:text-neutral-300">
            You can put any scrollable content, forms, or menus in here.
          </p>
        </div>
      </Drawer>
    </StorySurface>
  );
}

/**
 * ## Right Sidebar
 * Commonly used for settings panels and configurations.
 */
export const Right: Story = { render: () => <DrawerDemo position="right" /> };

/**
 * ## Left Sidebar
 * Commonly used for application navigation menus.
 */
export const Left: Story = { render: () => <DrawerDemo position="left" /> };

/**
 * ## Bottom Sheet
 * Very useful for mobile-first views and context menus.
 */
export const Bottom: Story = { render: () => <DrawerDemo position="bottom" /> };

/**
 * ## Top Announcement Tray
 * Useful for release notes and global alerts that should not obscure the entire app.
 */
export const Top: Story = {
  render: () => <DrawerDemo position="top" triggerLabel="Open top tray" />,
};

/**
 * ## Settings Panel
 * A more complete example showing custom content and footer actions.
 */
export const SettingsPanel: Story = {
  render: () => (
    <DrawerDemo
      position="right"
      triggerLabel="Open settings"
      title="Workspace settings"
      description="Adjust notifications, approval behavior, and visibility from one side panel."
      footer={
        <div className="ui:flex ui:justify-end ui:gap-3">
          <button className="ui:rounded-md ui:border ui:border-border ui:px-4 ui:py-2 ui:text-sm ui:font-medium">
            Cancel
          </button>
          <button className="ui:rounded-md ui:bg-neutral-900 ui:px-4 ui:py-2 ui:text-sm ui:font-medium ui:text-white dark:ui:bg-white dark:ui:text-neutral-900">
            Save changes
          </button>
        </div>
      }
    >
      <div className="ui:space-y-4">
        <div className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-foreground">
            Approval threshold
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Require a second approver for transfers above $5,000.
          </p>
        </div>
        <div className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-foreground">
            Restock notifications
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Send a digest every 2 hours to branch managers and operations leads.
          </p>
        </div>
      </div>
    </DrawerDemo>
  ),
};

/**
 * ## Controlled Workflow
 * Parent-level state controls opening and close behavior from multiple actions.
 */
export const ControlledWorkflow: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <button
          onClick={() => setOpen(true)}
          className="ui:cursor-pointer ui:rounded-md ui:bg-neutral-900 ui:px-4 ui:py-2 ui:font-medium ui:text-white dark:ui:bg-white dark:ui:text-neutral-900"
        >
          Open approval panel
        </button>

        <Drawer
          open={open}
          onOpenChange={setOpen}
          position="right"
          title="Transfer approval"
          description="Review details and confirm before the transfer is queued."
          footer={
            <div className="ui:flex ui:justify-end ui:gap-3">
              <button
                className="ui:rounded-md ui:border ui:border-border ui:px-4 ui:py-2 ui:text-sm ui:font-medium"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="ui:rounded-md ui:bg-neutral-900 ui:px-4 ui:py-2 ui:text-sm ui:font-medium ui:text-white dark:ui:bg-white dark:ui:text-neutral-900"
                onClick={() => setOpen(false)}
              >
                Queue transfer
              </button>
            </div>
          }
        >
          <div className="ui:space-y-4">
            <div className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:p-4">
              <p className="ui:text-sm ui:font-medium ui:text-foreground">
                Branch
              </p>
              <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
                West distribution hub → Midtown store
              </p>
            </div>
            <div className="ui:rounded-lg ui:border ui:border-border ui:bg-background ui:p-4">
              <p className="ui:text-sm ui:font-medium ui:text-foreground">
                Units
              </p>
              <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
                128 units across 6 SKUs
              </p>
            </div>
          </div>
        </Drawer>
      </StorySurface>
    );
  },
};
