import { RabbitMQApp, RabbitMQEventBus } from '@speeky/framework';

export const rabbitMQApp = new RabbitMQApp(
  process.env.RABBITMQ_URL!,
  process.env.RABBITMQ_CONNECTION_NAME!,
  process.env.RABBITMQ_EXCHANGE!,
  process.env.RABBITMQ_EXCHANGE_TYPE!,
  process.env.RABBITMQ_QUEUE!,
);

export const rabbitMQEventBus = new RabbitMQEventBus(rabbitMQApp);
