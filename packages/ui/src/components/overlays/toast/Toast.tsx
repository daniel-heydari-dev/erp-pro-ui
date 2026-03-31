import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  CloseIcon,
  InfoCircleIcon,
  LoaderIcon,
  XCircleIcon,
} from "../../icons";

// ============================================================================
// Types
// ============================================================================

export type ToastType =
  | "success"
  | "error"
  | "warning"
  | "info"
  | "default"
  | "loading";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastAction {
  label: string;
  onClick: () => void;
}

export interface Toast {
  id: string;
  type: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
  action?: ToastAction;
  dismissible?: boolean;
  onDismiss?: () => void;
  onAutoClose?: () => void;
  promise?: {
    loading: string;
    success: string | ((data: unknown) => string);
    error: string | ((error: unknown) => string);
  };
}

export interface ToastOptions {
  type?: ToastType;
  title?: string;
  description?: string;
  duration?: number;
  icon?: React.ReactNode;
  action?: ToastAction;
  dismissible?: boolean;
  onDismiss?: () => void;
  onAutoClose?: () => void;
}

export interface ToastContextValue {
  toasts: Toast[];
  toast: (options: ToastOptions | string) => string;
  success: (options: ToastOptions | string) => string;
  error: (options: ToastOptions | string) => string;
  warning: (options: ToastOptions | string) => string;
  info: (options: ToastOptions | string) => string;
  loading: (options: ToastOptions | string) => string;
  promise: <T>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
  ) => Promise<T>;
  dismiss: (id: string) => void;
  dismissAll: () => void;
  update: (id: string, options: Partial<ToastOptions>) => void;
}

export interface ToastProviderProps {
  children: React.ReactNode;
  /** Default position for toasts */
  position?: ToastPosition;
  /** Default duration in milliseconds */
  duration?: number;
  /** Maximum number of visible toasts */
  maxToasts?: number;
  /** Gap between toasts */
  gap?: number;
  /** Whether toasts are dismissible by default */
  dismissible?: boolean;
  /** Custom className for the toast container */
  containerClassName?: string;
}

export interface ToastItemProps {
  toast: Toast;
  onDismiss: (id: string) => void;
  position: ToastPosition;
}

// ============================================================================
// Context
// ============================================================================

const ToastContext = createContext<ToastContextValue | null>(null);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// ============================================================================
// Styles
// ============================================================================

const typeStyles: Record<
  ToastType,
  { bg: string; icon: string; iconBg: string }
> = {
  success: {
    bg: "bg-white dark:bg-neutral-800 border-green-200 dark:border-green-800",
    icon: "text-green-500",
    iconBg: "bg-green-100 dark:bg-green-900/30",
  },
  error: {
    bg: "bg-white dark:bg-neutral-800 border-red-200 dark:border-red-800",
    icon: "text-red-500",
    iconBg: "bg-red-100 dark:bg-red-900/30",
  },
  warning: {
    bg: "bg-white dark:bg-neutral-800 border-amber-200 dark:border-amber-800",
    icon: "text-amber-500",
    iconBg: "bg-amber-100 dark:bg-amber-900/30",
  },
  info: {
    bg: "bg-white dark:bg-neutral-800 border-blue-200 dark:border-blue-800",
    icon: "text-blue-500",
    iconBg: "bg-blue-100 dark:bg-blue-900/30",
  },
  default: {
    bg: "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
    icon: "text-neutral-500",
    iconBg: "bg-neutral-100 dark:bg-neutral-700",
  },
  loading: {
    bg: "bg-white dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700",
    icon: "text-primary-500",
    iconBg: "bg-primary-100 dark:bg-primary-900/30",
  },
};

const positionStyles: Record<ToastPosition, string> = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

const getMotionVariants = (position: ToastPosition) => {
  const isTop = position.startsWith("top");
  const isCenter = position.includes("center");
  const isLeft = position.includes("left");

  return {
    initial: {
      opacity: 0,
      y: isTop ? -20 : 20,
      x: isCenter ? 0 : isLeft ? -20 : 20,
      scale: 0.95,
    },
    animate: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      y: isTop ? -20 : 20,
      scale: 0.95,
      transition: { duration: 0.15 },
    },
  };
};

// ============================================================================
// Toast Item Component
// ============================================================================

