import { useEffect, useRef, type ReactElement } from "react";
import { createPortal } from "react-dom";
import {
  motion,
  AnimatePresence,
  type TargetAndTransition,
} from "framer-motion";
import {
  AlertCircleIcon,
  AlertTriangleIcon,
  CheckCircleIcon,
  CloseIcon,
  InfoCircleIcon,
  LoaderIcon,
  QuestionCircleIcon,
} from "../../icons";
import type {
  DialogProps,
  DialogVariant,
  DialogAnimation,
  DialogPreset,
} from "./types";
export type { DialogProps, DialogVariant, DialogAnimation, DialogPreset };
import { useOverlayEffects } from "../../shared/overlay";

// Animation preset type
interface AnimationPreset {
  initial: TargetAndTransition;
  animate: TargetAndTransition;
  exit: TargetAndTransition;
}

// Animation presets for different entrance/exit effects
const animationVariants: Record<DialogAnimation, AnimationPreset> = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.9, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: 10 },
  },
  slideUp: {
    initial: { opacity: 0, y: 100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
  },
  slideDown: {
    initial: { opacity: 0, y: -100 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
  },
  slideLeft: {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 50 },
  },
  slideRight: {
    initial: { opacity: 0, x: -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -50 },
  },
  elastic: {
    initial: { opacity: 0, scale: 0.5, y: 50 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.8, y: 20 },
  },
  bounce: {
    initial: { opacity: 0, scale: 0.3, y: -100 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.5, y: -50 },
  },
  flip: {
    initial: { opacity: 0, rotateX: -90, scale: 0.9 },
    animate: { opacity: 1, rotateX: 0, scale: 1 },
    exit: { opacity: 0, rotateX: 90, scale: 0.9 },
  },
  zoom: {
    initial: { opacity: 0, scale: 0, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0.5, rotate: 5 },
  },
};

// Transition configs for each animation type
const animationTransitions: Record<DialogAnimation, object> = {
  fade: { duration: 0.2 },
  scale: { type: "spring", damping: 25, stiffness: 300 },
  slideUp: { type: "spring", damping: 25, stiffness: 300 },
  slideDown: { type: "spring", damping: 25, stiffness: 300 },
  slideLeft: { type: "spring", damping: 25, stiffness: 300 },
  slideRight: { type: "spring", damping: 25, stiffness: 300 },
  elastic: { type: "spring", damping: 10, stiffness: 100 },
  bounce: { type: "spring", damping: 8, stiffness: 200, bounce: 0.5 },
  flip: { type: "spring", damping: 15, stiffness: 150 },
  zoom: { type: "spring", damping: 20, stiffness: 200 },
};

// Crystal glass panel base styling
const basePanel = `
  relative w-full max-w-lg rounded-2xl overflow-hidden
  border border-white/30 dark:border-white/10
  backdrop-blur-2xl backdrop-saturate-150
  bg-gradient-to-br from-white/80 via-white/70 to-white/60
  dark:from-neutral-900/90 dark:via-neutral-900/80 dark:to-neutral-800/70
  p-6
  shadow-[0_8px_32px_rgba(0,0,0,0.12),0_2px_8px_rgba(0,0,0,0.08)]
  dark:shadow-[0_8px_32px_rgba(0,0,0,0.5),0_2px_8px_rgba(0,0,0,0.3)]
  ring-1 ring-inset ring-white/20 dark:ring-white/5
`;

// Variant accent colors for icons and confirm buttons
const variantStyles: Record<
  DialogVariant,
  { icon: string; button: string; iconColor: string }
> = {
  default: {
    icon: "bg-accent-subtle",
    button: "bg-accent hover:bg-accent-hover text-on-accent",
    iconColor: "text-accent",
  },
  destructive: {
    icon: "bg-danger-subtle",
    button: "bg-destructive hover:opacity-90 text-white",
    iconColor: "text-danger",
  },
  success: {
    icon: "bg-success-subtle",
    button: "bg-success hover:opacity-90 text-white",
    iconColor: "text-success",
  },
  warning: {
    icon: "bg-warning-subtle",
    button: "bg-warning hover:opacity-90 text-neutral-950",
    iconColor: "text-warning",
  },
  info: {
    icon: "bg-info-subtle",
    button: "bg-info hover:opacity-90 text-white",
    iconColor: "text-info",
  },
};

// Default icons per variant
const VariantIcon = ({ variant }: { variant: DialogVariant }): ReactElement => {
  const icons: Record<DialogVariant, ReactElement> = {
    default: <QuestionCircleIcon className="w-6 h-6" aria-hidden="true" />,
    destructive: <AlertTriangleIcon className="w-6 h-6" aria-hidden="true" />,
    success: <CheckCircleIcon className="w-6 h-6" aria-hidden="true" />,
    warning: <AlertCircleIcon className="w-6 h-6" aria-hidden="true" />,
    info: <InfoCircleIcon className="w-6 h-6" aria-hidden="true" />,
  };
  return icons[variant];
};

