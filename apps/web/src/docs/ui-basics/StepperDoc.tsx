import { useState } from "react";
import { Stepper, Button, Select, type Step } from "erp-pro-ui";
import DocsButtonBar from "@/docs/components/DocsButtonBar";
import CodeBlock from "@/docs/components/CodeBlock";

const stepperVariantOptions: Array<{
  label: string;
  value: "default" | "glass" | "minimal" | "outlined";
}> = [
  { label: "Default", value: "default" },
  { label: "Glass", value: "glass" },
  { label: "Minimal", value: "minimal" },
  { label: "Outlined", value: "outlined" },
];

const stepperSizeOptions: Array<{ label: string; value: "sm" | "md" | "lg" }> =
  [
    { label: "Small", value: "sm" },
    { label: "Medium", value: "md" },
    { label: "Large", value: "lg" },
  ];

const onboardingSteps: Step[] = [
  {
    id: "account",
    title: "Account",
    description: "Create your account",
  },
  {
    id: "profile",
    title: "Profile",
    description: "Set up your profile",
  },
  {
    id: "review",
    title: "Review",
    description: "Review your details",
  },
  {
    id: "complete",
    title: "Complete",
    description: "You are done!",
  },
];

const iconDemoSteps: Step[] = [
  { id: "user", title: "User", icon: "👤" },
  { id: "plan", title: "Plan", icon: "💳" },
  { id: "done", title: "Done", icon: "🚀" },
];

const approvalSteps: Step[] = [
  {
    id: "request",
    title: "Request",
    description: "Submit purchase request",
  },
  {
    id: "manager",
    title: "Manager",
    description: "Manager approval",
  },
  {
    id: "finance",
    title: "Finance",
    description: "Budget verification",
  },
  {
    id: "done",
    title: "Released",
    description: "Order released to vendor",
  },
];

const StepperDoc = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [orientation, setOrientation] = useState<"horizontal" | "vertical">(
    "horizontal",
  );
  const [variant, setVariant] = useState<
    "default" | "glass" | "minimal" | "outlined"
  >("glass");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, onboardingSteps.length - 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Stepper</h1>
      <p className="docs-paragraph">
        Step-by-step progress indicator for onboarding, checkout, and guided
        setup flows.
      </p>

      <h2 className="docs-category-subtitle">Onboarding Playground</h2>

      <div className="docs-controls">
        <div className="docs-control-group">
          <label className="docs-control-label">Orientation</label>
          <div className="flex gap-2">
            <Button
              onClick={() => setOrientation("horizontal")}
              primary={orientation === "horizontal"}
            >
              Horizontal
            </Button>
            <Button
              onClick={() => setOrientation("vertical")}
              primary={orientation === "vertical"}
            >
              Vertical
            </Button>
          </div>
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Variant</label>
          <Select
            value={variant}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setVariant(
                e.target.value as "default" | "glass" | "minimal" | "outlined",
              )
            }
            className="w-48"
            options={stepperVariantOptions}
          />
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Size</label>
          <Select
            value={size}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setSize(e.target.value as "sm" | "md" | "lg")
            }
            className="w-48"
            options={stepperSizeOptions}
          />
        </div>
      </div>

      <div className="docs-showcase-card flex-col items-center gap-8">
        <div className="w-full max-w-3xl">
          <Stepper
            steps={onboardingSteps}
            currentStep={activeStep}
            onStepClick={setActiveStep}
            orientation={orientation}
            variant={variant}
            size={size}
          />
        </div>

        <div className="flex gap-4">
          <Button
            label="Previous"
            primary={false}
            onClick={handlePrev}
            disabled={activeStep === 0}
            className="px-4 py-2"
          />
          <Button
            label="Next"
            primary={true}
            onClick={handleNext}
            disabled={activeStep === onboardingSteps.length - 1}
            className="px-4 py-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
      import { Stepper, type Step } from 'erp-pro-ui';

      const onboardingSteps: Step[] = [
  { id: 'account', title: 'Account', description: 'Create your account' },
  { id: 'profile', title: 'Profile', description: 'Set up your profile' },
  { id: 'review', title: 'Review', description: 'Review your details' },
  { id: 'complete', title: 'Complete', description: 'You are done!' },
];

