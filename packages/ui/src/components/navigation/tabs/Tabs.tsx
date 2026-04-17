import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const tabSlotRefs = useRef<Record<string, HTMLDivElement | null>>({});
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
  const [indicator, setIndicator] = useState<{
    left: number;
    width: number;
  } | null>(null);

  const getEffectiveDirection = useCallback(() => {
    if (dir !== "auto") {
      return dir;
    }

    if (typeof window !== "undefined" && listRef.current) {
      const cssDirection = window.getComputedStyle(listRef.current).direction;
      if (cssDirection === "rtl" || cssDirection === "ltr") {
        return cssDirection;
      }
    }

    return resolveDirection("auto");
  }, [dir]);

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
      getEffectiveDirection() === "rtl" ? -logicalDirection : logicalDirection;
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
  }, [activeIndex, animationDurationMs, getEffectiveDirection]);

  const activeItem = items[activeIndex] ?? items[0];

  useLayoutEffect(() => {
    const updateIndicator = () => {
      const selectedSlot = tabSlotRefs.current[activeItem?.id ?? ""];
      if (!selectedSlot) {
        setIndicator(null);
        return;
      }

      setIndicator({
        left: selectedSlot.offsetLeft,
        width: selectedSlot.offsetWidth,
      });
    };

    updateIndicator();
    window.addEventListener("resize", updateIndicator);
    return () => window.removeEventListener("resize", updateIndicator);
  }, [activeItem?.id, items.length]);

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
    <div
      ref={rootRef}
      dir={dir === "auto" ? undefined : dir}
      className={mergeClassNames("w-full", className)}
    >
      <div
        ref={listRef}
        role="tablist"
        aria-orientation="horizontal"
        className={mergeClassNames(
          "relative flex h-9 w-full items-center gap-0 overflow-hidden rounded-lg border border-ds-border-3 bg-ds-surface-2 p-1",
          listClassName,
        )}
      >
        {items.length > 0 && indicator ? (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-1 top-1 rounded-md border border-ds-border-accent/45 bg-ds-accent shadow-[0_1px_3px_rgba(0,0,0,0.1),0_1px_2px_rgba(0,0,0,0.06)] transition-transform duration-300 ease-out"
            style={{
              width: `${indicator.width}px`,
              transform: `translateX(${indicator.left}px)`,
              left: 0,
            }}
          />
        ) : null}
        {items.map((item) => {
          const selected = item.id === activeItem?.id;
          return (
            <div
              key={item.id}
              ref={(node) => {
                tabSlotRefs.current[item.id] = node;
              }}
              className="relative z-10 h-full min-w-0 flex-1"
            >
              <Button
                role="tab"
                id={`tab-${item.id}`}
                aria-selected={selected}
                aria-controls={`tabpanel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                disabled={item.disabled}
                variant="tertiary"
                size="small"
                className={mergeClassNames(
                  "h-full w-full rounded-md px-3 py-1 text-base font-normal leading-[22px] transition-colors duration-200",
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
                    moveBy(getEffectiveDirection() === "rtl" ? -1 : 1);
                  }

                  if (event.key === "ArrowLeft") {
                    event.preventDefault();
                    moveBy(getEffectiveDirection() === "rtl" ? 1 : -1);
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
            </div>
          );
        })}
      </div>

      <div
        ref={panelRef}
        role="tabpanel"
        id={`tabpanel-${activeItem?.id ?? ""}`}
        aria-labelledby={`tab-${activeItem?.id ?? ""}`}
        className={mergeClassNames("mt-2 w-full", panelClassName)}
      >
        {activeItem?.content}
      </div>
    </div>
  );
}
