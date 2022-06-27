import UuidValueObject from '../value-objects/UuidValueObject';

abstract class DomainEvent {
  static EVENT_NAME: string;

  readonly aggregateId: UuidValueObject | string | number;
  readonly eventId: string;
  readonly occurredOn: Date;
  readonly eventName: string;

  constructor(eventName: string, aggregateId: UuidValueObject | string | number, eventId?: string, occurredOn?: Date) {
    this.aggregateId = aggregateId;
    this.eventId = eventId || UuidValueObject.generate().value;
    this.occurredOn = occurredOn || new Date();
    this.eventName = eventName;
  }
}

export default DomainEvent;
