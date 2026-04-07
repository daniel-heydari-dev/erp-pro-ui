import { useState } from "react";
import { Button, Select, Stepper, type Step } from "erp-pro-ui";
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

const stepperLabelPositionOptions: Array<{
  label: string;
  value: "bottom" | "right";
}> = [
  { label: "Bottom", value: "bottom" },
  { label: "Inline Right", value: "right" },
];

const checkoutSteps: Step[] = [
  {
    id: "cart",
    title: "Cart",
    description: "Review your items",
  },
  {
    id: "shipping",
    title: "Shipping",
    description: "Choose shipping method",
  },
  {
    id: "payment",
    title: "Payment",
    description: "Enter payment details",
    optional: true,
  },
  {
    id: "confirmation",
    title: "Confirmation",
    description: "Order complete!",
  },
];

const inlineSteps: Step[] = [
  {
    id: "general",
    title: "General Information",
    description: "Workspace basics",
  },
  {
    id: "billing",
    title: "Billing Setup",
    description: "Payment and invoicing",
  },
  {
    id: "team",
    title: "Team Access",
    description: "Invite collaborators",
  },
  {
    id: "review",
    title: "Review",
    description: "Confirm and launch",
  },
];

const approvalSteps: Step[] = [
  {
    id: "req",
    title: "Request",
    description: "Submit requisition",
  },
  {
    id: "mgr",
    title: "Manager",
    description: "Manager decision",
  },
  {
    id: "fin",
    title: "Finance",
    description: "Budget check",
  },
  {
    id: "rel",
    title: "Release",
    description: "Vendor release",
  },
];

const reviewSteps: Step[] = [
  { id: "draft", title: "Draft" },
  { id: "review", title: "Review" },
  { id: "legal", title: "Legal" },
  { id: "approved", title: "Approved" },
];

const exportGuides = [
  {
    title: "Stepper",
    body: "Use the core Stepper for checkout, approvals, and guided progress navigation.",
  },
  {
    title: "StepperSteps",
    body: "Use StepperSteps for denser settings flows where validation state stays visible in each step button.",
  },
  {
    title: "StepperWizard",
    body: "Use StepperWizard when each step owns a content pane and the component should handle next and back actions.",
  },
];

