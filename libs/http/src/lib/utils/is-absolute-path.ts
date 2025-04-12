export function isAbsolutePath(path: string, matchRegExp: RegExp = /^(http|https):\/\//): boolean {
  // eslint-disable-next-line @cspell/spellchecker
  // eslint-disable-next-line sonarjs/prefer-regexp-exec
  const result: string[] | null = path.match(matchRegExp);

  return Boolean(result);
}
