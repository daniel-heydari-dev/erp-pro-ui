import type { FC, SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  className?: string;
  title?: string;
  titleId?: string;
  color?: string;
  strokeWidth?: number;
};

export const RingLoaderIcon: FC<IconProps> = ({
  className,
  title,
  titleId,
  color = "currentColor",
  strokeWidth = 4,
  ...props
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 50 50"
    fill="none"
    aria-labelledby={title ? titleId : undefined}
    role="img"
    {...props}
  >
    {title && <title id={titleId}>{title}</title>}
    <circle
      cx="25"
      cy="25"
      r="20"
      stroke={color}
      strokeWidth={strokeWidth}
      opacity="0.2"
    />
    <circle
      cx="25"
      cy="25"
      r="20"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeDasharray="80 200"
      strokeDashoffset="0"
    />
  </svg>
);
