import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { Tabs } from "./Tabs";

const defaultTabs = [
  {
    id: "overview",
    label: "Tabs Text",
    content: (
      <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
        Overview panel content
      </div>
    ),
  },
  {
    id: "details",
    label: "Tabs Text",
    content: (
      <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
        Details panel content
      </div>
    ),
  },
  {
    id: "billing",
    label: "Tabs Text",
    content: (
      <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
        Billing panel content
      </div>
    ),
  },
  {
    id: "logs",
    label: "Tabs Text",
    content: (
      <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
        Activity logs panel content
      </div>
    ),
  },
] as const;

const meta: Meta<typeof Tabs> = {
  title: "Navigation/Tabs",
  component: Tabs,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Reusable, direction-aware tabs with smooth panel transitions and optional RTL mode.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    animationDurationMs: { control: "number" },
    dir: {
      control: "select",
      options: ["auto", "ltr", "rtl"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: defaultTabs,
    defaultValue: "overview",
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};

export const RTLArabic: Story = {
  args: {
    dir: "rtl",
    defaultValue: "overview",
    items: [
      {
        id: "a",
        label: "نظرة عامة",
        content: (
          <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
            محتوى نظرة عامة
          </div>
        ),
      },
      {
        id: "b",
        label: "الإعدادات",
        content: (
          <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
            محتوى الإعدادات
          </div>
        ),
      },
      {
        id: "c",
        label: "التقارير",
        content: (
          <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
            محتوى التقارير
          </div>
        ),
      },
      {
        id: "d",
        label: "السجل",
        content: (
          <div className="ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-4 ui:text-ds-1">
            محتوى السجل
          </div>
        ),
      },
    ],
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-4xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};
