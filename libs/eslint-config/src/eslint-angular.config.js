import eslintJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';

import eslintPluginPrettier from 'eslint-plugin-prettier';
import sonarjsPlugin from 'eslint-plugin-sonarjs';
import eslintDeprecationPlugin from 'eslint-plugin-deprecation';
import pluginPromise from 'eslint-plugin-promise';
import simpleImportSortPlugin from 'eslint-plugin-simple-import-sort';
import angular from 'angular-eslint';
import comments from '@eslint-community/eslint-plugin-eslint-comments/configs';
import rxjsAngular from 'eslint-plugin-rxjs-angular';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import cspellConfigs from '@cspell/eslint-plugin/configs';
import jestPlugin from 'eslint-plugin-jest';

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import stylisticJs from '@stylistic/eslint-plugin-js';
import stylisticTs from '@stylistic/eslint-plugin-ts';

import { eslintRules } from './rules/eslint-rules.js';
import { jestRules } from './rules/jest-rules.js';
import { miscellaneousRules } from './rules/miscellaneous.js';
import { rxjsRules } from './rules/rxjs-rules.js';
import { rxjsAngularRules } from './rules/rxjs-angular.js';
import { namingRules } from './rules/naming.js';
import { typescriptRules } from './rules/typescript-rules.js';
import { angularRules } from './rules/angular-rules.js';
import { stylisticTsRules } from './rules/stylistic-ts.js';
import { stylisticJsRules } from './rules/stylistic-js.js';

export const eslintAngularConfig = tseslint.config(
  {
    name: 'cspell',
    ...cspellConfigs.recommended,
  },
  {
    name: 'general-configuration',
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.commonjs,
        ...globals.browser,
        ...globals.es2021,
        ...globals.jest,
      },
      parser: tsParser,
      parserOptions: {
        projectService: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    plugins: {
      'simple-import-sort': simpleImportSortPlugin,
      deprecation: fixupPluginRules(eslintDeprecationPlugin),
      unicorn: eslintPluginUnicorn,
      'rxjs-angular': fixupPluginRules(rxjsAngular),
      '@stylistic/js': stylisticJs,
      '@stylistic/ts': stylisticTs,
    },
  },
  {
    name: 'ignore-patterns',
    ignores: [
      '**/tests-report/**',
      '**/snapshots/**',
      '**/test-results/**',
      '*.txt',
      '*.ico',
      '*.xml',
      '*.md',
      'LICENSE',
      '**/jest.preset.js',
      '**/jest.preset.cjs',
      '**/jest.preset.mjs',
      '**/jest.config.ts',
      '**/playwright.config.ts',
      '**/test-setup.ts',
      '**/*.config.js',
      'dist',
      '**/node_modules/**',
      './config/**',
      '**/coverage/**',
      '**/eslintrc.js',
      '**/.eslintrc.js',
      '**/*.d.ts',
      '**/dist/**',
      '**/docs/**',
      '.cache/**',
      '.git/**',
      '.idea/**',
      '**/*.mock.ts',
    ],
  },
  {
    name: 'general-js-ts',
    files: ['**/*.js', '**/*.ts'],
    extends: [
      eslintJs.configs.recommended,
      comments.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...angular.configs.tsRecommended,
      pluginPromise.configs['flat/recommended'],
      ...fixupConfigRules(new FlatCompat().extends('plugin:rxjs/recommended')),
      sonarjsPlugin.configs.recommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      ...eslintJs.configs.recommended.rules,
      ...eslintRules,
      ...namingRules,
      ...miscellaneousRules,
      ...rxjsRules,
      ...rxjsAngularRules,
      ...angularRules.classFiles,
      ...stylisticJsRules,
      ...typescriptRules,
      ...stylisticTsRules,
      '@cspell/spellchecker': ['error', { customWordListFile: './cspell-custom-words.txt' }],
    },
  },
  {
    name: 'angular-templates',
    files: ['**/*.component.html'],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      ...angularRules.templates,
    },
  },
  {
    name: 'tests',
    files: ['**/*.spec.ts', '**/*.mock.ts'],
    ...jestPlugin.configs['flat/recommended'],
    ...jestPlugin.configs['flat/style'],
    rules: { ...jestRules, ...angularRules.tests },
  },
  {
    name: 'disable-ts-for-js',
    files: ['**/*.js'],
    ...tseslint.configs.disableTypeChecked,
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
