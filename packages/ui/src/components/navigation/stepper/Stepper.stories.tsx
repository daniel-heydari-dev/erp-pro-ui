import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../../forms/button";
import {
  BriefcaseBusinessIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
} from "../../icons";
import {
  StoryIntro,
  StoryPanel,
  StorySection,
  StoryStack,
  StorySurface,
} from "../../shared/storybook";
import {
  Stepper,
  StepperSteps,
  StepperWizard,
  StepperWizardStep,
} from "./index";
import type { StepperProps, StepperStepsProps } from "./types";

const meta: Meta<typeof Stepper> = {
  title: "Layout/Stepper",
  component: Stepper,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Step-based progress navigation for setup flows, approvals, and checkout-style multi-stage tasks.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
    size: { control: "select", options: ["sm", "md", "lg"] },
    variant: {
      control: "select",
      options: ["default", "glass", "minimal", "outlined"],
    },
    showNumbers: { control: "boolean" },
    clickable: { control: "boolean" },
    showConnector: { control: "boolean" },
    showErrors: { control: "boolean" },
    animated: { control: "boolean" },
    steps: { control: false, description: "Ordered step definitions." },
    currentStep: {
      control: false,
      description: "Controlled current step index.",
    },
    onStepClick: {
      control: false,
      description: "Called when a step is clicked.",
    },
    errorSteps: {
      control: false,
      description: "Indices rendered in error state.",
    },
    completedSteps: {
      control: false,
      description: "Optional manual completed indices.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const steps = [
  { id: "1", title: "Cart", description: "Review your items" },
  { id: "2", title: "Shipping", description: "Choose shipping method" },
  {
    id: "3",
    title: "Payment",
    description: "Enter payment details",
    optional: true,
  },
  { id: "4", title: "Confirmation", description: "Order complete!" },
];

const connectedSteps = [
  { label: "Profile", icon: <UserIcon className="h-4 w-4" /> },
  {
    label: "Billing",
    icon: <BriefcaseBusinessIcon className="h-4 w-4" />,
  },
  { label: "Security", icon: <SettingsIcon className="h-4 w-4" /> },
  { label: "Launch", icon: <PackageIcon className="h-4 w-4" /> },
] satisfies StepperStepsProps["steps"];

const releaseChecklistSteps = [
  { label: "Draft docs" },
  { label: "Legal signoff" },
  { label: "Ops handoff" },
  { label: "Go live" },
] satisfies StepperStepsProps["steps"];

const checkoutProgressSource = `import { useState } from "react";
import { Button, Stepper, type Step } from "erp-pro-ui";

const checkoutSteps: Step[] = [
  { id: "cart", title: "Cart", description: "Review your items" },
  { id: "shipping", title: "Shipping", description: "Choose shipping method" },
  {
    id: "payment",
    title: "Payment",
    description: "Enter payment details",
    optional: true,
  },
  { id: "confirmation", title: "Confirmation", description: "Order complete!" },
];

export function CheckoutProgressExample() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <Stepper
        steps={checkoutSteps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        orientation="horizontal"
        variant="glass"
      />

      <div className="mt-6 flex gap-3">
        <Button
          label="Previous"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((step) => step - 1)}
        />
        <Button
          label="Next"
          primary
          disabled={currentStep === checkoutSteps.length - 1}
          onClick={() => setCurrentStep((step) => step + 1)}
        />
      </div>
    </div>
  );
}`;

const verticalSettingsSource = `import { Stepper, type Step } from "erp-pro-ui";

const settingsSteps: Step[] = [
  { id: "cart", title: "Cart", description: "Review your items" },
  { id: "shipping", title: "Shipping", description: "Choose shipping method" },
  {
    id: "payment",
    title: "Payment",
    description: "Enter payment details",
    optional: true,
  },
  { id: "confirmation", title: "Confirmation", description: "Order complete!" },
];

export function VerticalSettingsExample() {
  return (
    <Stepper
      steps={settingsSteps}
      currentStep={1}
      orientation="vertical"
      variant="outlined"
    />
  );
}`;

const validationSource = `import { Stepper, type Step } from "erp-pro-ui";

const approvalSteps: Step[] = [
  { id: "req", title: "Request", description: "Submit requisition" },
  { id: "mgr", title: "Manager", description: "Manager decision" },
  { id: "fin", title: "Finance", description: "Budget check" },
  { id: "rel", title: "Release", description: "Vendor release" },
];

export function ErrorValidationExample() {
  return (
    <Stepper
      steps={approvalSteps}
      currentStep={2}
      showErrors
      errorSteps={[1]}
      variant="outlined"
    />
  );
}`;

const approvalReviewSource = `import { Stepper, type Step } from "erp-pro-ui";

const approvalSteps: Step[] = [
  { id: "draft", title: "Draft" },
  { id: "review", title: "Review" },
  { id: "legal", title: "Legal" },
  { id: "approved", title: "Approved" },
];

export function ApprovalReviewExample() {
  return (
    <Stepper
      steps={approvalSteps}
      currentStep={2}
      completedSteps={[0, 1]}
      clickable
      variant="default"
    />
  );
}`;

const connectedSettingsSource = `import { useState } from "react";
import {
  Button,
  StepperSteps,
  type StepperStepsItem,
} from "erp-pro-ui";
import {
  BriefcaseBusinessIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
} from "erp-pro-ui";

const connectedSteps: StepperStepsItem[] = [
  { label: "Profile", icon: <UserIcon className="h-4 w-4" /> },
  { label: "Billing", icon: <BriefcaseBusinessIcon className="h-4 w-4" /> },
  { label: "Security", icon: <SettingsIcon className="h-4 w-4" /> },
  { label: "Launch", icon: <PackageIcon className="h-4 w-4" /> },
];

export function ConnectedSettingsExample() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div>
      <StepperSteps
        steps={connectedSteps}
        currentStep={currentStep}
        onStepClick={setCurrentStep}
        stepStates={["valid", "valid", "invalid", "untouched"]}
      />

      <div className="mt-6 flex gap-3">
        <Button
          label="Previous"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((step) => step - 1)}
        />
        <Button
          label="Next"
          primary
          disabled={currentStep === connectedSteps.length - 1}
          onClick={() => setCurrentStep((step) => step + 1)}
        />
      </div>
    </div>
  );
}`;

const connectedLayoutsSource = `import {
  BriefcaseBusinessIcon,
  PackageIcon,
  SettingsIcon,
  StepperSteps,
  UserIcon,
  type StepperStepsItem,
} from "erp-pro-ui";

const desktopSteps: StepperStepsItem[] = [
  { label: "Profile", icon: <UserIcon className="h-4 w-4" /> },
  { label: "Billing", icon: <BriefcaseBusinessIcon className="h-4 w-4" /> },
  { label: "Security", icon: <SettingsIcon className="h-4 w-4" /> },
  { label: "Launch", icon: <PackageIcon className="h-4 w-4" /> },
];

const releaseChecklistSteps: StepperStepsItem[] = [
  { label: "Draft docs" },
  { label: "Legal signoff" },
  { label: "Ops handoff" },
  { label: "Go live" },
];

export function ConnectedStepperLayoutsExample() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <StepperSteps
        steps={desktopSteps}
        currentStep={2}
        stepStates={["valid", "valid", "invalid", "untouched"]}
      />

      <StepperSteps
        steps={releaseChecklistSteps}
        currentStep={2}
        orientation="vertical"
        stepStates={["valid", "valid", "untouched", "untouched"]}
      />
    </div>
  );
}`;

const comparisonSource = `import {
  BriefcaseBusinessIcon,
  PackageIcon,
  SettingsIcon,
  Stepper,
  StepperSteps,
  StepperWizard,
  StepperWizardStep,
  UserIcon,
  type Step,
  type StepperStepsItem,
} from "erp-pro-ui";

const checkoutSteps: Step[] = [
  { id: "cart", title: "Cart", description: "Review your items" },
  { id: "shipping", title: "Shipping", description: "Choose shipping method" },
  { id: "payment", title: "Payment", description: "Enter payment details" },
  { id: "confirmation", title: "Confirmation", description: "Order complete!" },
];

const connectedSteps: StepperStepsItem[] = [
  { label: "Profile", icon: <UserIcon className="h-4 w-4" /> },
  { label: "Billing", icon: <BriefcaseBusinessIcon className="h-4 w-4" /> },
  { label: "Security", icon: <SettingsIcon className="h-4 w-4" /> },
  { label: "Launch", icon: <PackageIcon className="h-4 w-4" /> },
];

export function StepperComparisonExample() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Stepper
        steps={checkoutSteps}
        currentStep={1}
        completedSteps={[0]}
        variant="glass"
      />

      <StepperSteps
        steps={connectedSteps}
        currentStep={2}
        stepStates={["valid", "valid", "invalid", "untouched"]}
        orientation="vertical"
      />

      <StepperWizard initialStep={0} nextButtonText="Next" completeButtonText="Finish">
        <StepperWizardStep>Workspace details</StepperWizardStep>
        <StepperWizardStep>Invites</StepperWizardStep>
        <StepperWizardStep>Automation review</StepperWizardStep>
      </StepperWizard>
    </div>
  );
}`;

const workspaceWizardSource = `import { useState } from "react";
import { StepperWizard, StepperWizardStep } from "erp-pro-ui";

export function WorkspaceSetupWizardExample() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return <p>Workspace setup is complete.</p>;
  }

  return (
    <StepperWizard onFinalStepCompleted={() => setCompleted(true)}>
      <StepperWizardStep>Create workspace details</StepperWizardStep>
      <StepperWizardStep>Invite operators</StepperWizardStep>
      <StepperWizardStep>Review automation rules</StepperWizardStep>
    </StepperWizard>
  );
}`;

const procurementWizardSource = `import { useState } from "react";
import { StepperWizard, StepperWizardStep } from "erp-pro-ui";

export function ProcurementApprovalWizardExample() {
  const [completed, setCompleted] = useState(false);

  if (completed) {
    return <p>Procurement review published.</p>;
  }

  return (
    <StepperWizard
      nextButtonText="Continue Review"
      completeButtonText="Publish Decision"
      onFinalStepCompleted={() => setCompleted(true)}
    >
      <StepperWizardStep>Scope requisition</StepperWizardStep>
      <StepperWizardStep>Risk and vendor checks</StepperWizardStep>
      <StepperWizardStep>Finalize release</StepperWizardStep>
    </StepperWizard>
  );
}`;

function CheckoutProgressStepperExample(
  props: Omit<StepperProps, "steps" | "currentStep">,
) {
  const [current, setCurrent] = useState(1);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:w-full">
        <Stepper
          {...props}
          steps={steps}
          currentStep={current}
          onStepClick={setCurrent}
        />
        <div className="ui:mt-12 ui:flex ui:justify-center ui:gap-4">
          <Button
            label="Previous"
            disabled={current === 0}
            onClick={() => setCurrent((step) => step - 1)}
          />
          <Button
            label="Next"
            primary
            disabled={current === steps.length - 1}
            onClick={() => setCurrent((step) => step + 1)}
          />
        </div>
      </div>
    </StorySurface>
  );
}

