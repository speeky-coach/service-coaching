import { ExpressContext } from 'apollo-server-express';

export interface Context {
  user: {
    role: string;
  };
}

async function getContext({ req, res }: ExpressContext): Promise<Context> {
  const user = {
    role: 'student',
  };

  return {
    user,
  };
}

export default getContext;
