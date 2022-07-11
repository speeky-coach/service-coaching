import request from 'supertest';
import { v4 as uuid } from 'uuid';
import { expressApp } from '../../../../../app/server';
import Conversation from '../../../domain/Conversation';
import { conversationRepositoryAdapter } from '../../ConversationRepositoryAdapter';

describe('QUERY conversations', () => {
  describe('successful suit', () => {
    test('should create a new conversation', async () => {
      /* Given */
      const conversation1 = await conversationRepositoryAdapter.add({
        userId: uuid(),
        filename: uuid(),
      });

      const conversation2 = await conversationRepositoryAdapter.add({
        userId: uuid(),
        filename: uuid(),
      });

      /* When */
      const response = await request(expressApp.app)
        .post('/graphql')
        .send({
          query: `
          query {
            conversations {
              id
              userId
              filename
              createdAt
            }
          }
        `,
          variable: {},
        });

      /* Then */
      expect(response.status).toEqual(200);

      const { conversations } = response.body.data;

      const filteredConversations = (conversations as Conversation[]).filter(
        (item) => item.id === conversation1.id || item.id === conversation2.id,
      );

      expect(filteredConversations.length).toBe(2);
    });
  });

  // describe('failure suit', () => {});
});
