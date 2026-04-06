import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { StorySurface } from "../../shared/storybook";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Forms/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Boolean input for agreements, option sets, and permission toggles.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text", description: "Label text for the checkbox." },
    error: {
      control: "text",
      description: "Displays error below the checkbox.",
    },
    disabled: { control: "boolean", description: "Prevents interaction." },
    color: {
      control: "select",
      options: ["primary", "blue", "red", "green", "yellow", "teal"],
      description: "Color scheme of the checkbox when checked.",
    },
    checked: { control: false, description: "Controlled checked state." },
    onChange: { control: false, description: "Checked state change callback." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const checkboxDefaultSource = `import { useState } from 'react';
import { Checkbox } from 'erp-pro-ui';

export function TermsCheckboxExample() {
  const [checked, setChecked] = useState(false);

  return (
    <Checkbox
      label="Accept terms and conditions"
      checked={checked}
      onChange={(event) => setChecked(event.target.checked)}
    />
  );
}`;

const colorfulGroupSource = `import { Checkbox } from 'erp-pro-ui';

export function CheckboxColorsExample() {
  return (
    <div className="flex flex-col gap-4">
      <Checkbox label="Blue option" defaultChecked color="blue" />
      <Checkbox label="Green option" defaultChecked color="green" />
      <Checkbox label="Red option" defaultChecked color="red" />
    </div>
  );
}`;

const checklistSource = `import { useState } from 'react';
import { Checkbox } from 'erp-pro-ui';

export function FilterChecklistExample() {
  const [state, setState] = useState({
    inStock: true,
    criticalOnly: false,
    includeArchived: false,
  });

  return (
    <div className="space-y-3">
      <Checkbox
        label="In-stock items"
        checked={state.inStock}
        onChange={(event) =>
          setState((previous) => ({ ...previous, inStock: event.target.checked }))
        }
      />
      <Checkbox
        label="Critical alerts only"
        checked={state.criticalOnly}
        onChange={(event) =>
          setState((previous) => ({ ...previous, criticalOnly: event.target.checked }))
        }
      />
      <Checkbox
        label="Include archived"
        checked={state.includeArchived}
        onChange={(event) =>
          setState((previous) => ({ ...previous, includeArchived: event.target.checked }))
        }
      />
    </div>
  );
}`;

const checkboxErrorSource = `import { Checkbox } from 'erp-pro-ui';

export function RequiredCheckboxExample() {
  return (
    <Checkbox
      label="I agree to the privacy policy"
      error="You must agree before continuing."
    />
  );
}`;

/**
 * ## Default
 * Standard unchecked checkbox.
 */
export const Default: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <Checkbox
          label="Accept terms and conditions"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: checkboxDefaultSource,
      },
    },
  },
};

/**
 * ## Checked
 * Pre-checked state.
 */
export const Checked: Story = {
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
  args: {
    label: "Subscribe to newsletter",
    defaultChecked: true,
  },
};

/**
 * ## Error State
 * Useful when this field is required for form submission.
 */
export const WithError: Story = {
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
  args: {
    label: "I agree to the privacy policy",
    error: "You must agree before continuing.",
  },
  parameters: {
    docs: {
      source: {
        code: checkboxErrorSource,
      },
    },
  },
};

/**
 * ## Disabled
 * An uninteractable state, visually subdued.
 */
export const Disabled: Story = {
  decorators: [
    (StoryFn) => (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <StoryFn />
      </StorySurface>
    ),
  ],
  args: {
    label: "Legacy feature (unavailable)",
    disabled: true,
    defaultChecked: true,
  },
};

/**
 * ## Customized Colors
 * You can override the checkbox checked color using standard palettes.
 */
export const ColorfulGroup: Story = {
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:flex ui:flex-col ui:gap-4">
        <Checkbox label="Blue option" defaultChecked color="blue" />
        <Checkbox label="Green option" defaultChecked color="green" />
        <Checkbox label="Red option" defaultChecked color="red" />
      </div>
    </StorySurface>
  ),
  parameters: {
    docs: {
      source: {
        code: colorfulGroupSource,
      },
    },
  },
};

/**
 * ## Filter Checklist
 * A realistic checklist pattern used in side-panel filters.
 */
export const FilterChecklist: Story = {
  render: () => {
    const [state, setState] = useState({
      inStock: true,
      criticalOnly: false,
      includeArchived: false,
    });

    return (
      <StorySurface widthClassName="ui:w-full ui:max-w-md">
        <div className="ui:space-y-3">
          <Checkbox
            label="In-stock items"
            checked={state.inStock}
            onChange={(e) =>
              setState((prev) => ({ ...prev, inStock: e.target.checked }))
            }
          />
          <Checkbox
            label="Critical alerts only"
            checked={state.criticalOnly}
            onChange={(e) =>
              setState((prev) => ({ ...prev, criticalOnly: e.target.checked }))
            }
          />
          <Checkbox
            label="Include archived"
            checked={state.includeArchived}
            onChange={(e) =>
              setState((prev) => ({
                ...prev,
                includeArchived: e.target.checked,
              }))
            }
          />
        </div>
      </StorySurface>
    );
  },
  parameters: {
    docs: {
      source: {
        code: checklistSource,
      },
    },
  },
};
