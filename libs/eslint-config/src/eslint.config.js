import eslintJs from '@eslint/js';
import eslintTs from 'typescript-eslint';
import globals from 'globals';

import sonarjsPlugin from 'eslint-plugin-sonarjs';
import eslintDeprecationPlugin from 'eslint-plugin-deprecation';
import eslintPluginPrettier from 'eslint-plugin-prettier';

import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';

import pluginPromise from 'eslint-plugin-promise';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import cspellConfigs from '@cspell/eslint-plugin/configs';
import jestPlugin from 'eslint-plugin-jest';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';

import { eslintRules } from './rules/eslint-rules.js';
import { jestRules } from './rules/jest-rules.js';
import { miscellaneousRules } from './rules/miscellaneous.js';
import { rxjsRules } from './rules/rxjs-rules.js';
import { namingRules } from './rules/naming.js';
import { typescriptRules } from './rules/typescript-rules.js';
import { stylisticTsRules } from './rules/stylistic-ts.js';
import { stylisticJsRules } from './rules/stylistic-js.js';

export const eslintConfig = eslintTs.config(
  ...eslintTs.configs.strictTypeChecked,
  ...eslintTs.configs.stylisticTypeChecked,
  pluginPromise.configs['flat/recommended'],
  ...fixupConfigRules(new FlatCompat().extends('plugin:rxjs/recommended')),
  sonarjsPlugin.configs.recommended,
  cspellConfigs.recommended,
  comments.recommended,
  {
    name: 'global-config',
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.jest,
        ...globals.es2022,
        ...globals.browser,
      },
      parserOptions: {
        project: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
      deprecation: fixupPluginRules(eslintDeprecationPlugin),
      unicorn: eslintPluginUnicorn,
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },
  },
  {
    name: 'ignores',
    ignores: [
      '**/tests-report/**',
      '**/snapshots/**',
      '**/test-results/**',
      '**/*.txt',
      '**/*.ico',
      '**/*.xml',
      '**/*.md',
      'LICENSE',
      '**/jest.preset.js',
      '**/jest.preset.cjs',
      '**/jest.preset.mjs',
      '**/jest.config.ts',
      '**/test-setup.ts',
      '*.config.js',
      'node_modules',
      'dist',
      '**/node_modules/**',
      '**/coverage/**',
      '**/eslintrc.js',
      '**/eslint.config.js',
      '**/.eslintrc.js',
      '**/*.d.ts',
      '**/dist/**',
      '**/docs/**',
      '.cache/**',
      '.git/**',
      '.idea/**',
    ],
  },
  {
    name: 'disable-ts-for-js',
    files: ['**/*.js'],
    ...eslintTs.configs.disableTypeChecked,
  },
  {
    name: 'general-js-ts',
    files: ['**/*.js', '**/*.ts'],
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...eslintRules,
      ...namingRules,
      ...miscellaneousRules,
      ...rxjsRules,
      ...stylisticJsRules,
      '@cspell/spellchecker': ['error', { customWordListFile: './cspell-custom-words.txt' }],
    },
  },
  {
    name: 'general-ts',
    files: ['**/*.ts'],
    rules: {
      ...typescriptRules,
      ...stylisticTsRules,
    },
  },
  {
    name: 'tests',
    files: ['**/*.spec.ts', '**/*.mock.ts'],
    ...jestPlugin.configs['flat/recommended'],
    ...jestPlugin.configs['flat/style'],
    rules: { ...jestRules },
  },
  {
    name: 'prettier',
    plugins: {
      prettier: eslintPluginPrettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
);
