import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  catchError,
  delay,
  filter,
  finalize,
  Observable,
  Subscriber,
  Subscription,
  switchMap,
  take,
  tap,
  throwError,
} from 'rxjs';
import { isNullish } from 'utility-types';

import { ApiHttpInterceptor } from '../interfaces/api-http-interceptor';
import { BeforeRequestOptions } from '../interfaces/before-request-options';
import { DataHttpRequestOptions } from '../interfaces/data-http-request-options';
import { DataUrlPathSegment } from '../interfaces/data-url-path-segment';
import { MetaDataRequest } from '../interfaces/meta-data-request';
import { RequestOptions } from '../interfaces/request-options';
import { API_CLIENT_INTERCEPTOR_TOKEN } from '../tokens/api-client-interceptor.token';
import { buildUrl } from '../utils/build-url';
import { makeUrlSegments } from '../utils/make-url-segments';
import { AbstractApiClient } from './abstract-api.client';
import { RequestOptionsConfiguratorService } from './request-options-configurator.service';
import { RestTemplate } from './rest-template';

@Injectable()
export class ApiHttpClient extends AbstractApiClient {
  constructor(
    @Inject(API_CLIENT_INTERCEPTOR_TOKEN) protected override readonly interceptor: ApiHttpInterceptor,
    protected override readonly http: HttpClient,
    protected override readonly configurator: RequestOptionsConfiguratorService,
  ) {
    super(http, configurator, interceptor);
  }

  // eslint-disable-next-line max-lines-per-function
  public request<Response>(options: BeforeRequestOptions): Observable<Response> {
    if (isNullish(this.local)) {
      throw new Error(`You must use the @RestClient('controller') decorator for work correctly`);
    }

    const meta: MetaDataRequest = this.createMetaDataRequest(options);
    let observable$: Observable<Response> = this.http.request(
      options.method,
      meta.url,
      meta.requestOptions,
    ) as Observable<Response>;
    const delayBy$ = this.interceptor.delayRequests?.();

    if (delayBy$ !== undefined) {
      if (typeof delayBy$ === 'number') {
        observable$ = observable$.pipe(delay(delayBy$));
      } else {
        observable$ = delayBy$.pipe(
          filter((value) => {
            return value;
          }),
          switchMap(() => {
            return observable$;
          }),
        );
      }
    }

    return new Observable<Response>((subscriber: Subscriber<Response>): Subscription => {
      this.interceptor.onBeforeRequest?.(options);

      return this.wrapHttpRequestWithMeta(meta, options, observable$).subscribe(subscriber);
    });
  }

  protected restTemplate<T>(options?: Partial<RequestOptions>): Observable<T> {
    return new RestTemplate<T>(options).asProxyObservable();
  }

  private createMetaDataRequest(options: BeforeRequestOptions): MetaDataRequest {
    const { emitSuccess = true, emitFailure = true }: Partial<RequestOptions> = options.options;
    const segments: DataUrlPathSegment = makeUrlSegments(options.options, this.controllerUrl, options.path);
    const requestOptions: DataHttpRequestOptions = this.createDataHttpRequestOptions(options);
    const url: string = buildUrl(segments);

    return { method: options.method, url, emitSuccess, emitFailure, requestOptions, segments };
  }

  private onCatch(error: HttpErrorResponse, meta: MetaDataRequest): Observable<never> {
    return (
      this.interceptor.onCatchErrorAfterRequest?.(error, meta) ??
      throwError((): HttpErrorResponse => {
        return error;
      })
    );
  }

  private onError(error: HttpErrorResponse, meta: MetaDataRequest, options: BeforeRequestOptions): void {
    if (options.options.emitFailure === true) {
      this.interceptor.errorsSubject$?.next({ error, options, meta });
      this.interceptor.onEmitFailure?.(error, options, meta);
    }

    this.interceptor.onErrorAfterRequest?.(error, meta);
  }

  private onSuccess<R>(response: R, meta: MetaDataRequest, options: BeforeRequestOptions): void {
    if (options.options.emitSuccess === true) {
      this.interceptor.successSubject$?.next({ options, meta });
      this.interceptor.onEmitSuccess?.(response, options, meta);
    }

    this.interceptor.onTapAfterRequest?.(response, meta);
  }

  // eslint-disable-next-line max-lines-per-function
  private wrapHttpRequestWithMeta<T, R = T>(
    meta: MetaDataRequest,
    options: BeforeRequestOptions,
    observable$: Observable<R>,
  ): Observable<R> {
    return observable$.pipe(
      tap({
        next: (response: R): void => {
          this.onSuccess(response, meta, options);
        },
        error: (error: unknown): void => {
          this.onError(error as HttpErrorResponse, meta, options);
        },
      }),
      catchError((error: unknown): Observable<never> => {
        return this.onCatch(error as HttpErrorResponse, meta);
      }),
      finalize((): void => {
        return this.interceptor.onFinalizeAfterRequest?.(meta);
      }),
      take(1),
    );
  }
}
