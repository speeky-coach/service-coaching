import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import path from 'path';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import debug from 'debug';
import getContext from './getContext';

const logger = debug('server:GraphQLApp');

const isDevelopment = process.env.NODE_ENV === 'dev';

class GraphQLApp {
  private apolloServer: ApolloServer;

  constructor() {
    const typesArray = loadFilesSync(path.join(__dirname, '../../**/*.typeDef.*'));
    const typeDefs = mergeTypeDefs(typesArray);

    const resolversArray = loadFilesSync(path.join(__dirname, '../../**/*.resolvers.*'));
    const resolvers = mergeResolvers(resolversArray);

    this.apolloServer = new ApolloServer({
      introspection: isDevelopment,
      debug: isDevelopment,
      typeDefs,
      resolvers,
      context: getContext,
    });
  }

  public async connect(expressApp: Express.Application): Promise<void> {
    await this.apolloServer.start();

    this.apolloServer.applyMiddleware({ app: expressApp, path: '/graphql' });

    logger('Connected');
  }
}

export default GraphQLApp;
