import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";

import { Button } from "../button";
import { StorySurface } from "../../shared/storybook";
import { Calendar } from "./Calendar";

const meta: Meta<typeof Calendar> = {
  title: "Forms/Calendar",
  component: Calendar,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Date grid for single-day or range selection, with optional controlled month navigation and footer actions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    selectionMode: { control: "radio", options: ["single", "range"] },
    className: { control: "text" },
    value: { control: false, description: "Selected date in single mode." },
    onSelect: {
      control: false,
      description: "Single-date selection callback.",
    },
    range: { control: false, description: "Selected range in range mode." },
    onRangeSelect: { control: false, description: "Range selection callback." },
    month: { control: false, description: "Controlled month index (0-11)." },
    year: { control: false, description: "Controlled full year." },
    onMonthChange: {
      control: false,
      description: "Called when month navigation changes.",
    },
    footer: { control: false, description: "Optional footer action content." },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function SingleSelectionExample() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-4">
        <Calendar selectionMode="single" value={date} onSelect={setDate} />
        <p className="ui:text-sm ui:text-muted-foreground">
          Selected: {date ? date.toLocaleDateString() : "None"}
        </p>
      </div>
    </StorySurface>
  );
}

function RangeSelectionExample() {
  const [range, setRange] = useState<{ start: Date | null; end: Date | null }>({
    start: new Date(),
    end: new Date(new Date().setDate(new Date().getDate() + 4)),
  });

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <div className="ui:flex ui:flex-col ui:items-center ui:gap-4">
        <Calendar
          selectionMode="range"
          range={range}
          onRangeSelect={setRange}
        />
        <p className="ui:text-sm ui:text-muted-foreground">
          Range: {range.start?.toLocaleDateString() ?? "None"} -{" "}
          {range.end?.toLocaleDateString() ?? "None"}
        </p>
      </div>
    </StorySurface>
  );
}

function FooterActionsExample() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <StorySurface widthClassName="ui:w-full ui:max-w-md">
      <Calendar
        value={date}
        onSelect={setDate}
        footer={
          <div className="ui:flex ui:justify-between ui:border-t ui:border-border ui:pt-3">
            <Button
              label="Today"
              size="small"
              onClick={() => setDate(new Date())}
              className="ui:h-auto ui:border-none ui:bg-transparent ui:px-0 ui:py-0 ui:text-xs ui:font-semibold ui:text-accent ui:shadow-none"
            />
            <Button
              label="Clear"
              size="small"
              onClick={() => setDate(null)}
              className="ui:h-auto ui:border-none ui:bg-transparent ui:px-0 ui:py-0 ui:text-xs ui:font-semibold ui:text-muted-foreground ui:shadow-none"
            />
          </div>
        }
      />
    </StorySurface>
  );
}

/**
 * ## Single Selection
 * Basic day selection for date-of-record fields.
 */
export const SingleSelection: Story = {
  render: () => <SingleSelectionExample />,
};

/**
 * ## Range Selection
 * Useful for reports, scheduling windows, and historical filters.
 */
export const RangeSelection: Story = {
  render: () => <RangeSelectionExample />,
};

/**
 * ## Footer Actions
 * Adds quick actions for today/clear interactions.
 */
export const FooterActions: Story = {
  render: () => <FooterActionsExample />,
};
