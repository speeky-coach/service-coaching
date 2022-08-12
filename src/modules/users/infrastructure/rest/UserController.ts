import { NextFunction, Request, Response } from 'express';
import { ExpressPresenter } from '@speeky/framework';
import UserApplication from '../../application/UserApplication';
import { userApplication } from '../userApplication';

class UserController {
  private application: UserApplication;

  constructor() {
    this.application = userApplication;
  }

  public async setRoleAsAdmin(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const { userId } = request.params;

      await this.application.setRoleAsAdmin(userId);

      const presenter = new ExpressPresenter(response);

      presenter.returnEmpty();
    } catch (error) {
      next(error);
    }
  }
}

export default UserController;
