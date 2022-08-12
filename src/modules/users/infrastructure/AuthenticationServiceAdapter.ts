import { firebaseAuth } from '@speeky/framework';
import AuthenticationService from '../domain/AuthenticationService';
import UserRoles from '../domain/UserRoles';

class AuthenticationServiceAdapter implements AuthenticationService {
  async setRoleAsAdmin(userId: string): Promise<void> {
    await firebaseAuth.setCustomUserClaims(userId, { role: UserRoles.ADMIN });
  }
}

export const authenticationServiceAdapter = new AuthenticationServiceAdapter();

export default AuthenticationServiceAdapter;
