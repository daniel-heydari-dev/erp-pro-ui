import { useEffect, useMemo, useRef, useState } from "react";

import { Button } from "../../forms/button";
import { mergeClassNames } from "../../../utils";
import type { TabsDirection, TabsItem, TabsProps } from "./types";

const rtlLanguages = /^(ar|fa|ur|he)(-|$)/i;

function resolveDirection(
  direction: TabsDirection,
): Exclude<TabsDirection, "auto"> {
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

function getFirstEnabledId(items: readonly TabsItem[]): string {
  const fallback = items.find((item) => !item.disabled) ?? items[0];
  return fallback?.id ?? "";
}

export function Tabs({
  items,
  value,
  defaultValue,
  onValueChange,
  dir = "auto",
  className,
  listClassName,
  triggerClassName,
  panelClassName,
  animationDurationMs = 220,
}: TabsProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const isControlled = value !== undefined;

  const fallbackId = useMemo(() => getFirstEnabledId(items), [items]);
  const [internalValue, setInternalValue] = useState<string>(
    defaultValue ?? fallbackId,
  );
  const rawActiveId = isControlled ? value : internalValue;
  const activeId = items.some((item) => item.id === rawActiveId)
    ? rawActiveId
    : fallbackId;

  const activeIndex = useMemo(
    () =>
      Math.max(
        items.findIndex((item) => item.id === activeId),
        0,
      ),
    [items, activeId],
  );

  const previousIndexRef = useRef(activeIndex);
  const tabsDirection = useMemo(() => resolveDirection(dir), [dir]);

  useEffect(() => {
    const previousIndex = previousIndexRef.current;
    if (activeIndex === previousIndex) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      previousIndexRef.current = activeIndex;
      return;
    }

    const indexDelta = activeIndex - previousIndex;
    const logicalDirection = indexDelta >= 0 ? 1 : -1;
    const visualDirection =
      tabsDirection === "rtl" ? -logicalDirection : logicalDirection;
    const fromX = visualDirection > 0 ? -14 : 14;

    panel.animate(
      [
        { opacity: 0, transform: `translateX(${fromX}px)` },
        { opacity: 1, transform: "translateX(0px)" },
      ],
      {
        duration: animationDurationMs,
        easing: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    );

    previousIndexRef.current = activeIndex;
  }, [activeIndex, animationDurationMs, tabsDirection]);

  const activeItem = items[activeIndex] ?? items[0];
  const visualActiveIndex =
    tabsDirection === "rtl" ? items.length - activeIndex - 1 : activeIndex;

  const setValue = (nextValue: string) => {
    if (!isControlled) {
      setInternalValue(nextValue);
    }
    onValueChange?.(nextValue);
  };

  const moveBy = (delta: number) => {
    if (items.length === 0) {
      return;
    }

    let probe = activeIndex;
    for (let step = 0; step < items.length; step++) {
      probe = (probe + delta + items.length) % items.length;
      const candidate = items[probe];
      if (!candidate?.disabled) {
        setValue(candidate.id);
        return;
      }
    }
  };

  return (
    <div dir={tabsDirection} className={mergeClassNames("w-full", className)}>
      <div
        role="tablist"
        aria-orientation="horizontal"
        className={mergeClassNames(
          "relative flex w-full items-center gap-2 overflow-hidden rounded-lg border border-ds-border-4 bg-ds-surface-1 p-1",
          listClassName,
        )}
      >
        {items.length > 0 ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 top-1 rounded-md border border-ds-border-accent/40 bg-ds-accent shadow-[0_10px_26px_rgba(79,43,226,0.35)] transition-transform duration-300 ease-out"
            style={{
              width: `calc((100% - 0.5rem) / ${items.length})`,
              transform: `translateX(${visualActiveIndex * 100}%)`,
              insetInlineStart: "0.25rem",
            }}
          />
        ) : null}
        {items.map((item) => {
          const selected = item.id === activeItem?.id;
          return (
            <Button
              key={item.id}
              role="tab"
              id={`tab-${item.id}`}
              aria-selected={selected}
              aria-controls={`tabpanel-${item.id}`}
              tabIndex={selected ? 0 : -1}
              disabled={item.disabled}
              variant="tertiary"
              size="small"
              className={mergeClassNames(
                "relative z-10 flex-1 rounded-lg px-2 py-2.5 text-sm font-medium transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-ds-focus/60",
                selected ? "text-ds-on-accent" : "text-ds-2 hover:text-ds-1",
                item.disabled && "cursor-not-allowed opacity-55",
                triggerClassName,
              )}
              onClick={() => {
                if (!item.disabled) {
                  setValue(item.id);
                }
              }}
              onKeyDown={(event) => {
                if (event.key === "ArrowRight") {
                  event.preventDefault();
                  moveBy(tabsDirection === "rtl" ? -1 : 1);
                }

                if (event.key === "ArrowLeft") {
                  event.preventDefault();
                  moveBy(tabsDirection === "rtl" ? 1 : -1);
                }

                if (event.key === "Home") {
                  event.preventDefault();
                  const first = items.find((candidate) => !candidate.disabled);
                  if (first) {
                    setValue(first.id);
                  }
                }

                if (event.key === "End") {
                  event.preventDefault();
                  const reversed = [...items].reverse();
                  const last = reversed.find(
                    (candidate) => !candidate.disabled,
                  );
                  if (last) {
                    setValue(last.id);
                  }
                }
              }}
            >
              {item.label}
            </Button>
          );
        })}
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        id={`tabpanel-${activeItem?.id ?? ""}`}
        aria-labelledby={`tab-${activeItem?.id ?? ""}`}
        className={mergeClassNames("mt-3 w-full", panelClassName)}
      >
        {activeItem?.content}
      </div>
    </div>
  );
}
