import { ModuleWithProviders, NgModule, Type } from '@angular/core';

import { DEFAULT_REQUEST_OPTIONS } from './configs/default-request-options';
import { ApiHttpInterceptor } from './interfaces/api-http-interceptor';
import { RequestOptions } from './interfaces/request-options';
import { ApiHttpClient } from './service/api-http.client';
import { DefaultApiClientInterceptor } from './service/default-http-client-interceptor';
import { RequestOptionsConfiguratorService } from './service/request-options-configurator.service';
import { API_CLIENT_CONFIG_TOKEN } from './tokens/api-client-config.token';
import { API_CLIENT_INTERCEPTOR_TOKEN } from './tokens/api-client-interceptor.token';

@NgModule()
export class ApiClientModule {
  public static forFeature(clients: Array<Type<unknown>> = []): ModuleWithProviders<ApiClientModule> {
    return { ngModule: ApiClientModule, providers: clients };
  }

  public static forRoot<K extends Record<string, unknown>>(
    clients: Array<Type<unknown>> = [],
    options: Partial<RequestOptions<K>> = {},
    interceptor: Type<ApiHttpInterceptor> = DefaultApiClientInterceptor,
  ): ModuleWithProviders<ApiClientModule> {
    return {
      ngModule: ApiClientModule,
      providers: [
        RequestOptionsConfiguratorService,
        { provide: API_CLIENT_CONFIG_TOKEN, useValue: { ...DEFAULT_REQUEST_OPTIONS, ...options } },
        { provide: API_CLIENT_INTERCEPTOR_TOKEN, useClass: interceptor },
        ApiHttpClient,
        ...clients,
      ],
    };
  }
}
