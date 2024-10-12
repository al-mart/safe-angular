export function replaceLeadingAndTrailingSlashes(inputString: string): string {
  let result = inputString;

  // Remove leading slashes
  while (result.startsWith('/')) {
    result = result.slice(1);
  }

  // Remove trailing slashes
  while (result.endsWith('/')) {
    result = result.slice(0, -1);
  }

  return result;
}
