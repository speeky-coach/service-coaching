import debug from 'debug';
import AggregateRoot from '../../domain/entities/AggregateRoot';
import Presenter from '../../domain/Presenter';
import DTOMapper from '../DTOMapper';
import DTO from '../DTO';

const logger = debug('server:EventPresenter');

class EventPresenter<D extends AggregateRoot, T extends DTO> implements Presenter<D> {
  private dtoMapper: DTOMapper<D, T>;
  private eventName: string | null;

  constructor(dtoMapper: DTOMapper<D, T>) {
    this.dtoMapper = dtoMapper;
    this.eventName = null;
  }

  public setEventName(eventName: string): void {
    this.eventName = eventName;
  }

  returnNewEntity(object: D): void {
    logger(
      `The event ${this.eventName} created the new entity with ID "${JSON.stringify(this.dtoMapper.toDTO(object))}".`,
    );
  }

  returnEntity(object: D): void {
    logger(
      `The event ${this.eventName} returned the new entity with ID "${JSON.stringify(this.dtoMapper.toDTO(object))}".`,
    );
  }

  /* returnList(objects: any[]): void {
    logger(`The event ${this.eventName} returned a list.`);
  } */

  returnEmpty(): void {
    logger(`The event ${this.eventName} was executed.`);
  }
}

export default EventPresenter;
