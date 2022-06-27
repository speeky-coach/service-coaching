// import EventBus from '../../../framework/domain/bus/EventBus';
import Conversation from '../domain/Conversation';
import ConversationRepository, { ConversationRepositoryAddData } from '../domain/ConversationRepository';

class ConversationApplication {
  constructor(
    private conversationRepository: ConversationRepository, // private eventBus: EventBus,
  ) {}

  public async create(data: ConversationRepositoryAddData): Promise<Conversation> {
    const conversation = await this.conversationRepository.add(data);

    return conversation;
  }
}

export default ConversationApplication;
