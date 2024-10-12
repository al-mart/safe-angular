import type { HttpHeaders, HttpParams } from '@angular/common/http';

import type { ResponseType } from './request-options';

// Shadows angular request internal options
export interface DataHttpRequestOptions {
  body: unknown;
  headers: HttpHeaders;
  params: HttpParams;
  responseType: ResponseType;
  withCredentials: boolean;
  reportProgress: boolean;
}
