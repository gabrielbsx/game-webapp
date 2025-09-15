export type IgnorableKeys<T> = Extract<
  "id" | "createdAt" | "updatedAt" | "deletedAt",
  keyof T
>;

export type ExtendableIgnorableKeys<T, Extra extends PropertyKey = never> =
  | IgnorableKeys<T>
  | Extra;

export type RepositoryContract<
  TEntity,
  IgnorableEntityKeys extends keyof TEntity = IgnorableKeys<TEntity>,
  TId = string
> = {
  findById(id: TId): Promise<TEntity | null>;
  findByIdOrThrow(id: TId): Promise<TEntity>;
  findAll(): Promise<TEntity[]>;
  create(data: Omit<TEntity, IgnorableEntityKeys>): Promise<TEntity>;
  update(id: TId, data: Partial<TEntity>): Promise<TEntity>;
  delete(id: TId): Promise<void>;
};
