import { execFileSync } from "node:child_process";
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

try {
  const fixedMatches = runRipgrep([
    "--line-number",
    "--fixed-strings",
    ...bannedFixedPatterns.flatMap((pattern) => ["-e", pattern]),
    ...fixedTargets,
  ]);
  const regexMatches = runRipgrep([
    "--line-number",
    ...bannedRegexPatterns.flatMap((pattern) => ["-e", pattern]),
    "--glob",
    "!**/*.stories.*",
    ...componentTargets,
  ]);
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
