import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../express/errors/UnauthorizedError';
import { AuthenticatedRequest, UserTokenPayload } from '../express/types';
import { firebaseAuth } from './FirebaseApp';

async function authMiddleware(request: Request | AuthenticatedRequest, response: Response, next: NextFunction) {
  try {
    if (!request.headers.authorization) throw new UnauthorizedError();

    const [type, token] = request.headers.authorization.split(' ');

    if (type !== 'Bearer' || !token) throw new UnauthorizedError();

    const decodedToken = await firebaseAuth.verifyIdToken(token);

    const user: UserTokenPayload = {
      id: decodedToken.uid,
      email: decodedToken.email,
      role: 'student',
    };

    (request as AuthenticatedRequest).user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default authMiddleware;
