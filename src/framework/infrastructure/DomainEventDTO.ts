interface DomainEventDTO {
  data: object;
  readonly eventName: string;
  readonly entityId: string;
  readonly eventId: string;
  readonly occurredOn: Date;
}

export default DomainEventDTO;
