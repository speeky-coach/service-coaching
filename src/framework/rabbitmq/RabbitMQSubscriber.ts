import { SubscriberCallback, Subscribers } from './RabbitMQApp';

class RabbitMQSubscriber {
  public subscribers: Subscribers;

  constructor() {
    this.subscribers = {};
  }

  public on(eventName: string, callback: SubscriberCallback | SubscriberCallback[]): void {
    const callbacks = Array.isArray(callback) ? callback : [callback];

    const _eventName = process.env.TEST_CONTEXT ? 'test.' + eventName : eventName;

    this.subscribers[_eventName] = callbacks;
  }
}

export default RabbitMQSubscriber;
