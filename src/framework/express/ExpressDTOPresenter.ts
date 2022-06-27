import { Response } from 'express';

class ExpressDTOPresenter {
  public static RETURN_NEW_ENTITY_HTTP_STATUS_CODE = 201;
  public static RETURN_ENTITY_HTTP_STATUS_CODE = 200;
  public static RETURN_LIST_HTTP_STATUS_CODE = 200;
  public static RETURN_NOT_COMPLETED_ASYNC_PROCESS_HTTP_STATUS_CODE = 202;
  public static RETURN_EMPTY_HTTP_STATUS_CODE = 204;

  private response: Response;

  constructor(response: Response) {
    this.response = response;
  }

  returnNewEntity(object: any): void {
    this.response.status(ExpressDTOPresenter.RETURN_NEW_ENTITY_HTTP_STATUS_CODE).json(object);
  }

  returnEntity(object: any): void {
    this.response.status(ExpressDTOPresenter.RETURN_ENTITY_HTTP_STATUS_CODE).json(object);
  }

  /* returnList(objects: D[]): void {
    this.response!.status(ExpressDTOPresenter.RETURN_LIST_HTTP_STATUS_CODE).json(this.dtoMapper.toDTO(objects));
  } */

  returnEmpty(): void {
    this.response.status(ExpressDTOPresenter.RETURN_EMPTY_HTTP_STATUS_CODE).send();
  }
}

export default ExpressDTOPresenter;
