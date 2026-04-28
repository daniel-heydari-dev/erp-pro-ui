import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DrawerProps, DrawerPosition } from "./types";
import { useOverlayEffects } from "../../shared/overlay";

const basePanel =
  "relative flex flex-col overflow-hidden rounded-2xl border border-ds-border-2 bg-ds-surface-1/95 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22),0_8px_28px_rgba(15,23,42,0.14)] ring-1 ring-inset ring-ds-border-3/35 backdrop-blur-2xl backdrop-saturate-150";

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
          className="fixed inset-0 z-200 flex overlay-backdrop"
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-ds-canvas/55 backdrop-blur-[3px]"
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
              className="pointer-events-none absolute inset-0 bg-linear-to-b from-ds-accent/10 via-transparent to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-ds-accent/16 to-transparent"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -end-10 top-[-72px] h-40 w-40 rounded-full bg-ds-accent/18 blur-3xl"
            />
            <button
              type="button"
              className="absolute end-4 top-4 z-20 inline-flex h-9 w-9 items-center justify-center rounded-full border border-ds-border-2 bg-ds-surface-2 text-lg font-light text-ds-1 shadow-sm backdrop-blur-md transition-all duration-200 hover:bg-ds-surface-3"
              aria-label="Close drawer"
              onClick={() => onOpenChange?.(false)}
            >
              ×
            </button>
            <div className="relative z-10 flex h-full flex-col">
              {(title || description) && (
                <header className="space-y-1 pe-10">
                  {title && (
                    <h2 className="text-lg font-semibold tracking-tight text-ds-1">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-ds-2">{description}</p>
                  )}
                </header>
              )}
              {children && (
                <div className="mt-4 flex-1 overflow-auto space-y-4 pe-1">
                  {children}
                </div>
              )}
              {footer && (
                <footer className="mt-6 border-t border-ds-border-2 pt-4">
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