/**
 * ## Horizontal Flow
 * Commonly used at the top of multi-part forms.
 */
export const Horizontal: Story = {
  name: "Checkout Progress",
  render: () => (
    <CheckoutProgressStepperExample orientation="horizontal" variant="glass" />
  ),
  parameters: {
    docs: {
      source: {
        code: checkoutProgressSource,
      },
    },
  },
};

/**
 * ## Vertical Flow
 * Commonly used alongside deeper settings sections to outline major changes.
 */
export const Vertical: Story = {
  name: "Vertical Settings Flow",
  render: () => (
    <CheckoutProgressStepperExample orientation="vertical" variant="outlined" />
  ),
  parameters: {
    docs: {
      source: {
        code: verticalSettingsSource,
      },
    },
  },
};

/**
 * ## Error Validation Path
 * Marks invalid steps while preserving progress context.
 */
export const ErrorValidationPath: Story = {
  name: "Validation Recovery Flow",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Stepper
        steps={[
          { id: "req", title: "Request", description: "Submit requisition" },
          { id: "mgr", title: "Manager", description: "Manager decision" },
          { id: "fin", title: "Finance", description: "Budget check" },
          { id: "rel", title: "Release", description: "Vendor release" },
        ]}
        currentStep={2}
        showErrors
        errorSteps={[1]}
        variant="outlined"
      />
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: validationSource,
      },
    },
  },
};

