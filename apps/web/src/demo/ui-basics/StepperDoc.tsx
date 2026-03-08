import { useState } from 'react';
import { Stepper, Button, Select } from '@erp-pro/ui';
import DocsButtonBar from '../../docs/DocsButtonBar';
import CodeBlock from '../../components/CodeBlock';

const StepperDoc = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>('horizontal');
  const [variant, setVariant] = useState<'default' | 'glass' | 'minimal' | 'outlined'>('glass');
  const [size, setSize] = useState<'sm' | 'md' | 'lg'>('md');

  const steps = [
    {
      id: "step-1",
      title: "Account",
      description: "Create your account",
      content: (
        <div className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-lg mt-2">
          <p className="text-sm">Account details form would go here.</p>
        </div>
      ),
    },
    {
      id: "step-2",
      title: "Profile",
      description: "Set up your profile",
      content: (
        <div className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-lg mt-2">
          <p className="text-sm">Profile settings form would go here.</p>
        </div>
      ),
    },
    {
      id: "step-3",
      title: "Preview",
      description: "Review your details",
      content: (
        <div className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-lg mt-2">
          <p className="text-sm">Summary of your information.</p>
        </div>
      ),
    },
    {
      id: "step-4",
      title: "Complete",
      description: "You are done!",
      content: (
        <div className="bg-neutral-100 dark:bg-neutral-800/50 p-4 rounded-lg mt-2">
          <p className="text-sm">Success message and next steps.</p>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrev = () => {
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const iconSteps = [
    { id: "step-1", title: "User", icon: "👤" },
    { id: "step-2", title: "Plan", icon: "💳" },
    { id: "step-3", title: "Done", icon: "🚀" },
  ];

  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Stepper</h1>
      <p className="docs-paragraph">
        Visual navigation component that guides users through a multi-step process.
      </p>

      {/* Preview Section */}
      <h2 className="docs-category-subtitle">Interactive Playground</h2>

      <div className="docs-controls">
        <div className="docs-control-group">
          <label className="docs-control-label">Orientation</label>
          <div className="flex gap-2">
            <button
              onClick={() => setOrientation('horizontal')}
              className={`docs-button ${orientation === 'horizontal' ? 'docs-button-primary' : 'docs-button-secondary'}`}
            >
              Horizontal
            </button>
            <button
              onClick={() => setOrientation('vertical')}
              className={`docs-button ${orientation === 'vertical' ? 'docs-button-primary' : 'docs-button-secondary'}`}
            >
              Vertical
            </button>
          </div>
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Variant</label>
          <Select
            value={variant}
            onChange={(e) => setVariant(e.target.value as any)}
            className="w-48"
            options={[
              { label: 'Default', value: 'default' },
              { label: 'Glass', value: 'glass' },
              { label: 'Minimal', value: 'minimal' },
              { label: 'Outlined', value: 'outlined' },
            ]}
          />
        </div>
        <div className="docs-control-group flex items-center gap-4">
          <label className="docs-control-label w-20">Size</label>
          <Select
            value={size}
            onChange={(e) => setSize(e.target.value as any)}
            className="w-48"
            options={[
              { label: 'Small', value: 'sm' },
              { label: 'Medium', value: 'md' },
              { label: 'Large', value: 'lg' },
            ]}
          />
        </div>
      </div>

      <div className="docs-showcase-card flex-col items-center gap-8">
        <div className="w-full max-w-3xl">
          <Stepper
            steps={steps}
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
            disabled={activeStep === steps.length - 1}
            className="px-4 py-2"
          />
        </div>
      </div>

      <CodeBlock code={`import { Stepper } from '@erp-pro/ui';

// ... steps definition

<Stepper
  steps={steps}
  currentStep={activeStep}
  onStepClick={setActiveStep}
  orientation="${orientation}"
  variant="${variant}"
  size="${size}"
/>`} />

      {/* Vertical Orientation */}
      <h2 className="docs-category-subtitle">Vertical Stepper</h2>
      <p className="docs-paragraph">
        Ideal for sidebars or long forms where vertical space is available.
      </p>
      <div className="docs-showcase-card">
        <div className="max-w-md w-full">
          <Stepper
            steps={steps}
            currentStep={activeStep}
            orientation="vertical"
            variant="glass"
          />
        </div>
      </div>

      <CodeBlock code={`<Stepper 
  steps={steps} 
  currentStep={activeStep} 
  orientation="vertical" 
/>`} />

      {/* Custom Icons & Errors */}
      <h2 className="docs-category-subtitle">Icons & Error States</h2>
      <p className="docs-paragraph">
        Enhance steps with custom icons and highlight validation errors using <code>showErrors</code>.
      </p>
      <div className="docs-showcase-card flex-col gap-8">
        <div className="w-full max-w-2xl">
          <Stepper
            steps={iconSteps}
            currentStep={1}
            showErrors={true}
            errorSteps={[1]}
            variant="outlined"
          />
        </div>
      </div>

      <CodeBlock code={`<Stepper
  steps={[
    { id: "1", title: "User", icon: <UserIcon /> },
    { id: "2", title: "Plan", icon: <CardIcon /> },
  ]}
  currentStep={1}
  showErrors={true}
  errorSteps={[1]}
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
              <td className="docs-prop-name">steps</td>
              <td><span className="docs-prop-type">Step[]</span></td>
              <td>-</td>
              <td>Array of step objects</td>
            </tr>
            <tr>
              <td className="docs-prop-name">currentStep</td>
              <td><span className="docs-prop-type">number</span></td>
              <td>0</td>
              <td>Index of current step</td>
            </tr>
            <tr>
              <td className="docs-prop-name">orientation</td>
              <td><span className="docs-prop-type">'horizontal' | 'vertical'</span></td>
              <td>'horizontal'</td>
              <td>Layout direction</td>
            </tr>
            <tr>
              <td className="docs-prop-name">variant</td>
              <td><span className="docs-prop-type">'default' | 'glass' | 'minimal' | 'outlined'</span></td>
              <td>'glass'</td>
              <td>Visual style variant</td>
            </tr>
            <tr>
              <td className="docs-prop-name">size</td>
              <td><span className="docs-prop-type">'sm' | 'md' | 'lg'</span></td>
              <td>'md'</td>
              <td>Size of indicators</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: 'Card', route: '/ui-basics/card' }}
        next={{ label: 'Chip', route: '/ui-basics/chip' }}
      />
    </section>
  );
};

export default StepperDoc;
