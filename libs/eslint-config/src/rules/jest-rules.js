export const jestRules = {
  'jest/consistent-test-it': [
    'error',
    {
      fn: 'it',
      withinDescribe: 'it',
    },
  ],
  'jest/max-expects': [
    'error',
    {
      max: 1,
    },
  ],
  'jest/max-nested-describe': ['error', { max: 1 }],
  'jest/no-done-callback': 'off',
  'jest/no-hooks': 'off',
  'jest/require-top-level-describe': [
    'error',
    {
      maxNumberOfTopLevelDescribes: 1,
    },
  ],
  'jest/unbound-method': 'off',
  'jest/no-test-return-statement': 'error',
  'jest/prefer-comparison-matcher': 'error',
  'jest/prefer-equality-matcher': 'error',
  'jest/prefer-hooks-in-order': 'error',
  'jest/prefer-hooks-on-top': 'error',
  'jest/prefer-to-be': 'error',
  'jest/prefer-to-contain': 'error',
  'jest/prefer-to-have-length': 'error',
  'jest/prefer-todo': 'error',

  // general rules overrides
  '@typescript-eslint/no-extraneous-class': 'off',
  'max-classes-per-file': 'off',
  'max-nested-callbacks': ['error', 4],
  'prefer-promise-reject-errors': 'error',
  'rxjs/no-topromise': 'off',
  '@typescript-eslint/no-magic-numbers': 'off',
  'max-lines-per-function': 'off',
  '@typescript-eslint/init-declarations': 'off',
  '@cspell/spellchecker': 'off',
  'sonarjs/no-duplicate-string': 'off',
  'rxjs/no-ignored-error': 'off',
};
