import { isNullish } from 'utility-types';

import type { RequestOptions } from '../../interfaces/request-options';
import type { ApiHttpClient } from '../../service/api-http.client';
import { ensureRestClientIsLast } from './ensure-rest-client-is-last';

// Function which is camelcase
// eslint-disable-next-line @typescript-eslint/naming-convention
export function HostUrl(hostUrl: string = ''): (clientClass: typeof ApiHttpClient) => void {
  return (clientClass: typeof ApiHttpClient): void => {
    ensureRestClientIsLast('@HostUrl', clientClass);

    const localRef: Partial<RequestOptions> = (clientClass.prototype as unknown as { local: Partial<RequestOptions> })
      .local;

    if (isNullish(localRef.hostUrl)) {
      localRef.hostUrl = hostUrl;
    }
  };
}
