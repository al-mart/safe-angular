import type { HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import type { Observable, Subject } from 'rxjs';

import type { ApiHttpFailureEvent, ApiHttpSuccessEvent } from './api-http-client-events';
import type { BeforeRequestOptions } from './before-request-options';
import type { MetaDataRequest } from './meta-data-request';

export interface ApiHttpInterceptor<K extends object = object> {
  successSubject$?: Subject<ApiHttpSuccessEvent<K>>;
  errorsSubject$?: Subject<ApiHttpFailureEvent<K>>;
  onBeforeRequest?(options: BeforeRequestOptions<K>): void;
  onInterceptHttpParams?(options: BeforeRequestOptions<K>, httpParams: HttpParams): HttpParams;
  onInterceptBodyPayload?<T>(options: BeforeRequestOptions<K>, body: T): T;
  onInterceptHttpHeaders?(options: BeforeRequestOptions<K>, headers: HttpHeaders): HttpHeaders;
  onTapAfterRequest?(response: unknown, meta: MetaDataRequest): void;
  onEmitSuccess?(response: unknown, options: BeforeRequestOptions<K>, meta: MetaDataRequest): void;
  onEmitFailure?(error: HttpErrorResponse, options: BeforeRequestOptions<K>, meta: MetaDataRequest): void;
  onErrorAfterRequest?(error: HttpErrorResponse, meta: MetaDataRequest): void;
  onCatchErrorAfterRequest?(error: HttpErrorResponse, meta: MetaDataRequest): Observable<never>;
  onFinalizeAfterRequest?(meta: MetaDataRequest): void;
  delayRequests?(): Observable<boolean> | number;
}
