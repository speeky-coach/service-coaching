import { UserId } from '../../../framework/domain/types';
import Conversation from './Conversation';

export type ConversationRepositoryAddData = {
  userId: UserId;
  filename: string;
};

interface ConversationRepository {
  add(data: ConversationRepositoryAddData): Promise<Conversation>;
  list(): Promise<Conversation[]>;
}

export default ConversationRepository;
