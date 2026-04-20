import { mergeClassNames } from "../../../utils";

export interface HamburgerIconProps {
  isOpen: boolean;
  className?: string;
}

const lineClassName =
  "block h-0.5 w-full rounded-lg bg-current transition-all duration-300 ease-in-out";

export function HamburgerIcon({ isOpen, className }: HamburgerIconProps) {
  return (
    <span
      className={mergeClassNames(
        "relative flex h-4 w-5 flex-col items-center justify-between",
        className,
      )}
      aria-hidden="true"
    >
      <span
        className={mergeClassNames(
          lineClassName,
          isOpen && "translate-y-[5px] rotate-45 transform",
        )}
      />
      <span className={mergeClassNames(lineClassName, isOpen && "w-0")} />
      <span
        className={mergeClassNames(
          lineClassName,
          isOpen && "-translate-y-[9px] -rotate-45 transform",
        )}
      />
    </span>
  );
}
