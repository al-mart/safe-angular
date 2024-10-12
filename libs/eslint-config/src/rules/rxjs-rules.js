export const rxjsRules = {
  'rxjs/ban-observables': [
    'error',
    {
      of: false,
      onErrorResumeNext: 'What is this? Visual Basic?',
    },
  ],
  'rxjs/ban-operators': [
    'error',
    {
      of: false,
      mapTo: 'Use map(() => val)',
    },
  ],
  'rxjs/finnish': [
    'error',
    {
      functions: true,
      methods: false,
      names: {
        '^(canActivate|canActivateChild|canDeactivate|canLoad|intercept|resolve|validate)$': false,
      },
      parameters: true,
      properties: true,
      strict: false,
      types: {
        '^EventEmitter$': false,
      },
      variables: true,
    },
  ],
  'rxjs/no-async-subscribe': 'error',
  'rxjs/no-compat': 'error',
  'rxjs/no-connectable': 'error',
  'rxjs/no-create': 'error',
  'rxjs/no-cyclic-action': 'error',
  'rxjs/no-explicit-generics': 'error',
  'rxjs/no-exposed-subjects': 'error',
  'rxjs/no-implicit-any-catch': 'error',
  'rxjs/no-redundant-notify': 'error',
  'rxjs/no-index': 'error',
  'rxjs/no-internal': 'error',
  'rxjs/no-ignored-error': 'warn',
  'rxjs/no-ignored-notifier': 'error',
  'rxjs/no-ignored-observable': 'error',
  'rxjs/no-ignored-replay-buffer': 'error',
  'rxjs/no-ignored-subscription': 'off',
  'rxjs/no-nested-subscribe': 'error',
  'rxjs/no-ignored-subscribe': 'error',
  'rxjs/no-subclass': 'error',
  'rxjs/no-subject-unsubscribe': 'error',
  'rxjs/no-subject-value': 'off',
  'rxjs/no-topromise': 'error',
  'rxjs/no-unbound-methods': 'error',
  'rxjs/no-unsafe-catch': 'error',
  'rxjs/no-unsafe-first': 'error',
  'rxjs/no-unsafe-subject-next': 'error',
  'rxjs/no-unsafe-switchmap': 'error',
  'rxjs/prefer-observer': 'off',
  'rxjs/suffix-subjects': [
    'error',
    {
      parameters: true,
      properties: true,
      suffix: 'Subject',
      types: {
        '^EventEmitter$': false,
      },
      variables: true,
    },
  ],
  'rxjs/throw-error': 'error',
  'no-restricted-globals': [
    'error',
    {
      name: 'setInterval',
      message: 'Avoid using timers. Use `interval` from rxjs instead.',
    },
    {
      name: 'setTimeout',
      message: 'Avoid using timers. Use `timer` from rxjs instead.',
    },
  ],
  'no-restricted-properties': [
    'error',
    {
      object: 'window',
      property: 'setInterval',
      message: 'Avoid using timers. Use `interval` from rxjs instead.',
    },
    {
      object: 'window',
      property: 'setTimeout',
      message: 'Avoid using timers. Use `timer` from rxjs instead.',
    },
  ],
};
