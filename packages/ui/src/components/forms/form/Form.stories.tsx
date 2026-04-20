import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState, type FormEvent } from "react";

import { Form, FormSection, FormField, FormActions, InputGroup } from "./Form";
import { Button } from "../button";
import { Checkbox } from "../checkbox";
import { DatePicker, type DatePickerValue } from "../date-picker";
import { Input } from "../input";
import { Radio } from "../radio";
import { Select } from "../select";
import { Switch } from "../switch";
import { Textarea } from "../textarea";
import { StoryPanel, StorySurface } from "../../shared/storybook";

const meta: Meta<typeof Form> = {
  title: "Layout/Form",
  component: Form,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Form provides a styled wrapper for native submit handling and richer layout primitives such as sections, grouped fields, inline labels, and shared action rows.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    gap: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const signInSubmissionSource = `import { useState, type FormEvent } from 'react';
import { Button, Form, Input } from 'erp-pro-ui';

export function SignInSubmission() {
  const [submitted, setSubmitted] = useState<Record<string, string> | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload = Object.fromEntries(
      new FormData(event.currentTarget).entries(),
    ) as Record<string, string>;
    setSubmitted(payload);
  };

  return (
    <Form
      title="Sign in"
      description="Use your workspace credentials to continue."
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input label="Email address" name="email" type="email" required />
      <Input label="Password" name="password" type="password" required />
      <Button label="Sign In" primary type="submit" />
    </Form>
  );
}`;

const profileSettingsSource = `import {
  Button,
  Checkbox,
  Form,
  FormActions,
  FormField,
  FormSection,
  Input,
  InputGroup,
  Textarea,
} from 'erp-pro-ui';

export function ProfileSettingsForm() {
  return (
    <Form
      title="Profile settings"
      description="Update account identity, notifications, and workspace defaults."
    >
      <FormSection
        title="Identity"
        description="These details appear across customer-facing records and internal reviews."
      >
        <InputGroup columns={2}>
          <FormField label="First name" required htmlFor="profile-first-name">
            <Input id="profile-first-name" name="firstName" placeholder="Avery" />
          </FormField>
          <FormField label="Last name" required htmlFor="profile-last-name">
            <Input id="profile-last-name" name="lastName" placeholder="Johnson" />
          </FormField>
        </InputGroup>
      </FormSection>

      <FormSection
        title="Preferences"
        description="Fine-tune communication defaults and operational context."
      >
        <FormField label="Internal bio" htmlFor="profile-bio">
          <Textarea id="profile-bio" name="bio" rows={4} />
        </FormField>
        <InputGroup columns={2}>
          <FormField label="Weekly summary">
            <Checkbox id="profile-summary" label="Email a Friday performance digest" />
          </FormField>
          <FormField label="Critical alerts">
            <Checkbox id="profile-alerts" label="Notify me when SLAs are at risk" />
          </FormField>
        </InputGroup>
      </FormSection>

      <FormActions align="end">
        <Button label="Cancel" />
        <Button label="Save profile" primary />
      </FormActions>
    </Form>
  );
}`;

const inlineBillingSource = `import {
  Button,
  Form,
  FormActions,
  FormField,
  Input,
  Textarea,
} from 'erp-pro-ui';

export function InlineBillingFields() {
  return (
    <Form
      title="Payment details"
      description="Inline field layouts help with dense administrative workflows."
      gap="md"
    >
      <FormField
        label="Billing contact"
        htmlFor="billing-contact"
        description="The main point of contact for invoices and disputes."
        layout="inline"
      >
        <Input id="billing-contact" name="billingContact" placeholder="Morgan Lee" />
      </FormField>

      <FormField
        label="Renewal note"
        htmlFor="renewal-note"
        description="Visible to internal account managers during contract reviews."
        layout="inline"
      >
        <Textarea id="renewal-note" name="renewalNote" rows={3} />
      </FormField>

      <FormActions align="between">
        <Button label="Archive draft" />
        <Button label="Save payment profile" primary />
      </FormActions>
    </Form>
  );
}`;

function SignInSubmissionPreview() {
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

        <StoryPanel className="ui:rounded-2xl ui:bg-ds-surface-3/40 ui:p-4 ui:shadow-none">
          <p className="ui:text-sm ui:font-semibold ui:text-ds-1">
            Captured submit payload
          </p>
          <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
            The form uses native submission semantics, so extracting values with
            `FormData` remains straightforward.
          </p>
          <pre className="ui:mt-4 ui:min-h-56 ui:overflow-auto ui:rounded-xl ui:bg-ds-canvas ui:p-4 ui:text-xs ui:text-ds-2">
            {JSON.stringify(
              submitted ?? {
                status: "Submit the form to inspect the payload.",
              },
              null,
              2,
            )}
          </pre>
        </StoryPanel>
      </div>
    </StorySurface>
  );
}

