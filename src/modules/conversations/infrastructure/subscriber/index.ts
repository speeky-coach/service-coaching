import RabbitMQSubscriber from '../../../../framework/rabbitmq/RabbitMQSubscriber';
import ConversationSubscriber from './ConversationSubscriber';

const subscriber = new RabbitMQSubscriber();

const conversationSubscriber = new ConversationSubscriber();

subscriber.on('domain_event.storage.audio_uploaded', conversationSubscriber.create.bind(conversationSubscriber));

subscriber.on(
  'domain_event.speech_recognition.conversation_transcribed',
  conversationSubscriber.addTranscription.bind(conversationSubscriber),
);

export default subscriber;
