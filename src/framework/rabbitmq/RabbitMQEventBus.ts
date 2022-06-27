import DomainEvent from '../domain/bus/DomainEvent';
import DomainEventSubscriber from '../domain/bus/DomainEventSubscriber';
import EventBus from '../domain/bus/EventBus';
import { rabbitMQApp } from './RabbitMQApp';
import DomainEventDTOMapper from '../infrastructure/DomainEventDTOMapper';
import DomainEventDTO from '../infrastructure/DomainEventDTO';

class RabbitMQEventBus<D extends DomainEvent, T extends DomainEventDTO> implements EventBus {
  constructor(private domainEventMapper: DomainEventDTOMapper<D, T>) {}

  async publish(events: D[]): Promise<void> {
    events.forEach((event) => {
      rabbitMQApp.publish(event.eventName, this.domainEventMapper.toDTO(event));
    });
  }

  static addSubscribers(subscribers: DomainEventSubscriber[]): void {
    subscribers.forEach((subscriber) => {
      subscriber.subscribedTo().forEach((domainEvent) => {
        rabbitMQApp.subscribe(domainEvent, subscriber.on.bind(subscriber));
      });
    });
  }
}

export default RabbitMQEventBus;
