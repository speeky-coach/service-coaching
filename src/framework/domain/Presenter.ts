import AggregateRoot from './entities/AggregateRoot';

interface Presenter<D extends AggregateRoot> {
  returnNewEntity(object: D): void;
  returnEntity(object: D): void;
  // returnList(object: any[]): void;
  returnEmpty(): void;
}

export default Presenter;
