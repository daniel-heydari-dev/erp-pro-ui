import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string; // Allows passing Tailwind or custom class names
  title?: string; // Accessible title for screen readers
  titleId?: string; // ID for the title
};

export const ChevronsLeftIcon: FC<IconProps> = ({
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
      d="M11 17L6 12L11 7M18 17L13 12L18 7"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
