import { ExpressContext } from 'apollo-server-express';
import { UserId } from '../domain/types';
import { AuthenticatedRequest, UserTokenPayload } from '../express/types';

export interface Context {
  user: UserTokenPayload;
}

async function getContext({ req, res }: ExpressContext & { req: AuthenticatedRequest }): Promise<Context> {
  return {
    user: req.user,
  };
}

export default getContext;