// Loading spinner
const Spinner = () => (
  <LoaderIcon className="animate-spin w-4 h-4" aria-hidden="true" />
);

const DIALOG_ROOT_Z_INDEX = 2147483000;

export const Dialog = ({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  closeOnOverlay = true,
  showClose = true,
  className = "",
  widthClassName = "",
  variant = "default",
  preset = "custom",
  confirmLabel = "OK",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  icon,
  animation = "scale",
}: DialogProps) => {
  const currentAnimation = animationVariants[animation];
  const currentTransition = animationTransitions[animation];
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

  const handleOverlayClick = () => {
    if (closeOnOverlay) {
      onOpenChange?.(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange?.(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    if (!loading) {
      onOpenChange?.(false);
    }
  };

  const styles = variantStyles[variant];
  const showPresetButtons = preset !== "custom" && !footer;
  const showCancelButton = preset === "confirm";

  // Render preset buttons
  const renderFooter = () => {
    if (footer) return footer;
    if (!showPresetButtons) return null;

    return (
      <div className="flex gap-3 justify-end w-full">
        {showCancelButton && (
          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 cursor-pointer
              py-2.5 px-4 text-sm font-semibold leading-none
              rounded-lg transition-all duration-200
              bg-neutral-200 dark:bg-neutral-700
              border border-neutral-300 dark:border-neutral-600
              text-neutral-800 dark:text-white
              shadow-sm hover:bg-neutral-300 dark:hover:bg-neutral-600
              active:scale-95 hover:opacity-90
              disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelLabel}
          </button>
        )}
        <button
          type="button"
          onClick={handleConfirm}
          disabled={loading}
          className={`inline-flex items-center justify-center gap-2 cursor-pointer
            py-2.5 px-4 text-sm font-semibold leading-none
            rounded-lg transition-all duration-200
            shadow-md hover:shadow-lg
            active:scale-95 hover:opacity-90
            disabled:opacity-50 disabled:cursor-not-allowed ${styles.button}`}
        >
          {loading && <Spinner />}
          {confirmLabel}
        </button>
      </div>
    );
  };

  const dialogNode = (
    <AnimatePresence>
      {open && (
        <div
          className="fixed inset-0 flex items-center justify-center px-4 overlay-backdrop"
          style={{ zIndex: DIALOG_ROOT_Z_INDEX }}
          role="presentation"
        >
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm"
            onClick={handleOverlayClick}
          />

          {/* Crystal panel */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={title}
            className={`${basePanel} overlay-panel ${className} ${widthClassName}`.trim()}
            tabIndex={-1}
            ref={panelRef}
            onClick={(event) => event.stopPropagation()}
            initial={currentAnimation.initial}
            animate={currentAnimation.animate}
            exit={currentAnimation.exit}
            transition={currentTransition}
          >
            {/* Subtle gradient overlay for crystal effect */}
            <div className="absolute inset-0 bg-linear-to-tr from-white/10 via-transparent to-white/5 dark:from-white/5 dark:to-transparent pointer-events-none rounded-2xl" />

            {/* Close button */}
            {showClose && (
              <button
                type="button"
                className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center
                  rounded-full transition-all duration-200
                  text-neutral-400 dark:text-neutral-500
                  hover:text-neutral-600 dark:hover:text-neutral-300
                  hover:bg-neutral-100/50 dark:hover:bg-white/10"
                aria-label="Close dialog"
                onClick={() => onOpenChange?.(false)}
              >
                <CloseIcon className="w-4 h-4" aria-hidden="true" />
              </button>
            )}

            {/* Content */}
            <div className="relative flex gap-4">
              {/* Icon */}
              {preset !== "custom" && (
                <div
                  className={`shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${styles.icon}`}
                >
                  <span className={styles.iconColor}>
                    {icon || <VariantIcon variant={variant} />}
                  </span>
                </div>
              )}

              {/* Text content */}
              <div className="flex-1 min-w-0">
                {title && (
                  <h2 className="text-lg font-semibold text-neutral-900 dark:text-white pr-8">
                    {title}
                  </h2>
                )}
                {description && (
                  <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Children content */}
            {children && (
              <div className="mt-4 space-y-4 relative">{children}</div>
            )}

            {/* Footer */}
            {(footer || showPresetButtons) && (
              <footer className="mt-6 flex justify-end gap-3 relative">
                {renderFooter()}
              </footer>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document === "undefined") {
    return dialogNode;
  }

  return createPortal(dialogNode, document.body);
};
