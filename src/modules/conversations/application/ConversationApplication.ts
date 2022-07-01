import EventBus from '../../../framework/domain/bus/EventBus';
import Conversation from '../domain/Conversation';
import ConversationRepository, { ConversationRepositoryAddData } from '../domain/ConversationRepository';
import ConversationCreated from '../domain/events/ConversationCreated';

class ConversationApplication {
  constructor(private conversationRepository: ConversationRepository, private eventBus: EventBus) {}

  public async create(data: ConversationRepositoryAddData): Promise<Conversation> {
    const conversation = await this.conversationRepository.add(data);

    this.eventBus.publish(new ConversationCreated(conversation));

    return conversation;
  }

  public async list(): Promise<Conversation[]> {
    return this.conversationRepository.list();
  }
}

export default ConversationApplication;
