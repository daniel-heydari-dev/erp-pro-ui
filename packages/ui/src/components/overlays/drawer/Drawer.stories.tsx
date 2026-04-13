import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../../forms/button";
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

const rightSettingsSource = `import { useState } from 'react';
import { Button, Drawer, type DrawerPosition } from 'erp-pro-ui';

const position: DrawerPosition = 'right';

export function RightSettingsPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open settings" primary onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        position={position}
        title="Workspace settings"
        description="Adjust notifications, approval behavior, and visibility from one side panel."
      >
        <p>Drawer content goes here.</p>
      </Drawer>
    </>
  );
}`;

const leftNavigationSource = `import { useState } from 'react';
import { Button, Drawer, type DrawerPosition } from 'erp-pro-ui';

const position: DrawerPosition = 'left';

export function LeftNavigationDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open navigation" onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        position={position}
        title="Navigation"
        description="Use a left drawer for nested app navigation on smaller screens."
      >
        <p>Navigation items go here.</p>
      </Drawer>
    </>
  );
}`;

const bottomSheetSource = `import { useState } from 'react';
import { Button, Drawer, type DrawerPosition } from 'erp-pro-ui';

const position: DrawerPosition = 'bottom';

export function MobileActionSheet() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open actions" onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        position={position}
        title="Quick actions"
        description="Bottom drawers work well for mobile-first action sheets."
      >
        <p>Action content goes here.</p>
      </Drawer>
    </>
  );
}`;

const announcementTraySource = `import { useState } from 'react';
import { Button, Drawer, type DrawerPosition } from 'erp-pro-ui';

const position: DrawerPosition = 'top';

export function AnnouncementTray() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open announcement" onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        position={position}
        title="Release notes"
        description="Use a top drawer for release notes and global alerts."
      >
        <p>Announcement content goes here.</p>
      </Drawer>
    </>
  );
}`;

const settingsPanelSource = `import { useState } from 'react';
import { Button, Drawer } from 'erp-pro-ui';

export function WorkspaceSettingsPanel() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open settings" primary onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        position="right"
        title="Workspace settings"
        description="Adjust notifications, approval behavior, and visibility from one side panel."
        footer={
          <div className="flex justify-end gap-3">
            <Button label="Cancel" onClick={() => setOpen(false)} />
            <Button label="Save changes" primary onClick={() => setOpen(false)} />
          </div>
        }
      >
        <div className="space-y-4">
          <div className="rounded-lg border border-neutral-200 bg-neutral-100 p-4">
            <p className="text-sm font-medium text-neutral-900">Approval threshold</p>
            <p className="mt-1 text-sm text-neutral-500">Require a second approver for transfers above $5,000.</p>
          </div>
        </div>
      </Drawer>
    </>
  );
}`;

const controlledWorkflowSource = `import { useState } from 'react';
import { Button, Drawer } from 'erp-pro-ui';

export function ControlledApprovalDrawer() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button label="Open approval panel" primary onClick={() => setOpen(true)} />
      <Drawer
        open={open}
        onOpenChange={setOpen}
        position="right"
        title="Transfer approval"
        description="Review details and confirm before the transfer is queued."
        footer={
          <div className="flex justify-end gap-3">
            <Button label="Cancel" onClick={() => setOpen(false)} />
            <Button label="Queue transfer" primary onClick={() => setOpen(false)} />
          </div>
        }
      >
        <p>Approval details go here.</p>
      </Drawer>
    </>
  );
}`;

function DrawerPreview({ triggerLabel, ...props }: DrawerStoryProps) {
  const [open, setOpen] = useState(false);
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Button primary onClick={() => setOpen(true)}>
        {triggerLabel ?? `Open ${props.position} Drawer`}
      </Button>
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
export const Right: Story = {
  name: "Right Settings Panel",
  render: () => <DrawerPreview position="right" />,
  parameters: {
    docs: {
      source: {
        code: rightSettingsSource,
      },
    },
  },
};

/**
 * ## Left Sidebar
 * Commonly used for application navigation menus.
 */
export const Left: Story = {
  name: "Left Navigation Drawer",
  render: () => <DrawerPreview position="left" />,
  parameters: {
    docs: {
      source: {
        code: leftNavigationSource,
      },
    },
  },
};

/**
 * ## Bottom Sheet
 * Very useful for mobile-first views and context menus.
 */
export const Bottom: Story = {
  name: "Mobile Action Sheet",
  render: () => <DrawerPreview position="bottom" />,
  parameters: {
    docs: {
      source: {
        code: bottomSheetSource,
      },
    },
  },
};

/**
 * ## Top Announcement Tray
 * Useful for release notes and global alerts that should not obscure the entire app.
 */
export const Top: Story = {
  name: "Announcement Tray",
  render: () => <DrawerPreview position="top" triggerLabel="Open top tray" />,
  parameters: {
    docs: {
      source: {
        code: announcementTraySource,
      },
    },
  },
};

/**
 * ## Settings Panel
 * A more complete example showing custom content and footer actions.
 */
export const SettingsPanel: Story = {
  name: "Workspace Settings Panel",
  render: () => (
    <DrawerPreview
      position="right"
      triggerLabel="Open settings"
      title="Workspace settings"
      description="Adjust notifications, approval behavior, and visibility from one side panel."
      footer={
        <div className="ui:flex ui:justify-end ui:gap-3">
          <Button label="Cancel" />
          <Button label="Save changes" primary />
        </div>
      }
    >
      <div className="ui:space-y-4">
        <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-ds-1">
            Approval threshold
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
            Require a second approver for transfers above $5,000.
          </p>
        </div>
        <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
          <p className="ui:text-sm ui:font-medium ui:text-ds-1">
            Restock notifications
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
            Send a digest every 2 hours to branch managers and operations leads.
          </p>
        </div>
      </div>
    </DrawerPreview>
  ),
  parameters: {
    docs: {
      source: {
        code: settingsPanelSource,
      },
    },
  },
};

/**
 * ## Controlled Workflow
 * Parent-level state controls opening and close behavior from multiple actions.
 */
export const ControlledWorkflow: Story = {
  name: "Controlled Approval Drawer",
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Button primary onClick={() => setOpen(true)}>
          Open approval panel
        </Button>

        <Drawer
          open={open}
          onOpenChange={setOpen}
          position="right"
          title="Transfer approval"
          description="Review details and confirm before the transfer is queued."
          footer={
            <div className="ui:flex ui:justify-end ui:gap-3">
              <Button label="Cancel" onClick={() => setOpen(false)} />
              <Button
                label="Queue transfer"
                primary
                onClick={() => setOpen(false)}
              />
            </div>
          }
        >
          <div className="ui:space-y-4">
            <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
              <p className="ui:text-sm ui:font-medium ui:text-ds-1">Branch</p>
              <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
                West distribution hub → Midtown store
              </p>
            </div>
            <div className="ui:rounded-lg ui:border ui:border-ds-border-2 ui:bg-ds-canvas ui:p-4">
              <p className="ui:text-sm ui:font-medium ui:text-ds-1">Units</p>
              <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
                128 units across 6 SKUs
              </p>
            </div>
          </div>
        </Drawer>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: controlledWorkflowSource,
      },
    },
  },
};
