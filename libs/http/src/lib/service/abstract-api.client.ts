import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpMethod } from '../configs/http-method';
import { ApiHttpInterceptor } from '../interfaces/api-http-interceptor';
import { BeforeRequestOptions } from '../interfaces/before-request-options';
import { DataHttpRequestOptions } from '../interfaces/data-http-request-options';
import { RequestOptions } from '../interfaces/request-options';
import { getHttpHeader } from '../utils/get-http-header';
import { getHttpParams } from '../utils/get-http-params';
import { RequestOptionsConfiguratorService } from './request-options-configurator.service';

@Injectable()
export abstract class AbstractApiClient {
  protected controllerUrl!: string;
  protected local!: Partial<RequestOptions>;

  protected constructor(
    protected readonly http: HttpClient,
    protected readonly configurator: RequestOptionsConfiguratorService,
    protected readonly interceptor: ApiHttpInterceptor,
  ) {}

  public abstract request<Response>(options: BeforeRequestOptions): Observable<Response>;

  public createRequestOptions({ method, path, options }: BeforeRequestOptions): BeforeRequestOptions {
    return { path, method, options: this.configurator.mergeGlobalOptionsWith(this.local, options) };
  }

  public delete<Response>(path: string, options: Partial<RequestOptions> = {}): Observable<Response> {
    return this.request<Response>(this.createRequestOptions({ method: HttpMethod.DELETE, path, options }));
  }

  public get<Response>(path: string, options: Partial<RequestOptions> = {}): Observable<Response> {
    return this.request<Response>(this.createRequestOptions({ method: HttpMethod.GET, path, options }));
  }

  public patch<Response>(path: string, options: Partial<RequestOptions> = {}): Observable<Response> {
    return this.request<Response>(this.createRequestOptions({ method: HttpMethod.PATCH, path, options }));
  }

  public post<Response>(path: string, options: Partial<RequestOptions> = {}): Observable<Response> {
    return this.request<Response>(this.createRequestOptions({ method: HttpMethod.POST, path, options }));
  }

  public put<Response>(path: string, options: Partial<RequestOptions> = {}): Observable<Response> {
    return this.request<Response>(this.createRequestOptions({ method: HttpMethod.PUT, path, options }));
  }

  protected createDataHttpRequestOptions<T>(options: BeforeRequestOptions): DataHttpRequestOptions {
    const httpParams: HttpParams = getHttpParams(options.path, options.options.queryParams);
    const headers: HttpHeaders = getHttpHeader(options.options.headers);

    return {
      withCredentials: false,
      body: this.createHttpBody<T>(options),
      responseType: options.options.responseType ?? 'json',
      reportProgress: options.options.reportProgress ?? false,
      headers: this.interceptor.onInterceptHttpHeaders?.(options, headers) ?? headers,
      params: this.interceptor.onInterceptHttpParams?.(options, httpParams) ?? httpParams,
    };
  }

  private replaceWithNull<T>(body: T): T {
    return JSON.parse(
      JSON.stringify(body, (_: string, element: unknown): unknown => {
        if (typeof element === 'object') {
          return element;
        }

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return [undefined, null, NaN, '', Infinity].includes(element) ? null : element;
      }),
    ) as T;
  }

  // eslint-disable-next-line sonarjs/function-return-type
  private createHttpBody<T>(beforeRequestOptions: BeforeRequestOptions): FormData | T {
    const payload = beforeRequestOptions.options.body as FormData | T;
    const body: FormData | T = this.interceptor.onInterceptBodyPayload?.(beforeRequestOptions, payload) ?? payload;

    if (body instanceof FormData) {
      return body;
    }

    if (beforeRequestOptions.options.nullInsteadEmpty === true) {
      return this.replaceWithNull(body);
    } else {
      return body;
    }
  }
}
