import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { ApiHttpFailureEvent, ApiHttpSuccessEvent } from '../interfaces/api-http-client-events';
import { ApiHttpInterceptor } from '../interfaces/api-http-interceptor';

@Injectable()
export class DefaultApiClientInterceptor implements ApiHttpInterceptor {
  // eslint-disable-next-line rxjs/no-exposed-subjects
  public errorsSubject$ = new Subject<ApiHttpFailureEvent>();
  // eslint-disable-next-line rxjs/no-exposed-subjects
  public successSubject$ = new Subject<ApiHttpSuccessEvent>();
}
