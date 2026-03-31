import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
  titleId?: string;
};

export const SelectionIcon: FC<IconProps> = ({
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
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth="1.75"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby={title ? titleId : undefined}
    role="img"
    {...props}
  >
    {title && <title id={titleId}>{title}</title>}
    <path d="M4.25 10V18.85A1.25 1.25 0 0 0 5.5 20.1H14" />
    <path d="M7 5.75h10A1.25 1.25 0 0 1 18.25 7v10A1.25 1.25 0 0 1 17 18.25H7A1.25 1.25 0 0 1 5.75 17V7A1.25 1.25 0 0 1 7 5.75Z" />
    <path d="m9.25 12 2.25 2.25 4.25-4.5" />
  </svg>
);
