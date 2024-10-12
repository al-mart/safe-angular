export const namingRules = {
  '@typescript-eslint/naming-convention': [
    'error',
    {
      format: ['PascalCase'],
      selector: 'typeLike',
    },
    {
      format: ['PascalCase'],
      modifiers: ['exported'],
      selector: 'class',
    },
    {
      format: ['camelCase'],
      modifiers: ['exported'],
      selector: 'function',
    },
    {
      format: ['PascalCase'],
      modifiers: ['exported'],
      selector: 'interface',
    },
    {
      format: null,
      modifiers: ['destructured'],
      selector: 'variable',
    },
    {
      format: ['camelCase'],
      selector: 'variable',
    },
    {
      format: ['UPPER_CASE', 'camelCase'],
      modifiers: ['global'],
      selector: 'variable',
    },
    {
      format: ['UPPER_CASE', 'camelCase'],
      modifiers: ['exported'],
      selector: 'variable',
    },
    {
      format: ['StrictPascalCase'],
      modifiers: ['exported'],
      selector: 'enum',
    },
    {
      format: ['PascalCase'],
      selector: 'enumMember',
    },
    {
      format: ['camelCase'],
      selector: 'classMethod',
    },
    {
      format: ['camelCase'],
      selector: 'classProperty',
    },
  ],
};