/**
 * ## Controlled Completed Steps
 * Demonstrates non-linear review flows where completion is tracked manually.
 */
export const ControlledCompletedSteps: Story = {
  name: "Approval Review Flow",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Stepper
        steps={[
          { id: "draft", title: "Draft" },
          { id: "review", title: "Review" },
          { id: "legal", title: "Legal" },
          { id: "approved", title: "Approved" },
        ]}
        currentStep={2}
        completedSteps={[0, 1]}
        clickable
        variant="default"
      />
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: approvalReviewSource,
      },
    },
  },
};

function ConnectedSettingsStepperExample() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <StoryStack>
        <StoryIntro
          title="Simple Connected Stepper"
          description="A compact stepper for settings, onboarding, and dense review screens where validation state should stay visible."
        />
        <StepperSteps
          steps={connectedSteps}
          currentStep={currentStep}
          onStepClick={setCurrentStep}
          stepStates={["valid", "valid", "invalid", "untouched"]}
        />
        <div className="ui:flex ui:justify-center ui:gap-4">
          <Button
            label="Previous"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((step) => step - 1)}
          />
          <Button
            label="Next"
            primary
            disabled={currentStep === connectedSteps.length - 1}
            onClick={() => setCurrentStep((step) => step + 1)}
          />
        </div>
      </StoryStack>
    </StorySurface>
  );
}

