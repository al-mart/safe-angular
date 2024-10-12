import { HttpHeaders } from '@angular/common/http';

import type { HeadersParams } from '../interfaces/request-options';

export function getHttpHeader(params: HeadersParams = {}): HttpHeaders {
  return new HttpHeaders(params);
}
