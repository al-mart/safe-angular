import { isNullish } from 'utility-types';

import type { DataUrlPathSegment } from '../interfaces/data-url-path-segment';
import type { RequestOptions } from '../interfaces/request-options';
import { replaceLeadingAndTrailingSlashes } from './replace-leading-and-trailing-slashes';

export function makeUrlSegments(
  { hostUrl, baseUrl }: Partial<RequestOptions> = {},
  restUrl: string = '',
  pathUrl: string = '',
): DataUrlPathSegment {
  if (isNullish(baseUrl)) {
    throw new Error(`Base url must be specified`);
  }

  const clearHostUrl: string = isNullish(hostUrl)
    ? `${window.location.protocol}//${window.location.host}`
    : replaceLeadingAndTrailingSlashes(hostUrl);

  return {
    hostUrl: clearHostUrl,
    baseUrl: replaceLeadingAndTrailingSlashes(baseUrl),
    restUrl: replaceLeadingAndTrailingSlashes(restUrl),
    pathUrl: replaceLeadingAndTrailingSlashes(pathUrl),
  };
}
