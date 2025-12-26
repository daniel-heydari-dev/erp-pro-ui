// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

import { reactConfig } from '@repo/eslint-config/react.js';

/** @type {import('eslint').Linter.Config[]} */
export default [...reactConfig, ...storybook.configs["flat/recommended"]];
