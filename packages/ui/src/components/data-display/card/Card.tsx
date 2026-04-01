import type { CardProps } from "./types";

export const Card = ({ title, description }: CardProps) => {
  return (
    <div className="ui">
      <div className="backdrop-blur-xl bg-white/70 dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-700 rounded-lg shadow-lg overflow-hidden sm:max-w-xs lg:max-w-sm xl:max-w-md">
        <div className="px-6 py-4">
          <h2 className="text-neutral-900 dark:text-white font-bold text-xl mb-2">
            {title}
          </h2>
          <p className="text-neutral-700 dark:text-neutral-300 bg-transparent border-none rounded-none font-sans text-base">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
