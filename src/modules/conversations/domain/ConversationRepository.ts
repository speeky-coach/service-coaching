import { UserId } from '@speeky/framework';
import Conversation from './Conversation';

export type ConversationRepositoryAddData = {
  userId: UserId;
  filename: string;
};

interface ConversationRepository {
  add(data: ConversationRepositoryAddData): Promise<Conversation>;
  list(): Promise<Conversation[]>;
  updateById(conversationId: string, payload: Partial<Conversation>): Promise<void>;
}

export default ConversationRepository;
