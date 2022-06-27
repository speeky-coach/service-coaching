import AggregateRoot from '../domain/entities/AggregateRoot';
import Presenter from '../domain/Presenter';
import DTOMapper from '../infrastructure/DTOMapper';
import DTO from '../infrastructure/DTO';
import { Response } from 'express';

class ExpressPresenter<D extends AggregateRoot, T extends DTO> implements Presenter<D> {
  public static RETURN_NEW_ENTITY_HTTP_STATUS_CODE = 201;
  public static RETURN_ENTITY_HTTP_STATUS_CODE = 200;
  public static RETURN_LIST_HTTP_STATUS_CODE = 200;
  public static RETURN_NOT_COMPLETED_ASYNC_PROCESS_HTTP_STATUS_CODE = 202;
  public static RETURN_EMPTY_HTTP_STATUS_CODE = 204;

  private dtoMapper: DTOMapper<D, T>;
  private response: Response | null;

  constructor(dtoMapper: DTOMapper<D, T>) {
    this.dtoMapper = dtoMapper;
    this.response = null;
  }

  public setResponse(response: Response): void {
    this.response = response;
  }

  returnNewEntity(object: D): void {
    this.response!.status(ExpressPresenter.RETURN_NEW_ENTITY_HTTP_STATUS_CODE).json(this.dtoMapper.toDTO(object));
  }

  returnEntity(object: D): void {
    this.response!.status(ExpressPresenter.RETURN_ENTITY_HTTP_STATUS_CODE).json(this.dtoMapper.toDTO(object));
  }

  /* returnList(objects: D[]): void {
    this.response!.status(ExpressPresenter.RETURN_LIST_HTTP_STATUS_CODE).json(this.dtoMapper.toDTO(objects));
  } */

  returnEmpty(): void {
    this.response!.status(ExpressPresenter.RETURN_EMPTY_HTTP_STATUS_CODE).send();
  }
}

export default ExpressPresenter;
