import UserApplication from '../application/UserApplication';
import { authenticationServiceAdapter } from './AuthenticationServiceAdapter';

export const userApplication = new UserApplication(authenticationServiceAdapter);
