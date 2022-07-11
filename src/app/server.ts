import 'dotenv/config';

import ExpressApp from '../framework/express/ExpressApp';
import GraphQLApp from '../framework/graphql/GraphQLApp';
import { mongodbApp } from '../framework/mongodb/MongodbApp';
import { rabbitMQApp } from '../framework/rabbitmq/RabbitMQApp';

import conversationsModule from '../modules/conversations/module';

const expressApp = new ExpressApp([conversationsModule.router]);
const graphql = new GraphQLApp();

graphql.connect(expressApp.app);
rabbitMQApp.addSubscriber(conversationsModule.subscriber);

if (process.env.NODE_ENV !== 'test') {
  expressApp.start([rabbitMQApp.connect(), mongodbApp.connect()]);
}

export { expressApp, rabbitMQApp, mongodbApp };
