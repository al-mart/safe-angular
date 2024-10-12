import type { ApiHttpClient } from '../../service/api-http.client';

// Function which is camelcase
// eslint-disable-next-line @typescript-eslint/naming-convention
export function RestClient(restUrl: string = ''): (clientClass: typeof ApiHttpClient) => void {
  return (clientClass: typeof ApiHttpClient): void => {
    Object.defineProperties(clientClass.prototype, {
      controllerUrl: {
        writable: true,
        enumerable: true,
        configurable: true,
        value: restUrl,
      },
      local: {
        writable: true,
        enumerable: true,
        configurable: true,
        value: { restUrl },
      },
    });
  };
}
