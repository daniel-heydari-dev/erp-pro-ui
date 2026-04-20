import { mergeClassNames } from "../../../utils";
import { NavLink } from "./NavLink";
import type { SidebarDirection, SidebarItem, SidebarLinksProps } from "./types";

const rtlLanguages = /^(ar|fa|ur|he)(-|$)/i;

function resolveDirection(
  direction: SidebarDirection,
): Exclude<SidebarDirection, "auto"> {
  if (direction !== "auto") {
    return direction;
  }

  if (typeof document === "undefined") {
    return "ltr";
  }

  const explicitDirection =
    document.documentElement.getAttribute("dir") ?? undefined;

  if (explicitDirection === "rtl" || explicitDirection === "ltr") {
    return explicitDirection;
  }

  if (
    typeof navigator !== "undefined" &&
    rtlLanguages.test(navigator.language)
  ) {
    return "rtl";
  }

  return "ltr";
}

function isRouteActive(item: SidebarItem, activePath?: string): boolean {
  if (typeof item.active === "boolean") {
    return item.active;
  }

  if (!activePath || !item.href) {
    return false;
  }

  return activePath === item.href || activePath.startsWith(`${item.href}/`);
}

export function SidebarLinks({
  items,
  activePath,
  onItemSelect,
  direction = "auto",
  className,
  itemClassName,
  activeItemClassName,
}: SidebarLinksProps) {
  const effectiveDirection = resolveDirection(direction);
  const visibleItems = items.filter((item) => !item.hidden);

  return (
    <ul className={mergeClassNames("space-y-1.5", className)}>
      {visibleItems.map((item) => {
        const active = isRouteActive(item, activePath);

        return (
          <li key={item.id} className="relative">
            <NavLink
              href={item.href}
              disabled={item.disabled}
              className={mergeClassNames(
                "group relative flex w-full items-center gap-2.5 rounded-md border px-3 py-2.5 transition-all duration-200",
                effectiveDirection === "rtl" ? "text-right" : "text-left",
                "border-transparent text-ds-2 hover:border-ds-border-3 hover:bg-ds-surface-2/80 hover:text-ds-1",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ds-focus/60 focus-visible:ring-offset-2 focus-visible:ring-offset-ds-canvas",
                item.disabled && "cursor-not-allowed opacity-50",
                active &&
                  "border-ds-border-accent/35 bg-ds-accent-subtle text-ds-1 shadow-[0_4px_12px_color-mix(in_srgb,var(--ds-color-fg)_8%,transparent)]",
                active && activeItemClassName,
                itemClassName,
              )}
              onClick={(event) => {
                item.onSelect?.(event);
                onItemSelect?.(item, event);
              }}
            >
              <span
                className={mergeClassNames(
                  "inline-flex h-5 w-5 shrink-0 items-center justify-center",
                  active ? "text-ds-1" : "text-ds-2 group-hover:text-ds-1",
                )}
                aria-hidden="true"
              >
                {item.icon}
              </span>
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {item.label}
              </span>
              {item.badge ? (
                <span className="shrink-0 text-xs text-ds-2">{item.badge}</span>
              ) : null}
            </NavLink>
            {active ? (
              <span
                className={mergeClassNames(
                  "pointer-events-none absolute  top-1.5 h-[calc(100%-12px)] w-2",
                  effectiveDirection === "rtl" ? "right-0" : "left-0",
                )}
                aria-hidden="true"
              >
                {/* <span className="absolute inset-y-1 left-1/2 w-2 -translate-x-1/2 rounded-full bg-ds-accent/25 blur-[4px]" /> */}
                {/* <span className="absolute inset-y-0 left-1/6 w-[2px] -translate-x-1/2 rounded-full bg-ds-accent motion-safe:animate-pulse" /> */}
                {/* <span className="absolute top-2.5 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-ds-accent shadow-[0_0_10px_color-mix(in_srgb,var(--ds-color-accent)_55%,transparent)] motion-safe:animate-pulse" /> */}
              </span>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}
