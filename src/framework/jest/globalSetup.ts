import amqp from 'amqplib';

process.env.NODE_ENV = 'test';

process.env.MONGODB_URL = 'mongodb://localhost:27017';
process.env.MONGODB_DBNAME = 'speeky_test';

process.env.RABBITMQ_URL = 'amqp://localhost/speeky_test';
process.env.RABBITMQ_CONNECTION_NAME = 'coaching_service';
process.env.RABBITMQ_EXCHANGE = 'event_bus';
process.env.RABBITMQ_EXCHANGE_TYPE = 'topic';
process.env.RABBITMQ_QUEUE = 'coaching_service_queue';

process.env.RABBITMQ_QUEUE_TEST = 'queue_test';
process.env.RABBITMQ_VHOST_TEST = 'speeky_test';
process.env.RABBITMQ_CONNECTION_NAME_TEST = 'connection_test';

process.env.GOOGLE_APPLICATION_CREDENTIALS = './gcp-service-account.json';

import rabbitmqHttpApi from '../rabbitmq/rabbitmqHttpApi';

async function createRabbitmqQueueTest() {
  const QUEUE_TEST = process.env.RABBITMQ_QUEUE_TEST!;

  const connection = await amqp.connect(process.env.RABBITMQ_URL as string, {
    clientProperties: { connection_name: process.env.RABBITMQ_CONNECTION_NAME_TEST! },
  });

  const channel = await connection.createChannel();

  const assertedExchange = await channel.assertExchange(
    process.env.RABBITMQ_EXCHANGE as string,
    process.env.RABBITMQ_EXCHANGE_TYPE as string,
    {
      durable: true,
    },
  );

  const assertedQueue = await channel.assertQueue(QUEUE_TEST, {
    durable: true,
  });

  await channel.bindQueue(QUEUE_TEST, process.env.RABBITMQ_EXCHANGE as string, 'domain_event.#');
  // await channel.bindQueue(QUEUE_TEST, process.env.RABBITMQ_EXCHANGE as string, 'test.domain_event.#');

  await connection.close();
}

/**
 * This function is executed only one time before of all the tests.
 */
export default async () => {
  await createRabbitmqQueueTest();
  await rabbitmqHttpApi.purgeQueue();
};
