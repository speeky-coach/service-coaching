import 'dotenv/config';
import packageJson from '../../package.json';
import { ExpressApp, GraphQLApp, authMiddleware } from '@speeky/framework';
import { mongodbApp } from '../setup/mongodb';
import { rabbitMQApp } from '../setup/rabbitmq';
import { resolvers, typeDefs } from '../setup/graphql';

import conversationsModule from '../modules/conversations/module';

const expressApp = new ExpressApp([conversationsModule.router], [authMiddleware], packageJson.version);
const graphql = new GraphQLApp(typeDefs, resolvers);

graphql.connect(expressApp.app);

rabbitMQApp.addSubscriber(conversationsModule.subscriber);

if (process.env.NODE_ENV !== 'test') {
  expressApp.start([rabbitMQApp.connect(), mongodbApp.connect()]);
}

export { expressApp, rabbitMQApp, mongodbApp };
