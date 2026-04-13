import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { Calendar } from "../calendar";
import { CloseIcon } from "../../icons";

import type { DatePickerProps, DatePickerValue, DateRangeValue } from "./types";

const formatDate = (date: Date | null) =>
  date?.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  }) ?? "";

const isRangeValue = (value: DatePickerValue): value is DateRangeValue =>
  typeof value === "object" &&
  value !== null &&
  "start" in value &&
  "end" in value;

const emptyRange: DateRangeValue = { start: null, end: null };

const PANEL_GAP = 8;
const VIEWPORT_MARGIN = 12;

export const DatePicker = ({
  mode = "single",
  value,
  onChange,
  label,
  placeholder = "Pick a date",
  helperText,
  disabled = false,
  className = "",
  presets,
}: DatePickerProps) => {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<DatePickerValue>(
    value ?? (mode === "range" ? emptyRange : null),
  );

  const currentValue = isControlled ? value : internalValue;
  const singleValue = mode === "range" ? null : (currentValue as Date | null);
  const rangeValue =
    mode === "range" && isRangeValue(currentValue)
      ? currentValue
      : mode === "range"
        ? { ...emptyRange }
        : emptyRange;

  const displayValue = useMemo(() => {
    if (mode === "range") {
      if (rangeValue.start && rangeValue.end) {
        return `${formatDate(rangeValue.start)} — ${formatDate(rangeValue.end)}`;
      }
      if (rangeValue.start) {
        return `${formatDate(rangeValue.start)} — …`;
      }
      return "";
    }
    return formatDate(singleValue);
  }, [mode, rangeValue.end, rangeValue.start, singleValue]);

  const hasSelection =
    mode === "range"
      ? Boolean(rangeValue.start || rangeValue.end)
      : Boolean(singleValue);

  const updateValue = (next: DatePickerValue) => {
    if (!isControlled) {
      setInternalValue(next);
    }
    onChange?.(next);
  };

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const radius = 100;
  const [panelPosition, setPanelPosition] = useState({
    top: 0,
    left: 0,
    minWidth: 320,
  });

  useEffect(() => {
    const isEventInside = (event: Event) => {
      const eventPath =
        typeof event.composedPath === "function" ? event.composedPath() : [];

      return eventPath.some((target) => {
        if (!(target instanceof Node)) {
          return false;
        }

        return (
          containerRef.current?.contains(target) ||
          panelRef.current?.contains(target)
        );
      });
    };

    const handlePointerOutside = (event: PointerEvent) => {
      const target = event.target;

      if (
        (target instanceof Node &&
          (containerRef.current?.contains(target) ||
            panelRef.current?.contains(target))) ||
        isEventInside(event)
      ) {
        return;
      }

      setOpen(false);
    };

    const handleFocusOutside = (event: FocusEvent) => {
      const target = event.target;

      if (
        (target instanceof Node &&
          (containerRef.current?.contains(target) ||
            panelRef.current?.contains(target))) ||
        isEventInside(event)
      ) {
        return;
      }

      setOpen(false);
    };

    if (open) {
      document.addEventListener("pointerdown", handlePointerOutside, true);
      document.addEventListener("focusin", handleFocusOutside, true);
    }

    return () => {
      document.removeEventListener("pointerdown", handlePointerOutside, true);
      document.removeEventListener("focusin", handleFocusOutside, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const updatePanelPosition = () => {
      const triggerRect = triggerRef.current?.getBoundingClientRect();

      if (!triggerRect) {
        return;
      }

      const panelHeight = panelRef.current?.offsetHeight ?? 360;
      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const shouldOpenAbove =
        spaceBelow < panelHeight + PANEL_GAP &&
        triggerRect.top > panelHeight + PANEL_GAP;

      const unclampedLeft = triggerRect.left;
      const maxLeft = Math.max(
        VIEWPORT_MARGIN,
        window.innerWidth - Math.max(triggerRect.width, 320) - VIEWPORT_MARGIN,
      );
      const left = Math.min(Math.max(unclampedLeft, VIEWPORT_MARGIN), maxLeft);

      setPanelPosition({
        top: shouldOpenAbove
          ? Math.max(VIEWPORT_MARGIN, triggerRect.top - panelHeight - PANEL_GAP)
          : Math.min(
              triggerRect.bottom + PANEL_GAP,
              window.innerHeight - panelHeight - VIEWPORT_MARGIN,
            ),
        left,
        minWidth: Math.max(triggerRect.width, 320),
      });
    };

    updatePanelPosition();

    const frameId = window.requestAnimationFrame(updatePanelPosition);

    window.addEventListener("resize", updatePanelPosition);
    window.addEventListener("scroll", updatePanelPosition, true);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", updatePanelPosition);
      window.removeEventListener("scroll", updatePanelPosition, true);
    };
  }, [open, presets]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - left);
    mouseY.set(event.clientY - top);
  };

  const handlePresetClick = (getValue: () => DatePickerValue) => {
    const next = getValue();
    updateValue(next);
    setOpen(false);
  };

  const handleClearSelection = () => {
    if (disabled) {
      return;
    }

    updateValue(mode === "range" ? { ...emptyRange } : null);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`w-full space-y-2 ${className}`.trim()}>
      {label && <p className="text-sm font-medium text-ds-1">{label}</p>}
      <div className="relative">
        <motion.div
          style={{
            backgroundImage: disabled
              ? "none"
              : useMotionTemplate`
                  radial-gradient(
                    ${
                      visible ? `${radius}px` : "0px"
                    } circle at ${mouseX}px ${mouseY}px,
                    var(--ds-color-accent),
                    transparent 90%
                  )
                `,
          }}
          onMouseMove={!disabled ? handleMouseMove : undefined}
          onMouseEnter={!disabled ? () => setVisible(true) : undefined}
          onMouseLeave={!disabled ? () => setVisible(false) : undefined}
          className={
            disabled
              ? "group/date-picker rounded-lg border-none bg-ds-surface-1 p-[2px]"
              : "group/date-picker rounded-lg border-ds-border-2 p-[2px]"
          }
        >
          <div className="relative">
            <button
              ref={triggerRef}
              type="button"
              className={`flex w-full items-center justify-between rounded-md border border-ds-border-field bg-ds-surface-1 px-3 py-2 pr-10 text-sm text-ds-1 transition duration-400 ease-in-out ${
                disabled ? "cursor-not-allowed opacity-50" : ""
              }`}
              onClick={() => !disabled && setOpen((prev) => !prev)}
              aria-haspopup="dialog"
              aria-expanded={open}
              disabled={disabled}
            >
              <span className={displayValue ? "text-ds-1" : "text-ds-2"}>
                {displayValue || placeholder}
              </span>
            </button>

            {hasSelection && !disabled ? (
              <button
                type="button"
                className="absolute right-3 top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-ds-2 transition-colors hover:bg-ds-accent-subtle hover:text-ds-1"
                onClick={handleClearSelection}
                aria-label={
                  mode === "range"
                    ? "Clear selected date range"
                    : "Clear selected date"
                }
              >
                <CloseIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : (
              <span
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ds-2"
                aria-hidden="true"
              >
                📅
              </span>
            )}
          </div>
        </motion.div>
      </div>
      {helperText && <p className="text-xs text-ds-2">{helperText}</p>}
      {open && !disabled && typeof document !== "undefined"
        ? createPortal(
            <div className="fixed inset-0 z-60">
              <div
                className="absolute inset-0"
                aria-hidden="true"
                onPointerDown={() => setOpen(false)}
              />
              <div
                ref={panelRef}
                className="dropdown-panel absolute z-10"
                style={{
                  top: panelPosition.top,
                  left: panelPosition.left,
                  minWidth: panelPosition.minWidth,
                }}
                role="dialog"
                aria-modal="false"
              >
                <Calendar
                  value={mode === "single" ? (singleValue ?? null) : undefined}
                  selectionMode={mode}
                  range={mode === "range" ? rangeValue : undefined}
                  onSelect={
                    mode === "single"
                      ? (date) => {
                          updateValue(date);
                          setOpen(false);
                        }
                      : undefined
                  }
                  onRangeSelect={
                    mode === "range"
                      ? (nextRange) => {
                          updateValue(nextRange);
                          if (nextRange.start && nextRange.end) {
                            setOpen(false);
                          }
                        }
                      : undefined
                  }
                />
                {presets?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2 rounded-lg border border-ds-border-2 bg-ds-surface-1/95 p-3 shadow-xl backdrop-blur-xl">
                    {presets.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        className="rounded-full border border-ds-border-field px-3 py-1 text-xs text-ds-2 transition-colors hover:border-ds-border-accent hover:bg-ds-accent-subtle hover:text-ds-1"
                        onClick={() => handlePresetClick(preset.value)}
                      >
                        {preset.label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
};
