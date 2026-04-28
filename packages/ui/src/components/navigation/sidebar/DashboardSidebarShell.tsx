import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { BellIcon, FullScreenIcon } from "../../icons";
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
  setSidebarOpen: (open: boolean) => void;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  direction: Exclude<SidebarProps["direction"], "auto">;
  isRtl: boolean;
}

type DashboardShellSlot =
  | ReactNode
  | ((context: DashboardHeaderRenderContext) => ReactNode);

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

export interface DashboardSidebarShellProps {
  items: readonly SidebarItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  direction?: SidebarProps["direction"];
  activePath?: string;
  onItemSelect?: SidebarProps["onItemSelect"];
  brand?: SidebarProps["brand"];
  sidebarNavbar?: SidebarProps["navbar"];
  sidebarFooter?: SidebarProps["footer"];
  sidebarClassName?: SidebarProps["className"];
  sidebarLinksClassName?: SidebarProps["linksClassName"];
  sidebarItemClassName?: SidebarProps["itemClassName"];
  sidebarActiveItemClassName?: SidebarProps["activeItemClassName"];
  sidebarOverlayClassName?: SidebarProps["overlayClassName"];
  sidebarCloseLabel?: SidebarProps["closeLabel"];
  showSidebarOverlay?: SidebarProps["showOverlay"];
  header?: DashboardShellSlot;
  headerLeading?: DashboardShellSlot;
  headerActions?: DashboardShellSlot;
  headerClassName?: string;
  headerTitleClassName?: string;
  headerActionsClassName?: string;
  breadcrumb?: ReactNode;
  title?: ReactNode;
  children?: ReactNode;
  className?: string;
  contentClassName?: string;
  mainClassName?: string;
  autoHideOnMobileBreakpoint?: boolean;
}

const rtlLanguages = /^(ar|fa|ur|he)(-|$)/i;

function resolveDirection(
  direction: SidebarProps["direction"],
): Exclude<SidebarProps["direction"], "auto"> {
  if (direction === "rtl" || direction === "ltr") {
    return direction;
  }

  if (typeof document !== "undefined") {
    const documentDirection = document.documentElement.getAttribute("dir");
    if (documentDirection === "rtl" || documentDirection === "ltr") {
      return documentDirection;
    }
  }

  if (
    typeof navigator !== "undefined" &&
    rtlLanguages.test(navigator.language)
  ) {
    return "rtl";
  }

  return "ltr";
}