const ToastItem = forwardRef<HTMLDivElement, ToastItemProps>(
  ({ toast, onDismiss, position }, ref) => {
    const {
      type,
      title,
      description,
      icon,
      action,
      dismissible = true,
      duration,
    } = toast;
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const [progress, setProgress] = useState(100);
    const [isPaused, setIsPaused] = useState(false);

    const defaultIcons: Record<ToastType, React.ReactNode> = {
      success: <CheckCircleIcon className="w-5 h-5" aria-hidden="true" />,
      error: <XCircleIcon className="w-5 h-5" aria-hidden="true" />,
      warning: <AlertTriangleIcon className="w-5 h-5" aria-hidden="true" />,
      info: <InfoCircleIcon className="w-5 h-5" aria-hidden="true" />,
      loading: (
        <LoaderIcon className="w-5 h-5 animate-spin" aria-hidden="true" />
      ),
      default: null,
    };

    // Auto-dismiss timer with progress
    useEffect(() => {
      if (duration && duration > 0 && type !== "loading") {
        const startTime = Date.now();
        const interval = 50;

        const updateProgress = () => {
          if (isPaused) return;

          const elapsed = Date.now() - startTime;
          const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
          setProgress(remaining);

          if (remaining <= 0) {
            toast.onAutoClose?.();
            onDismiss(toast.id);
          }
        };

        timerRef.current = setInterval(updateProgress, interval);

        return () => {
          if (timerRef.current) {
            clearInterval(timerRef.current);
          }
        };
      }
    }, [duration, toast.id, type, isPaused, onDismiss, toast]);

    const handleMouseEnter = () => setIsPaused(true);
    const handleMouseLeave = () => setIsPaused(false);

    const styles = typeStyles[type];
    const displayIcon = icon ?? defaultIcons[type];
    const variants = getMotionVariants(position);

    return (
      <motion.div
        ref={ref}
        layout
        initial={variants.initial}
        animate={variants.animate}
        exit={variants.exit}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`
          relative flex items-start gap-3 p-4 pr-10
          rounded-lg shadow-lg border min-w-[320px] max-w-[420px]
          overflow-hidden
          ${styles.bg}
        `}
        role="alert"
        aria-live="polite"
      >
        {/* Progress bar */}
        {duration && duration > 0 && type !== "loading" && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100 dark:bg-neutral-700">
            <motion.div
              className={`h-full ${
                type === "success"
                  ? "bg-green-500"
                  : type === "error"
                    ? "bg-red-500"
                    : type === "warning"
                      ? "bg-amber-500"
                      : type === "info"
                        ? "bg-blue-500"
                        : "bg-neutral-400"
              }`}
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.05 }}
            />
          </div>
        )}

        {/* Icon */}
        {displayIcon && (
          <div
            className={`flex-shrink-0 p-1.5 rounded-full ${styles.iconBg} ${styles.icon}`}
          >
            {displayIcon}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-semibold text-neutral-900 dark:text-white text-sm">
              {title}
            </p>
          )}
          {description && (
            <p
              className={`text-sm text-neutral-600 dark:text-neutral-300 ${
                title ? "mt-1" : ""
              }`}
            >
              {description}
            </p>
          )}
          {action && (
            <button
              onClick={() => {
                action.onClick();
                onDismiss(toast.id);
              }}
              className="mt-2 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
            >
              {action.label}
            </button>
          )}
        </div>

        {/* Dismiss button */}
        {dismissible && (
          <button
            onClick={() => {
              toast.onDismiss?.();
              onDismiss(toast.id);
            }}
            className="absolute top-3 right-3 p-1 rounded-full text-neutral-400 hover:text-neutral-600 dark:text-neutral-500 dark:hover:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Dismiss"
          >
            <CloseIcon className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </motion.div>
    );
  },
);

ToastItem.displayName = "ToastItem";

