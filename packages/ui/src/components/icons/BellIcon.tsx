import type { FC, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string; // Allows passing Tailwind or custom class names
  title?: string; // Accessible title for screen readers
  titleId?: string; // ID for the title
};

export const BellIcon: FC<IconProps> = ({
  className,
  title,
  titleId,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="none"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    strokeLinejoin="round"
    strokeLinecap="round"
    stroke="currentColor"
    aria-labelledby={title ? titleId : undefined}
    role="img"
    {...props}
  >
    {title && <title id={titleId}>{title}</title>}
    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
    <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
  </svg>
);
