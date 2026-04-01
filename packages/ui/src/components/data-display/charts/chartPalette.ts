const chartColorSlots = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
] as const;

export type ChartColorSlot = (typeof chartColorSlots)[number];
export type ChartColorToken = `chart-${ChartColorSlot}`;

export const chartColorTokens = chartColorSlots.map(
  (slot) => `chart-${slot}` as ChartColorToken,
);

const chartPalette = chartColorSlots.map((slot) => `var(--ds-chart-${slot})`);

type RgbColor = {
  r: number;
  g: number;
  b: number;
};

const resolvedColorCache = new Map<string, RgbColor | null>();

const chartTokenPattern = /^chart-(\d+)$/i;
const chartVariablePattern = /^--((?:ds|color)-chart-(\d+))$/i;

const getChartSlotValue = (slot: ChartColorSlot | ChartColorToken): number =>
  typeof slot === "number" ? slot : Number(slot.replace("chart-", ""));

export const getChartColorVar = (
  slot: ChartColorSlot | ChartColorToken,
  namespace: "ds" | "color" = "ds",
): string => `var(--${namespace}-chart-${getChartSlotValue(slot)})`;

export const normalizeChartColorValue = (
  value?: string,
): string | undefined => {
  const normalizedValue = value?.trim();

  if (!normalizedValue) {
    return undefined;
  }

  const tokenMatch = normalizedValue.match(chartTokenPattern);
  if (tokenMatch) {
    return `var(--ds-chart-${tokenMatch[1]})`;
  }

  const variableMatch = normalizedValue.match(chartVariablePattern);
  if (variableMatch) {
    return `var(--${variableMatch[1]})`;
  }

  return normalizedValue;
};

const getThemeSignature = (): string => {
  if (typeof document === "undefined") return "";

  const root = document.documentElement;
  return [
    root.getAttribute("data-brand") ?? "",
    root.getAttribute("data-mode") ?? "",
    root.getAttribute("data-theme") ?? "",
  ].join("|");
};

const resolveColor = (value: string): RgbColor | null => {
  if (typeof document === "undefined") return null;

  const cacheKey = `${getThemeSignature()}::${value}`;
  const cached = resolvedColorCache.get(cacheKey);
  if (cached !== undefined) {
    return cached;
  }

  const probe = document.createElement("span");
  probe.style.color = value;
  probe.style.position = "fixed";
  probe.style.opacity = "0";
  probe.style.pointerEvents = "none";
  document.body.appendChild(probe);

  const computedColor = getComputedStyle(probe).color;
  document.body.removeChild(probe);

  const match = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/i);

  const resolved = match
    ? {
        r: Number(match[1]),
        g: Number(match[2]),
        b: Number(match[3]),
      }
    : null;

  resolvedColorCache.set(cacheKey, resolved);
  return resolved;
};

const getColorDistance = (left: RgbColor, right: RgbColor): number => {
  const deltaR = left.r - right.r;
  const deltaG = left.g - right.g;
  const deltaB = left.b - right.b;

  return Math.sqrt(deltaR ** 2 + deltaG ** 2 + deltaB ** 2);
};

const isTooSimilar = (
  candidate: string,
  usedColors: readonly string[],
  minDistance = 84,
): boolean => {
  if (usedColors.includes(candidate)) {
    return true;
  }

  const candidateRgb = resolveColor(candidate);
  if (!candidateRgb) {
    return false;
  }

  return usedColors.some((usedColor) => {
    const usedRgb = resolveColor(usedColor);
    return usedRgb
      ? getColorDistance(candidateRgb, usedRgb) < minDistance
      : false;
  });
};

export const getChartPalette = (count = chartPalette.length): string[] =>
  Array.from(
    { length: count },
    (_, index) => chartPalette[index % chartPalette.length],
  );

export const normalizeChartColors = (
  requestedColors: readonly (string | undefined)[],
): string[] => {
  const usedColors: string[] = [];
  let paletteIndex = 0;

  const getNextDistinctPaletteColor = (): string => {
    for (let attempt = 0; attempt < chartPalette.length; attempt++) {
      const candidate =
        chartPalette[(paletteIndex + attempt) % chartPalette.length];

      if (!isTooSimilar(candidate, usedColors)) {
        paletteIndex = (paletteIndex + attempt + 1) % chartPalette.length;
        return candidate;
      }
    }

    const fallback = chartPalette[paletteIndex % chartPalette.length];
    paletteIndex = (paletteIndex + 1) % chartPalette.length;
    return fallback;
  };

  return requestedColors.map((requestedColor) => {
    const normalizedRequestedColor = normalizeChartColorValue(requestedColor);
    const resolvedColor =
      normalizedRequestedColor &&
      !isTooSimilar(normalizedRequestedColor, usedColors)
        ? normalizedRequestedColor
        : getNextDistinctPaletteColor();

    usedColors.push(resolvedColor);
    return resolvedColor;
  });
};