// ============================================================================
// Toast Provider Component
// ============================================================================

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = "bottom-right",
  duration = 5000,
  maxToasts = 5,
  gap = 12,
  dismissible = true,
  containerClassName = "",
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const toastIdCounter = useRef(0);

  const generateId = () => {
    toastIdCounter.current += 1;
    return `toast-${toastIdCounter.current}-${Date.now()}`;
  };

  const addToast = useCallback(
    (options: ToastOptions | string, type: ToastType = "default"): string => {
      const id = generateId();
      const toastOptions: ToastOptions =
        typeof options === "string" ? { description: options } : options;

      const newToast: Toast = {
        id,
        type: toastOptions.type ?? type,
        title: toastOptions.title,
        description: toastOptions.description,
        duration: toastOptions.duration ?? duration,
        icon: toastOptions.icon,
        action: toastOptions.action,
        dismissible: toastOptions.dismissible ?? dismissible,
        onDismiss: toastOptions.onDismiss,
        onAutoClose: toastOptions.onAutoClose,
      };

      setToasts((prev) => {
        const updated = [...prev, newToast];
        // Keep only the last maxToasts
        return updated.slice(-maxToasts);
      });

      return id;
    },
    [duration, dismissible, maxToasts],
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const update = useCallback((id: string, options: Partial<ToastOptions>) => {
    setToasts((prev) =>
      prev.map((t) =>
        t.id === id
          ? {
              ...t,
              ...options,
              type: options.type ?? t.type,
            }
          : t,
      ),
    );
  }, []);

  const toast = useCallback(
    (options: ToastOptions | string) => addToast(options, "default"),
    [addToast],
  );

  const success = useCallback(
    (options: ToastOptions | string) => addToast(options, "success"),
    [addToast],
  );

  const error = useCallback(
    (options: ToastOptions | string) => addToast(options, "error"),
    [addToast],
  );

  const warning = useCallback(
    (options: ToastOptions | string) => addToast(options, "warning"),
    [addToast],
  );

  const info = useCallback(
    (options: ToastOptions | string) => addToast(options, "info"),
    [addToast],
  );

  const loading = useCallback(
    (options: ToastOptions | string) => {
      const toastOptions: ToastOptions =
        typeof options === "string" ? { description: options } : options;
      return addToast(
        { ...toastOptions, duration: 0, dismissible: false },
        "loading",
      );
    },
    [addToast],
  );

  const promise = useCallback(
    async <T,>(
      promiseToResolve: Promise<T>,
      options: {
        loading: string;
        success: string | ((data: T) => string);
        error: string | ((error: unknown) => string);
      },
    ): Promise<T> => {
      const id = loading(options.loading);

      try {
        const result = await promiseToResolve;
        const successMessage =
          typeof options.success === "function"
            ? options.success(result)
            : options.success;
        update(id, {
          type: "success",
          description: successMessage,
          duration,
          dismissible: true,
        });
        return result;
      } catch (err) {
        const errorMessage =
          typeof options.error === "function"
            ? options.error(err)
            : options.error;
        update(id, {
          type: "error",
          description: errorMessage,
          duration,
          dismissible: true,
        });
        throw err;
      }
    },
    [loading, update, duration],
  );

  const contextValue: ToastContextValue = {
    toasts,
    toast,
    success,
    error,
    warning,
    info,
    loading,
    promise,
    dismiss,
    dismissAll,
    update,
  };

  const isTop = position.startsWith("top");

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <div
        className={`fixed z-[100] flex flex-col pointer-events-none ${positionStyles[position]} ${containerClassName}`}
        style={{ gap: `${gap}px` }}
      >
        <AnimatePresence mode="popLayout">
          {(isTop ? toasts : [...toasts].reverse()).map((t) => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onDismiss={dismiss} position={position} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// ============================================================================
// Standalone toast function (for use without hooks)
// ============================================================================

let globalToast: ToastContextValue | null = null;

export const setGlobalToast = (toastContext: ToastContextValue) => {
  globalToast = toastContext;
};

export const toastStandalone = {
  show: (options: ToastOptions | string) => globalToast?.toast(options),
  success: (options: ToastOptions | string) => globalToast?.success(options),
  error: (options: ToastOptions | string) => globalToast?.error(options),
  warning: (options: ToastOptions | string) => globalToast?.warning(options),
  info: (options: ToastOptions | string) => globalToast?.info(options),
  loading: (options: ToastOptions | string) => globalToast?.loading(options),
  promise: <T,>(
    promise: Promise<T>,
    options: {
      loading: string;
      success: string | ((data: T) => string);
      error: string | ((error: unknown) => string);
    },
  ) => globalToast?.promise(promise, options),
  dismiss: (id: string) => globalToast?.dismiss(id),
  dismissAll: () => globalToast?.dismissAll(),
};

// ============================================================================
// Exports
// ============================================================================

export default ToastProvider;
export { ToastItem };
