import { useCallback, useEffect, useMemo, useState } from "react";

import { BellIcon, CircleIcon, FullScreenIcon } from "../../icons";
import { Button } from "../../forms/button";
import { DropdownMenu } from "../../overlays/dropdown-menu";
import { Typography } from "../../typography";
import { mergeClassNames } from "../../../utils";
import { HamburgerIcon } from "./HamburgerIcon";
import { Sidebar } from "./Sidebar";
import type { SidebarItem, SidebarProps } from "./types";
import { SunToMoonButton } from "../../effects";

export interface DashboardHeaderRenderContext {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}

const notificationItems = [
  {
    id: "stock",
    title: "Low stock alert",
    description: "Wireless Mouse is below reorder point.",
    time: "4m",
    toneClassName:
      "bg-ds-state-warning-surface text-ds-state-warning-text border-ds-state-warning-border",
  },
  {
    id: "invoice",
    title: "Invoice paid",
    description: "INV-2048 was settled successfully.",
    time: "18m",
    toneClassName:
      "bg-ds-state-success-surface text-ds-state-success-text border-ds-state-success-border",
  },
  {
    id: "sync",
    title: "Catalog sync complete",
    description: "128 product records refreshed.",
    time: "42m",
    toneClassName:
      "bg-ds-state-info-surface text-ds-state-info-text border-ds-state-info-border",
  },
] as const;

interface DashboardSidebarShellProps {
  items: readonly SidebarItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: SidebarProps["direction"];
  activePath?: string;
  onItemSelect?: SidebarProps["onItemSelect"];
  brand?: SidebarProps["brand"];
  sidebarFooter?: SidebarProps["footer"];
  header?:
    | React.ReactNode
    | ((context: DashboardHeaderRenderContext) => React.ReactNode);
  breadcrumb?: React.ReactNode;
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  contentClassName?: string;
  mainClassName?: string;
  autoHideOnMobileBreakpoint?: boolean;
}

function useControllableOpenState(
  open: boolean | undefined,
  defaultOpen: boolean,
  onOpenChange?: (open: boolean) => void,
) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const setOpen = useCallback(
    (nextOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(nextOpen);
      }
      onOpenChange?.(nextOpen);
    },
    [isControlled, onOpenChange],
  );

  return [resolvedOpen, setOpen] as const;
}

