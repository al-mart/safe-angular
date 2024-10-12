/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/naming-convention */
import { HttpMethod } from '../../configs/http-method';
import type { EmitOptions } from '../../interfaces/emit-options';
import { patchHttpMethodDescriptor } from './patch-http-method-descriptor';

export function Get<T>(
  path: string = '/',
  emitOptions: EmitOptions = { emitFailure: true, emitSuccess: false },
): MethodDecorator {
  return (
    target: object,
    _name: string | symbol,
    descriptor: TypedPropertyDescriptor<any>,
  ): TypedPropertyDescriptor<any> => {
    return patchHttpMethodDescriptor<T>({ path, method: HttpMethod.GET, target, descriptor, emitOptions });
  };
}
/* eslint-enable */
