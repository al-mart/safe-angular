import { eslintAngularConfig } from '@safe-angular/eslint-config';
import tsParser from '@typescript-eslint/parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export default [
  ...eslintAngularConfig,
];
