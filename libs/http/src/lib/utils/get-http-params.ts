import { HttpParams } from '@angular/common/http';

import { parseQueryParams } from './parse-query-params';

export function getHttpParams(
  path: string,
  params: Record<string, ReadonlyArray<boolean | number | string> | boolean | number | string> | null | undefined,
): HttpParams {
  const queryPath = parseQueryParams(path);
  const fromObject: Record<string, ReadonlyArray<boolean | number | string> | boolean | number | string> = {
    ...queryPath,
    ...(params ?? {}),
  };

  return new HttpParams({ fromObject });
}
