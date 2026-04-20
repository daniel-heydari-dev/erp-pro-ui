import type { ReactNode } from "react";

export interface DropdownMenuProps {
  trigger: ReactNode;
  children: ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  panelClassName?: string;
  animationClassName?: string;
  closeOnItemClick?: boolean;
}
