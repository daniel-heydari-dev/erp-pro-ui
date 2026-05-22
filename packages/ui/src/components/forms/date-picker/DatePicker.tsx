"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";

import { Calendar } from "../calendar";
import { CloseIcon } from "../../icons";
import { mergeClassNames } from "../../../utils";

import type { DatePickerProps, DatePickerValue, DateRangeValue } from "./types";

// ── Utilities ─────────────────────────────────────────────────────────────────

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

const SHORT_MONTHS = Array.from({ length: 12 }, (_, i) =>
  new Date(2026, i, 1).toLocaleString(undefined, { month: "short" }),
);

function formatDate(d: Date | null) {
  return d?.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) ?? "";
}

function parseDate(str: string): Date | null {
  const trimmed = str.trim();
  if (!trimmed) return null;
  const d = new Date(trimmed);
  return isNaN(d.getTime()) ? null : startOfDay(d);
}

const isRangeValue = (v: DatePickerValue): v is DateRangeValue =>
  typeof v === "object" && v !== null && "start" in v && "end" in v;

const emptyRange: DateRangeValue = { start: null, end: null };

// ── Built-in range presets ────────────────────────────────────────────────────

interface BuiltInPreset {
  label: string;
  getValue: () => DateRangeValue;
}

const RANGE_PRESETS: BuiltInPreset[] = [
  {
    label: "Today",
    getValue() { const t = startOfDay(new Date()); return { start: t, end: t }; },
  },
  {
    label: "Yesterday",
    getValue() {
      const d = startOfDay(new Date()); d.setDate(d.getDate() - 1);
      return { start: d, end: d };
    },
  },
  {
    label: "Last 7 days",
    getValue() {
      const end = startOfDay(new Date());
      const start = new Date(end); start.setDate(start.getDate() - 6);
      return { start, end };
    },
  },
  {
    label: "Last 30 days",
    getValue() {
      const end = startOfDay(new Date());
      const start = new Date(end); start.setDate(start.getDate() - 29);
      return { start, end };
    },
  },
  {
    label: "Last quarter",
    getValue() {
      const now = new Date();
      const q = Math.floor(now.getMonth() / 3);
      const pq = q === 0 ? 3 : q - 1;
      const pqYear = q === 0 ? now.getFullYear() - 1 : now.getFullYear();
      return {
        start: new Date(pqYear, pq * 3, 1),
        end:   new Date(pqYear, pq * 3 + 3, 0),
      };
    },
  },
];

// ── Class constant for Calendar rendered inside a panel (no own border/bg) ───

const INNER_CAL = "w-auto max-w-none rounded-none border-0 bg-transparent p-0 shadow-none backdrop-blur-none";

// ── Panel positioning constants ───────────────────────────────────────────────

const PANEL_GAP = 8;
const VMARGIN   = 12;

