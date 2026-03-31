import { readFile } from 'node:fs/promises';
import path from 'node:path';
import process from 'node:process';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptDir, '..');

const packageJsonPath = path.join(packageDir, 'package.json');
const catalogPath = path.join(packageDir, 'src', 'catalog.ts');
const viteConfigPath = path.join(packageDir, 'vite.config.ts');

const baseEntryNames = [
  'index',
  'catalog',
  'docs',
  'theme',
  'ascii-text',
  'spinners',
  'utils',
];

function unique(values) {
  return [...new Set(values)];
}

function findDuplicates(values) {
  const counts = new Map();

  for (const value of values) {
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()]
    .filter(([, count]) => count > 1)
    .map(([value]) => value);
}

function formatList(values) {
  return values.map((value) => `- ${value}`).join('\n');
}

function extractLibraryEntryNames(viteSource) {
  return [
    ...viteSource.matchAll(
      /^\s*(?:'([^']+)'|"([^"]+)"|([A-Za-z0-9_-]+)):\s*resolveFromRoot\(/gm,
    ),
  ].map((match) => match[1] ?? match[2] ?? match[3]);
}

async function loadCatalogItems() {
  const source = await readFile(catalogPath, 'utf8');
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: catalogPath,
  });

  const moduleUrl = `data:text/javascript;base64,${Buffer.from(compiled.outputText).toString('base64')}`;
  const catalogModule = await import(moduleUrl);

  return catalogModule.uiCatalogItems;
}

function validateExportShape(entryName, exportEntry, errors) {
  if (
    !exportEntry ||
    typeof exportEntry !== 'object' ||
    Array.isArray(exportEntry)
  ) {
    errors.push(`Export ./${entryName} must be an object export map.`);
    return;
  }

  const expectedImport = `./dist/${entryName}.mjs`;
  const expectedRequire = `./dist/${entryName}.cjs`;

  if (exportEntry.import !== expectedImport) {
    errors.push(
      `Export ./${entryName} has import=${String(exportEntry.import)} but expected ${expectedImport}.`,
    );
  }

  if (exportEntry.require !== expectedRequire) {
    errors.push(
      `Export ./${entryName} has require=${String(exportEntry.require)} but expected ${expectedRequire}.`,
    );
  }

  if (exportEntry.default !== expectedImport) {
    errors.push(
      `Export ./${entryName} has default=${String(exportEntry.default)} but expected ${expectedImport}.`,
    );
  }

  if (typeof exportEntry.types !== 'string') {
    errors.push(`Export ./${entryName} is missing a string types entry.`);
  }
}

async function main() {
  const [packageJsonSource, viteConfigSource, catalogItems] = await Promise.all(
    [
      readFile(packageJsonPath, 'utf8'),
      readFile(viteConfigPath, 'utf8'),
      loadCatalogItems(),
    ],
  );

  const packageJson = JSON.parse(packageJsonSource);
  const errors = [];

  const catalogSlugs = catalogItems.map((item) => item.slug);
  const exportPaths = catalogItems.map((item) => item.packageExportPath);
  const storybookTitles = catalogItems.map((item) => item.storybookTitle);

  const duplicateSlugs = findDuplicates(catalogSlugs);
  const duplicateExportPaths = findDuplicates(exportPaths);
  const duplicateStorybookTitles = findDuplicates(storybookTitles);

  if (duplicateSlugs.length > 0) {
    errors.push(
      `Duplicate catalog slugs found:\n${formatList(duplicateSlugs)}`,
    );
  }

  if (duplicateStorybookTitles.length > 0) {
    errors.push(
      `Duplicate catalog Storybook titles found:\n${formatList(duplicateStorybookTitles)}`,
    );
  }

  const allowedDuplicateExportPaths = new Set(['charts']);
  const unexpectedDuplicateExportPaths = duplicateExportPaths.filter(
    (entryName) => !allowedDuplicateExportPaths.has(entryName),
  );

  if (unexpectedDuplicateExportPaths.length > 0) {
    errors.push(
      `Unexpected duplicate package export paths found:\n${formatList(unexpectedDuplicateExportPaths)}`,
    );
  }

  const expectedEntryNames = unique([...baseEntryNames, ...exportPaths]);
  const viteEntryNames = extractLibraryEntryNames(viteConfigSource);

  const missingViteEntries = expectedEntryNames.filter(
    (entryName) => !viteEntryNames.includes(entryName),
  );
  const unexpectedViteEntries = viteEntryNames.filter(
    (entryName) => !expectedEntryNames.includes(entryName),
  );

  if (missingViteEntries.length > 0) {
    errors.push(
      `Missing Vite library entries for expected public contract:\n${formatList(missingViteEntries)}`,
    );
  }

  if (unexpectedViteEntries.length > 0) {
    errors.push(
      `Unexpected Vite library entries not covered by the contract validator:\n${formatList(unexpectedViteEntries)}`,
    );
  }

  const exportsMap = packageJson.exports ?? {};
  const expectedExportKeys = [
    '.',
    './styles.css',
    ...expectedEntryNames
      .filter((entryName) => entryName !== 'index')
      .map((entryName) => `./${entryName}`),
  ];
  const actualExportKeys = Object.keys(exportsMap);

  const missingExportKeys = expectedExportKeys.filter(
    (exportKey) => !actualExportKeys.includes(exportKey),
  );
  const unexpectedExportKeys = actualExportKeys.filter(
    (exportKey) => !expectedExportKeys.includes(exportKey),
  );

  if (missingExportKeys.length > 0) {
    errors.push(
      `Missing package.json exports for expected public contract:\n${formatList(missingExportKeys)}`,
    );
  }

  if (unexpectedExportKeys.length > 0) {
    errors.push(
      `Unexpected package.json exports not covered by the contract validator:\n${formatList(unexpectedExportKeys)}`,
    );
  }

  if (exportsMap['./styles.css'] !== './dist/styles.css') {
    errors.push('Export ./styles.css must point to ./dist/styles.css.');
  }

  const rootExport = exportsMap['.'];

  if (
    !rootExport ||
    typeof rootExport !== 'object' ||
    Array.isArray(rootExport)
  ) {
    errors.push('Root export . must be an object export map.');
  } else {
    if (rootExport.import !== './dist/index.mjs') {
      errors.push('Root export . must import ./dist/index.mjs.');
    }

    if (rootExport.require !== './dist/index.cjs') {
      errors.push('Root export . must require ./dist/index.cjs.');
    }

    if (rootExport.default !== './dist/index.mjs') {
      errors.push('Root export . must default to ./dist/index.mjs.');
    }

    if (rootExport.types !== './dist/index.d.ts') {
      errors.push('Root export . must expose types ./dist/index.d.ts.');
    }
  }

  for (const entryName of expectedEntryNames.filter(
    (entryName) => entryName !== 'index',
  )) {
    validateExportShape(entryName, exportsMap[`./${entryName}`], errors);
  }

  if (errors.length > 0) {
    process.stderr.write(
      `UI package contract validation failed.\n\n${errors.map((error) => `• ${error}`).join('\n\n')}\n`,
    );
    process.exit(1);
  }

  process.stdout.write('UI package contract validation passed.\n');
}

await main();
