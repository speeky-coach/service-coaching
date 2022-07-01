import DomainEvent from '../domain/bus/DomainEvent';
import EventBus from '../domain/bus/EventBus';
import { rabbitMQApp } from './RabbitMQApp';
import DomainEventMapper from '../infrastructure/DomainEventMapper';
import DomainEventDTO from '../infrastructure/DomainEventDTO';

class RabbitMQEventBus<D extends DomainEvent, T extends DomainEventDTO> implements EventBus {
  constructor(private domainEventMapper?: DomainEventMapper<D, T>) {}

  async publish(events: D | D[]): Promise<void> {
    const _events = Array.isArray(events) ? events : [events];

    _events.forEach((event) => {
      const result = this.domainEventMapper ? this.domainEventMapper.toDTO(event) : (event as unknown as T);

      rabbitMQApp.publish(event.eventName, result);
    });
  }
}

export const rabbitMQEventBus = new RabbitMQEventBus();

export default RabbitMQEventBus;
