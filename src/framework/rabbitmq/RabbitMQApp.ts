import amqp from 'amqplib';
import debug from 'debug';
import DomainEventDTO from '../infrastructure/DomainEventDTO';
import RabbitMQSubscriber from './RabbitMQSubscriber';

const logger = debug('server:RabbitMQApp');

export type SubscriberCallback = (data: DomainEventDTO) => Promise<void>;

export interface Subscribers {
  [eventName: string]: SubscriberCallback[];
}

class RabbitMQApp {
  private url: string;
  private connectionName: string;
  private exchangeName: string;
  private exchangeType: string;
  private queueName: string;
  private subscribers: Subscribers;
  private connection: amqp.Connection | null;
  private channel: amqp.Channel | null;

  constructor(url: string, connectionName: string, exchangeName: string, exchangeType: string, queueName: string) {
    this.url = url;
    this.connectionName = connectionName;
    this.exchangeName = exchangeName;
    this.exchangeType = exchangeType;
    this.queueName = queueName;
    this.subscribers = {};
    this.connection = null;
    this.channel = null;
  }

  public addSubscriber(subscriber: RabbitMQSubscriber): void {
    const eventNames = Object.keys(subscriber.subscribers);

    eventNames.forEach((eventName) => {
      if (this.subscribers[eventName]) {
        this.subscribers[eventName] = this.subscribers[eventName].concat(subscriber.subscribers[eventName]);
      } else {
        this.subscribers[eventName] = subscriber.subscribers[eventName];
      }
    });
  }

  public async connect(): Promise<void> {
    try {
      this.connection = await amqp.connect(this.url, {
        clientProperties: { connection_name: this.connectionName },
      });

      this.channel = await this.connection.createChannel();

      const assertedExchange = await this.channel.assertExchange(this.exchangeName, this.exchangeType, {
        durable: true,
      });

      const assertedQueue = await this.channel.assertQueue(this.queueName, {
        durable: true,
      });

      const subscribers = Object.keys(this.subscribers).map((topicName) =>
        this.channel!.bindQueue(this.queueName, this.exchangeName, topicName),
      );

      await Promise.all(subscribers);

      await this.channel!.consume(this.queueName, this.proxyCallback.bind(this), {
        noAck: false,
      });

      logger('Connected');
    } catch (error) {
      console.error(error);
    }
  }

  public async close() {
    await this.connection!.close();
  }

  private async proxyCallback(payload: amqp.ConsumeMessage | null): Promise<void> {
    if (!payload) {
      logger("The message's payload is empty");

      return;
    }

    try {
      const topicName: string = payload.fields.routingKey;
      const message = JSON.parse(payload.content.toString());

      logger(`[<= Recieved] ${topicName}:'${payload.content.toString()}'`);

      if (this.subscribers[topicName]) {
        const callbacks = this.subscribers[topicName].map((callback) => callback(message));

        await Promise.all(callbacks);

        await this.channel!.ack(payload);
      } else {
        if (!process.env.TEST_CONTEXT) await this.channel!.nack(payload);

        logger(`There is not a saved callback for this 'topic name': ${topicName}`);
      }
    } catch (error) {
      if (!process.env.TEST_CONTEXT) await this.channel!.nack(payload);

      console.error(error);
    }
  }

  public publish(topicName: string, message: DomainEventDTO): void {
    this.channel!.publish(this.exchangeName, topicName, Buffer.from(JSON.stringify(message)));
    logger(`[=> Sent] ${topicName}: '${JSON.stringify(message)}'`);
  }

  public publishTest(topicName: string, message: DomainEventDTO): void {
    this.publish('test.' + topicName, message);
  }
}

export const rabbitMQApp = new RabbitMQApp(
  process.env.RABBITMQ_URL!,
  process.env.RABBITMQ_CONNECTION_NAME!,
  process.env.RABBITMQ_EXCHANGE!,
  process.env.RABBITMQ_EXCHANGE_TYPE!,
  process.env.RABBITMQ_QUEUE!,
);

export default RabbitMQApp;
