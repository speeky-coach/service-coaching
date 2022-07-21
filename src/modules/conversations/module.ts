import router from './infrastructure/rest/router';
import subscriber from './infrastructure/subscriber';
import resolvers from './infrastructure/graphql/Conversations.resolvers';
import typeDefs from './infrastructure/graphql/Conversations.typeDef';

export default {
  router,
  subscriber,
  resolvers,
  typeDefs,
};
