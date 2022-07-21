import request from 'supertest';
import { v4 as uuid } from 'uuid';
import {
  BadRequestError,
  UnauthorizedError,
  ExpressPresenter,
  generadeToken,
  rabbitmqHttpApi,
} from '@speeky/framework';
import { expressApp } from '../../../../../app/server';
import Conversation from '../../../domain/Conversation';
import ConversationCreated from '../../../domain/events/ConversationCreated';
import { conversationRepositoryAdapter } from '../../ConversationRepositoryAdapter';

describe('POST /conversations', () => {
  let testId: string;
  let studentToken: string;

  beforeAll(async () => {
    studentToken = await generadeToken(process.env.FIREBASE_TEST_GENERATE_TOKEN_UID_STUDENT!, { role: 'student' });
  });

  beforeEach(() => {
    testId = uuid();
    conversationRepositoryAdapter.setTestId(testId);
  });

  afterEach(() => {
    conversationRepositoryAdapter.setTestId(null);
  });

  describe('successful suit', () => {
    test('should create a new conversation', async () => {
      /* Given */
      const userId = uuid();
      const filename = uuid();

      /* When */
      const response = await request(expressApp.app)
        .post('/conversations')
        .send({
          userId,
          filename,
        })
        .set('Authorization', `Bearer ${studentToken}`);

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
    test('should not create a new conversation, because there is not the bearer token', async () => {
      /* Given */
      const userId = uuid();

      /* When */
      const response = await request(expressApp.app).post('/conversations').send({
        userId,
      });

      /* Then */
      expect(response.status).toEqual(UnauthorizedError.STATUS_CODE);
    });

    test('should not create a new conversation, because there is not the filename', async () => {
      /* Given */
      const userId = uuid();

      /* When */
      const response = await request(expressApp.app)
        .post('/conversations')
        .send({
          userId,
        })
        .set('Authorization', `Bearer ${studentToken}`);

      /* Then */
      expect(response.status).toEqual(BadRequestError.STATUS_CODE);

      const conversationDb = await conversationRepositoryAdapter.findByTestId(testId);
      expect(conversationDb).toBeNull();
    });

    test('should not create a new conversation, because there is not the userId', async () => {
      /* Given */
      const filename = uuid();

      /* When */
      const response = await request(expressApp.app)
        .post('/conversations')
        .send({
          filename,
        })
        .set('Authorization', `Bearer ${studentToken}`);

      /* Then */
      expect(response.status).toEqual(BadRequestError.STATUS_CODE);

      const conversationDb = await conversationRepositoryAdapter.findByTestId(testId);
      expect(conversationDb).toBeNull();
    });
  });
});
