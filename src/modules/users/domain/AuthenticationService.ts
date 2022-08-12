import { UserId } from '@speeky/framework';

interface AuthenticationService {
  setRoleAsAdmin(userId: UserId): Promise<void>;
}

export default AuthenticationService;
