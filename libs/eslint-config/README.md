
# Safe Angular ESLint Config

This library contains a shareable ESLint configuration for the `safe-angular` project. It enforces best practices and code quality standards for Angular and TypeScript projects.

## Features

- Preconfigured for Angular and TypeScript.
- Includes rules for clean code and consistent formatting.
- Optimized for team-based development.

## Installation

Install the config and peer dependencies:

```bash
npm install --save-dev @safe-angular/eslint-config
```

## Usage

In your project's `eslint.config.js`, extend the configuration:

```js
import { eslintAngularConfig } from '@safe-angular/eslint-config';
export default [
...eslintAngularConfig,
];
```

## License

This project is licensed under the MIT License.
