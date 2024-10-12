export const rxjsAngularRules = {
  'rxjs-angular/prefer-async-pipe': 'warn',
  'rxjs-angular/prefer-takeuntil': [
    'error',
    {
      alias: ['untilDestroyed', 'takeUntilDestroyed'],
      checkComplete: true,
      checkDecorators: ['Component'],
      checkDestroy: false,
    },
  ],
  'rxjs-angular/prefer-composition': 'off',
};
