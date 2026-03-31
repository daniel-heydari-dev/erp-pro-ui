import type { Alias, UserConfig, UserConfigExport } from "vite";

export interface CreateUiConsumerAliasesOptions {
  appSrcPath: string;
  uiPackageRoot: string;
  includeThemeAlias?: boolean;
}

export interface CreateReactAppViteConfigOptions {
  appDir: string;
  uiPackageRoot: string;
  base: string;
  appSrcPath?: string;
  portEnvVar?: string;
}

export interface CreateStorybookViteConfigOptions {
  appSrcPath: string;
  uiPackageRoot: string;
  includeThemeAlias?: boolean;
}

export function createUiConsumerAliases(
  options: CreateUiConsumerAliasesOptions,
): Alias[];

export function createReactAppViteConfig(
  options: CreateReactAppViteConfigOptions,
): UserConfigExport;

export function createStorybookViteConfig(
  options: CreateStorybookViteConfigOptions,
): UserConfig;
