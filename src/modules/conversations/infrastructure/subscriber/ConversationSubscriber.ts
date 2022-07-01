import { UserId } from '../../../../framework/domain/types';
import DomainEventDTO from '../../../../framework/infrastructure/DomainEventDTO';
import ConversationApplication from '../../application/ConversationApplication';
import { ConversationRepositoryAddData } from '../../domain/ConversationRepository';
import { conversationApplication } from '../conversationApplication';

interface AudioUploaded extends DomainEventDTO {
  data: {
    userId: UserId;
    filename: string;
  };
}

class ConversationSubscriber {
  private application: ConversationApplication;

  constructor() {
    this.application = conversationApplication;
  }

  public async create(event: AudioUploaded): Promise<void> {
    const data: ConversationRepositoryAddData = {
      userId: event.data.userId,
      filename: event.data.filename,
    };

    const conversation = await this.application.create(data);
  }
}

export default ConversationSubscriber;
