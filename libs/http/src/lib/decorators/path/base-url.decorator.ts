import { isNullish } from 'utility-types';

import type { RequestOptions } from '../../interfaces/request-options';
import type { ApiHttpClient } from '../../service/api-http.client';
import { replaceDoubleSlash } from '../../utils/replace-double-slash';
import { ensureRestClientIsLast } from './ensure-rest-client-is-last';

// Function which is camelcase
// eslint-disable-next-line @typescript-eslint/naming-convention
export function BaseUrl(baseUrl: string = ''): (clientClass: typeof ApiHttpClient) => void {
  return (clientClass: typeof ApiHttpClient): void => {
    ensureRestClientIsLast('@BaseUrl', clientClass);

    const localRef: Partial<RequestOptions> = (clientClass.prototype as unknown as { local: Partial<RequestOptions> })
      .local;

    if (isNullish(localRef.baseUrl)) {
      localRef.baseUrl = replaceDoubleSlash(baseUrl);
    }
  };
}