/**
 * ## Connected Step Buttons
 * A simple example for the compact stepper variant.
 */
export const ConnectedStepButtons: Story = {
  name: "Connected Settings Flow",
  render: () => <ConnectedSettingsStepperExample />,
  parameters: {
    docs: {
      source: {
        code: connectedSettingsSource,
      },
    },
  },
};

/**
 * ## Connected Stepper Scenarios
 * Compare the compact stepper across desktop onboarding and narrow checklist layouts.
 */
export const ConnectedStepperScenarios: Story = {
  name: "Connected Stepper Layouts",
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl" className="ui:block">
      <StorySection>
        <StoryIntro
          title="Connected Stepper Scenarios"
          description="This variant works both as a horizontal progress strip and as a denser vertical task list."
        />
        <div className="ui:grid ui:grid-cols-1 ui:gap-6 md:ui:grid-cols-2">
          <StoryPanel className="ui:space-y-5">
            <StoryIntro
              title="Finance Approval Setup"
              description="Horizontal layout for desktop setup flows where users revisit earlier stages."
            />
            <StepperSteps
              steps={connectedSteps}
              currentStep={2}
              stepStates={["valid", "valid", "invalid", "untouched"]}
            />
          </StoryPanel>
          <StoryPanel className="ui:space-y-5">
            <StoryIntro
              title="Warehouse Release Checklist"
              description="Vertical layout for release-readiness checklists inside a side panel or operational drawer."
            />
            <StepperSteps
              steps={releaseChecklistSteps}
              currentStep={2}
              orientation="vertical"
              stepStates={["valid", "valid", "untouched", "untouched"]}
            />
          </StoryPanel>
        </div>
      </StorySection>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: connectedLayoutsSource,
      },
    },
  },
};

/**
 * ## Stepper Comparison
 * Shows the core, connected, and wizard steppers together so visual differences are easy to review.
 */
