import Conversation, { ConversationId } from '../domain/Conversation';
import ConversationRepository, { ConversationRepositoryAddData } from '../domain/ConversationRepository';
import { mongodbApp } from '../../../framework/mongodb/MongodbApp';
import WithMetadata from '../../../framework/infrastructure/WithMetadata';
import { ObjectId } from 'mongodb';

class ConversationRepositoryAdapter implements ConversationRepository {
  private testId: string | null = null;

  public async drop(): Promise<void> {
    // await mongodbApp.connect();

    // const collections = await mongodbApp.getDb().listCollections({ name: 'conversations' }).toArray();

    // if (collections.length === 0) return;

    await mongodbApp.getDb().collection('conversations').deleteMany({});
  }

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
      filename: data.filename,
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

  public async list(): Promise<Conversation[]> {
    const list = await mongodbApp.getDb().collection<Conversation>('conversations').find().toArray();

    const result = list.map((item) => ({ ...item, id: item._id.toString() }));

    return result as Conversation[];
  }

  public async updateById(conversationId: string, payload: Partial<Conversation>): Promise<void> {
    const _payload = {
      ...payload,
      updatedAt: new Date(),
    };

    await mongodbApp
      .getDb()
      .collection<Conversation & { _id: ObjectId }>('conversations')
      .updateOne(
        {
          _id: new ObjectId(conversationId),
        },
        {
          $set: _payload,
        },
      );
  }
}

export const conversationRepositoryAdapter = new ConversationRepositoryAdapter();

export default ConversationRepositoryAdapter;
