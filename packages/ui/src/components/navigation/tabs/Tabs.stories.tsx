import type { Meta, StoryObj } from "@storybook/react-vite";

import { StorySurface } from "../../shared/storybook";
import { Tabs } from "./Tabs";

const panelCls =
  "ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-6 ui:text-ds-1";

const defaultTabs = [
  {
    id: "overview",
    label: "Overview",
    content: (
      <div className={panelCls}>
        <p className="ui:text-sm ui:font-medium ui:text-ds-1">Overview</p>
        <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
          Summary metrics and key performance indicators for the current period.
        </p>
      </div>
    ),
  },
  {
    id: "details",
    label: "Details",
    content: (
      <div className={panelCls}>
        <p className="ui:text-sm ui:font-medium ui:text-ds-1">Details</p>
        <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
          Granular breakdown of individual records and line-item transactions.
        </p>
      </div>
    ),
  },
  {
    id: "billing",
    label: "Billing",
    content: (
      <div className={panelCls}>
        <p className="ui:text-sm ui:font-medium ui:text-ds-1">Billing</p>
        <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
          Invoices, payment history, and upcoming charges for this account.
        </p>
      </div>
    ),
  },
  {
    id: "logs",
    label: "Activity",
    content: (
      <div className={panelCls}>
        <p className="ui:text-sm ui:font-medium ui:text-ds-1">Activity</p>
        <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
          Audit log of recent actions, logins, and system events.
        </p>
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
          "Direction-aware tabs with three panel animation styles: `slide` (default), `fade`, and `none`.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    animation: {
      control: "select",
      options: ["slide", "fade", "rise", "none"],
      description: "Panel transition style when switching tabs.",
    },
    animationDurationMs: {
      control: "number",
      description:
        "Override animation duration in ms. Defaults to 300 for slide, 360 for fade.",
    },
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
    animation: "slide",
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};

export const AnimationSlide: Story = {
  args: {
    items: defaultTabs,
    defaultValue: "overview",
    animation: "slide",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Default animation. Panel slides in from the direction of the selected tab with a simultaneous fade. Direction-aware — reverses in RTL.",
      },
    },
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};

export const AnimationFade: Story = {
  args: {
    items: defaultTabs,
    defaultValue: "overview",
    animation: "fade",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Opacity-only crossfade using `cubic-bezier(0.22, 1, 0.36, 1)` at 360 ms. No positional shift — works well when tab content varies significantly in height.",
      },
    },
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};

export const AnimationRise: Story = {
  args: {
    items: defaultTabs,
    defaultValue: "overview",
    animation: "rise",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Content rises from slightly below (`translateY(14px → 0)`) with a simultaneous fade. Slower easing (`cubic-bezier(0.16, 1, 0.3, 1)`, 420 ms) for a smooth, unhurried feel.",
      },
    },
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};

export const AnimationNone: Story = {
  args: {
    items: defaultTabs,
    defaultValue: "overview",
    animation: "none",
  },
  parameters: {
    docs: {
      description: {
        story:
          "No panel animation. Content switches instantly. Use when the consumer drives its own content-level animation (e.g. framer-motion `AnimatePresence`).",
      },
    },
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};

export const AllAnimationsSideBySide: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "All four animation styles side by side. Switch tabs in each row to compare.",
      },
    },
  },
  render: () => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <div className="ui:flex ui:flex-col ui:gap-8">
        {(
          [
            { animation: "slide", label: "slide — directional fade + shift" },
            { animation: "fade", label: "fade — opacity only" },
            { animation: "rise", label: "rise — floats up from below" },
            { animation: "none", label: "none — instant" },
          ] as const
        ).map(({ animation, label }) => (
          <div key={animation}>
            <p className="ui:mb-2 ui:text-xs ui:font-semibold ui:uppercase ui:tracking-wide ui:text-ds-3">
              {label}
            </p>
            <Tabs
              items={defaultTabs}
              defaultValue="overview"
              animation={animation}
            />
          </div>
        ))}
      </div>
    </StorySurface>
  ),
};

export const RTLArabic: Story = {
  args: {
    dir: "rtl",
    defaultValue: "a",
    animation: "slide",
    items: [
      {
        id: "a",
        label: "نظرة عامة",
        content: (
          <div className={panelCls}>
            <p className="ui:text-sm ui:font-medium ui:text-ds-1">نظرة عامة</p>
            <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
              محتوى نظرة عامة للحساب والمقاييس الرئيسية.
            </p>
          </div>
        ),
      },
      {
        id: "b",
        label: "الإعدادات",
        content: (
          <div className={panelCls}>
            <p className="ui:text-sm ui:font-medium ui:text-ds-1">الإعدادات</p>
            <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
              تفضيلات المستخدم وإعدادات النظام.
            </p>
          </div>
        ),
      },
      {
        id: "c",
        label: "التقارير",
        content: (
          <div className={panelCls}>
            <p className="ui:text-sm ui:font-medium ui:text-ds-1">التقارير</p>
            <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
              تقارير الأداء والتحليلات التفصيلية.
            </p>
          </div>
        ),
      },
      {
        id: "d",
        label: "السجل",
        content: (
          <div className={panelCls}>
            <p className="ui:text-sm ui:font-medium ui:text-ds-1">السجل</p>
            <p className="ui:mt-1 ui:text-sm ui:text-ds-2">
              سجل الأنشطة والأحداث الأخيرة.
            </p>
          </div>
        ),
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        story:
          "RTL mode with Arabic labels. The slide animation reverses direction automatically — tabs on the right slide in from the left.",
      },
    },
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};

export const WithDisabledTab: Story = {
  args: {
    items: [
      {
        id: "active",
        label: "Active",
        content: <div className={panelCls}>This tab is active and selectable.</div>,
      },
      {
        id: "disabled",
        label: "Disabled",
        disabled: true,
        content: <div className={panelCls}>This content is unreachable.</div>,
      },
      {
        id: "settings",
        label: "Settings",
        content: <div className={panelCls}>Settings panel content.</div>,
      },
    ],
    defaultValue: "active",
    animation: "slide",
  },
  render: (args) => (
    <StorySurface widthClassName="ui:w-full ui:max-w-2xl">
      <Tabs {...args} />
    </StorySurface>
  ),
};
