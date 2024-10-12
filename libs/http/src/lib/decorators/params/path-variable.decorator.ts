/* eslint-disable
@typescript-eslint/naming-convention,
@typescript-eslint/no-explicit-any,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-unsafe-assignment
*/
import { isNullish } from 'utility-types';

import { REQUEST_PATH_VARIABLES_INDEX } from '../../configs/meta-descriptors';

export function PathVariable(name: string): ParameterDecorator {
  return (target: object, methodName: string | symbol | undefined, parameterIndex: number): void => {
    const pathVariableNameTrimmed: string = name.trim();

    if (isNullish(pathVariableNameTrimmed) || pathVariableNameTrimmed === '') {
      throw new Error('@PathVariable name is required');
    }

    if (isNullish(methodName)) {
      throw new Error('method should have name');
    }

    const originalMethod: any = (target as any)[methodName];

    if (isNullish(originalMethod[REQUEST_PATH_VARIABLES_INDEX])) {
      Object.defineProperty(originalMethod, REQUEST_PATH_VARIABLES_INDEX, {
        value: { [pathVariableNameTrimmed]: parameterIndex },
      });
    } else {
      originalMethod[REQUEST_PATH_VARIABLES_INDEX][pathVariableNameTrimmed] = parameterIndex;
    }
  };
}
/* eslint-enable */
