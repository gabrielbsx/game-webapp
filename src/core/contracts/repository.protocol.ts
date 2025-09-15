export type RepositoryContract<TEntity = unknown, TId = string> = {
  findById(id: TId): Promise<TEntity | null>;
  findAll(): Promise<TEntity[]>;
  create(data: TEntity): Promise<TEntity>;
  update(id: TId, data: TEntity): Promise<TEntity>;
  delete(id: TId): Promise<void>;
};
