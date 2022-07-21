import { rabbitMQEventBus } from '../../../setup/rabbitmq';
import ConversationApplication from '../application/ConversationApplication';
import { conversationRepositoryAdapter } from './ConversationRepositoryAdapter';

export const conversationApplication = new ConversationApplication(conversationRepositoryAdapter, rabbitMQEventBus);
