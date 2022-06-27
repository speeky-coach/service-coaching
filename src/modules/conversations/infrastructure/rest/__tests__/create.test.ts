import request from 'supertest';
import { v4 as uuid } from 'uuid';
import { expressApp } from '../../../../../app/server';
import ExpressDTOPresenter from '../../../../../framework/express/ExpressDTOPresenter';
import { mongodbApp } from '../../../../../framework/mongodb/MongodbApp';
import { rabbitMQApp } from '../../../../../framework/rabbitmq/RabbitMQApp';
import Conversation from '../../../domain/Conversation';
import { conversationRepositoryAdapter } from '../../ConversationRepositoryAdapter';

describe('POST /conversations', () => {
  beforeAll(async () => {
    await mongodbApp.connect();

    await rabbitMQApp.connect();
  });

  test('should create a new conversation', async () => {
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
    expect(response.status).toEqual(ExpressDTOPresenter.RETURN_NEW_ENTITY_HTTP_STATUS_CODE);
    expect((response.body as Conversation).userId).toEqual(userId);

    const conversationDb = await conversationRepositoryAdapter.findByTestId(testId);
    expect(conversationDb).not.toBeNull();
  });
});