function resolveSlot(
  slot: DashboardShellSlot | undefined,
  context: DashboardHeaderRenderContext,
) {
  return typeof slot === "function" ? slot(context) : slot;
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
  sidebarNavbar,
  sidebarFooter,
  sidebarClassName,
  sidebarLinksClassName,
  sidebarItemClassName,
  sidebarActiveItemClassName,
  sidebarOverlayClassName,
  sidebarCloseLabel,
  showSidebarOverlay,
  header,
  headerLeading,
  headerActions,
  headerClassName,
  headerTitleClassName,
  headerActionsClassName,
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
  const resolvedDirection = resolveDirection(direction);
  const isRtl = resolvedDirection === "rtl";
  const openSidebar = useCallback(() => setOpen(true), [setOpen]);
  const closeSidebar = useCallback(() => setOpen(false), [setOpen]);
  const toggleSidebar = useCallback(
    () => setOpen(!resolvedOpen),
    [resolvedOpen, setOpen],
  );

  const headerContext = useMemo<DashboardHeaderRenderContext>(
    () => ({
      isSidebarOpen: resolvedOpen,
      setSidebarOpen: setOpen,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      direction: resolvedDirection,
      isRtl,
    }),
    [
      closeSidebar,
      isRtl,
      openSidebar,
      resolvedDirection,
      resolvedOpen,
      setOpen,
      toggleSidebar,
    ],
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

  const defaultHeaderActions = useMemo(
    () => (
      <>
        <Button
          type="button"
          variant="tertiary"
          size="small"
          className="h-9 w-9 rounded-full p-0! xl:hidden"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          <HamburgerIcon isOpen={resolvedOpen} />
        </Button>

        <DropdownMenu
          animationClassName={isRtl ? "origin-top-left" : "origin-top-right"}
          panelClassName={mergeClassNames(
            "top-[44px]",
            isRtl ? "left-0" : "right-0",
          )}
          trigger={
            <Button
              type="button"
              variant="tertiary"
              size="small"
              className="relative h-9 w-9 rounded-full p-0!"
              aria-label="Open notifications"
            >
              <BellIcon className="h-5 w-5" />
              <span
                className={mergeClassNames(
                  "bg-ds-state-danger text-ds-on-accent absolute -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-[0.68rem] font-bold",
                  isRtl ? "-left-0.5" : "-right-0.5",
                )}
              >
                {notificationItems.length}
              </span>
            </Button>
          }
        >
          <div className="w-[340px] rounded-lg border border-ds-border-3 bg-ds-surface-1 p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between gap-3">
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
                  className={mergeClassNames(
                    "w-full rounded-lg border border-ds-border-3 px-2.5 py-2",
                    isRtl
                      ? "justify-end text-right"
                      : "justify-start text-left",
                  )}
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
          <span className="flex cursor-pointer rounded-full">
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
          animationClassName={isRtl ? "origin-top-left" : "origin-top-right"}
          panelClassName={mergeClassNames(
            "top-[44px]",
            isRtl ? "left-0" : "right-0",
          )}
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
                <Typography variant="body2" weight="black" className="truncate">
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
                className={mergeClassNames(
                  "px-2 py-1.5 text-sm",
                  isRtl ? "justify-end text-right" : "justify-start text-left",
                )}
              >
                Profile
              </Button>
              <Button
                type="button"
                variant="tertiary"
                size="small"
                className={mergeClassNames(
                  "px-2 py-1.5 text-sm",
                  isRtl ? "justify-end text-right" : "justify-start text-left",
                )}
              >
                Settings
              </Button>
              <Button
                type="button"
                variant="tertiary"
                size="small"
                className={mergeClassNames(
                  "px-2 py-1.5 text-sm text-ds-state-error-text",
                  isRtl ? "justify-end text-right" : "justify-start text-left",
                )}
              >
                Log Out
              </Button>
            </div>
          </div>
        </DropdownMenu>
      </>
    ),
    [isRtl, resolvedOpen, toggleSidebar],
  );

  const resolvedHeaderLeading = resolveSlot(headerLeading, headerContext);
  const resolvedHeaderActions =
    headerActions === undefined
      ? defaultHeaderActions
      : resolveSlot(headerActions, headerContext);

  const defaultHeader = useMemo(
    () => (
      <nav
        dir={resolvedDirection}
        className={mergeClassNames(
          "sticky top-2 z-40 mb-4 flex items-center rounded-md border border-ds-border-3 bg-ds-surface-1/95 px-4 py-3 shadow-[0_4px_14px_color-mix(in_srgb,var(--ds-color-fg)_8%,transparent)] backdrop-blur-md",
          headerClassName,
        )}
      >
        <div
          className={mergeClassNames(
            "flex w-full justify-between gap-4",
            isRtl && "flex-row-reverse",
          )}
        >
          <div
            className={mergeClassNames(
              "flex min-w-0 items-center gap-3",
              isRtl && "flex-row-reverse text-right",
              headerTitleClassName,
            )}
          >
            {resolvedHeaderLeading}
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
          </div>

          <div
            className={mergeClassNames(
              "border-ds-border-4 flex min-h-11 shrink-0 items-center gap-1 rounded-full border bg-ds-surface-1 px-2 py-1 shadow-[0_2px_8px_color-mix(in_srgb,var(--ds-color-fg)_6%,transparent)]",
              isRtl && "flex-row-reverse",
              headerActionsClassName,
            )}
          >
            {resolvedHeaderActions}
          </div>
        </div>
      </nav>
    ),
    [
      breadcrumb,
      headerActionsClassName,
      headerClassName,
      headerTitleClassName,
      isRtl,
      resolvedDirection,
      resolvedHeaderActions,
      resolvedHeaderLeading,
      title,
    ],
  );

  const resolvedHeader =
    header === undefined ? undefined : resolveSlot(header, headerContext);

  return (
    <div
      dir={resolvedDirection}
      className={mergeClassNames("flex h-full w-full", className)}
    >
      <Sidebar
        items={items}
        open={resolvedOpen}
        onOpenChange={setOpen}
        activePath={activePath}
        onItemSelect={onItemSelect}
        direction={direction}
        navbar={sidebarNavbar}
        brand={brand}
        footer={sidebarFooter}
        className={sidebarClassName}
        linksClassName={sidebarLinksClassName}
        itemClassName={sidebarItemClassName}
        activeItemClassName={sidebarActiveItemClassName}
        overlayClassName={sidebarOverlayClassName}
        closeLabel={sidebarCloseLabel}
        showOverlay={showSidebarOverlay}
      />

      <div className="h-full w-full">
        <main
          className={mergeClassNames(
            "mx-2 flex-none transition-all duration-200 ease-in-out",
            isRtl ? "xl:mr-[18.5rem]" : "xl:ml-[18.5rem]",
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
