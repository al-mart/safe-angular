export function getPathWithoutQueryParams(path: string): string {
  return path.split('?')[0] ?? '';
}
