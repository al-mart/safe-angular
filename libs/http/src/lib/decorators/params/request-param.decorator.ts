/* eslint-disable
@typescript-eslint/naming-convention,
@typescript-eslint/no-explicit-any,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-unsafe-assignment
*/
import { isNullish } from 'utility-types';

import { REQUEST_PARAM_INDEX } from '../../configs/meta-descriptors';

export function RequestParam(paramName: string): ParameterDecorator {
  return (target: object, methodName: string | symbol | undefined, parameterIndex: number): void => {
    const paramNameTrimmed: string = paramName.trim();

    if (isNullish(methodName)) {
      throw new Error('method should have a name');
    }

    if (!isNullish(paramNameTrimmed) && paramNameTrimmed === '') {
      throw new Error('@RequestParam name is required');
    }

    const originalMethod: any = (target as any)[methodName];

    if (isNullish(originalMethod[REQUEST_PARAM_INDEX])) {
      Object.defineProperty(originalMethod, REQUEST_PARAM_INDEX, {
        value: { [paramNameTrimmed]: parameterIndex },
      });
    } else {
      originalMethod[REQUEST_PARAM_INDEX][paramNameTrimmed] = parameterIndex;
    }
  };
}
/* eslint-enable */
