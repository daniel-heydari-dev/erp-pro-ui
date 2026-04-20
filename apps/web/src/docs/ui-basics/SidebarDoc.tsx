import {
  Button,
  HomeIcon,
  PackageIcon,
  SettingsIcon,
  Sidebar,
  UserIcon,
  type SidebarItem,
} from "erp-pro-ui";

import CodeBlock from "@/docs/components/CodeBlock";
import DocsButtonBar from "@/docs/components/DocsButtonBar";

const sidebarItems: SidebarItem[] = [
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
    badge: "12",
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

const SidebarDoc = () => {
  return (
    <section className="docs-section">
      <h1 className="docs-category-title">Sidebar</h1>
      <p className="docs-paragraph">
        Sidebar is a dashboard-oriented navigation rail with active-state
        highlighting, optional mobile overlay behavior, and RTL support.
      </p>

      <h2 className="docs-category-subtitle">Dashboard Sidebar</h2>
      <div className="docs-showcase-card relative h-[640px] max-w-6xl overflow-hidden">
        <Sidebar
          items={sidebarItems}
          open
          showOverlay={false}
          footer={
            <Button variant="secondary" className="w-full">
              Upgrade Plan
            </Button>
          }
        />
        <div className="ml-[300px] flex h-full flex-col gap-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <h3 className="text-lg font-semibold">Dashboard Content</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Place your main route content in this area while the sidebar stays
            pinned for quick navigation.
          </p>
        </div>
      </div>

      <CodeBlock
        code={`import {
  Sidebar,
  type SidebarItem,
  HomeIcon,
  PackageIcon,
  UserIcon,
  SettingsIcon,
} from 'erp-pro-ui';

const items: SidebarItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: <HomeIcon />, href: '/dashboard', active: true },
  { id: 'inventory', label: 'Inventory', icon: <PackageIcon />, href: '/inventory', badge: '12' },
  { id: 'profile', label: 'Profile', icon: <UserIcon />, href: '/profile' },
  { id: 'settings', label: 'Settings', icon: <SettingsIcon />, href: '/settings' },
];

<Sidebar items={items} open showOverlay={false} />`}
      />

      <h2 className="docs-category-subtitle">Core Props</h2>
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
              <td className="docs-prop-name">items</td>
              <td>
                <span className="docs-prop-type">SidebarItem[]</span>
              </td>
              <td>-</td>
              <td>Navigation entries rendered by the sidebar.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">open / defaultOpen</td>
              <td>
                <span className="docs-prop-type">boolean</span>
              </td>
              <td>false</td>
              <td>Use controlled or uncontrolled open state for mobile mode.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">onOpenChange</td>
              <td>
                <span className="docs-prop-type">(open: boolean) =&gt; void</span>
              </td>
              <td>-</td>
              <td>Called whenever sidebar visibility changes.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">direction</td>
              <td>
                <span className="docs-prop-type">'auto' | 'ltr' | 'rtl'</span>
              </td>
              <td>'auto'</td>
              <td>Controls edge placement and active indicator direction.</td>
            </tr>
            <tr>
              <td className="docs-prop-name">brand / footer</td>
              <td>
                <span className="docs-prop-type">ReactNode</span>
              </td>
              <td>-</td>
              <td>Custom top branding slot and bottom action area.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <DocsButtonBar
        prev={{ label: "Carousel", route: "/ui-basics/carousel" }}
        next={{ label: "OTPInput", route: "/ui-basics/otpinput" }}
      />
    </section>
  );
};

export default SidebarDoc;
