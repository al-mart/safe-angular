export type HeadersParams = Record<string, string[] | string>;

export type ResponseType = 'arraybuffer' | 'blob' | 'json' | 'text';

export interface RequestOptions<T extends object = object> {
  nullInsteadEmpty: boolean;
  hostUrl: string;
  baseUrl: string;
  headers: HeadersParams;
  queryParams: Record<string, ReadonlyArray<boolean | number | string> | boolean | number | string> | null;
  pathVariables: Record<string, ReadonlyArray<boolean | number | string> | boolean | number | string> | null;
  responseType: ResponseType;
  reportProgress: boolean;
  emitSuccess: boolean;
  emitFailure: boolean;
  body: unknown;
  additionalOptions: T;
}
