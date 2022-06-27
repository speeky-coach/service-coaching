import { Request } from 'express';
import { UserId } from '../domain/types';

export type UserTokenPayload = {
  id: UserId;
};

export type AccessTokenPayload = {
  user: UserTokenPayload;
};

export type AuthenticatedRequest = Request & AccessTokenPayload;
