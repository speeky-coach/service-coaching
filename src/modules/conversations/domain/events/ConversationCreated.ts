import { DomainEvent } from '@speeky/framework';
import Conversation from '../Conversation';

class ConversationCreated extends DomainEvent {
  static readonly EVENT_NAME = 'domain_event.conversation.created';

  readonly data: Conversation;

  constructor(data: Conversation) {
    super(ConversationCreated.EVENT_NAME, data.id);
    this.data = data;
  }
}

export default ConversationCreated;
