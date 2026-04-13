import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const tokensPath = path.resolve(scriptDir, "../src/tokens.css");
const source = readFileSync(tokensPath, "utf8");

function findBlock(selectorNeedle) {
  const selectorIndex = source.indexOf(selectorNeedle);
  if (selectorIndex === -1) {
    throw new Error(`Could not locate selector block for: ${selectorNeedle}`);
  }

  const openBraceIndex = source.indexOf("{", selectorIndex);
  if (openBraceIndex === -1) {
    throw new Error(`Missing opening brace for selector: ${selectorNeedle}`);
  }

  let depth = 0;
  for (let i = openBraceIndex; i < source.length; i += 1) {
    const char = source[i];
    if (char === "{") depth += 1;
    if (char === "}") {
      depth -= 1;
      if (depth === 0) {
        return source.slice(openBraceIndex + 1, i);
      }
    }
  }

  throw new Error(`Missing closing brace for selector: ${selectorNeedle}`);
}

function parseVars(block) {
  const vars = {};
  const matches = block.matchAll(/(--ds-[\w-]+)\s*:\s*([^;]+);/g);
  for (const [, token, value] of matches) {
    vars[token.trim()] = value.trim();
  }
  return vars;
}

function resolveVar(token, vars, seen = new Set()) {
  if (seen.has(token)) return vars[token];
  seen.add(token);

  const value = vars[token];
  if (!value) return undefined;

  const varOnlyMatch = value.match(/^var\((--[\w-]+)\)$/);
  if (!varOnlyMatch) return value;
  return resolveVar(varOnlyMatch[1], vars, seen);
}

function hexToRgb(hex) {
  const normalized = hex.trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(normalized)) {
    throw new Error(`Expected 6-digit hex color, got: ${hex}`);
  }
  const value = normalized.slice(1);
  return {
    r: Number.parseInt(value.slice(0, 2), 16),
    g: Number.parseInt(value.slice(2, 4), 16),
    b: Number.parseInt(value.slice(4, 6), 16),
  };
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  const convert = (channel) => {
    const srgb = channel / 255;
    return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
  };

  return 0.2126 * convert(r) + 0.7152 * convert(g) + 0.0722 * convert(b);
}

function contrastRatio(foregroundHex, backgroundHex) {
  const fg = relativeLuminance(foregroundHex);
  const bg = relativeLuminance(backgroundHex);
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

const rootVars = parseVars(findBlock(":root,"));
const darkModeVars = parseVars(findBlock('[data-mode="dark"],'));
const lightModeVars = parseVars(findBlock('[data-mode="light"],'));
const lightAltVars = parseVars(
  findBlock('[data-mode="light"][data-variant="alt"],'),
);
const darkAltVars = parseVars(
  findBlock('[data-mode="dark"][data-variant="alt"],'),
);

const brands = ["purple", "teal", "yellow", "green"];
const combos = [];

for (const brand of brands) {
  const lightBrandVars = parseVars(
    findBlock(`[data-brand="${brand}"]:not([data-mode="dark"]),`),
  );
  const darkBrandVars = parseVars(
    findBlock(`[data-brand="${brand}"][data-mode="dark"],`),
  );

  combos.push({
    label: `${brand}/light/default`,
    vars: { ...rootVars, ...lightModeVars, ...lightBrandVars },
  });
  combos.push({
    label: `${brand}/light/alt`,
    vars: { ...rootVars, ...lightModeVars, ...lightBrandVars, ...lightAltVars },
  });
  combos.push({
    label: `${brand}/dark/default`,
    vars: { ...rootVars, ...darkModeVars, ...darkBrandVars },
  });
  combos.push({
    label: `${brand}/dark/alt`,
    vars: { ...rootVars, ...darkModeVars, ...darkBrandVars, ...darkAltVars },
  });
}

const failures = [];
const thresholds = {
  text1: 4.5,
  text2: 3.5,
  text3: 3,
  stateText: 3,
};

for (const combo of combos) {
  const text1 = resolveVar("--ds-text-1", combo.vars);
  const text2 = resolveVar("--ds-text-2", combo.vars);
  const text3 = resolveVar("--ds-text-3", combo.vars);
  const surfaceCanvas = resolveVar("--ds-surface-canvas", combo.vars);
  const surface1 = resolveVar("--ds-surface-1", combo.vars);

  const textChecks = [
    {
      label: "--ds-text-1 on --ds-surface-canvas",
      ratio: contrastRatio(text1, surfaceCanvas),
      min: thresholds.text1,
    },
    {
      label: "--ds-text-2 on --ds-surface-canvas",
      ratio: contrastRatio(text2, surfaceCanvas),
      min: thresholds.text2,
    },
    {
      label: "--ds-text-3 on --ds-surface-canvas",
      ratio: contrastRatio(text3, surfaceCanvas),
      min: thresholds.text3,
    },
    {
      label: "--ds-text-1 on --ds-surface-1",
      ratio: contrastRatio(text1, surface1),
      min: thresholds.text1,
    },
  ];

  for (const check of textChecks) {
    if (check.ratio < check.min) {
      failures.push(
        `${combo.label} | ${check.label} = ${check.ratio.toFixed(2)} (min ${check.min})`,
      );
    }
  }

  for (const state of ["error", "success", "warning"]) {
    const stateText = resolveVar(`--ds-text-state-${state}`, combo.vars);
    const stateSurface = resolveVar(`--ds-surface-state-${state}`, combo.vars);
    const ratio = contrastRatio(stateText, stateSurface);
    if (ratio < thresholds.stateText) {
      failures.push(
        `${combo.label} | --ds-text-state-${state} on --ds-surface-state-${state} = ${ratio.toFixed(2)} (min ${thresholds.stateText})`,
      );
    }
  }
}

if (failures.length > 0) {
  console.error("DS contrast validation failed:\n");
  console.error(failures.map((line) => `- ${line}`).join("\n"));
  process.exit(1);
}

console.log(
  `DS contrast validation passed for ${brands.length} brands across light/default, light/alt, dark/default, and dark/alt.`,
);
