import { useRef, useState, type FC, type ReactNode } from "react";
import { createPortal } from "react-dom";

interface TabTooltipProps {
  content: string;
  children: ReactNode;
}

export const TabTooltip: FC<TabTooltipProps> = ({ content, children }) => {
  const [anchor, setAnchor] = useState<{ top: number; left: number } | null>(
    null,
  );
  const ref = useRef<HTMLDivElement>(null);

  const show = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setAnchor({ top: r.top - 8, left: r.left + r.width / 2 });
  };
  const hide = () => setAnchor(null);

  return (
    <div
      ref={ref}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {anchor !== null && typeof document !== "undefined"
        ? createPortal(
            <span
              role="tooltip"
              className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-md border border-ds-border-2 bg-ds-surface-2 px-2.5 py-1.5 text-[11px] leading-tight text-ds-1 shadow-md"
              style={{ top: anchor.top, left: anchor.left }}
            >
              {content}
            </span>,
            document.body,
          )
        : null}
    </div>
  );
};
