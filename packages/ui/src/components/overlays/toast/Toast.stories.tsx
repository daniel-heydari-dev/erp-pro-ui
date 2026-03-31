import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../../forms/button";
import { StorySurface } from "../../shared/storybook";
import { ToastProvider, useToast, type ToastPosition } from "./Toast";

const toastPositions: ToastPosition[] = [
  "top-left",
  "top-center",
  "top-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
];

const meta: Meta<typeof ToastProvider> = {
  title: "Data Display/Toast",
  component: ToastProvider,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Toast provides global, non-blocking feedback for async actions, background jobs, and system updates. These stories show provider setup, variant helpers, promise handling, and runtime position changes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    position: {
      control: "select",
      options: toastPositions,
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function ToastWorkflowDemo() {
  const { toast, success, warning, info, loading, update, dismissAll } =
    useToast();

  const handleSync = () => {
    const id = loading({
      title: "Syncing inventory",
      description: "Uploading 12 warehouse adjustments...",
    });

    window.setTimeout(() => {
      update(id, {
        type: "success",
        title: "Sync complete",
        description: "All stock levels are now reconciled.",
        duration: 3500,
        dismissible: true,
      });
    }, 1800);
  };

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-6 ui:md:grid-cols-[1.2fr_0.8fr]">
        <div className="ui:space-y-4">
          <div>
            <p className="ui:text-sm ui:font-semibold ui:text-foreground">
              Operational feedback
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
              Launch success, warning, and follow-up actions from the same
              provider context.
            </p>
          </div>
          <div className="ui:flex ui:flex-wrap ui:gap-3">
            <Button
              label="Save Success"
              primary
              onClick={() =>
                success({
                  title: "Changes published",
                  description: "The pricing update is live across all regions.",
                })
              }
            />
            <Button
              label="Review Warning"
              onClick={() =>
                warning({
                  title: "Approval needed",
                  description:
                    "2 discount requests are still pending manager review.",
                })
              }
            />
            <Button
              label="Toast With Action"
              onClick={() =>
                toast({
                  title: "Plan updated",
                  description: "Billing moved to annual renewal.",
                  action: {
                    label: "Undo",
                    onClick: () =>
                      info({
                        title: "Reverted",
                        description:
                          "The subscription was restored to monthly billing.",
                      }),
                  },
                })
              }
            />
            <Button label="Loading Sequence" onClick={handleSync} />
          </div>
        </div>

        <div className="ui:flex ui:h-full ui:flex-col ui:justify-between ui:rounded-2xl ui:border ui:border-border ui:bg-muted/40 ui:p-4">
          <div className="ui:space-y-2">
            <p className="ui:text-sm ui:font-medium ui:text-foreground">
              Recommended usage
            </p>
            <ul className="ui:space-y-2 ui:text-sm ui:text-muted-foreground">
              <li>
                Use `success`, `warning`, and `error` for common system states.
              </li>
              <li>
                Use `loading` plus `update` when a background job needs staged
                feedback.
              </li>
              <li>Use actions sparingly for reversible changes.</li>
            </ul>
          </div>
          <div className="ui:pt-4">
            <Button
              label="Dismiss All"
              onClick={dismissAll}
              className="ui:w-full"
            />
          </div>
        </div>
      </div>
    </StorySurface>
  );
}

function ToastPromiseDemo() {
  const { promise } = useToast();

  const handleImport = () => {
    const task = new Promise<{ imported: number }>((resolve) => {
      window.setTimeout(() => resolve({ imported: 32 }), 1800);
    });

    void promise(task, {
      loading: "Importing catalog data...",
      success: (data) =>
        `Imported ${data.imported} products into the summer collection.`,
      error: "Import failed.",
    }).catch(() => undefined);
  };

  const handleFailure = () => {
    const task = new Promise<never>((_, reject) => {
      window.setTimeout(() => reject(new Error("Connection timed out")), 1800);
    });

    void promise(task, {
      loading: "Connecting to ERP...",
      success: "Connected successfully.",
      error: (error) =>
        error instanceof Error ? error.message : "Failed to complete request.",
    }).catch(() => undefined);
  };

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-3xl">
      <div className="ui:space-y-4">
        <div>
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Promise handling
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            Use `promise()` when an async workflow should automatically
            transition from loading to success or error.
          </p>
        </div>
        <div className="ui:flex ui:flex-wrap ui:gap-3">
          <Button label="Import Collection" primary onClick={handleImport} />
          <Button label="Simulate Failure" onClick={handleFailure} />
        </div>
      </div>
    </StorySurface>
  );
}

function PositionControls({
  position,
  onPositionChange,
}: {
  position: ToastPosition;
  onPositionChange: (position: ToastPosition) => void;
}) {
  const { toast } = useToast();

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:space-y-4">
        <div className="ui:flex ui:items-center ui:justify-between ui:gap-4">
          <div>
            <p className="ui:text-sm ui:font-semibold ui:text-foreground">
              Active stack position
            </p>
            <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
              Current provider setting: {position}
            </p>
          </div>
          <div className="ui:rounded-full ui:bg-muted ui:px-3 ui:py-1 ui:text-xs ui:font-medium ui:text-muted-foreground">
            Reconfigure once at the app root in production
          </div>
        </div>
        <div className="ui:grid ui:gap-3 ui:sm:grid-cols-2 ui:lg:grid-cols-3">
          {toastPositions.map((option) => (
            <Button
              key={option}
              label={option}
              onClick={() => {
                onPositionChange(option);
                window.setTimeout(() => {
                  toast({
                    title: "Position updated",
                    description: `New toasts now appear at ${option}.`,
                  });
                }, 0);
              }}
            />
          ))}
        </div>
      </div>
    </StorySurface>
  );
}

function ToastPositionDemo() {
  const [position, setPosition] = useState<ToastPosition>("top-right");

  return (
    <ToastProvider position={position}>
      <PositionControls position={position} onPositionChange={setPosition} />
    </ToastProvider>
  );
}

export const WorkflowStates: Story = {
  render: () => (
    <ToastProvider position="top-right" duration={4000} maxToasts={4}>
      <ToastWorkflowDemo />
    </ToastProvider>
  ),
};

export const PromiseHandling: Story = {
  render: () => (
    <ToastProvider position="bottom-right" duration={4000} maxToasts={4}>
      <ToastPromiseDemo />
    </ToastProvider>
  ),
};

export const PositionSwitcher: Story = {
  render: () => <ToastPositionDemo />,
};