export const StepperComparison: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-6xl" className="ui:block">
      <StorySection>
        <StoryIntro
          title="Stepper Comparison"
          description="Use the core stepper for general progress navigation, the connected stepper for validation-heavy settings flows, and the wizard for staged content handoff."
        />
        <div className="ui:grid ui:grid-cols-1 ui:gap-6 lg:ui:grid-cols-3">
          <StoryPanel className="ui:space-y-4">
            <StoryIntro
              title="Core Stepper"
              description="Balanced default for checkout, approvals, and multi-stage forms."
            />
            <Stepper
              steps={steps}
              currentStep={1}
              completedSteps={[0]}
              variant="glass"
            />
          </StoryPanel>

          <StoryPanel className="ui:space-y-4">
            <StoryIntro
              title="Connected Stepper"
              description="Denser layout for settings and validation-driven review flows."
            />
            <StepperSteps
              steps={connectedSteps}
              currentStep={2}
              stepStates={["valid", "valid", "invalid", "untouched"]}
              orientation="vertical"
            />
          </StoryPanel>

          <StoryPanel className="ui:space-y-4">
            <StoryIntro
              title="Wizard Stepper"
              description="Best when each step owns a full content panel and guided next/back actions."
            />
            <StepperWizard
              initialStep={0}
              nextButtonText="Next"
              completeButtonText="Finish"
            >
              <StepperWizardStep>
                <WizardMetric label="Workspace" value="Northwind Ops" />
              </StepperWizardStep>
              <StepperWizardStep>
                <WizardMetric label="Invites" value="2 pending operators" />
              </StepperWizardStep>
              <StepperWizardStep>
                <WizardMetric label="Automation" value="Approval rules ready" />
              </StepperWizardStep>
            </StepperWizard>
          </StoryPanel>
        </div>
      </StorySection>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: comparisonSource,
      },
    },
  },
};

function WizardMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-surface ui:p-4">
      <p className="ui:text-xs ui:uppercase ui:tracking-[0.16em] ui:text-muted-foreground">
        {label}
      </p>
      <p className="ui:mt-2 ui:text-sm ui:font-semibold ui:text-foreground">
        {value}
      </p>
    </div>
  );
}

function WorkspaceSetupWizardExample() {
  const [completed, setCompleted] = useState(false);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      {completed ? (
        <div className="ui:space-y-2 ui:rounded-2xl ui:border ui:border-success/30 ui:bg-success/10 ui:p-6">
          <p className="ui:text-sm ui:font-semibold ui:text-success">
            Workspace setup is complete.
          </p>
          <p className="ui:text-sm ui:text-muted-foreground">
            The wizard variant supports animated content transitions and
            built-in next and back controls.
          </p>
        </div>
      ) : (
        <StoryStack>
          <StoryIntro
            title="Simple Wizard Example"
            description="A guided setup pattern for multi-step onboarding where the content pane changes between stages."
          />
          <StepperWizard onFinalStepCompleted={() => setCompleted(true)}>
            <StepperWizardStep>
              <div className="ui:space-y-2">
                <h3 className="ui:text-lg ui:font-semibold ui:text-foreground">
                  Create workspace
                </h3>
                <p className="ui:text-sm ui:text-muted-foreground">
                  Start with a workspace name, region, and default currency.
                </p>
              </div>
              <div className="ui:grid ui:gap-3 sm:ui:grid-cols-2">
                <WizardMetric label="Workspace" value="Northwind Operations" />
                <WizardMetric label="Region" value="EU Central" />
              </div>
            </StepperWizardStep>

            <StepperWizardStep>
              <div className="ui:space-y-2">
                <h3 className="ui:text-lg ui:font-semibold ui:text-foreground">
                  Invite operators
                </h3>
                <p className="ui:text-sm ui:text-muted-foreground">
                  Bring in the first team members who will handle approvals and
                  inventory.
                </p>
              </div>
              <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-surface ui:p-4">
                <p className="ui:text-sm ui:font-medium ui:text-foreground">
                  Pending invites
                </p>
                <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
                  ops@northwind.example, finance@northwind.example
                </p>
              </div>
            </StepperWizardStep>

            <StepperWizardStep>
              <div className="ui:space-y-2">
                <h3 className="ui:text-lg ui:font-semibold ui:text-foreground">
                  Review automation
                </h3>
                <p className="ui:text-sm ui:text-muted-foreground">
                  Confirm approval routing, reorder thresholds, and notification
                  rules.
                </p>
              </div>
              <div className="ui:grid ui:gap-3 sm:ui:grid-cols-3">
                <WizardMetric label="Approvals" value="Enabled" />
                <WizardMetric label="Low stock alerts" value="Enabled" />
                <WizardMetric label="Digest" value="Daily at 08:00" />
              </div>
            </StepperWizardStep>
          </StepperWizard>
        </StoryStack>
      )}
    </StorySurface>
  );
}

