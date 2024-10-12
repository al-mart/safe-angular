import type { RequestOptions } from '../interfaces/request-options';

export const DEFAULT_REQUEST_OPTIONS: RequestOptions = {
  baseUrl: '',
  hostUrl: '',
  body: {},
  headers: {},
  queryParams: {},
  pathVariables: {},
  emitSuccess: true,
  emitFailure: true,
  responseType: 'json',
  reportProgress: true,
  additionalOptions: {},
  nullInsteadEmpty: true,
};
