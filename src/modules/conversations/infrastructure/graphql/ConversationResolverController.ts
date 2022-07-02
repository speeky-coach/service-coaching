import { Context } from '../../../../framework/graphql/getContext';
import Info from '../../../../framework/graphql/Info';
import AccessRole from '../../../../framework/graphql/validators/AccessRole';
import ConversationApplication from '../../application/ConversationApplication';
import Conversation from '../../domain/Conversation';
import { conversationApplication } from '../conversationApplication';

class ConversationResolverController {
  private application: ConversationApplication;

  constructor() {
    this.application = conversationApplication;
  }

  @AccessRole('student')
  public async list(root, args, context: Context, info: Info): Promise<Conversation[]> {
    return this.application.list();
  }
}

export default ConversationResolverController;
