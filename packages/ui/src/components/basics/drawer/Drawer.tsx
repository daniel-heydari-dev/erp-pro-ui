import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { DrawerProps, DrawerPosition } from "./types";
import { useOverlayEffects } from "../../shared/overlay";

const basePanel =
  "relative flex flex-col backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70 p-6 shadow-2xl border-white/20 dark:border-white/10 rounded-sm";

const positionClasses: Record<DrawerPosition, string> = {
  right:
    "h-[calc(100%-8px)] my-1 mr-1 w-full max-w-md ml-auto border",
  left: "h-[calc(100%-8px)] my-1 ml-1 w-full max-w-md mr-auto border",
  top: "w-[calc(100%-8px)] mx-1 mt-1 max-h-[80vh] border",
  bottom:
    "w-[calc(100%-8px)] mx-1 mb-1 max-h-[80vh] mt-auto border",
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
            className="fixed inset-0 bg-black/40"
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
            <button
              type="button"
              className="absolute right-4 top-4 text-neutral-500 dark:text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-white text-xl font-light"
              aria-label="Close drawer"
              onClick={() => onOpenChange?.(false)}
            >
              ×
            </button>
            {(title || description) && (
              <header className="space-y-1 pr-6">
                {title && (
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-white">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">
                    {description}
                  </p>
                )}
              </header>
            )}
            {children && (
              <div className="mt-4 flex-1 overflow-auto space-y-4">
                {children}
              </div>
            )}
            {footer && <footer className="mt-6">{footer}</footer>}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