function ProfileSettingsPreview() {
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

function InlineBillingPreview() {
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

function RtlFormsMatrixPreview() {
  const [language, setLanguage] = useState("fa");
  const [notifyBySms, setNotifyBySms] = useState(true);
  const [contactMethod, setContactMethod] = useState("email");
  const [reportDate, setReportDate] = useState<DatePickerValue>(new Date());

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-5xl">
      <div dir="rtl" className="ui:w-full">
        <Form
          title="بررسی فرم‌ها در حالت راست‌به‌چپ"
          description="این نمونه برای بررسی سریع RTL در ورودی‌ها، انتخاب‌ها و کنترل‌های فرم است."
        >
          <FormSection
            title="اطلاعات پایه"
            description="تراز متن، فاصله‌گذاری و جایگاه آیکن‌ها باید در RTL درست باشند."
          >
            <InputGroup columns={2}>
              <FormField label="نام" htmlFor="rtl-first-name" required>
                <Input id="rtl-first-name" placeholder="علی" />
              </FormField>
              <FormField label="نام خانوادگی" htmlFor="rtl-last-name" required>
                <Input id="rtl-last-name" placeholder="رضایی" />
              </FormField>
            </InputGroup>

            <FormField label="توضیحات" htmlFor="rtl-bio">
              <Textarea
                id="rtl-bio"
                rows={3}
                placeholder="توضیحات کوتاه درباره کاربر"
              />
            </FormField>
          </FormSection>

          <FormSection
            title="انتخاب‌ها و وضعیت"
            description="کنترل‌های انتخابی، سوییچ و تاریخ در RTL."
          >
            <InputGroup columns={2}>
              <FormField label="زبان رابط">
                <Select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  options={[
                    { value: "fa", label: "فارسی" },
                    { value: "ar", label: "العربية" },
                    { value: "en", label: "English" },
                  ]}
                />
              </FormField>

              <FormField label="تاریخ گزارش">
                <DatePicker
                  mode="single"
                  value={reportDate}
                  onChange={(nextValue) => setReportDate(nextValue)}
                  placeholder="انتخاب تاریخ"
                />
              </FormField>
            </InputGroup>

            <InputGroup columns={2}>
              <FormField label="روش ارتباط">
                <div className="ui:flex ui:flex-col ui:gap-2">
                  <Radio
                    name="rtl-contact-method"
                    label="ایمیل"
                    checked={contactMethod === "email"}
                    onChange={() => setContactMethod("email")}
                  />
                  <Radio
                    name="rtl-contact-method"
                    label="تماس"
                    checked={contactMethod === "phone"}
                    onChange={() => setContactMethod("phone")}
                  />
                </div>
              </FormField>

              <FormField label="اعلان‌ها">
                <div className="ui:flex ui:flex-col ui:gap-3 ui:pt-1">
                  <Checkbox id="rtl-newsletter" label="خبرنامه هفتگی" />
                  <Switch
                    label="ارسال پیامک"
                    checked={notifyBySms}
                    onChange={(event) => setNotifyBySms(event.target.checked)}
                  />
                </div>
              </FormField>
            </InputGroup>
          </FormSection>

          <FormActions align="end">
            <Button label="انصراف" />
            <Button label="ذخیره تغییرات" primary />
          </FormActions>
        </Form>
      </div>
    </StorySurface>
  );
}

export const SignInCapture: Story = {
  name: "Sign-In Submission",
  render: () => <SignInSubmissionPreview />,
  parameters: {
    docs: {
      source: {
        code: signInSubmissionSource,
      },
    },
  },
};

export const ProfileSettings: Story = {
  name: "Profile Settings Form",
  render: () => <ProfileSettingsPreview />,
  parameters: {
    docs: {
      source: {
        code: profileSettingsSource,
      },
    },
  },
};

export const InlineFieldLayout: Story = {
  name: "Inline Billing Fields",
  render: () => <InlineBillingPreview />,
  parameters: {
    docs: {
      source: {
        code: inlineBillingSource,
      },
    },
  },
};

export const RtlFormsMatrix: Story = {
  name: "RTL Forms Matrix",
  render: () => <RtlFormsMatrixPreview />,
};
