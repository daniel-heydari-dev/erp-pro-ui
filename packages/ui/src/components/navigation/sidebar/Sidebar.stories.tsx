import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  BellIcon,
  FullScreenIcon,
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  UserIcon,
} from "../../icons";
import { Button } from "../../forms/button";
import { StorySurface } from "../../shared/storybook";
import { DashboardSidebarShell } from "./DashboardSidebarShell";
import { HamburgerIcon } from "./HamburgerIcon";
import { Sidebar } from "./Sidebar";
import type { SidebarItem } from "./types";

const baseItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: <HomeIcon className="h-4 w-4" />,
    href: "/dashboard",
    active: true,
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: <PackageIcon className="h-4 w-4" />,
    href: "/inventory",
  },
  {
    id: "profile",
    label: "Profile",
    icon: <UserIcon className="h-4 w-4" />,
    href: "/profile",
  },
  {
    id: "settings",
    label: "Settings",
    icon: <SettingsIcon className="h-4 w-4" />,
    href: "/settings",
  },
];

const rtlItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "داشبورد",
    icon: <HomeIcon className="h-4 w-4" />,
    href: "/dashboard",
    active: true,
  },
  {
    id: "inventory",
    label: "انبار",
    icon: <PackageIcon className="h-4 w-4" />,
    href: "/inventory",
  },
  {
    id: "profile",
    label: "پروفایل",
    icon: <UserIcon className="h-4 w-4" />,
    href: "/profile",
  },
  {
    id: "settings",
    label: "تنظیمات",
    icon: <SettingsIcon className="h-4 w-4" />,
    href: "/settings",
  },
];

