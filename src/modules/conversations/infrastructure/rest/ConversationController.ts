import { NextFunction, Request, Response } from 'express';
// import { AuthenticatedRequest } from '../../../../framework/express/types';
import ConversationApplication from '../../application/ConversationApplication';
import { ConversationRepositoryAddData } from '../../domain/ConversationRepository';
import { conversationApplication } from '../conversationApplication';
import ExpressDTOPresenter from '../../../../framework/express/ExpressDTOPresenter';

class ConversationController {
  private application: ConversationApplication;

  constructor() {
    this.application = conversationApplication;
  }

  public async create(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      // const authenticatedRequest = request as AuthenticatedRequest;

      const data: ConversationRepositoryAddData = {
        // userId: authenticatedRequest.user.id,
        userId: request.body.userId,
      };

      const conversation = await this.application.create(data);

      const presenter = new ExpressDTOPresenter(response);

      presenter.returnNewEntity(conversation);
    } catch (error) {
      next(error);
    }
  }
}

export default ConversationController;