export function DashboardSidebarShell({
  items,
  open,
  defaultOpen = false,
  onOpenChange,
  direction = "auto",
  activePath,
  onItemSelect,
  brand,
  sidebarFooter,
  header,
  breadcrumb = "Pages / Dashboard",
  title = "Dashboard",
  children,
  className,
  contentClassName,
  mainClassName,
  autoHideOnMobileBreakpoint = true,
}: DashboardSidebarShellProps) {
  const [resolvedOpen, setOpen] = useControllableOpenState(
    open,
    defaultOpen,
    onOpenChange,
  );

  useEffect(() => {
    if (!autoHideOnMobileBreakpoint || typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(max-width: 1279px)");

    const handleMobileEnter = (event: MediaQueryListEvent | MediaQueryList) => {
      if (event.matches) {
        setOpen(false);
      }
    };

    // Ensure first render on smaller screens starts closed.
    handleMobileEnter(mediaQuery);

    const listener = (event: MediaQueryListEvent) => handleMobileEnter(event);
    mediaQuery.addEventListener("change", listener);

    return () => mediaQuery.removeEventListener("change", listener);
  }, [autoHideOnMobileBreakpoint, setOpen]);

  const defaultHeader = useMemo(
    () => (
      <nav className="sticky top-2 z-40 mb-4 rounded-md border border-ds-border-3 bg-ds-surface-1/95  px-4 py-3 shadow-[0_4px_14px_color-mix(in_srgb,var(--ds-color-fg)_8%,transparent)] backdrop-blur-md flex items-center  ">
        <div className="flex w-full justify-between gap-4">
          <div className="min-w-0">
            <Typography variant="caption" className="text-ds-3 capitalize">
              {breadcrumb}
            </Typography>
            <Typography
              variant="h5"
              weight="black"
              className="truncate leading-7 capitalize"
            >
              {title}
            </Typography>
          </div>

          <div className="border-ds-border-4 hidden min-h-11 items-center gap-1 rounded-full border bg-ds-surface-1 px-2 py-1 shadow-[0_2px_8px_color-mix(in_srgb,var(--ds-color-fg)_6%,transparent)] sm:flex">
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="h-9 w-9 rounded-full p-0! xl:hidden"
              aria-label="Toggle sidebar"
              onClick={() => setOpen(!resolvedOpen)}
            >
              <HamburgerIcon isOpen={resolvedOpen} />
            </Button>

            <DropdownMenu
              panelClassName="right-0 top-[44px]"
              trigger={
                <Button
                  type="button"
                  variant="tertiary"
                  size="small"
                  className="relative h-9 w-9 rounded-full p-0!"
                  aria-label="Open notifications"
                >
                  <BellIcon className="h-5 w-5" />
                  <span className="bg-ds-state-danger text-ds-on-accent absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.68rem] font-bold">
                    {notificationItems.length}
                  </span>
                </Button>
              }
            >
              <div className="w-[340px] rounded-lg border border-ds-border-3 bg-ds-surface-1 p-3 shadow-xl">
                <div className="mb-2 flex items-center justify-between">
                  <Typography variant="body2" weight="black">
                    Notifications
                  </Typography>
                  <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    className="px-2 py-1 text-xs"
                  >
                    Mark all read
                  </Button>
                </div>
                <div className="space-y-2">
                  {notificationItems.map((item) => (
                    <Button
                      key={item.id}
                      type="button"
                      variant="tertiary"
                      size="small"
                      className="w-full justify-start rounded-lg border border-ds-border-3 px-2.5 py-2 text-left"
                    >
                      <span
                        className={`mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border ${item.toneClassName}`}
                      >
                        <BellIcon className="h-3.5 w-3.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-xs font-semibold text-ds-1">
                          {item.title}
                        </span>
                        <span className="block truncate text-[11px] text-ds-3">
                          {item.description}
                        </span>
                      </span>
                      <span className="text-[11px] text-ds-3">{item.time}</span>
                    </Button>
                  ))}
                </div>
              </div>
            </DropdownMenu>

            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="h-9 w-9 rounded-full p-0!"
              aria-label="Toggle theme"
            >
              <span className="flex  cursor-pointer rounded-full">
                <SunToMoonButton showLabelAndImage={false} />
              </span>
            </Button>

            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="h-9 w-9 rounded-full p-0!"
              aria-label="Toggle fullscreen"
              onClick={() => {
                if (document.fullscreenElement) {
                  document.exitFullscreen();
                } else {
                  document.documentElement.requestFullscreen();
                }
              }}
            >
              <FullScreenIcon className="h-5 w-5" />
            </Button>

            <DropdownMenu
              panelClassName="right-0 top-[44px]"
              trigger={
                <Button
                  type="button"
                  variant="primary"
                  size="small"
                  className="h-9 w-9 rounded-full p-0! text-sm font-black"
                  aria-label="Open user menu"
                >
                  JD
                </Button>
              }
            >
              <div className="w-52 rounded-lg border border-ds-border-3 bg-ds-surface-1 p-3 shadow-xl">
                <div className="mb-2 flex items-center gap-2">
                  <span className="bg-ds-accent text-ds-on-accent inline-flex h-8 w-8 items-center justify-center rounded-full text-xs font-black">
                    JD
                  </span>
                  <div className="min-w-0">
                    <Typography
                      variant="body2"
                      weight="black"
                      className="truncate"
                    >
                      John Doe
                    </Typography>
                    <Typography variant="caption" className="text-ds-3">
                      Administrator
                    </Typography>
                  </div>
                </div>
                <div className="my-2 border-t border-ds-border-3" />
                <div className="flex flex-col gap-1">
                  <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    className="justify-start px-2 py-1.5 text-sm"
                  >
                    Profile
                  </Button>
                  <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    className="justify-start px-2 py-1.5 text-sm"
                  >
                    Settings
                  </Button>
                  <Button
                    type="button"
                    variant="tertiary"
                    size="small"
                    className="justify-start px-2 py-1.5 text-sm text-ds-state-error-text"
                  >
                    Log Out
                  </Button>
                </div>
              </div>
            </DropdownMenu>
          </div>
        </div>

        <div className="mt-2 flex items-center gap-1 sm:hidden">
          <Button
            type="button"
            variant="tertiary"
            size="small"
            className="p-1!"
            aria-label="Toggle sidebar"
            onClick={() => setOpen(!resolvedOpen)}
          >
            <HamburgerIcon isOpen={resolvedOpen} />
          </Button>

          <Button
            type="button"
            variant="tertiary"
            size="small"
            className="relative h-9 w-9 rounded-full p-0!"
            aria-label="Open notifications"
          >
            <BellIcon className="h-5 w-5" />
            <span className="text-ds-1 absolute -right-3 top-2 text-xs font-bold">
              3
            </span>
          </Button>

          <Button
            type="button"
            variant="tertiary"
            size="small"
            className="h-9 w-9 rounded-full p-0!"
            aria-label="Toggle theme"
          >
            <CircleIcon className="h-4 w-4 text-ds-warning" />
          </Button>

          <Button
            type="button"
            variant="tertiary"
            size="small"
            className="h-9 w-9 rounded-full p-0!"
            aria-label="Toggle fullscreen"
          >
            <FullScreenIcon className="h-5 w-5" />
          </Button>

          <Button
            type="button"
            variant="primary"
            size="small"
            className="ml-1 h-9 w-9 rounded-full p-0! text-sm font-black"
            aria-label="Open user menu"
          >
            JD
          </Button>
        </div>
      </nav>
    ),
    [breadcrumb, resolvedOpen, setOpen, title],
  );

  const resolvedHeader =
    typeof header === "function"
      ? header({
          isSidebarOpen: resolvedOpen,
          toggleSidebar: () => setOpen(!resolvedOpen),
        })
      : header;

  return (
    <div className={mergeClassNames("flex h-full w-full", className)}>
      <Sidebar
        items={items}
        open={resolvedOpen}
        onOpenChange={setOpen}
        activePath={activePath}
        onItemSelect={onItemSelect}
        direction={direction}
        brand={brand}
        footer={sidebarFooter}
      />

      <div className="h-full w-full">
        <main
          className={mergeClassNames(
            "mx-2 flex-none transition-all duration-200 ease-in-out",
            direction === "rtl" ? "xl:mr-[18.5rem]" : "xl:ml-[18.5rem]",
            mainClassName,
          )}
        >
          {resolvedHeader ?? defaultHeader}

          <section
            className={mergeClassNames(
              "mx-auto min-h-[calc(100dvh-180px)] rounded-md md:min-h-[calc(100dvh-116px)]",
              contentClassName,
            )}
          >
            {children}
          </section>
        </main>
      </div>
    </div>
  );
}