export function OnboardingStepperExample() {
  const [activeStep, setActiveStep] = useState(1);

  return (
    <Stepper
      steps={onboardingSteps}
      currentStep={activeStep}
      onStepClick={setActiveStep}
      orientation="${orientation}"
      variant="${variant}"
      size="${size}"
    />
  );
}`}
      />

      {/* Vertical Orientation */}
      <h2 className="docs-category-subtitle">Vertical Settings Flow</h2>
      <p className="docs-paragraph">
        Ideal for sidebars or long forms where vertical space is available.
      </p>
      <div className="docs-showcase-card">
        <div className="max-w-md w-full">
          <Stepper
            steps={onboardingSteps}
            currentStep={activeStep}
            orientation="vertical"
            variant="glass"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Stepper, type Step } from 'erp-pro-ui';

      const settingsSteps: Step[] = [
  { id: 'account', title: 'Account', description: 'Create your account' },
  { id: 'profile', title: 'Profile', description: 'Set up your profile' },
  { id: 'review', title: 'Review', description: 'Review your details' },
  { id: 'complete', title: 'Complete', description: 'You are done!' },
];

export function VerticalSettingsStepperExample() {
  return (
    <Stepper
      steps={settingsSteps}
      currentStep={1}
      orientation="vertical"
      variant="glass"
    />
  );
}`}
      />

      {/* Custom Icons & Errors */}
      <h2 className="docs-category-subtitle">Validation Recovery Flow</h2>
      <p className="docs-paragraph">
        Enhance steps with custom icons and highlight validation errors using{" "}
        <code>showErrors</code>.
      </p>
      <div className="docs-showcase-card flex-col gap-8">
        <div className="w-full max-w-2xl">
          <Stepper
            steps={iconDemoSteps}
            currentStep={1}
            showErrors={true}
            errorSteps={[1]}
            variant="outlined"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Stepper, type Step } from 'erp-pro-ui';

      const validationSteps: Step[] = [
  { id: 'user', title: 'User', icon: '👤' },
  { id: 'plan', title: 'Plan', icon: '💳' },
  { id: 'done', title: 'Done', icon: '🚀' },
];

export function ValidationRecoveryStepperExample() {
  return (
    <Stepper
      steps={validationSteps}
      currentStep={1}
      showErrors
      errorSteps={[1]}
      variant="outlined"
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Approval Review Flow</h2>
      <p className="docs-paragraph">
        Combine <code>completedSteps</code> with <code>clickable</code> to
        support non-linear review flows.
      </p>
      <div className="docs-showcase-card">
        <div className="w-full max-w-3xl">
          <Stepper
            steps={approvalSteps}
            currentStep={2}
            completedSteps={[0, 1]}
            clickable
            variant="default"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Stepper, type Step } from 'erp-pro-ui';

      const approvalSteps: Step[] = [
  { id: 'request', title: 'Request', description: 'Submit purchase request' },
  { id: 'manager', title: 'Manager', description: 'Manager approval' },
  { id: 'finance', title: 'Finance', description: 'Budget verification' },
  { id: 'done', title: 'Released', description: 'Order released to vendor' },
];

export function ApprovalReviewStepperExample() {
  return (
    <Stepper
      steps={approvalSteps}
      currentStep={2}
      completedSteps={[0, 1]}
      clickable
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
              <td className="docs-prop-name">steps</td>
              <td>
                <span className="docs-prop-type">Step[]</span>
              </td>
              <td>-</td>
              <td>
                Array of steps with title, optional description/icon, and
                optional content.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">currentStep</td>
              <td>
                <span className="docs-prop-type">number</span>
              </td>
              <td>0</td>
              <td>Active step index (0-based).</td>
            </tr>
            <tr>
              <td className="docs-prop-name">orientation</td>
              <td>
                <span className="docs-prop-type">
                  'horizontal' | 'vertical'
                </span>
              </td>
              <td>'horizontal'</td>
              <td>Layout direction for the stepper.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td>
                <span className="docs-prop-type">
                  'default' | 'glass' | 'minimal' | 'outlined'
                </span>
              </td>
              <td>'glass'</td>
              <td>Visual style for step indicators and connector.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td>
                <span className="docs-prop-type">'sm' | 'md' | 'lg'</span>
              </td>
              <td>'md'</td>
              <td>Size scale for indicators and labels.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onStepClick</td>
              <td>
                <span className="docs-prop-type">
                  (stepIndex: number) =&gt; void
                </span>
              </td>
              <td>-</td>
              <td>Called when a step is clicked.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">clickable</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Allows clicking steps to navigate.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showNumbers</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Shows numeric markers instead of only icons.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showConnector</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>Toggles the line between steps.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">showErrors</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>
                Enables error styling for indices in <code>errorSteps</code>.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">errorSteps</td>
              <td>
                <span className="docs-prop-type">number[]</span>
              </td>
              <td>[]</td>
              <td>Step indices that should show an error state.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">completedSteps</td>
              <td>
                <span className="docs-prop-type">number[]</span>
              </td>
              <td>-</td>
              <td>
                Manual completed indices override auto-completion based on
                current step.
              </td>
            </tr>
            <tr>
              <td className="docs-prop-name">animated</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>true</td>
              <td>
                Enables transitions for indicator and connector state changes.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Card", route: "/ui-basics/card" }}
        next={{ label: "Chip", route: "/ui-basics/chip" }}
      />
    </section>
  );
};

export default StepperDoc;
