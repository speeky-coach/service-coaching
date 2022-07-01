import { UserId } from '../../../../framework/domain/types';
import DomainEventDTO from '../../../../framework/infrastructure/DomainEventDTO';
import ConversationApplication, { AddTranscriptionData } from '../../application/ConversationApplication';
import { Transcription } from '../../domain/Conversation';
import { ConversationRepositoryAddData } from '../../domain/ConversationRepository';
import { conversationApplication } from '../conversationApplication';

interface AudioUploaded extends DomainEventDTO {
  data: {
    userId: UserId;
    filename: string;
  };
}

interface ConversationTranscribed extends DomainEventDTO {
  data: {
    transcription: Transcription;
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

    await this.application.create(data);
  }

  public async addTranscription(event: ConversationTranscribed): Promise<void> {
    const data: AddTranscriptionData = {
      conversationId: event.entityId,
      transcription: event.data.transcription,
    };

    await this.application.addTranscription(data);
  }
}

export default ConversationSubscriber;
