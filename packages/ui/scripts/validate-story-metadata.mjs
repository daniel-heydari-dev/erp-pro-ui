import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptDir, "..");
const sourceRoot = path.join(packageDir, "src");
const catalogPath = path.join(sourceRoot, "catalog.ts");
const STORY_FILE_PATTERN = /\.stories\.(?:[cm]?[jt]sx?)$/;

function formatList(values) {
  return values.map((value) => `- ${value}`).join("\n");
}

function unwrapExpression(node) {
  if (!node) {
    return undefined;
  }

  if (ts.isParenthesizedExpression(node)) {
    return unwrapExpression(node.expression);
  }

  if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) {
    return unwrapExpression(node.expression);
  }

  return node;
}

function getPropertyName(propertyName) {
  if (ts.isIdentifier(propertyName) || ts.isStringLiteral(propertyName)) {
    return propertyName.text;
  }

  return undefined;
}

function getObjectLiteralTitle(node) {
  const objectLiteral = unwrapExpression(node);

  if (!objectLiteral || !ts.isObjectLiteralExpression(objectLiteral)) {
    return undefined;
  }

  for (const property of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(property)) {
      continue;
    }

    if (getPropertyName(property.name) !== "title") {
      continue;
    }

    const initializer = unwrapExpression(property.initializer);

    if (
      initializer &&
      (ts.isStringLiteral(initializer) ||
        ts.isNoSubstitutionTemplateLiteral(initializer))
    ) {
      return initializer.text;
    }
  }

  return undefined;
}

function getVariableObjectLiteral(sourceFile, identifierText) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name)) {
        continue;
      }

      if (declaration.name.text !== identifierText) {
        continue;
      }

      return declaration.initializer;
    }
  }

  return undefined;
}

function extractStoryTitle(sourceFile) {
  for (const statement of sourceFile.statements) {
    if (!ts.isExportAssignment(statement) || statement.isExportEquals) {
      continue;
    }

    const exportedExpression = unwrapExpression(statement.expression);

    if (!exportedExpression) {
      continue;
    }

    if (ts.isIdentifier(exportedExpression)) {
      const variableInitializer = getVariableObjectLiteral(
        sourceFile,
        exportedExpression.text,
      );
      const title = getObjectLiteralTitle(variableInitializer);

      if (title) {
        return title;
      }
    }

    const inlineTitle = getObjectLiteralTitle(exportedExpression);

    if (inlineTitle) {
      return inlineTitle;
    }
  }

  return undefined;
}

async function collectStoryFiles(directoryPath) {
  const entries = await readdir(directoryPath, { withFileTypes: true });
  const storyFiles = [];

  for (const entry of entries) {
    const entryPath = path.join(directoryPath, entry.name);

    if (entry.isDirectory()) {
      storyFiles.push(...(await collectStoryFiles(entryPath)));
      continue;
    }

    if (STORY_FILE_PATTERN.test(entry.name)) {
      storyFiles.push(entryPath);
    }
  }

  return storyFiles;
}

async function loadCatalogItems() {
  const source = await readFile(catalogPath, "utf8");
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: catalogPath,
  });

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString("base64")}`;
  const catalogModule = await import(moduleUrl);

  return catalogModule.uiCatalogItems;
}

async function main() {
  const [catalogItems, storyFiles] = await Promise.all([
    loadCatalogItems(),
    collectStoryFiles(sourceRoot),
  ]);

  const errors = [];
  const expectedTitles = catalogItems.map((item) => item.storybookTitle);
  const storyFilesByTitle = new Map();

  for (const filePath of storyFiles) {
    const source = await readFile(filePath, "utf8");
    const sourceFile = ts.createSourceFile(
      filePath,
      source,
      ts.ScriptTarget.Latest,
      true,
      filePath.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const storyTitle = extractStoryTitle(sourceFile);
    const relativeFilePath = path.relative(packageDir, filePath);

    if (!storyTitle) {
      errors.push(
        `Story file ${relativeFilePath} is missing a default export title literal.`,
      );
      continue;
    }

    const existingFiles = storyFilesByTitle.get(storyTitle) ?? [];
    existingFiles.push(relativeFilePath);
    storyFilesByTitle.set(storyTitle, existingFiles);
  }

  const duplicateTitles = [...storyFilesByTitle.entries()]
    .filter(([, files]) => files.length > 1)
    .map(([title, files]) => `${title}\n${formatList(files)}`);

  if (duplicateTitles.length > 0) {
    errors.push(
      `Duplicate Storybook titles found across story files:\n${duplicateTitles.join("\n")}`,
    );
  }

  const missingCatalogTitles = expectedTitles.filter(
    (title) => !storyFilesByTitle.has(title),
  );

  if (missingCatalogTitles.length > 0) {
    errors.push(
      `Shared catalog titles missing matching story files:\n${formatList(missingCatalogTitles)}`,
    );
  }

  if (errors.length > 0) {
    process.stderr.write(
      `UI story metadata validation failed.\n\n${errors.map((error) => `• ${error}`).join("\n\n")}\n`,
    );
    process.exit(1);
  }

  process.stdout.write("UI story metadata validation passed.\n");
}

await main();
