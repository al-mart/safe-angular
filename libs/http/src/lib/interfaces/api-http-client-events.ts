import type { HttpErrorResponse } from '@angular/common/http';

import type { BeforeRequestOptions } from './before-request-options';
import type { MetaDataRequest } from './meta-data-request';

export interface ApiHttpSuccessEvent<K extends object = object> {
  options: BeforeRequestOptions<K>;
  meta: MetaDataRequest;
}

export interface ApiHttpFailureEvent<K extends object = object> {
  error: HttpErrorResponse;
  options: BeforeRequestOptions<K>;
  meta: MetaDataRequest;
}
