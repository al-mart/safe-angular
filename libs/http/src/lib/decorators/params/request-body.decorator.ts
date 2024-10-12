/* eslint-disable
@typescript-eslint/naming-convention,
@typescript-eslint/no-explicit-any,
@typescript-eslint/no-unsafe-member-access,
@typescript-eslint/no-unsafe-assignment
*/
import { isNullish } from 'utility-types';

import { REQUEST_BODY_INDEX } from '../../configs/meta-descriptors';

export function RequestBody(): ParameterDecorator {
  return (target: object, methodName: string | symbol | undefined, parameterIndex: number): void => {
    if (isNullish(methodName)) {
      throw new Error('method should have a name');
    }

    const originalMethod: any = (target as any)[methodName];

    if (!isNullish(originalMethod[REQUEST_BODY_INDEX])) {
      throw new Error('Please provide only one @RequestBody parameter');
    }

    Object.defineProperty(originalMethod, REQUEST_BODY_INDEX, {
      value: parameterIndex,
    });
  };
}
/* eslint-enable */
