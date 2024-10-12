import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { readFileSync, writeFileSync } from 'node:fs';

(function () {
  let projectArgument = process.argv.find((arg) => {
    return arg.includes('-p=');
  });
  if (!projectArgument) {
    throw new Error('Project name argument is required (-p={name})');
  }
  const rootDir = join(dirname(fileURLToPath(import.meta.url)), '..');

  let projectName = projectArgument.substring(projectArgument.indexOf('=') + 1);

  const rootPackageJson = JSON.parse(readFileSync(`${rootDir}/package.json`, 'utf-8'));
  const allDependencies = {
    ...rootPackageJson.dependencies,
    ...rootPackageJson.devDependencies,
    ...rootPackageJson.peerDependencies,
  };

  const projectPackageJson = JSON.parse(readFileSync(`${rootDir}/libs/${projectName}/package.json`, 'utf-8'));

  const updatedPackageJson = { ...projectPackageJson };

  if (projectPackageJson.dependencies) {
    for (let dependencyName of Object.keys(projectPackageJson.dependencies)) {
      updatedPackageJson.dependencies[dependencyName] = allDependencies[dependencyName];
    }
  }

  if (projectPackageJson.peerDependencies) {
    for (let dependencyName of Object.keys(projectPackageJson.peerDependencies)) {
      updatedPackageJson.peerDependencies[dependencyName] = allDependencies[dependencyName];
    }
  }

  if (projectPackageJson.devDependencies) {
    for (let dependencyName of Object.keys(projectPackageJson.devDependencies)) {
      updatedPackageJson.devDependencies[dependencyName] = allDependencies[dependencyName];
    }
  }

  writeFileSync(`${rootDir}/libs/${projectName}/package.json`, JSON.stringify(updatedPackageJson));
})();
