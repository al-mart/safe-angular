import type { EnvironmentProviders, Provider, Type } from '@angular/core';
import { makeEnvironmentProviders } from '@angular/core';

import { DEFAULT_REQUEST_OPTIONS } from './configs/default-request-options';
import type { ApiHttpInterceptor } from './interfaces/api-http-interceptor';
import type { RequestOptions } from './interfaces/request-options';
import { ApiHttpClient } from './service/api-http.client';
import { DefaultApiClientInterceptor } from './service/default-http-client-interceptor';
import { RequestOptionsConfiguratorService } from './service/request-options-configurator.service';
import { API_CLIENT_CONFIG_TOKEN } from './tokens/api-client-config.token';
import { API_CLIENT_INTERCEPTOR_TOKEN } from './tokens/api-client-interceptor.token';

export const provideApiClientModule = <K extends Record<string, unknown>>(
  clients: Array<Type<unknown>> = [],
  options: Partial<RequestOptions<K>> = {},
  interceptor: Type<ApiHttpInterceptor> = DefaultApiClientInterceptor,
): EnvironmentProviders => {
  const providers: Provider[] = [
    RequestOptionsConfiguratorService,
    { provide: API_CLIENT_CONFIG_TOKEN, useValue: { ...DEFAULT_REQUEST_OPTIONS, ...options } },
    { provide: API_CLIENT_INTERCEPTOR_TOKEN, useClass: interceptor },
    ApiHttpClient,
    ...clients,
  ];

  return makeEnvironmentProviders(providers);
};
