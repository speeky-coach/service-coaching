import DomainEvent from '../bus/DomainEvent';
import EventBus from '../bus/EventBus';

class EventBusMock implements EventBus {
  public events: DomainEvent[] = [];

  public async publish(events: DomainEvent[]): Promise<void> {
    this.events = events;
  }
}

export default EventBusMock;
