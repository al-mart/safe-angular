import { DefaultUrlSerializer } from '@angular/router';

export function parseQueryParams(path: string): Record<string, string> {
  return new DefaultUrlSerializer().parse(path).queryParams;
}
