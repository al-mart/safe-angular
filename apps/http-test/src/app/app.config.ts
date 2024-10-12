import { provideHttpClient } from '@angular/common/http';
import type { ApplicationConfig } from '@angular/core';
import { provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideApiClientModule } from '../../../../libs/http/src/lib/provide-api-client-module';
import { appRoutes } from './app.routes';
import { CommonApi } from './services/common.api';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideHttpClient(),
    provideApiClientModule([CommonApi], {
      hostUrl: 'http://localhost:4200',
      emitFailure: true,
      emitSuccess: true,
    }),
  ],
};
