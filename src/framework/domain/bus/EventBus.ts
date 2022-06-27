import DomainEvent from './DomainEvent';

interface EventBus {
  publish(events: Array<DomainEvent>): Promise<void>;
}

export default EventBus;
