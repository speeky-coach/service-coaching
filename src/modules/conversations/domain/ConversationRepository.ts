import { UserId } from '../../../framework/domain/types';
import Conversation from './Conversation';

export type ConversationRepositoryAddData = {
  userId: UserId;
};

interface ConversationRepository {
  add(data: ConversationRepositoryAddData): Promise<Conversation>;
}

export default ConversationRepository;
