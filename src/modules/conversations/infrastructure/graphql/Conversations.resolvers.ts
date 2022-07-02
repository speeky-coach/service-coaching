import ConversationResolverController from './ConversationResolverController';

const conversationResolverController = new ConversationResolverController();

const resolvers = {
  Query: {
    conversations: conversationResolverController.list.bind(conversationResolverController),
  },
  /* Mutation: {
    reportSong: songController.reportSong.bind(songController),
  }, */
};

export default resolvers;
