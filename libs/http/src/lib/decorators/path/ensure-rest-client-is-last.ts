import { isNullish } from 'utility-types';

import type { RequestOptions } from '../../interfaces/request-options';
import type { ApiHttpClient } from '../../service/api-http.client';

export function ensureRestClientIsLast(name: string, clientClass: typeof ApiHttpClient): void {
  const local: Partial<RequestOptions> = (clientClass.prototype as unknown as { local: Partial<RequestOptions> }).local;

  if (isNullish(local)) {
    throw new Error(`${name} should be initialized before @RestClient('controllerPath')`);
  }
}
