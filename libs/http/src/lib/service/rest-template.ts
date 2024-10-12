import type { Observable, OperatorFunction, Subscription } from 'rxjs';
import { noop } from 'rxjs';
import { isNullish } from 'utility-types';

import type { HttpMethod } from '../configs/http-method';
import type { BeforeRequestOptions } from '../interfaces/before-request-options';
import type { EmitOptions } from '../interfaces/emit-options';
import type { RequestOptions } from '../interfaces/request-options';
import type { ApiHttpClient } from './api-http.client';

export class RestTemplate<T> {
  private client: ApiHttpClient | null = null;
  private markAsRequest = false;
  public methodType!: HttpMethod;
  public path!: string;
  protected operators: Array<OperatorFunction<T, unknown>> = [];

  constructor(public options: Partial<RequestOptions> = {}) {}

  public setBody(body: unknown): this {
    this.options.body = body;

    return this;
  }

  public setClient(client: ApiHttpClient): this {
    this.client = client;

    return this;
  }

  public setEmitOptions(options: EmitOptions): this {
    if (options.override === true) {
      this.options.emitSuccess = options.emitSuccess;
      this.options.emitFailure = options.emitFailure;
    } else {
      this.options.emitSuccess = this.options.emitSuccess ?? options.emitSuccess;
      this.options.emitFailure = this.options.emitFailure ?? options.emitFailure;
    }

    return this;
  }

  public setMethodType(type: HttpMethod): this {
    this.methodType = type;

    return this;
  }

  public setOptions(options: Partial<RequestOptions>): this {
    this.options = { ...this.options, ...options };

    return this;
  }

  public setParams(
    queryParams:
      | Record<string, ReadonlyArray<boolean | number | string> | boolean | number | string>
      | null
      | undefined,
  ): this {
    this.options.queryParams = queryParams;

    return this;
  }

  public setPath(path: string): this {
    this.path = path;

    return this;
  }

  public asProxyObservable(): Observable<T> {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const that: RestTemplate<T> = this;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const fakeProxy$: Observable<T> & { restTemplateRef: RestTemplate<T> } = {
      restTemplateRef: that,
      pipe(...operators: Array<OperatorFunction<T, unknown>>): Observable<T> {
        that.operators.push(...operators);

        return fakeProxy$;
      },
      subscribe: (): Subscription => {
        if (!that.markAsRequest) {
          throw new Error(
            'You cannot invoke observable outside data request context. \n' +
              'Use only @Get, @Post, @Put, @Delete decorators for correct call http method...',
          );
        }

        return that.asObservable().subscribe(noop);
      },
    };

    return fakeProxy$;
  }

  // eslint-disable-next-line max-lines-per-function
  public asObservable(): Observable<T> {
    this.markAsRequest = true;

    if (isNullish(this.client)) {
      throw new Error('Not found http client');
    }

    if (isNullish(this.client[this.methodType])) {
      throw new Error(`Method ${this.methodType} not supported`);
    }

    const options: BeforeRequestOptions = this.client.createRequestOptions({
      path: this.path,
      method: this.methodType,
      options: this.options,
    });

    let stream$: Observable<T> = this.client.request(options);

    if (this.operators.length > 0) {
      for (const operator of this.operators) {
        stream$ = stream$.pipe(operator) as Observable<T>;
      }
    }

    return stream$;
  }
}
