import { ForbiddenError } from 'apollo-server-express';
import { Context } from '../getContext';
import Info from '../Info';

type Resolver = (root, args, context: Context, info: Info) => Promise<any>;

function AccessRole(role: string | string[]) {
  return function (target: Object, propertyKey: string, descriptor: PropertyDescriptor): void {
    const originalResolver = descriptor.value as Resolver;

    const roles = Array.isArray(role) ? role : [role];

    descriptor.value = function (root, args, context: Context, info: Info): Promise<any> {
      if (!roles.includes(context.user.role)) throw new ForbiddenError("User doesn't have access");

      const result = originalResolver.call(this, root, args, context, info);

      return result;
    };
  };
}

export default AccessRole;
