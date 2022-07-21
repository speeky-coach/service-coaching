import { NextFunction, Request, Response } from 'express';
import { ExpressPresenter } from '@speeky/framework';
import ConversationApplication from '../../application/ConversationApplication';
import { ConversationRepositoryAddData } from '../../domain/ConversationRepository';
import { conversationApplication } from '../conversationApplication';

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
        filename: request.body.filename,
      };

      const conversation = await this.application.create(data);

      const presenter = new ExpressPresenter(response);

      presenter.returnNewEntity(conversation);
    } catch (error) {
      next(error);
    }
  }

  public async list(request: Request, response: Response, next: NextFunction): Promise<void> {
    try {
      const conversations = await this.application.list();

      const presenter = new ExpressPresenter(response);

      presenter.returnList(conversations);
    } catch (error) {
      next(error);
    }
  }
}

export default ConversationController;
