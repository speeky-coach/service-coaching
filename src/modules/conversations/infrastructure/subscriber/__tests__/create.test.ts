import { v4 as uuid } from 'uuid';
import { rabbitMQApp } from '../../../../../app/server';
import rabbitmqHttpApi from '../../../../../framework/rabbitmq/rabbitmqHttpApi';
import ConversationCreated from '../../../domain/events/ConversationCreated';
import { conversationRepositoryAdapter } from '../../ConversationRepositoryAdapter';

describe('ConversationSubscriber::create', () => {
  describe('successful suit', () => {
    test('should create a new conversation', async () => {
      /* Given */
      const userId = uuid();
      const filename = uuid();

      /* When */
      rabbitMQApp.publishTest('domain_event.storage.audio_uploaded', {
        data: {
          userId,
          filename,
        },
        eventName: 'domain_event.storage.audio_uploaded',
        entityId: 'ba9d8cff-814e-41ba-ab13-0cf4eee8eb4c',
        eventId: 'a65a85d7-d3db-4311-a00f-0de271792e0d',
        occurredOn: '2022-02-18T03:05:41.772Z' as unknown as Date,
      });

      await new Promise((r) => setTimeout(r, 10_000));

      /* Then */
      const conversationDb = await conversationRepositoryAdapter.findByUserId(userId);
      expect(conversationDb).not.toBeNull();
      expect(conversationDb).toMatchObject({
        userId,
        filename,
      });

      const domainEvent = await rabbitmqHttpApi.findDomainEvent({
        entityId: conversationDb!.id,
        eventName: ConversationCreated.EVENT_NAME,
      });
      expect(domainEvent).not.toBeNull();
      expect((domainEvent as ConversationCreated)!.entityId).toBe(conversationDb!.id);
      expect((domainEvent as ConversationCreated)!.data).toMatchObject({
        id: conversationDb!.id,
        userId,
        filename,
      });
    });
  });

  // describe.skip('failure suit', () => {});
});
