import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string; // Allows passing Tailwind or custom class names
  title?: string; // Accessible title for screen readers
  titleId?: string; // ID for the title
};

export const ArrowUpDownIcon: FC<IconProps> = ({
  className = "text-ds-1",
  title,
  titleId,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="24"
    height="24"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    aria-labelledby={title ? titleId : undefined}
    role="img"
    {...props}
  >
    {title && <title id={titleId}>{title}</title>}

    <path
      d="M21 16L17 20M17 20L13 16M17 20V4M3 8L7 4M7 4L11 8M7 4V20"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
