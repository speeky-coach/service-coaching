import DomainEvent from '../domain/bus/DomainEvent';
import DomainEventDTO from './DomainEventDTO';

interface DomainEventDTOMapper<D extends DomainEvent, T extends DomainEventDTO> {
  toDTO(domainEvent: D): T;
  // toDomain(dto: T): D;
}

export default DomainEventDTOMapper;
