import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
  titleId?: string;
};

export const PlayIcon: FC<IconProps> = ({
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
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-labelledby={title ? titleId : undefined}
    role="img"
    {...props}
  >
    {title && <title id={titleId}>{title}</title>}
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);
