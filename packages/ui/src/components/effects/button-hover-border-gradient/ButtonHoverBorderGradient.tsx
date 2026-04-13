import { HoverBorderGradient } from "../hover-border-gradient/HoverBorderGradient";

interface ButtonHoverBorderGradientProps {
  children?: React.ReactNode;
}

export const ButtonHoverBorderGradient: React.FC<
  ButtonHoverBorderGradientProps
> = ({ children, ...props }) => {
  return (
    <div className="m-40 flex justify-center text-center" {...props}>
      <HoverBorderGradient
        containerClassName="rounded"
        className="flex items-center space-x-2 bg-ds-surface-1 text-ds-1"
      >
        {children}
      </HoverBorderGradient>
    </div>
  );
};
