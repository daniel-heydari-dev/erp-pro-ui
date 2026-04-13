import type { CardProps } from "./types";

export const Card = ({ title, description }: CardProps) => {
  return (
    <div className="ui">
      <div className="backdrop-blur-xl bg-ds-surface-1/85 border border-ds-border-2 rounded-lg shadow-lg overflow-hidden sm:max-w-xs lg:max-w-sm xl:max-w-md">
        <div className="px-6 py-4">
          <h2 className="text-ds-1 font-bold text-xl mb-2">{title}</h2>
          <p className="text-ds-2 bg-transparent border-none rounded-none font-sans text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
