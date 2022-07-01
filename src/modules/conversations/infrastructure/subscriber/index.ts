import RabbitMQSubscriber from '../../../../framework/rabbitmq/RabbitMQSubscriber';
import ConversationSubscriber from './ConversationSubscriber';

const subscriber = new RabbitMQSubscriber();

const conversationSubscriber = new ConversationSubscriber();

subscriber.on('domain_event.storage.audio_uploaded', conversationSubscriber.create.bind(conversationSubscriber));

export default subscriber;
