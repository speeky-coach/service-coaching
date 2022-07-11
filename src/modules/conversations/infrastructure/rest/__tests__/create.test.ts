import request from 'supertest';
import { v4 as uuid } from 'uuid';
import { expressApp } from '../../../../../app/server';
import BadRequestError from '../../../../../framework/express/errors/BadRequestError';
import ExpressPresenter from '../../../../../framework/express/ExpressPresenter';
import { mongodbApp } from '../../../../../app/server';
import { rabbitMQApp } from '../../../../../app/server';
import rabbitmqHttpApi from '../../../../../framework/rabbitmq/rabbitmqHttpApi';
import Conversation from '../../../domain/Conversation';
import ConversationCreated from '../../../domain/events/ConversationCreated';
import { conversationRepositoryAdapter } from '../../ConversationRepositoryAdapter';

describe('POST /conversations', () => {
  beforeAll(async () => {
    await mongodbApp.connect();

    await rabbitMQApp.connect();
  });

  describe('successful suit', () => {
    test('should create a new conversation', async () => {
      /* Given */
      const testId = uuid();
      console.log('TestId', testId);
      conversationRepositoryAdapter.setTestId(testId);

      const userId = uuid();
      const filename = uuid();

      /* When */
      const response = await request(expressApp.app).post('/conversations').send({
        userId,
        filename,
      });

      /* Then */
      expect(response.status).toEqual(ExpressPresenter.NEW_ENTITY_HTTP_STATUS_CODE);
      expect((response.body as Conversation).userId).toEqual(userId);

      const conversationDb = await conversationRepositoryAdapter.findByTestId(testId);
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

  describe('failure suit', () => {
    test('should not create a new conversation, because there is not the filename', async () => {
      /* Given */
      const testId = uuid();
      console.log('TestId', testId);
      conversationRepositoryAdapter.setTestId(testId);

      const userId = uuid();

      /* When */
      const response = await request(expressApp.app).post('/conversations').send({
        userId,
      });

      /* Then */
      expect(response.status).toEqual(BadRequestError.STATUS_CODE);

      const conversationDb = await conversationRepositoryAdapter.findByTestId(testId);
      expect(conversationDb).toBeNull();
    });

    test('should not create a new conversation, because there is not the userId', async () => {
      /* Given */
      const testId = uuid();
      console.log('TestId', testId);
      conversationRepositoryAdapter.setTestId(testId);

      const filename = uuid();

      /* When */
      const response = await request(expressApp.app).post('/conversations').send({
        filename,
      });

      /* Then */
      expect(response.status).toEqual(BadRequestError.STATUS_CODE);

      const conversationDb = await conversationRepositoryAdapter.findByTestId(testId);
      expect(conversationDb).toBeNull();
    });
  });
});
