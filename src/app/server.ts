import 'dotenv/config';

import ExpressApp from '../framework/express/ExpressApp';
import RabbitMQEventBus from '../framework/rabbitmq/RabbitMQEventBus';
import { mongodbApp } from '../framework/mongodb/MongodbApp';
import { rabbitMQApp } from '../framework/rabbitmq/RabbitMQApp';

import conversationsModule from '../modules/conversations/module';

const expressApp = new ExpressApp([conversationsModule.router]);

// rabbitMQApp.addSubscriber(conversationsModule.subscribers);

if (process.env.NODE_ENV !== 'test') {
  expressApp.start([rabbitMQApp.connect(), mongodbApp.connect()]);
}

export { expressApp };
