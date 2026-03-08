export interface TooltipProps {
  /** The content to display in the tooltip */
  content: React.ReactNode;
  /** The element that triggers the tooltip */
  children: React.ReactElement;
  /** Position of the tooltip relative to the trigger */
  position?: "top" | "bottom" | "left" | "right";
  /** How the tooltip is triggered */
  trigger?: "hover" | "click" | "focus";
  /** Delay before showing tooltip (ms) */
  delayShow?: number;
  /** Delay before hiding tooltip (ms) */
  delayHide?: number;
  /** Whether the tooltip is disabled */
  disabled?: boolean;
  /** Custom className for the tooltip */
  className?: string;
  /** Whether to show an arrow pointing to the trigger */
  arrow?: boolean;
  /** Maximum width of the tooltip */
  maxWidth?: number;
  /** Controlled open state */
  open?: boolean;
  /** Callback when open state changes */
  onOpenChange?: (open: boolean) => void;
}
