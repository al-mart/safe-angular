export const stylisticTsRules = {
  '@stylistic/ts/indent': 'off',
  '@stylistic/ts/block-spacing': 'off',
  '@stylistic/ts/brace-style': 'off',
  '@stylistic/ts/comma-dangle': 'off',
  '@stylistic/ts/no-extra-parens': 'off',
  '@stylistic/ts/key-spacing': 'off',
  '@stylistic/ts/keyword-spacing': 'off',
  '@stylistic/ts/no-extra-semi': 'off',
  '@stylistic/ts/object-curly-newline': 'off',
  '@stylistic/ts/quotes': 'off',
  '@stylistic/ts/semi': 'off',
  '@stylistic/js/object-property-newline': 'off',
  '@stylistic/ts/member-delimiter-style': 'error',
  '@stylistic/ts/type-annotation-spacing': 'error',

  // turn off the base
  '@stylistic/js/comma-spacing': 'off',
  '@stylistic/ts/comma-spacing': ['error', { before: false, after: true }],

  // turn off the base
  '@stylistic/js/func-call-spacing': 'off',
  '@stylistic/ts/func-call-spacing': 'error',

  // turn off the base
  '@stylistic/js/lines-around-comment': 'off',
  '@stylistic/ts/lines-around-comment': [
    'error',
    {
      afterBlockComment: false,
      afterLineComment: false,
      allowArrayEnd: true,
      allowArrayStart: true,
      allowBlockEnd: true,
      allowBlockStart: true,
      allowClassEnd: true,
      allowClassStart: true,
      allowObjectEnd: true,
      allowObjectStart: true,
      applyDefaultIgnorePatterns: true,
      beforeBlockComment: false,
      beforeLineComment: false,
    },
  ],
  // turn off the base
  '@stylistic/js/lines-between-class-members': 'off',
  '@stylistic/ts/lines-between-class-members': [
    'error',
    'always',
    { exceptAfterOverload: true, exceptAfterSingleLine: true },
  ],

  // turn off the base
  '@stylistic/js/object-curly-spacing': 'off',
  '@stylistic/ts/object-curly-spacing': ['error', 'always'],

  // turn off the base
  '@stylistic/js/padding-line-between-statements': 'off',
  '@stylistic/ts/padding-line-between-statements': [
    'error',
    { blankLine: 'always', next: 'block', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'block' },
    { blankLine: 'always', next: 'block-like', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'block-like' },
    { blankLine: 'always', next: 'return', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'directive' },
    { blankLine: 'always', next: ['interface', 'type'], prev: '*' },
    { blankLine: 'always', next: '*', prev: ['const', 'let', 'var'] },
    { blankLine: 'always', next: 'class', prev: '*' },
    { blankLine: 'always', next: '*', prev: 'class' },
    {
      blankLine: 'any',
      next: ['const', 'let', 'var', 'export'],
      prev: ['const', 'let', 'var', 'export'],
    },
    { blankLine: 'any', next: ['case', 'default'], prev: '*' },
    { blankLine: 'any', next: '*', prev: ['case', 'default'] },
    { blankLine: 'any', next: 'directive', prev: 'directive' },
  ],
  // turn off the base
  '@stylistic/js/quote-props': 'off',
  '@stylistic/ts/quote-props': ['error', 'as-needed'],

  // turn off the base
  '@stylistic/js/space-before-blocks': 'off',
  '@stylistic/ts/space-before-blocks': 'error',

  // turn off the base
  '@stylistic/js/space-before-function-paren': 'off',
  '@stylistic/ts/space-before-function-paren': [
    'error',
    {
      named: 'never',
      anonymous: 'ignore',
      asyncArrow: 'always',
    },
  ],

  // turn off the base
  '@stylistic/js/space-infix-ops': 'off',
  '@stylistic/ts/space-infix-ops': 'error',
};
