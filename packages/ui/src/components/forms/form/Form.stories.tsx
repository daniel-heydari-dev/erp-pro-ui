import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type FormEvent } from 'react';

import { Form, FormSection, FormField, FormActions, InputGroup } from './Form';
import { Button } from '../button';
import { Checkbox } from '../checkbox';
import { Input } from '../input';
import { Textarea } from '../textarea';
import { StorySurface } from '../../shared/storybook';

const meta: Meta<typeof Form> = {
  title: 'Layout/Form',
  component: Form,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Form provides a styled wrapper for native submit handling and richer layout primitives such as sections, grouped fields, inline labels, and shared action rows.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    gap: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function SignInFormDemo() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(
    null,
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Record<string, string>;
    setSubmitted(payload);
  };

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <div className="ui:grid ui:gap-6 ui:lg:grid-cols-[0.95fr_1.05fr]">
        <Form
          title="Sign in"
          description="Use your workspace credentials to continue."
          onSubmit={handleSubmit}
          className="ui:space-y-4"
        >
          <Input
            label="Email address"
            name="email"
            type="email"
            placeholder="name@example.com"
            required
          />
          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            required
          />
          <Button primary type="submit" className="ui:w-full" label="Sign In" />
        </Form>

        <div className="ui:rounded-2xl ui:border ui:border-border ui:bg-muted/40 ui:p-4">
          <p className="ui:text-sm ui:font-semibold ui:text-foreground">
            Captured submit payload
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-muted-foreground">
            The form uses native submission semantics, so extracting values with
            `FormData` remains straightforward.
          </p>
          <pre className="ui:mt-4 ui:min-h-56 ui:overflow-auto ui:rounded-xl ui:bg-background ui:p-4 ui:text-xs ui:text-muted-foreground">
            {JSON.stringify(
              submitted ?? {
                status: 'Submit the form to inspect the payload.',
              },
              null,
              2,
            )}
          </pre>
        </div>
      </div>
    </StorySurface>
  );
}

function ProfileSettingsDemo() {
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <Form
        title="Profile settings"
        description="Update account identity, notifications, and workspace defaults."
      >
        <FormSection
          title="Identity"
          description="These details appear across customer-facing records and internal reviews."
          columns={1}
        >
          <InputGroup columns={2}>
            <FormField label="First name" required htmlFor="profile-first-name">
              <Input
                id="profile-first-name"
                name="firstName"
                placeholder="Avery"
              />
            </FormField>
            <FormField label="Last name" required htmlFor="profile-last-name">
              <Input
                id="profile-last-name"
                name="lastName"
                placeholder="Johnson"
              />
            </FormField>
          </InputGroup>
          <InputGroup columns={2}>
            <FormField label="Work email" required htmlFor="profile-email">
              <Input
                id="profile-email"
                name="workEmail"
                type="email"
                placeholder="avery@northstar.io"
              />
            </FormField>
            <FormField
              label="Phone"
              htmlFor="profile-phone"
              helperAction={<span>Optional</span>}
            >
              <Input
                id="profile-phone"
                name="phone"
                placeholder="+1 (555) 123-0000"
              />
            </FormField>
          </InputGroup>
        </FormSection>

        <FormSection
          title="Preferences"
          description="Fine-tune communication defaults and operational context."
        >
          <FormField
            label="Internal bio"
            htmlFor="profile-bio"
            description="Provide enough context for teammates and reviewers."
          >
            <Textarea
              id="profile-bio"
              name="bio"
              placeholder="Leads onboarding for strategic retail accounts across EMEA."
              rows={4}
            />
          </FormField>
          <InputGroup columns={2}>
            <FormField label="Weekly summary">
              <Checkbox
                id="profile-summary"
                label="Email a Friday performance digest"
              />
            </FormField>
            <FormField label="Critical alerts">
              <Checkbox
                id="profile-alerts"
                label="Notify me when SLAs are at risk"
              />
            </FormField>
          </InputGroup>
        </FormSection>

        <FormActions align="end">
          <Button label="Cancel" />
          <Button label="Save profile" primary />
        </FormActions>
      </Form>
    </StorySurface>
  );
}

function InlineFieldDemo() {
  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <Form
        title="Payment details"
        description="Inline field layouts help with dense administrative workflows where labels and controls need tighter scanning."
        gap="md"
      >
        <FormField
          label="Billing contact"
          htmlFor="billing-contact"
          description="The main point of contact for invoices and disputes."
          layout="inline"
        >
          <Input
            id="billing-contact"
            name="billingContact"
            placeholder="Morgan Lee"
          />
        </FormField>

        <FormField
          label="Reference code"
          htmlFor="reference-code"
          description="Appears on each monthly invoice."
          helperAction={<span>Required by finance</span>}
          error="Reference codes must be 6 to 12 characters long."
          layout="inline"
        >
          <Input
            id="reference-code"
            name="referenceCode"
            placeholder="ACCT-01"
            aria-invalid
          />
        </FormField>

        <FormField
          label="Renewal note"
          htmlFor="renewal-note"
          description="Visible to internal account managers during contract reviews."
          layout="inline"
        >
          <Textarea
            id="renewal-note"
            name="renewalNote"
            rows={3}
            placeholder="Coordinate renewal prep 45 days before contract end."
          />
        </FormField>

        <FormActions align="between">
          <Button label="Archive draft" />
          <Button label="Save payment profile" primary />
        </FormActions>
      </Form>
    </StorySurface>
  );
}

export const SignInCapture: Story = {
  render: () => <SignInFormDemo />,
};

export const ProfileSettings: Story = {
  render: () => <ProfileSettingsDemo />,
};

export const InlineFieldLayout: Story = {
  render: () => <InlineFieldDemo />,
};
