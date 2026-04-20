import type { CSSProperties, MouseEvent, ReactNode } from "react";

export type SidebarDirection = "auto" | "ltr" | "rtl";

export interface SidebarItem {
  id: string;
  label: ReactNode;
  icon?: ReactNode;
  href?: string;
  hidden?: boolean;
  disabled?: boolean;
  active?: boolean;
  badge?: ReactNode;
  onSelect?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export interface SidebarNavLinkProps {
  href?: string;
  className?: string;
  style?: CSSProperties;
  borderRadius?: CSSProperties["borderRadius"];
  children?: ReactNode;
  disabled?: boolean;
  target?: string;
  rel?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => void;
}

export interface SidebarLinksProps {
  items: readonly SidebarItem[];
  activePath?: string;
  onItemSelect?: (
    item: SidebarItem,
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  direction?: SidebarDirection;
  className?: string;
  itemClassName?: string;
  activeItemClassName?: string;
}

export interface SidebarProps {
  items: readonly SidebarItem[];
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  activePath?: string;
  onItemSelect?: (
    item: SidebarItem,
    event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  ) => void;
  direction?: SidebarDirection;
  navbar?: ReactNode;
  brand?: ReactNode;
  footer?: ReactNode;
  className?: string;
  linksClassName?: string;
  itemClassName?: string;
  activeItemClassName?: string;
  overlayClassName?: string;
  closeLabel?: string;
  showOverlay?: boolean;
}
