import AuthenticationService from '../domain/AuthenticationService';

class UserApplication {
  constructor(private authenticationService: AuthenticationService) {}

  public async setRoleAsAdmin(userId: string): Promise<void> {
    await this.authenticationService.setRoleAsAdmin(userId);
  }
}

export default UserApplication;
