import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { DatePicker } from "./DatePicker";
import type { DatePickerValue } from "./types";

const meta: Meta<typeof DatePicker> = {
  title: "Forms/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Single-date and range picker with optional presets for reporting windows, booking periods, and finance workflows.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    mode: { control: "radio", options: ["single", "range"] },
    label: { control: "text" },
    placeholder: { control: "text" },
    helperText: { control: "text" },
    disabled: { control: "boolean" },
    value: { control: false, description: "Controlled single date or range." },
    onChange: {
      control: false,
      description: "Called when the selected value changes.",
    },
    presets: {
      control: false,
      description: "Quick-select presets shown below the calendar.",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function SingleDateExample() {
  const [date, setDate] = useState<DatePickerValue>(new Date());

  return (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-sm"
      className="ui:min-h-96"
    >
      <DatePicker
        value={date}
        onChange={setDate}
        label="Pick a date"
        placeholder="Select date"
      />
    </StorySurface>
  );
}

function RangeExample() {
  const [range, setRange] = useState<DatePickerValue>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 7)),
  });

  return (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-sm"
      className="ui:min-h-96"
    >
      <DatePicker
        mode="range"
        value={range}
        onChange={setRange}
        label="Travel Dates"
        placeholder="Select range"
      />
    </StorySurface>
  );
}

function PresetShortcutsExample() {
  const [date, setDate] = useState<DatePickerValue>(new Date());

  return (
    <StorySurface
      widthClassName="ui:w-full ui:max-w-sm"
      className="ui:min-h-[28rem]"
    >
      <DatePicker
        value={date}
        onChange={setDate}
        label="Report Period"
        presets={[
          {
            label: "Start of Year",
            value: () => new Date(new Date().getFullYear(), 0, 1),
          },
          {
            label: "End of Year",
            value: () => new Date(new Date().getFullYear(), 11, 31),
          },
          {
            label: "Next Month",
            value: () => {
              const dateValue = new Date();
              return new Date(
                dateValue.getFullYear(),
                dateValue.getMonth() + 1,
                1,
              );
            },
          },
        ]}
      />
    </StorySurface>
  );
}

/**
 * ## Basic Usage
 * Standard single-date selection.
 */
export const BasicUsage: Story = {
  render: () => <SingleDateExample />,
};

/**
 * ## Date Range Picker
 * Start/end selection for booking and reporting flows.
 */
export const DateRangePicker: Story = {
  render: () => <RangeExample />,
};

/**
 * ## Preset Shortcuts
 * Quick-select options for recurring reporting windows.
 */
export const PresetShortcuts: Story = {
  render: () => <PresetShortcutsExample />,
};

/**
 * ## Helper And Disabled States
 * Reference layout for contextual guidance and locked dates.
 */
export const HelperAndDisabledStates: Story = {
  render: () => {
    const [date, setDate] = useState<DatePickerValue>(new Date());

    return (
      <StorySurface
        widthClassName="ui:w-full ui:max-w-4xl"
        className="ui:min-h-96"
      >
        <div className="ui:grid ui:gap-4 md:ui:grid-cols-2">
          <DatePicker
            value={date}
            onChange={setDate}
            label="Invoice Date"
            helperText="Invoice dates cannot be earlier than the purchase order date."
          />
          <DatePicker
            value={date}
            onChange={setDate}
            label="Locked Settlement Date"
            disabled
            helperText="Settlement windows are assigned by the finance team."
          />
        </div>
      </StorySurface>
    );
  },
};
