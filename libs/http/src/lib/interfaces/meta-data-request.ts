import type { DataHttpRequestOptions } from './data-http-request-options';
import type { DataUrlPathSegment } from './data-url-path-segment';

export interface MetaDataRequest {
  url: string;
  method: string;
  emitSuccess: boolean;
  emitFailure: boolean;
  requestOptions: DataHttpRequestOptions;
  segments: DataUrlPathSegment;
}
