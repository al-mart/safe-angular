
# Safe Angular Prettier Config

This library contains a shareable Prettier configuration for the `safe-angular` project. It ensures consistent code formatting across the project.

## Features

- Preconfigured for Angular and TypeScript projects.
- Enforces a consistent code style.
- Easy to integrate into team workflows.

## Installation

Install the config and peer dependencies:

```bash
npm install --save-dev @safe-angular/prettier-config
```

## Usage

In your project's `prettier.config.js`, extend the configuration:

```js
import { prettierConfig } from '@safe-angular/prettier-config/index.js';
export default { ...prettierConfig };
```

## License

This project is licensed under the MIT License.