// ── DatePicker ────────────────────────────────────────────────────────────────

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
  const [open,      setOpen]      = useState(false);
  const [visible,   setVisible]   = useState(false);
  const [isMobile,  setIsMobile]  = useState(false);
  const [hoverDate, setHoverDate] = useState<Date | null>(null);

  // Text inputs for direct date entry (range mode only)
  const [startInput, setStartInput] = useState("");
  const [endInput,   setEndInput]   = useState("");

  // Dual-month nav state — left calendar, right = left+1
  const todayDate = useMemo(() => new Date(), []);
  const [leftMonth, setLeftMonth] = useState(todayDate.getMonth());
  const [leftYear,  setLeftYear]  = useState(todayDate.getFullYear());

  const rightDate  = new Date(leftYear, leftMonth + 1, 1);
  const rightMonth = rightDate.getMonth();
  const rightYear  = rightDate.getFullYear();

  // Value state
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<DatePickerValue>(
    value ?? (mode === "range" ? emptyRange : null),
  );
  const current     = isControlled ? value : internal;
  const singleValue = mode === "range" ? null : (current as Date | null);
  const rangeValue  = mode === "range" && isRangeValue(current) ? current : { ...emptyRange };

  const displayValue = useMemo(() => {
    if (mode === "range") {
      if (rangeValue.start && rangeValue.end)
        return `${formatDate(rangeValue.start)} — ${formatDate(rangeValue.end)}`;
      if (rangeValue.start) return `${formatDate(rangeValue.start)} — …`;
      return "";
    }
    return formatDate(singleValue);
  }, [mode, rangeValue.start, rangeValue.end, singleValue]);

  const hasSelection = mode === "range"
    ? Boolean(rangeValue.start || rangeValue.end)
    : Boolean(singleValue);

  const updateValue = (next: DatePickerValue) => {
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  // ── Side effects ─────────────────────────────────────────────────────────────

  // Mobile detection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(max-width: 640px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Sync text inputs with range value
  useEffect(() => {
    setStartInput(rangeValue.start ? formatDate(rangeValue.start) : "");
    setEndInput(rangeValue.end   ? formatDate(rangeValue.end)   : "");
  }, [rangeValue.start, rangeValue.end]);

  // Close on outside click / focus
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef   = useRef<HTMLButtonElement>(null);
  const panelRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const inside = (event: Event) => {
      const path = typeof event.composedPath === "function" ? event.composedPath() : [];
      return path.some(
        (t) => t instanceof Node && (containerRef.current?.contains(t) || panelRef.current?.contains(t)),
      );
    };

    const onPointer = (e: PointerEvent) => {
      if ((e.target instanceof Node && (containerRef.current?.contains(e.target) || panelRef.current?.contains(e.target))) || inside(e)) return;
      setOpen(false);
    };
    const onFocus = (e: FocusEvent) => {
      if ((e.target instanceof Node && (containerRef.current?.contains(e.target) || panelRef.current?.contains(e.target))) || inside(e)) return;
      setOpen(false);
    };

    if (open) {
      document.addEventListener("pointerdown", onPointer, true);
      document.addEventListener("focusin",     onFocus,   true);
    }
    return () => {
      document.removeEventListener("pointerdown", onPointer, true);
      document.removeEventListener("focusin",     onFocus,   true);
    };
  }, [open]);

  // Panel positioning
  const [panelPos, setPanelPos] = useState({ top: 0, left: 0, minWidth: 320 });

  useEffect(() => {
    if (!open) return;

    const update = () => {
      const tRect = triggerRef.current?.getBoundingClientRect();
      if (!tRect) return;

      const panelH = panelRef.current?.offsetHeight ?? 400;
      const panelW = panelRef.current?.offsetWidth  ?? 320;
      const spaceBelow = window.innerHeight - tRect.bottom;
      const openAbove  = spaceBelow < panelH + PANEL_GAP && tRect.top > panelH + PANEL_GAP;

      const maxLeft = Math.max(VMARGIN, window.innerWidth - panelW - VMARGIN);
      const left    = Math.min(Math.max(tRect.left, VMARGIN), maxLeft);

      setPanelPos({
        top: openAbove
          ? Math.max(VMARGIN, tRect.top - panelH - PANEL_GAP)
          : Math.min(tRect.bottom + PANEL_GAP, window.innerHeight - panelH - VMARGIN),
        left,
        minWidth: Math.max(tRect.width, 320),
      });
    };

    update();
    const id = requestAnimationFrame(update);
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open]);

  // ── Motion ────────────────────────────────────────────────────────────────────

  const mouseX  = useMotionValue(0);
  const mouseY  = useMotionValue(0);
  const motionBg = useMotionTemplate`radial-gradient(${visible ? "100px" : "0px"} circle at ${mouseX}px ${mouseY}px, var(--ds-color-accent), transparent 90%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - left);
    mouseY.set(e.clientY - top);
  };

  // ── Handlers ─────────────────────────────────────────────────────────────────

  const handleClear = () => {
    if (disabled) return;
    updateValue(mode === "range" ? { ...emptyRange } : null);
    setOpen(false);
  };

  const handleRangeSelect = (next: DateRangeValue) => {
    updateValue(next);
    if (next.start && next.end) { setOpen(false); setHoverDate(null); }
  };

  const handlePreset = (p: BuiltInPreset) => {
    updateValue(p.getValue());
    setOpen(false);
  };

  const commitStartInput = () => {
    const d = parseDate(startInput);
    if (d) updateValue({ start: d, end: rangeValue.end });
    else setStartInput(rangeValue.start ? formatDate(rangeValue.start) : "");
  };

  const commitEndInput = () => {
    const d = parseDate(endInput);
    if (d) {
      updateValue({ start: rangeValue.start, end: d });
      if (rangeValue.start && d) setOpen(false);
    } else {
      setEndInput(rangeValue.end ? formatDate(rangeValue.end) : "");
    }
  };

  const panelKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") { setOpen(false); triggerRef.current?.focus(); }
    if (e.key === "Enter" && mode === "range" && rangeValue.start && rangeValue.end) {
      setOpen(false); triggerRef.current?.focus();
    }
  };

  const isPresetActive = (p: BuiltInPreset) => {
    const r = p.getValue();
    return (
      rangeValue.start?.toDateString() === r.start?.toDateString() &&
      rangeValue.end?.toDateString()   === r.end?.toDateString()
    );
  };

  const presetBtn = (p: BuiltInPreset, compact = false) => (
    <button
      key={p.label}
      type="button"
      onClick={() => handlePreset(p)}
      className={mergeClassNames(
        "rounded-md text-left text-xs font-medium transition-colors",
        compact ? "px-2 py-1.5" : "rounded-full border px-3 py-1",
        isPresetActive(p)
          ? "bg-ds-accent-subtle text-ds-accent" + (compact ? "" : " border-ds-accent")
          : compact
            ? "text-ds-2 hover:bg-ds-surface-2 hover:text-ds-1"
            : "border-ds-border-2 bg-ds-surface-2 text-ds-2 hover:border-ds-border-accent hover:text-ds-1",
      )}
    >
      {p.label}
    </button>
  );

  // ── Trigger ───────────────────────────────────────────────────────────────────

  const trigger = (
    <div ref={containerRef} className={mergeClassNames("w-full space-y-2", className)}>
      {label && <p className="text-sm font-medium text-ds-1">{label}</p>}
      <div className="relative">
        <motion.div
          style={{ backgroundImage: disabled ? "none" : motionBg }}
          onMouseMove={!disabled ? handleMouseMove : undefined}
          onMouseEnter={!disabled ? () => setVisible(true)  : undefined}
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
              className={mergeClassNames(
                "flex w-full items-center justify-between rounded-md border border-ds-border-field bg-ds-surface-1 px-3 py-2 text-sm transition duration-400 ease-in-out",
                disabled && "cursor-not-allowed opacity-50",
              )}
              style={{ paddingInlineEnd: "2.5rem" }}
              onClick={() => !disabled && setOpen((p) => !p)}
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
                className="absolute top-1/2 inline-flex h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full text-ds-2 transition-colors hover:bg-ds-accent-subtle hover:text-ds-1"
                style={{ insetInlineEnd: "0.75rem" }}
                onClick={handleClear}
                aria-label={mode === "range" ? "Clear selected date range" : "Clear selected date"}
              >
                <CloseIcon className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            ) : (
              <span
                className="pointer-events-none absolute top-1/2 -translate-y-1/2 text-ds-2"
                style={{ insetInlineEnd: "0.75rem" }}
                aria-hidden="true"
              >
                📅
              </span>
            )}
          </div>
        </motion.div>
      </div>
      {helperText && <p className="text-xs text-ds-2">{helperText}</p>}
    </div>
  );

  // ── Mobile bottom sheet (range mode) ─────────────────────────────────────────

  const mobileSheet =
    isMobile && open && mode === "range" && !disabled && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-50 flex flex-col" role="dialog" aria-modal="true">
            <div className="flex-1 bg-black/40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="flex max-h-[90vh] flex-col rounded-t-2xl bg-ds-surface-1 shadow-2xl"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 pb-3 pt-5">
                <p className="text-base font-semibold text-ds-1">Select date range</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-7 w-7 items-center justify-center rounded-full text-ds-3 hover:bg-ds-surface-2 hover:text-ds-1"
                  aria-label="Close"
                >
                  <CloseIcon className="h-4 w-4" />
                </button>
              </div>

              {/* Preset chips */}
              <div className="flex flex-wrap gap-2 px-5 pb-3">
                {RANGE_PRESETS.map((p) => presetBtn(p, false))}
              </div>

              {/* Scrollable months */}
              <div className="flex-1 overflow-y-auto px-5 pb-4">
                {[0, 1, 2].map((offset) => {
                  const d = new Date(todayDate.getFullYear(), todayDate.getMonth() + offset, 1);
                  const m = d.getMonth();
                  const y = d.getFullYear();
                  return (
                    <div key={`${m}-${y}`} className="mb-4">
                      <p className="mb-2 text-sm font-semibold text-ds-1">
                        {SHORT_MONTHS[m]} {y}
                      </p>
                      <Calendar
                        className={INNER_CAL}
                        showNav={false}
                        selectionMode="range"
                        month={m}
                        year={y}
                        range={rangeValue}
                        onRangeSelect={handleRangeSelect}
                        hoverDate={hoverDate}
                        onHoverDate={setHoverDate}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Footer buttons */}
              <div className="flex gap-3 border-t border-ds-border-2 px-5 py-4">
                <button
                  type="button"
                  onClick={() => updateValue({ ...emptyRange })}
                  className="flex-1 rounded-lg border border-ds-border-2 bg-ds-surface-2 py-2.5 text-sm font-medium text-ds-2 transition-colors hover:bg-ds-surface-3 hover:text-ds-1"
                >
                  Clear
                </button>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex-1 rounded-lg bg-ds-accent py-2.5 text-sm font-semibold text-ds-on-accent transition-opacity hover:opacity-90"
                >
                  Apply
                </button>
              </div>
            </motion.div>
          </div>,
          document.body,
        )
      : null;

  // ── Desktop range panel ───────────────────────────────────────────────────────

  const desktopRangePanel =
    !isMobile && open && mode === "range" && !disabled && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-60">
            <div className="absolute inset-0" aria-hidden="true" onPointerDown={() => setOpen(false)} />
            <div
              ref={panelRef}
              className="dropdown-panel absolute z-10 overflow-hidden rounded-xl border border-ds-border-2 bg-ds-surface-1/95 shadow-xl backdrop-blur-xl"
              style={{ top: panelPos.top, left: panelPos.left }}
              role="dialog"
              aria-modal="false"
              onKeyDown={panelKeyDown}
              tabIndex={-1}
            >
              <div className="flex">
                {/* Preset sidebar */}
                <div className="flex w-36 flex-col gap-0.5 border-r border-ds-border-2 p-2">
                  <p className="mb-1 px-2 text-[10px] font-semibold uppercase tracking-wider text-ds-3">
                    Quick select
                  </p>
                  {RANGE_PRESETS.map((p) => presetBtn(p, true))}
                </div>

                {/* Calendar area */}
                <div className="p-4">
                  {/* Text inputs */}
                  <div className="mb-3 flex items-center gap-2">
                    <input
                      type="text"
                      value={startInput}
                      onChange={(e) => setStartInput(e.target.value)}
                      onBlur={commitStartInput}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")  { e.stopPropagation(); commitStartInput(); }
                        if (e.key === "Escape") setOpen(false);
                      }}
                      placeholder="Start date"
                      aria-label="Start date"
                      className="w-32 rounded-md border border-ds-border-field bg-ds-surface-1 px-2.5 py-1.5 text-xs text-ds-1 placeholder:text-ds-3 transition-colors focus:border-ds-border-accent focus:outline-none"
                    />
                    <span className="text-xs text-ds-3">→</span>
                    <input
                      type="text"
                      value={endInput}
                      onChange={(e) => setEndInput(e.target.value)}
                      onBlur={commitEndInput}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")  { e.stopPropagation(); commitEndInput(); }
                        if (e.key === "Escape") setOpen(false);
                      }}
                      placeholder="End date"
                      aria-label="End date"
                      className="w-32 rounded-md border border-ds-border-field bg-ds-surface-1 px-2.5 py-1.5 text-xs text-ds-1 placeholder:text-ds-3 transition-colors focus:border-ds-border-accent focus:outline-none"
                    />
                  </div>

                  {/* Dual calendar */}
                  <div>
                    {/* Shared nav row */}
                    <div className="mb-2 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => { const d = new Date(leftYear, leftMonth - 1, 1); setLeftMonth(d.getMonth()); setLeftYear(d.getFullYear()); }}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ds-border-field bg-ds-surface-1 text-sm text-ds-2 transition-colors hover:border-ds-border-accent hover:text-ds-1"
                        aria-label="Previous month"
                      >
                        ←
                      </button>
                      <div className="flex flex-1 justify-around px-2">
                        <span className="text-sm font-semibold text-ds-1">
                          {SHORT_MONTHS[leftMonth]} {leftYear}
                        </span>
                        <span className="text-sm font-semibold text-ds-1">
                          {SHORT_MONTHS[rightMonth]} {rightYear}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => { const d = new Date(leftYear, leftMonth + 1, 1); setLeftMonth(d.getMonth()); setLeftYear(d.getFullYear()); }}
                        className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-ds-border-field bg-ds-surface-1 text-sm text-ds-2 transition-colors hover:border-ds-border-accent hover:text-ds-1"
                        aria-label="Next month"
                      >
                        →
                      </button>
                    </div>

                    {/* Two months side by side */}
                    <div className="flex gap-5">
                      <Calendar
                        className={INNER_CAL}
                        showNav={false}
                        selectionMode="range"
                        month={leftMonth}
                        year={leftYear}
                        range={rangeValue}
                        onRangeSelect={handleRangeSelect}
                        hoverDate={hoverDate}
                        onHoverDate={setHoverDate}
                      />
                      <div className="w-px self-stretch bg-ds-border-2" />
                      <Calendar
                        className={INNER_CAL}
                        showNav={false}
                        selectionMode="range"
                        month={rightMonth}
                        year={rightYear}
                        range={rangeValue}
                        onRangeSelect={handleRangeSelect}
                        hoverDate={hoverDate}
                        onHoverDate={setHoverDate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>,
          document.body,
        )
      : null;

  // ── Single-date panel (& mobile single) ──────────────────────────────────────

  const singlePanel =
    open && mode === "single" && !disabled && typeof document !== "undefined"
      ? createPortal(
          <div className="fixed inset-0 z-60">
            <div className="absolute inset-0" aria-hidden="true" onPointerDown={() => setOpen(false)} />
            <div
              ref={panelRef}
              className="dropdown-panel absolute z-10"
              style={{ top: panelPos.top, left: panelPos.left, minWidth: panelPos.minWidth }}
              role="dialog"
              aria-modal="false"
              onKeyDown={panelKeyDown}
            >
              <Calendar
                value={singleValue ?? null}
                selectionMode="single"
                onSelect={(date) => { updateValue(date); setOpen(false); }}
              />
              {presets?.length ? (
                <div className="mt-3 flex flex-wrap gap-2 rounded-lg border border-ds-border-2 bg-ds-surface-1/95 p-3 shadow-xl backdrop-blur-xl">
                  {presets.map((p) => (
                    <button
                      key={p.label}
                      type="button"
                      className="rounded-full border border-ds-border-field px-3 py-1 text-xs text-ds-2 transition-colors hover:border-ds-border-accent hover:bg-ds-accent-subtle hover:text-ds-1"
                      onClick={() => { updateValue(p.value()); setOpen(false); }}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>,
          document.body,
        )
      : null;

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <>
      {trigger}
      {mobileSheet}
      {desktopRangePanel}
      {singlePanel}
    </>
  );
};