function ProcurementApprovalWizardExample() {
  const [completed, setCompleted] = useState(false);

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      {completed ? (
        <div className="ui:rounded-2xl ui:border ui:border-accent/20 ui:bg-accent/8 ui:p-6">
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Procurement review published.
          </p>
          <p className="ui:mt-2 ui:text-sm ui:text-muted-foreground">
            This scenario shows the wizard pattern working for approvals and
            release signoff, not only first-run setup.
          </p>
        </div>
      ) : (
        <StoryStack>
          <StoryIntro
            title="Procurement Review Flow"
            description="A second wizard scenario for approvals, risk checks, and final release decisions."
          />
          <StepperWizard
            nextButtonText="Continue Review"
            completeButtonText="Publish Decision"
            onFinalStepCompleted={() => setCompleted(true)}
          >
            <StepperWizardStep>
              <div className="ui:space-y-2">
                <h3 className="ui:text-lg ui:font-semibold ui:text-foreground">
                  Scope requisition
                </h3>
                <p className="ui:text-sm ui:text-muted-foreground">
                  Validate the business owner, spend category, and requested
                  delivery window.
                </p>
              </div>
              <div className="ui:grid ui:gap-3 sm:ui:grid-cols-3">
                <WizardMetric label="Owner" value="Supply Chain" />
                <WizardMetric label="Budget" value="$48,000" />
                <WizardMetric label="Window" value="14 calendar days" />
              </div>
            </StepperWizardStep>

            <StepperWizardStep>
              <div className="ui:space-y-2">
                <h3 className="ui:text-lg ui:font-semibold ui:text-foreground">
                  Risk and vendor checks
                </h3>
                <p className="ui:text-sm ui:text-muted-foreground">
                  Review supplier status, contractual exposure, and
                  sustainability flags before release.
                </p>
              </div>
              <div className="ui:grid ui:gap-3 sm:ui:grid-cols-2">
                <WizardMetric label="Vendor health" value="Preferred vendor" />
                <WizardMetric
                  label="Risk score"
                  value="Low with annual review"
                />
              </div>
            </StepperWizardStep>

            <StepperWizardStep>
              <div className="ui:space-y-2">
                <h3 className="ui:text-lg ui:font-semibold ui:text-foreground">
                  Finalize release
                </h3>
                <p className="ui:text-sm ui:text-muted-foreground">
                  Send approval routing, notify finance, and create the vendor
                  release package.
                </p>
              </div>
              <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-surface ui:p-4 ui:text-sm ui:text-muted-foreground">
                Routing will notify procurement, finance, and receiving once the
                decision is published.
              </div>
            </StepperWizardStep>
          </StepperWizard>
        </StoryStack>
      )}
    </StorySurface>
  );
}

/**
 * ## Wizard Flow Variant
 * A simple example of the animated wizard stepper for setup flows.
 */
export const WizardFlowVariant: Story = {
  name: "Workspace Setup Wizard",
  render: () => <WorkspaceSetupWizardExample />,
  parameters: {
    docs: {
      source: {
        code: workspaceWizardSource,
      },
    },
  },
};

/**
 * ## Wizard Approval Scenario
 * Shows the same wizard API adapted to procurement review and release workflows.
 */
export const WizardApprovalScenario: Story = {
  name: "Procurement Approval Wizard",
  render: () => <ProcurementApprovalWizardExample />,
  parameters: {
    docs: {
      source: {
        code: procurementWizardSource,
      },
    },
  },
};
