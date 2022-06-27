import Conversation, { ConversationId } from '../domain/Conversation';
import ConversationRepository, { ConversationRepositoryAddData } from '../domain/ConversationRepository';
import { mongodbApp } from '../../../framework/mongodb/MongodbApp';
import WithMetadata from '../../../framework/infrastructure/WithMetadata';

class ConversationRepositoryAdapter implements ConversationRepository {
  private testId: string | null = null;

  public setTestId(value: string): void {
    this.testId = value;
  }

  public async findByTestId(testId: string): Promise<WithMetadata<Conversation> | null> {
    const conversation = await mongodbApp.getDb().collection<WithMetadata<Conversation>>('conversations').findOne({
      'metadata.testId': testId,
    });

    if (!conversation) return null;

    conversation.id = conversation._id.toString();

    return conversation;
  }

  public async add(data: ConversationRepositoryAddData): Promise<Conversation> {
    const now = new Date();

    const conversation: Omit<Conversation, 'id'> = {
      userId: data.userId,
      createdAt: now,
    };

    if (process.env.NODE_ENV === 'test' && this.testId) {
      conversation['metadata'] = {
        testId: this.testId,
      };
    }

    const result = await mongodbApp.getDb().collection('conversations').insertOne(conversation);

    const conversationId = result.insertedId.toString();

    return {
      ...conversation,
      id: conversationId,
    };
  }
}

export const conversationRepositoryAdapter = new ConversationRepositoryAdapter();

export default ConversationRepositoryAdapter;
