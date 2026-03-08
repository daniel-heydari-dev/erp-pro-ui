import type { FC, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string; // Supports Tailwind CSS or custom class names
  title?: string; // Accessible title for screen readers
  titleId?: string; // ID for the title (optional)
};

export const CheckIcon: FC<IconProps> = ({
  className,
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
    aria-labelledby={title ? titleId : undefined} // Adds accessibility support
    role="img"
    {...props}
  >
    {title && <title id={titleId}>{title}</title>}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);
