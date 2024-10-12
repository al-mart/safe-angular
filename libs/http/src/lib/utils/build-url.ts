import type { DataUrlPathSegment } from '../interfaces/data-url-path-segment';
import { getPathWithoutQueryParams } from './get-path-without-query-params';
import { isAbsolutePath } from './is-absolute-path';
import { replaceDoubleSlash } from './replace-double-slash';

const getFullUrl = ({ hostUrl, baseUrl, restUrl, pathUrl }: DataUrlPathSegment): string => {
  if (isAbsolutePath(pathUrl)) {
    return pathUrl;
  } else {
    const clearPathUrl: string = getPathWithoutQueryParams(pathUrl);

    return [hostUrl, baseUrl, restUrl, clearPathUrl]
      .filter((element: string): element is string => {
        return element !== '';
      })
      .join('/');
  }
};

export function buildUrl(dataUrlPathSegment: DataUrlPathSegment): string {
  return replaceDoubleSlash(getFullUrl(dataUrlPathSegment));
}
