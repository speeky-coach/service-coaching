import ConversationResolverController from './ConversationResolverController';

const conversationResolverController = new ConversationResolverController();

const resolvers = {
  Query: {
    conversations: conversationResolverController.list.bind(conversationResolverController),
  },
};

export default resolvers;
