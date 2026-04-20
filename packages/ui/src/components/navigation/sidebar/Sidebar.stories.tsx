import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent } from "storybook/test";

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
import { Typography } from "../../typography";
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
    <StorySurface className="ui:relative ui:h-[620px] ui:max-w-6xl ui:overflow-hidden" widthClassName="ui:w-full ui:max-w-6xl">
      <Sidebar {...args} />
      <div className="ui:ml-[300px] ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
        Dashboard content area
      </div>
    </StorySurface>
  ),
};

export const MobileOverlay: Story = {
  args: {
    items: baseItems,
    defaultOpen: true,
    showOverlay: true,
  },
  render: (args) => (
    <StorySurface className="ui:relative ui:h-[620px] ui:max-w-2xl ui:overflow-hidden" widthClassName="ui:w-full ui:max-w-2xl">
      <Sidebar {...args} />
      <div className="ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
        Content below overlay
      </div>
    </StorySurface>
  ),
};

export const ControlledWithCallback: Story = {
  args: {
    items: baseItems,
    open: true,
    onOpenChange: fn(),
  },
  render: (args) => (
    <StorySurface className="ui:relative ui:h-[620px] ui:max-w-2xl ui:overflow-hidden" widthClassName="ui:w-full ui:max-w-2xl">
      <Sidebar {...args} />
    </StorySurface>
  ),
  play: async ({ canvas, args }) => {
    const closeButton = await canvas.findByLabelText("Toggle sidebar");
    await userEvent.click(closeButton);
    await expect(args.onOpenChange).toHaveBeenCalledWith(false);
  },
};

export const RTL: Story = {
  args: {
    items: baseItems,
    open: true,
    direction: "rtl",
    showOverlay: false,
  },
  render: (args) => (
    <StorySurface className="ui:relative ui:h-[620px] ui:max-w-6xl ui:overflow-hidden" widthClassName="ui:w-full ui:max-w-6xl">
      <Sidebar {...args} />
      <div className="ui:mr-[300px] ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
        RTL dashboard content
      </div>
    </StorySurface>
  ),
};

export const DashboardShellPattern: Story = {
  render: () => (
    <StorySurface className="ui:relative ui:h-[620px] ui:max-w-6xl ui:overflow-hidden" widthClassName="ui:w-full ui:max-w-6xl">
      <Sidebar
        items={baseItems}
        defaultOpen
        brand={
          <div className="ui:text-xl ui:font-bold ui:uppercase ui:tracking-wide ui:text-ds-1">
            <span className="ui:text-ds-accent">ERP</span>
            <span className="ui:font-medium">PRO</span>
          </div>
        }
        footer={
          <Button variant="secondary" className="w-full">
            Upgrade Plan
          </Button>
        }
      />
      <div className="ui:ml-[300px] ui:flex ui:h-full ui:flex-col ui:gap-3 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:p-6 ui:text-ds-2">
        <p className="ui:font-semibold ui:text-ds-1">Main Dashboard</p>
        <p>Use this layout pattern with your app shell and route content.</p>
      </div>
    </StorySurface>
  ),
};

export const CustomNavbarInsideSidebar: Story = {
  args: {
    items: baseItems,
    open: true,
    showOverlay: false,
  },
  render: (args) => (
    <StorySurface className="ui:relative ui:h-[620px] ui:max-w-6xl ui:overflow-hidden" widthClassName="ui:w-full ui:max-w-6xl">
      <Sidebar
        {...args}
        navbar={
          <div className="ui:flex ui:items-center ui:justify-between ui:gap-2 ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-2 ui:px-3 ui:py-2">
            <div className="ui:min-w-0">
              <Typography variant="caption" className="ui:text-ds-3">
                Pages / Dashboard
              </Typography>
              <Typography variant="body2" weight="black" className="ui:truncate">
                Dashboard
              </Typography>
            </div>
            <Button variant="tertiary" size="small" className="ui:p-1!">
              <HamburgerIcon isOpen />
            </Button>
          </div>
        }
      />
      <div className="ui:ml-[300px] ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
        Custom navbar injected into sidebar
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
      >
        <div className="ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
          Header is on top page and connected to sidebar toggle
        </div>
      </DashboardSidebarShell>
    </StorySurface>
  ),
};

export const CustomHeaderWithNotifications: Story = {
  render: () => (
    <StorySurface
      className="ui:relative ui:h-[720px] ui:max-w-6xl ui:overflow-hidden"
      widthClassName="ui:w-full ui:max-w-6xl"
    >
      <DashboardSidebarShell
        items={baseItems}
        defaultOpen={false}
        header={({ isSidebarOpen, toggleSidebar }) => (
          <nav className="ui:surface-background-secondary-glass ui:sticky ui:top-2 ui:z-40 ui:mb-4 ui:flex ui:items-center ui:justify-between ui:gap-4 ui:rounded-md ui:border ui:border-ds-border-2 ui:px-3 ui:py-2">
            <div className="ui:min-w-0">
              <Typography variant="caption" className="ui:text-ds-3 ui:capitalize">
                Pages / Dashboard
              </Typography>
              <Typography
                variant="h5"
                weight="black"
                className="ui:truncate ui:leading-7 ui:capitalize"
              >
                Dashboard
              </Typography>
            </div>

            <div className="ui:bg-ds-surface-2 ui:border-ds-border-2 ui:relative ui:flex ui:min-h-11 ui:items-center ui:gap-1 ui:rounded-full ui:border ui:px-2 ui:py-1">
              <Button
                type="button"
                variant="tertiary"
                size="small"
                className="ui:p-1! xl:ui:hidden"
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
                <span className="ui:bg-ds-state-danger ui:text-ds-on-accent ui:absolute ui:-right-0.5 ui:-top-0.5 ui:flex ui:h-5 ui:min-w-5 ui:items-center ui:justify-center ui:rounded-full ui:px-1 ui:text-[0.68rem] ui:font-bold">
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
            </div>
          </nav>
        )}
      >
        <div className="ui:flex ui:h-full ui:items-center ui:justify-center ui:rounded-xl ui:border ui:border-ds-border-2 ui:bg-ds-surface-1 ui:text-ds-2">
          Custom navbar content is passed from outside
        </div>
      </DashboardSidebarShell>
    </StorySurface>
  ),
};
