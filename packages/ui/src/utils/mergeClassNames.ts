import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges multiple class names with Tailwind's merging behavior.
 *
 * @param classNames - An array of class names or conditional class values.
 * @returns A single string of merged class names.
 */
const mergeClassNames = (...classNames: ClassValue[]) => {
  return twMerge(clsx(classNames));
};

export default mergeClassNames;
