import { Inject, Injectable } from '@angular/core';

import { RequestOptions } from '../interfaces/request-options';
import { API_CLIENT_CONFIG_TOKEN } from '../tokens/api-client-config.token';

@Injectable()
export class RequestOptionsConfiguratorService {
  constructor(@Inject(API_CLIENT_CONFIG_TOKEN) private readonly globalConfig: Partial<RequestOptions>) {}

  public mergeGlobalOptionsWith(
    localConfig: Partial<RequestOptions>,
    options: Partial<RequestOptions>,
  ): Partial<RequestOptions> {
    return { ...this.globalConfig, ...localConfig, ...options };
  }
}
