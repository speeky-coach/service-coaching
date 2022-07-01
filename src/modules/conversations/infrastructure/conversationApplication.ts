import ConversationApplication from '../application/ConversationApplication';
import { conversationRepositoryAdapter } from './ConversationRepositoryAdapter';
import { rabbitMQEventBus } from '../../../framework/rabbitmq/RabbitMQEventBus';

export const conversationApplication = new ConversationApplication(conversationRepositoryAdapter, rabbitMQEventBus);
