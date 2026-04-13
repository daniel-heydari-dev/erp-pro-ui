const rtlLanguages = /^(ar|fa|ur|he)(-|$)/i;

export type TableDirection = "ltr" | "rtl";

/**
 * Resolves table direction from nearest `dir` ancestor, document root, or locale.
 * This mirrors Tabs direction behavior so data-display patterns stay consistent.
 */
export function resolveTableDirection(
  host: HTMLElement | null,
): TableDirection {
  if (typeof document === "undefined") {
    return "ltr";
  }

  const nearestWithDirection = host?.closest<HTMLElement>("[dir]");
  const explicitDirection =
    nearestWithDirection?.getAttribute("dir") ??
    document.documentElement.getAttribute("dir") ??
    undefined;

  if (explicitDirection === "rtl" || explicitDirection === "ltr") {
    return explicitDirection;
  }

  if (
    typeof navigator !== "undefined" &&
    rtlLanguages.test(navigator.language)
  ) {
    return "rtl";
  }

  return "ltr";
}
