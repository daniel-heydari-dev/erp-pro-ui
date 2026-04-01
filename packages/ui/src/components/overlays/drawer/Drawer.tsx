import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DrawerProps, DrawerPosition } from "./types";
import { useOverlayEffects } from "../../shared/overlay";

const basePanel =
  "relative flex flex-col overflow-hidden rounded-2xl border border-white/30 bg-gradient-to-br from-white/80 via-white/68 to-white/52 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22),0_8px_28px_rgba(15,23,42,0.14)] ring-1 ring-inset ring-white/25 backdrop-blur-2xl backdrop-saturate-150 dark:border-white/10 dark:from-neutral-950/84 dark:via-neutral-950/72 dark:to-neutral-900/58 dark:shadow-[0_28px_90px_rgba(0,0,0,0.52),0_10px_30px_rgba(0,0,0,0.3)] dark:ring-white/10";

const positionClasses: Record<DrawerPosition, string> = {
  right: "h-[calc(100%-8px)] my-1 mr-1 w-full max-w-md ml-auto border",
  left: "h-[calc(100%-8px)] my-1 ml-1 w-full max-w-md mr-auto border",
  top: "w-[calc(100%-8px)] mx-1 mt-1 max-h-[80vh] border",
  bottom: "w-[calc(100%-8px)] mx-1 mb-1 max-h-[80vh] mt-auto border",
};

const getVariants = (position: DrawerPosition) => {
  switch (position) {
    case "left":
      return { hidden: { x: "-100%" }, visible: { x: 0 } };
    case "right":
      return { hidden: { x: "100%" }, visible: { x: 0 } };
    case "top":
      return { hidden: { y: "-100%" }, visible: { y: 0 } };
    case "bottom":
      return { hidden: { y: "100%" }, visible: { y: 0 } };
  }
};

export const Drawer = ({
  open,
  onOpenChange,
  title,
  description,
  position = "right",
  children,
  footer,
}: DrawerProps) => {
  const panelRef = useRef<HTMLDivElement | null>(null);
  useOverlayEffects(panelRef, open);

  useEffect(() => {
    if (!open || typeof window === "undefined") return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange?.(false);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onOpenChange]);

  const variants = getVariants(position);

  return (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 z-40 flex overlay-backdrop"
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-slate-950/24 backdrop-blur-[3px] dark:bg-black/44"
            onClick={() => onOpenChange?.(false)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`${basePanel} ${positionClasses[position]}`}
            tabIndex={-1}
            ref={panelRef}
            onClick={(event) => event.stopPropagation()}
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={variants}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-white/30 via-white/10 to-transparent dark:from-white/10 dark:via-white/[0.03] dark:to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/40 to-transparent dark:from-white/12"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 top-[-72px] h-40 w-40 rounded-full bg-white/35 blur-3xl dark:bg-sky-200/10"
            />
            <button
              type="button"
              className="absolute right-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/35 bg-white/45 text-lg font-light text-foreground shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-white/72 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10"
              aria-label="Close drawer"
              onClick={() => onOpenChange?.(false)}
            >
              ×
            </button>
            <div className="relative z-10 flex h-full flex-col">
              {(title || description) && (
                <header className="space-y-1 pr-10">
                  {title && (
                    <h2 className="text-lg font-semibold tracking-tight text-foreground">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-muted-foreground">
                      {description}
                    </p>
                  )}
                </header>
              )}
              {children && (
                <div className="mt-4 flex-1 overflow-auto space-y-4 pr-1">
                  {children}
                </div>
              )}
              {footer && (
                <footer className="mt-6 border-t border-white/20 pt-4 dark:border-white/10">
                  {footer}
                </footer>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
