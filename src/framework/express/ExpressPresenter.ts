import AggregateRoot from '../domain/entities/AggregateRoot';
import Presenter from '../domain/Presenter';
import EntityMapper from '../infrastructure/EntityMapper';
import EntityDTO from '../infrastructure/EntityDTO';
import { Response } from 'express';

class ExpressPresenter<D extends AggregateRoot, T extends EntityDTO> implements Presenter<D> {
  public static NEW_ENTITY_HTTP_STATUS_CODE = 201;
  public static ENTITY_HTTP_STATUS_CODE = 200;
  public static LIST_HTTP_STATUS_CODE = 200;
  public static NOT_COMPLETED_ASYNC_PROCESS_HTTP_STATUS_CODE = 202;
  public static EMPTY_HTTP_STATUS_CODE = 204;

  private mapper?: EntityMapper<D, T>;
  private response: Response;

  constructor(response: Response, mapper?: EntityMapper<D, T>) {
    this.mapper = mapper;
    this.response = response;
  }

  returnNewEntity(entity: D | object): void {
    const result = this.mapper ? this.mapper.toDTO(entity as D) : entity;

    this.response.status(ExpressPresenter.NEW_ENTITY_HTTP_STATUS_CODE).json(result);
  }

  returnEntity(entity: D | object): void {
    const result = this.mapper ? this.mapper.toDTO(entity as D) : entity;

    this.response.status(ExpressPresenter.ENTITY_HTTP_STATUS_CODE).json(result);
  }

  returnList(entities: D[] | object[]): void {
    const _entities = entities.map((entity) => {
      return this.mapper ? this.mapper.toDTO(entity as D) : entity;
    });

    this.response.status(ExpressPresenter.LIST_HTTP_STATUS_CODE).json(_entities);
  }

  returnEmpty(): void {
    this.response.status(ExpressPresenter.EMPTY_HTTP_STATUS_CODE).send();
  }
}

export default ExpressPresenter;
