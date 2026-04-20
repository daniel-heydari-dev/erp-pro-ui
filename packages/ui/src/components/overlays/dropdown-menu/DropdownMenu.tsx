import { useEffect, useRef, useState } from "react";

import { mergeClassNames } from "../../../utils";
import type { DropdownMenuProps } from "./types";

export function DropdownMenu({
  trigger,
  children,
  open,
  onOpenChange,
  className,
  panelClassName,
  animationClassName,
  closeOnItemClick = false,
}: DropdownMenuProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [internalOpen, setInternalOpen] = useState(false);
  const isControlled = open !== undefined;
  const resolvedOpen = isControlled ? open : internalOpen;

  const setOpen = (nextOpen: boolean | ((current: boolean) => boolean)) => {
    const finalValue =
      typeof nextOpen === "function"
        ? nextOpen(resolvedOpen)
        : nextOpen;

    if (!isControlled) {
      setInternalOpen(finalValue);
    }

    onOpenChange?.(finalValue);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={mergeClassNames("relative inline-flex", className)}>
      <div
        className="inline-flex"
        onMouseDown={(event) => {
          event.preventDefault();
          setOpen((current) => !current);
        }}
      >
        {trigger}
      </div>

      <div
        className={mergeClassNames(
          "absolute z-[1200] transition-all duration-300 ease-in-out",
          animationClassName ?? "origin-top-right",
          resolvedOpen ? "scale-100" : "scale-0",
          panelClassName,
        )}
        onClick={() => {
          if (closeOnItemClick) {
            setOpen(false);
          }
        }}
      >
        {children}
      </div>
    </div>
  );
}
