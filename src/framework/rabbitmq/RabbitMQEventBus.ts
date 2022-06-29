import DomainEvent from '../domain/bus/DomainEvent';
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
}

export default RabbitMQEventBus;
