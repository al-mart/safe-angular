import { pluginSortPackageJson } from './plugins/prettier-plugin-sort-package.js';
import * as organizeAttributes from 'prettier-plugin-organize-attributes';

const attributeOptions = {
  attributeGroups: [
    '$ANGULAR_STRUCTURAL_DIRECTIVE',
    '$ANGULAR_ELEMENT_REF',
    '$ID',
    '$DEFAULT',
    '$CLASS',
    '$ANGULAR_ANIMATION',
    '$ANGULAR_ANIMATION_INPUT',
    '$ANGULAR_INPUT',
    '$ANGULAR_TWO_WAY_BINDING',
    '$ANGULAR_OUTPUT',
  ],
  attributeSort: 'ASC',
};

export const prettierConfig = {
  $schema: 'https://json.schemastore.org/prettierrc',
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  htmlWhitespaceSensitivity: 'ignore',
  printWidth: 120,
  proseWrap: 'always',
  semi: true,
  singleAttributePerLine: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  useTabs: false,
  overrides: [
    {
      files: ['*.json'],
      options: {
        parser: 'json',
      },
    },
    {
      files: ['package.json', 'ng-package.json'],
      options: {
        parser: 'json-stringify',
        plugins: [pluginSortPackageJson],
      },
    },
    {
      files: ['*.scss'],
      options: { parser: 'scss' },
    },
    {
      files: ['*.yml', '*.yaml'],
      options: { parser: 'yaml', tabWidth: 2 },
    },
    {
      files: ['*.md'],
      options: { parser: 'markdown', tabWidth: 2 },
    },
    {
      files: ['*.component.html'],
      options: {
        parser: 'angular',
        printWidth: 120,
        plugins: [organizeAttributes],
        ...attributeOptions,
      },
    },
    {
      files: ['*.js', '*.ts'],
      options: {
        parser: 'typescript',
        printWidth: 120,
      },
    },
  ],
};
