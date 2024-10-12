/* eslint-disable
 no-prototype-builtins,
 max-lines-per-function,
 @typescript-eslint/no-explicit-any,
 @typescript-eslint/no-unsafe-member-access,
 @typescript-eslint/no-unsafe-argument,
 @typescript-eslint/no-unsafe-call,
 @typescript-eslint/no-unsafe-assignment,
 @typescript-eslint/ban-ts-comment
*/
import type { Observable } from 'rxjs';
import type { Nullish } from 'utility-types';
import { isNullish } from 'utility-types';

import type { HttpMethod } from '../../configs/http-method';
import { REQUEST_BODY_INDEX, REQUEST_PARAM_INDEX, REQUEST_PATH_VARIABLES_INDEX } from '../../configs/meta-descriptors';
import type { EmitOptions } from '../../interfaces/emit-options';
import type { ApiHttpClient } from '../../service/api-http.client';
import type { RestTemplate } from '../../service/rest-template';

const replacePathWithPathVariables = (
  args: unknown[],
  pathVariableNameIndexes: Record<string, number>,
  path: string,
): string => {
  let evaluatedPath: string = path;

  for (const [key, value] of Object.entries(pathVariableNameIndexes)) {
    const currentValue = args[value] as string;

    if (!isNullish(currentValue)) {
      evaluatedPath = evaluatedPath.replace(`{${key}}`, currentValue);
    }
  }

  return evaluatedPath;
};

type ParamType = ReadonlyArray<boolean | number | string> | boolean | number | string;

const composeQueryParams = (
  args: unknown[],
  queryParamNameIndex: Record<string, number>,
  overriddenParams: Record<string, ParamType>,
): Record<string, ParamType> => {
  const params: Record<string, ReadonlyArray<boolean | number | string> | boolean | number | string> = {};

  for (const [key, value] of Object.entries(queryParamNameIndex)) {
    const currentValue = args[value] as ReadonlyArray<boolean | number | string> | boolean | number | string;

    if (!isNullish(currentValue)) {
      params[key] = currentValue;
    }
  }

  return { ...params, ...overriddenParams };
};

interface PatchMethodDescriptorOptionsInterface<T> {
  path: string;
  method: HttpMethod;
  target: object;
  descriptor: TypedPropertyDescriptor<T>;
  emitOptions: EmitOptions;
}

export function patchHttpMethodDescriptor<T>({
  path,
  method,
  target,
  descriptor,
  emitOptions,
}: PatchMethodDescriptorOptionsInterface<T>): TypedPropertyDescriptor<T> {
  if (target.hasOwnProperty('prototype')) {
    throw new Error(`Cannot support static methods with current decorator`);
  }

  const originalMethod: any = descriptor.value;

  // @ts-ignore
  descriptor.value = function (...args: unknown[]): Observable<T> {
    let interpolatedPath: string = path;
    const httpClient = this as unknown as ApiHttpClient;
    const result: { restTemplateRef?: RestTemplate<T> } = originalMethod.apply(httpClient, args);
    let template: Nullish | RestTemplate<T> = result.restTemplateRef;

    if (isNullish(template)) {
      throw new Error('You must return restTemplate from your method');
    }

    if (!isNullish(originalMethod[REQUEST_PATH_VARIABLES_INDEX])) {
      interpolatedPath = replacePathWithPathVariables(args, originalMethod[REQUEST_PATH_VARIABLES_INDEX], path);
    }

    const body: unknown = isNullish(originalMethod[REQUEST_BODY_INDEX])
      ? template.options.body
      : args[originalMethod[REQUEST_BODY_INDEX]];

    const params = isNullish(originalMethod[REQUEST_PARAM_INDEX])
      ? template.options.queryParams
      : composeQueryParams(args, originalMethod[REQUEST_PARAM_INDEX], template.options.queryParams ?? {});

    template = template
      .setPath(interpolatedPath)
      .setMethodType(method)
      .setBody(body)
      .setParams(params)
      .setEmitOptions(emitOptions)
      .setClient(httpClient);

    return template.asObservable();
  };

  if (isNullish(descriptor)) {
    throw new Error('descriptor is nullish');
  }

  return descriptor;
}
/* eslint-enable */
