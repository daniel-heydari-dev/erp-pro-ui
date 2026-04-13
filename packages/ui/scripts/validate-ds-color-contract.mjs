import { execFileSync } from "node:child_process";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "../../..");

const fixedTargets = [
  "packages/ui/src",
  "apps/web/src",
  "apps/storybook/.storybook",
  "apps/storybook/src",
];
const componentTargets = ["packages/ui/src/components", "apps/web/src"];

const bannedFixedPatterns = [
  "text-foreground",
  "text-muted-foreground",
  "text-accent",
  "bg-background",
  "bg-accent",
  "bg-accent-subtle",
  "border-border",
  "border-input",
  "text-on-accent",
  "text-fg",
  "text-fg-muted",
  "ring-focus",
  'data-brand="secondary"',
  "secondary-dark",
];

const bannedRegexPatterns = [
  "text-\\[var\\(--ds-",
  "bg-\\[var\\(--ds-",
  "border-\\[var\\(--ds-",
  "ring-\\[var\\(--ds-",
];

function runRipgrep(args) {
  try {
    return execFileSync("rg", args, {
      cwd: repoRoot,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    if (error?.status === 1) {
      return "";
    }

    throw error;
  }
}

function hasRipgrep() {
  try {
    execFileSync("rg", ["--version"], {
      cwd: repoRoot,
      stdio: ["ignore", "ignore", "ignore"],
    });
    return true;
  } catch {
    return false;
  }
}

function walkFiles(dirPath) {
  const files = [];
  const stack = [dirPath];

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current || !fs.existsSync(current)) continue;

    const entries = fs.readdirSync(current, { withFileTypes: true });
    for (const entry of entries) {
      const absolute = path.join(current, entry.name);
      if (entry.isDirectory()) {
        stack.push(absolute);
      } else if (entry.isFile()) {
        files.push(absolute);
      }
    }
  }

  return files;
}

function toRepoRelative(filePath) {
  return path.relative(repoRoot, filePath).replaceAll(path.sep, "/");
}

function scanWithNodeFallback({
  fixedPatterns,
  regexPatterns,
  fixedTargets,
  regexTargets,
}) {
  const fixedMatches = [];
  const regexMatches = [];
  const fixedFiles = fixedTargets.flatMap((target) =>
    walkFiles(path.join(repoRoot, target)),
  );
  const regexFiles = regexTargets
    .flatMap((target) => walkFiles(path.join(repoRoot, target)))
    .filter((filePath) => !/\.stories\.[cm]?[jt]sx?$/.test(filePath));
  const compiledRegex = regexPatterns.map((source) => new RegExp(source));

  for (const filePath of fixedFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (fixedPatterns.some((pattern) => line.includes(pattern))) {
        fixedMatches.push(`${toRepoRelative(filePath)}:${i + 1}:${line}`);
      }
    }
  }

  for (const filePath of regexFiles) {
    const content = fs.readFileSync(filePath, "utf8");
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i += 1) {
      const line = lines[i];
      if (compiledRegex.some((pattern) => pattern.test(line))) {
        regexMatches.push(`${toRepoRelative(filePath)}:${i + 1}:${line}`);
      }
    }
  }

  return {
    fixedMatches: fixedMatches.join("\n"),
    regexMatches: regexMatches.join("\n"),
  };
}

try {
  const { fixedMatches, regexMatches } = hasRipgrep()
    ? {
        fixedMatches: runRipgrep([
          "--line-number",
          "--fixed-strings",
          ...bannedFixedPatterns.flatMap((pattern) => ["-e", pattern]),
          ...fixedTargets,
        ]),
        regexMatches: runRipgrep([
          "--line-number",
          ...bannedRegexPatterns.flatMap((pattern) => ["-e", pattern]),
          "--glob",
          "!**/*.stories.*",
          ...componentTargets,
        ]),
      }
    : scanWithNodeFallback({
        fixedPatterns: bannedFixedPatterns,
        regexPatterns: bannedRegexPatterns,
        fixedTargets,
        regexTargets: componentTargets,
      });
  const output = [fixedMatches, regexMatches].filter(Boolean).join("\n");

  if (output) {
    console.error(
      "DS color contract validation failed. Legacy patterns found:\n",
    );
    console.error(output);
    process.exit(1);
  }

  console.log("DS color contract validation passed.");
  process.exit(0);
} catch (error) {
  console.error("Failed to run DS color contract validation.");
  if (error?.stderr) {
    console.error(String(error.stderr));
  }
  process.exit(1);
}