const StepperDoc = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [variant, setVariant] = useState<
    "default" | "glass" | "minimal" | "outlined"
  >("glass");
  const [size, setSize] = useState<"sm" | "md" | "lg">("md");
  const [labelPosition, setLabelPosition] = useState<"bottom" | "right">(
    "bottom",
  );

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, checkoutSteps.length - 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Stepper</h1>
      <p className="docs-paragraph">
        The Stepper family covers three patterns: the core progress stepper,
        denser connected step buttons, and full-pane wizard flows. The core
        Stepper now keeps labels centered under each circle by default and can
        place labels inline with <code>labelPosition="right"</code> when you
        need a tighter layout.
      </p>

      <h2 className="docs-category-subtitle">Checkout Progress Playground</h2>

      <p className="docs-paragraph mb-4">
        This matches the main Storybook checkout example: centered labels,
        connectors that start at the first circle and end at the last circle,
        and an optional inline label mode for tighter headers.
      </p>

      <div className="docs-controls">
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Variant</label>
          <Select
            value={variant}
            onChange={(event) =>
              setVariant(
                event.target.value as
                  | "default"
                  | "glass"
                  | "minimal"
                  | "outlined",
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
            onChange={(event) =>
              setSize(event.target.value as "sm" | "md" | "lg")
            }
            className="w-48"
            options={stepperSizeOptions}
          />
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Labels</label>
          <Select
            value={labelPosition}
            onChange={(event) =>
              setLabelPosition(event.target.value as "bottom" | "right")
            }
            className="w-48"
            options={stepperLabelPositionOptions}
          />
        </div>
      </div>

      <div className="docs-showcase-card flex-col items-center gap-8">
        <div className="w-full max-w-6xl">
          <Stepper
            steps={checkoutSteps}
            currentStep={activeStep}
            onStepClick={setActiveStep}
            orientation="horizontal"
            variant={variant}
            size={size}
            labelPosition={labelPosition}
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
            disabled={activeStep === checkoutSteps.length - 1}
            className="px-4 py-2"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { useState } from 'react';
import { Stepper, type Step } from 'erp-pro-ui';

const checkoutSteps: Step[] = [
  { id: 'cart', title: 'Cart', description: 'Review your items' },
  { id: 'shipping', title: 'Shipping', description: 'Choose shipping method' },
  { id: 'payment', title: 'Payment', description: 'Enter payment details', optional: true },
  { id: 'confirmation', title: 'Confirmation', description: 'Order complete!' },
];

export function CheckoutProgressExample() {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <Stepper
      steps={checkoutSteps}
      currentStep={currentStep}
      onStepClick={setCurrentStep}
      orientation="horizontal"
      variant="glass"
      labelPosition="bottom"
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Vertical Settings Flow</h2>
      <p className="docs-paragraph">
        Use the vertical layout when you have more height than width, such as
        side panels, settings pages, or operational drawers.
      </p>
      <div className="docs-showcase-card">
        <div className="max-w-md w-full">
          <Stepper
            steps={checkoutSteps}
            currentStep={1}
            orientation="vertical"
            variant="outlined"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Stepper, type Step } from 'erp-pro-ui';

const settingsSteps: Step[] = [
  { id: 'cart', title: 'Cart', description: 'Review your items' },
  { id: 'shipping', title: 'Shipping', description: 'Choose shipping method' },
  { id: 'payment', title: 'Payment', description: 'Enter payment details', optional: true },
  { id: 'confirmation', title: 'Confirmation', description: 'Order complete!' },
];

export function VerticalSettingsStepperExample() {
  return (
    <Stepper
      steps={settingsSteps}
      currentStep={1}
      orientation="vertical"
      variant="outlined"
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Validation Recovery Flow</h2>
      <p className="docs-paragraph">
        Highlight a broken stage without losing progress context. This matches
        the Storybook validation example and keeps the rest of the path visible.
      </p>
      <div className="docs-showcase-card flex-col gap-8">
        <div className="w-full max-w-4xl">
          <Stepper
            steps={approvalSteps}
            currentStep={2}
            showErrors
            errorSteps={[1]}
            variant="outlined"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Stepper, type Step } from 'erp-pro-ui';

const approvalSteps: Step[] = [
  { id: 'req', title: 'Request', description: 'Submit requisition' },
  { id: 'mgr', title: 'Manager', description: 'Manager decision' },
  { id: 'fin', title: 'Finance', description: 'Budget check' },
  { id: 'rel', title: 'Release', description: 'Vendor release' },
];

export function ValidationRecoveryStepperExample() {
  return (
    <Stepper
      steps={approvalSteps}
      currentStep={2}
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
            steps={reviewSteps}
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
  { id: 'draft', title: 'Draft' },
  { id: 'review', title: 'Review' },
  { id: 'legal', title: 'Legal' },
  { id: 'approved', title: 'Approved' },
];

export function ApprovalReviewStepperExample() {
  return (
    <Stepper
      steps={approvalSteps}
      currentStep={2}
      completedSteps={[0, 1]}
      clickable
      variant="default"
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Inline Labels</h2>
      <p className="docs-paragraph">
        Set <code>labelPosition</code> to <code>right</code> when the text
        should sit beside the circle instead of below it.
      </p>

      <div className="docs-showcase-card">
        <div className="w-full max-w-6xl">
          <Stepper
            steps={inlineSteps}
            currentStep={0}
            labelPosition="right"
            variant="glass"
          />
        </div>
      </div>

      <CodeBlock
        code={`import { Stepper, type Step } from 'erp-pro-ui';

const onboardingSteps: Step[] = [
  { id: 'general', title: 'General Information', description: 'Workspace basics' },
  { id: 'billing', title: 'Billing Setup', description: 'Payment and invoicing' },
  { id: 'team', title: 'Team Access', description: 'Invite collaborators' },
  { id: 'review', title: 'Review', description: 'Confirm and launch' },
];

export function InlineStepperLabelsExample() {
  return (
    <Stepper
      steps={onboardingSteps}
      currentStep={0}
      labelPosition="right"
      variant="glass"
    />
  );
}`}
      />

      <h2 className="docs-category-subtitle">Stepper Family</h2>
      <p className="docs-paragraph mb-4">
        Storybook groups three related exports under the Stepper docs. Use the
        variant that matches the density and interaction model of your screen.
      </p>

      <div className="docs-showcase-card">
        <div className="grid w-full gap-4 md:grid-cols-3">
          {exportGuides.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900"
            >
              <h3 className="text-base font-semibold text-neutral-900 dark:text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

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
              <td className="docs-prop-name">labelPosition</td>
              <td>
                <span className="docs-prop-type">'bottom' | 'right'</span>
              </td>
              <td>'bottom'</td>
              <td>
                Controls whether the label sits below the circle or inline to
                its right. Vertical steppers always render inline labels.
              </td>
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
              <td className="docs-prop-name">colors</td>
              <td>
                <span className="docs-prop-type">object</span>
              </td>
              <td>-</td>
              <td>
                Optional overrides for completed, current, error, upcoming, and
                connector colors.
              </td>
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
