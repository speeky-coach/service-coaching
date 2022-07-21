import { EventBus } from '@speeky/framework';
import Conversation, { Transcription } from '../domain/Conversation';
import ConversationRepository, { ConversationRepositoryAddData } from '../domain/ConversationRepository';
import ConversationCreated from '../domain/events/ConversationCreated';

export type AddTranscriptionData = {
  conversationId: string;
  transcription: Transcription;
};

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

  public async addTranscription({ conversationId, transcription }: AddTranscriptionData): Promise<void> {
    const payload = {
      transcription,
    };

    await this.conversationRepository.updateById(conversationId, payload);
  }
}

export default ConversationApplication;
