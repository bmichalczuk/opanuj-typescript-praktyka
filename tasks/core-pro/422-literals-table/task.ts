import type { Entities, Order, Product, User } from './table-models.ts';

type ModelName<T> = T extends Order
  ? 'order'
  : T extends Product
    ? 'product'
    : T extends User
      ? 'user'
      : never;

type Get<Model> = {
  [Prop in `get${Capitalize<ModelName<Model>>}`]: (id: number) => Model;
};

type Update<Model> = {
  [Prop in `update${Capitalize<ModelName<Model>>}`]: (id: number, update: Partial<Model>) => Model;
};

type Delete<Model> = {
  [Prop in `delete${Capitalize<ModelName<Model>>}`]: (id: number) => Model;
};

export type Table<Model> = Get<Model> & Update<Model> & Delete<Model>;
