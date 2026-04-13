import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string; // Allows passing Tailwind or custom class names
  title?: string; // Accessible title for screen readers
  titleId?: string; // ID for the title
};

export const ChevronsRightIcon: FC<IconProps> = ({
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
      d="M6 17L11 12L6 7M13 17L18 12L13 7"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
