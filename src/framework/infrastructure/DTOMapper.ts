import AggregateRoot from '../domain/entities/AggregateRoot';
import DomainEvent from '../domain/bus/DomainEvent';
import DTO from './DTO';

interface DTOMapper<D extends AggregateRoot | DomainEvent, T extends DTO> {
  toDTO(domainEntity: D): T;
  toDomain(dto: T): D;
}

export default DTOMapper;
