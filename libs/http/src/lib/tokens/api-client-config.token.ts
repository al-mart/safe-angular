import { InjectionToken } from '@angular/core';

import type { RequestOptions } from '../interfaces/request-options';

export const API_CLIENT_CONFIG_TOKEN = new InjectionToken<RequestOptions>('DATA_CONFIG_SERVICE_TOKEN');
