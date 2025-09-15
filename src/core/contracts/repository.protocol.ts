export type IgnorableKeys = "id" | "createdAt" | "updatedAt" | "deletedAt";

export type RepositoryContract<TEntity = unknown, TId = string> = {
  findById(id: TId): Promise<TEntity | null>;
  findAll(): Promise<TEntity[]>;
  create(data: Omit<TEntity, IgnorableKeys>): Promise<TEntity>;
  update(id: TId, data: Partial<TEntity>): Promise<TEntity>;
  delete(id: TId): Promise<void>;
};