const meta: Meta<typeof Sidebar> = {
  title: "Navigation/Sidebar",
  component: Sidebar,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Dashboard-ready navigation sidebar with active state, RTL support, and mobile overlay behavior.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    direction: {
      control: "select",
      options: ["auto", "ltr", "rtl"],
    },
    showOverlay: { control: "boolean" },
    closeLabel: { control: "text" },
    navbar: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const DesktopOpen: Story = {
  args: {
    items: baseItems,
    open: true,
    showOverlay: false,
  },
  render: (args) => (
    <StorySurface
      className="ui:relative ui:h-[620px] ui:max-w-6xl ui:overflow-hidden"
      widthClassName="ui:w-full ui:max-w-6xl"
    >
      <Sidebar {...args} />
      <div className="ui:ml-[300px] ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
        Dashboard content area
      </div>
    </StorySurface>
  ),
};

export const ExactDashboardBehavior: Story = {
  render: () => (
    <StorySurface
      className="ui:relative ui:h-[720px] ui:max-w-6xl ui:overflow-hidden"
      widthClassName="ui:w-full ui:max-w-6xl"
    >
      <DashboardSidebarShell
        items={baseItems}
        defaultOpen={false}
        breadcrumb="Pages / Dashboard"
        title="Dashboard"
        brand={
          <div className="ui:text-xl ui:font-bold ui:tracking-wide ui:text-ds-1">
            <span className="ui:text-ds-accent">ERP</span>
            <span className="ui:font-medium">PRO</span>
          </div>
        }
        sidebarFooter={
          <Button variant="secondary" className="ui:w-full">
            Upgrade Plan
          </Button>
        }
        sidebarClassName="ui:border-ds-border-2/60"
        sidebarActiveItemClassName="ui:bg-ds-accent-subtle ui:border-ds-border-accent/25"
        headerLeading={
          <span className="ui:hidden ui:h-9 ui:w-9 ui:items-center ui:justify-center ui:rounded-md ui:bg-ds-accent-subtle ui:text-xs ui:font-black ui:text-ds-1 sm:ui:inline-flex">
            ERP
          </span>
        }
        headerActions={({ isSidebarOpen, toggleSidebar, isRtl }) => (
          <>
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0! xl:ui:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <HamburgerIcon isOpen={isSidebarOpen} />
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="ui:relative ui:h-9 ui:w-9 ui:rounded-full ui:p-0!"
              aria-label="Open notifications"
            >
              <BellIcon className="ui:h-5 ui:w-5" />
              <span
                className={`ui:absolute ui:-top-0.5 ui:flex ui:h-5 ui:min-w-5 ui:items-center ui:justify-center ui:rounded-full ui:bg-ds-state-danger ui:px-1 ui:text-[0.68rem] ui:font-bold ui:text-ds-on-accent ${isRtl ? "ui:-left-0.5" : "ui:-right-0.5"}`}
              >
                3
              </span>
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0!"
              aria-label="Toggle fullscreen"
            >
              <FullScreenIcon className="ui:h-5 ui:w-5" />
            </Button>
            <Button
              type="button"
              variant="primary"
              size="small"
              className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0! ui:text-sm ui:font-black"
              aria-label="Open user menu"
            >
              JD
            </Button>
          </>
        )}
      >
        <div className="ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
          Exact dashboard layout with customizable header and sidebar.
        </div>
      </DashboardSidebarShell>
    </StorySurface>
  ),
};

export const ExactDashboardBehaviorRtl: Story = {
  render: () => (
    <StorySurface
      className="ui:relative ui:h-[720px] ui:max-w-6xl ui:overflow-hidden"
      widthClassName="ui:w-full ui:max-w-6xl"
    >
      <DashboardSidebarShell
        items={rtlItems}
        defaultOpen={false}
        direction="rtl"
        breadcrumb="صفحات / داشبورد"
        title="داشبورد"
        brand={
          <div className="ui:text-xl ui:font-bold ui:tracking-wide ui:text-ds-1">
            <span className="ui:text-ds-accent">ERP</span>
            <span className="ui:font-medium">PRO</span>
          </div>
        }
        sidebarFooter={
          <Button variant="secondary" className="ui:w-full">
            ارتقای پلن
          </Button>
        }
        sidebarClassName="ui:border-ds-border-2/60"
        sidebarActiveItemClassName="ui:bg-ds-accent-subtle ui:border-ds-border-accent/25"
        headerLeading={
          <span className="ui:hidden ui:h-9 ui:w-9 ui:items-center ui:justify-center ui:rounded-md ui:bg-ds-accent-subtle ui:text-xs ui:font-black ui:text-ds-1 sm:ui:inline-flex">
            ERP
          </span>
        }
        headerActions={({ isSidebarOpen, toggleSidebar, isRtl }) => (
          <>
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0! xl:ui:hidden"
              onClick={toggleSidebar}
              aria-label="Toggle sidebar"
            >
              <HamburgerIcon isOpen={isSidebarOpen} />
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="ui:relative ui:h-9 ui:w-9 ui:rounded-full ui:p-0!"
              aria-label="Open notifications"
            >
              <BellIcon className="ui:h-5 ui:w-5" />
              <span
                className={`ui:absolute ui:-top-0.5 ui:flex ui:h-5 ui:min-w-5 ui:items-center ui:justify-center ui:rounded-full ui:bg-ds-state-danger ui:px-1 ui:text-[0.68rem] ui:font-bold ui:text-ds-on-accent ${isRtl ? "ui:-left-0.5" : "ui:-right-0.5"}`}
              >
                3
              </span>
            </Button>
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0!"
              aria-label="Toggle fullscreen"
            >
              <FullScreenIcon className="ui:h-5 ui:w-5" />
            </Button>
            <Button
              type="button"
              variant="primary"
              size="small"
              className="ui:h-9 ui:w-9 ui:rounded-full ui:p-0! ui:text-sm ui:font-black"
              aria-label="Open user menu"
            >
              JD
            </Button>
          </>
        )}
      >
        <div className="ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
          رفتار دقیق داشبورد با هدر و سایدبار قابل تنظیم
        </div>
      </DashboardSidebarShell>
    </StorySurface>
  ),
};
