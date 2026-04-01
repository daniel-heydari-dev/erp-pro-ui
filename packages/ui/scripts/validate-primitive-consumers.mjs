import { readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptDir, "..");
const repoDir = path.resolve(packageDir, "..", "..");

const STORY_FILE_PATTERN = /\.stories\.(?:[cm]?tsx?|tsx)$/;
const SOURCE_FILE_PATTERN = /\.[cm]?tsx?$/;
const RAW_CONTROL_TAGS = new Set(["button", "input", "select", "textarea"]);

const scanRoots = [
  path.join(repoDir, "apps", "web", "src"),
  path.join(packageDir, "src"),
];

const allowedNonStoryPrefixes = ["packages/ui/src/components/forms/"];

const allowedNonStoryFiles = new Set([
  "packages/ui/src/components/overlays/dialog/Dialog.tsx",
  "packages/ui/src/components/overlays/drawer/Drawer.tsx",
  "packages/ui/src/components/overlays/toast/Toast.tsx",
  "packages/ui/src/components/navigation/accordion/Accordion.tsx",
  "packages/ui/src/components/navigation/stepper/Stepper.tsx",
  "packages/ui/src/components/data-display/chip/Chip.tsx",
  "packages/ui/src/components/effects/hover-border-gradient/HoverBorderGradient.tsx",
  "packages/ui/src/components/effects/sun-to-moon-button/SunToMoonButton.tsx",
]);

function formatList(values) {
  return values.map((value) => `- ${value}`).join("\n");
}

async function collectSourceFiles(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await collectSourceFiles(entryPath)));
      continue;
    }

    if (SOURCE_FILE_PATTERN.test(entry.name)) {
      files.push(entryPath);
    }
  }

  return files;
}

function getRelativePath(filePath) {
  return path.relative(repoDir, filePath).split(path.sep).join("/");
}

function isAllowedFile(relativePath) {
  if (STORY_FILE_PATTERN.test(relativePath)) {
    return false;
  }

  if (allowedNonStoryFiles.has(relativePath)) {
    return true;
  }

  return allowedNonStoryPrefixes.some((prefix) =>
    relativePath.startsWith(prefix),
  );
}

function getStringLiteralValue(node) {
  if (!node) {
    return undefined;
  }

  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
    return node.text;
  }

  return undefined;
}

function getAttributeValue(openingLikeElement, attributeName) {
  for (const property of openingLikeElement.attributes.properties) {
    if (!ts.isJsxAttribute(property) || property.name.text !== attributeName) {
      continue;
    }

    if (!property.initializer) {
      return true;
    }

    if (ts.isStringLiteral(property.initializer)) {
      return property.initializer.text;
    }

    if (
      ts.isJsxExpression(property.initializer) &&
      property.initializer.expression
    ) {
      return getStringLiteralValue(property.initializer.expression);
    }

    return undefined;
  }

  return undefined;
}

function getRecommendation(tagName, openingLikeElement) {
  if (tagName === "button") {
    return "Button";
  }

  if (tagName === "select") {
    return "Select";
  }

  if (tagName === "textarea") {
    return "Textarea";
  }

  const inputType = getAttributeValue(openingLikeElement, "type");

  if (inputType === "checkbox") {
    return "Checkbox";
  }

  if (inputType === "radio") {
    return "Radio";
  }

  return "Input";
}

function collectViolations(sourceFile, relativePath) {
  const violations = [];

  function visit(node) {
    const openingLikeElement =
      ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)
        ? node
        : undefined;

    if (openingLikeElement && ts.isIdentifier(openingLikeElement.tagName)) {
      const tagName = openingLikeElement.tagName.text;

      if (RAW_CONTROL_TAGS.has(tagName)) {
        const recommendation = getRecommendation(tagName, openingLikeElement);
        const position = sourceFile.getLineAndCharacterOfPosition(
          openingLikeElement.tagName.getStart(sourceFile),
        );

        violations.push(
          `${relativePath}:${position.line + 1}:${position.character + 1} uses raw <${tagName}>; prefer ${recommendation} from erp-pro-ui.`,
        );
      }
    }

    ts.forEachChild(node, visit);
  }

  visit(sourceFile);
  return violations;
}

async function main() {
  const files = (
    await Promise.all(scanRoots.map((scanRoot) => collectSourceFiles(scanRoot)))
  )
    .flat()
    .sort((left, right) => left.localeCompare(right));

  const violations = [];

  for (const filePath of files) {
    const relativePath = getRelativePath(filePath);

    if (isAllowedFile(relativePath)) {
      continue;
    }

    const source = ts.sys.readFile(filePath);

    if (!source) {
      continue;
    }

    const scriptKind = filePath.endsWith("x")
      ? ts.ScriptKind.TSX
      : ts.ScriptKind.TS;
    const sourceFile = ts.createSourceFile(
      filePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      scriptKind,
    );

    violations.push(...collectViolations(sourceFile, relativePath));
  }

  if (violations.length > 0) {
    process.stderr.write(
      `Primitive consumer validation failed.\n\n${formatList(violations)}\n`,
    );
    process.exit(1);
  }

  process.stdout.write("Primitive consumer validation passed.\n");
}

await main();
