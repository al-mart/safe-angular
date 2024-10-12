import type { RequestOptions } from './request-options';

export interface BeforeRequestOptions<K extends object = object> {
  path: string;
  method: string;
  options: Partial<RequestOptions<K>>;
}
