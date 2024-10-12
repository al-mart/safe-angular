import { InjectionToken } from '@angular/core';

import type { ApiHttpInterceptor } from '../interfaces/api-http-interceptor';

export const API_CLIENT_INTERCEPTOR_TOKEN = new InjectionToken<ApiHttpInterceptor>('DATA_HTTP_CLIENT_INTERCEPTOR');
