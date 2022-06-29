import amqp from 'amqplib';

export async function createRabbitmqQueueTest() {
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

  const assertedQueue = await channel.assertQueue(process.env.RABBITMQ_QUEUE_TEST!, {
    durable: true,
  });

  await channel.bindQueue(process.env.RABBITMQ_QUEUE_TEST!, process.env.RABBITMQ_EXCHANGE as string, 'domain_event.#');

  await connection.close();
}
