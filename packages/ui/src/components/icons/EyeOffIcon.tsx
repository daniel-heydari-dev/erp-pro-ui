import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string; // Allows passing Tailwind or custom class names
  title?: string; // Accessible title for screen readers
  titleId?: string; // ID for the title
};

export const EyeOffIcon: FC<IconProps> = ({
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
    aria-labelledby={title ? titleId : undefined}
    role="img"
    {...props}
  >
    {title && <title id={titleId}>{title}</title>}
    <g id="Icon / User">
      <path
        id="Vector"
        d="M19 21V19C19 17.9391 18.5786 16.9217 17.8284 16.1716C17.0783 15.4214 16.0609 15 15 15H9C7.93913 15 6.92172 15.4214 6.17157 16.1716C5.42143 16.9217 5 17.9391 5 19V21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  </svg>
);
