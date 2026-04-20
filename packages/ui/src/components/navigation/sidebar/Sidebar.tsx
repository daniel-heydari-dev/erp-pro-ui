import { useCallback, useMemo, useState } from "react";

import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";
import { HamburgerIcon } from "./HamburgerIcon";
import { SidebarLinks } from "./SidebarLinks";
import type { SidebarProps } from "./types";

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

const fallbackBrand = (
  <div className="text-xl font-bold uppercase tracking-wide text-ds-1">
    <span className="text-ds-accent">ERP</span>
    <span className="font-medium">PRO</span>
  </div>
);

export function Sidebar({
  items,
  open,
  defaultOpen = false,
  onOpenChange,
  activePath,
  onItemSelect,
  direction = "auto",
  navbar,
  brand = fallbackBrand,
  footer,
  className,
  linksClassName,
  itemClassName,
  activeItemClassName,
  overlayClassName,
  closeLabel = "Toggle sidebar",
  showOverlay = true,
}: SidebarProps) {
  const [resolvedOpen, setOpen] = useControllableOpenState(
    open,
    defaultOpen,
    onOpenChange,
  );

  const content = useMemo(
    () => (
      <aside
        dir={direction === "auto" ? undefined : direction}
        className={mergeClassNames(
          "fixed inset-y-2 z-50 flex w-72 flex-col rounded-xl border border-ds-border-3 bg-ds-surface-1/92 p-3 shadow-[0_10px_28px_color-mix(in_srgb,var(--ds-color-fg)_9%,transparent)] backdrop-blur-xl",
          "transition-transform duration-200 ease-out xl:translate-x-0",
          direction === "rtl" ? "right-2" : "left-2",
          resolvedOpen
            ? "translate-x-0"
            : direction === "rtl"
              ? "translate-x-[110%] xl:translate-x-0"
              : "-translate-x-[110%] xl:translate-x-0",
          className,
        )}
        style={{
          backdropFilter: "blur(14px) saturate(120%)",
          WebkitBackdropFilter: "blur(14px) saturate(120%)",
        }}
      >
        {navbar ? (
          <div className="mb-4">{navbar}</div>
        ) : (
          <div className="mb-4 flex items-center justify-between gap-3 rounded-xl border border-ds-border-3 bg-ds-surface-2/85 px-3 py-2">
            <div className="min-w-0 flex-1">{brand}</div>
            <Button
              type="button"
              variant="tertiary"
              size="small"
              aria-label={closeLabel}
              className={mergeClassNames(
                "p-1! text-ds-2 transition-colors hover:bg-ds-surface-2 hover:text-ds-1",
                "xl:hidden",
              )}
              onClick={() => setOpen(!resolvedOpen)}
            >
              <HamburgerIcon isOpen={resolvedOpen} />
            </Button>
          </div>
        )}

        <div className="mb-5 h-px bg-ds-border-3" />

        <div className="min-h-0 flex-1 overflow-y-auto pr-1">
          <SidebarLinks
            items={items}
            activePath={activePath}
            onItemSelect={onItemSelect}
            direction={direction}
            className={linksClassName}
            itemClassName={itemClassName}
            activeItemClassName={activeItemClassName}
          />
        </div>

        {footer ? <div className="mt-4">{footer}</div> : null}
      </aside>
    ),
    [
      activeItemClassName,
      activePath,
      brand,
      className,
      closeLabel,
      direction,
      footer,
      itemClassName,
      items,
      linksClassName,
      onItemSelect,
      resolvedOpen,
      setOpen,
    ],
  );

  if (!showOverlay) {
    return content;
  }

  return (
    <>
      {content}
      <Button
        type="button"
        variant="tertiary"
        size="small"
        aria-hidden={!resolvedOpen}
        tabIndex={resolvedOpen ? 0 : -1}
        className={mergeClassNames(
          "fixed inset-0 z-40 p-0! bg-black/30 backdrop-blur-[2px] transition-opacity duration-200 xl:hidden",
          resolvedOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
          overlayClassName,
        )}
        onClick={() => setOpen(false)}
      />
    </>
  );
}
