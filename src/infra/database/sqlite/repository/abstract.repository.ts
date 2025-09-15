import type { AnySQLiteColumn, SQLiteTable } from "drizzle-orm/sqlite-core";
import { eq, type InferInsertModel, type InferSelectModel } from "drizzle-orm";
import type {
  IgnorableKeys,
  RepositoryContract,
} from "@/core/contracts/repository.contract.ts";
import { db } from "../db.ts";

type CustomSQLiteTable = SQLiteTable & {
  id: AnySQLiteColumn;
  createdAt: AnySQLiteColumn;
  updatedAt: AnySQLiteColumn;
  deletedAt: AnySQLiteColumn;
};

export type RepositoryMapper<TTable extends CustomSQLiteTable, TEntity> = {
  toEntity: (data: InferSelectModel<TTable>) => TEntity;
  toDatabase: (entity: TEntity) => InferInsertModel<TTable>;
  toDatabasePartial: (
    entity: Partial<TEntity>
  ) => Partial<InferInsertModel<TTable>>;
};

export const makeRepository = <
  TTable extends CustomSQLiteTable,
  TId = string,
  TEntity = unknown
>(
  schema: TTable,
  mapper: RepositoryMapper<TTable, TEntity>
): RepositoryContract<TEntity, TId> => ({
  async create(data: Omit<TEntity, IgnorableKeys>): Promise<TEntity> {
    const dbData = mapper.toDatabase(data as TEntity);
    const record = await db.insert(schema).values(dbData).returning().get();

    if (!record) throw new Error("Failed to create record");

    return mapper.toEntity(record as InferSelectModel<TTable>);
  },

  async findById(id: TId): Promise<TEntity | null> {
    const record = await db
      .select()
      .from(schema)
      .where(eq(schema.id, id))
      .get();

    if (!record) return null;

    return mapper.toEntity(record as InferSelectModel<TTable>);
  },

  async findByIdOrThrow(id: TId): Promise<TEntity> {
    const record = await db
      .select()
      .from(schema)
      .where(eq(schema.id, id))
      .get();

    if (!record) throw new Error("Record not found");

    return mapper.toEntity(record as InferSelectModel<TTable>);
  },

  async update(id: TId, data: Partial<TEntity>): Promise<TEntity> {
    const dbData = mapper.toDatabasePartial(data);

    const record = await db
      .update(schema)
      .set({
        ...dbData,
        updatedAt: new Date(),
      })
      .where(eq(schema.id, id))
      .returning()
      .get();

    if (!record) throw new Error("Failed to update record");

    return mapper.toEntity(record as InferSelectModel<TTable>);
  },

  async delete(id: TId): Promise<void> {
    await db
      .update(schema)
      .set({
        deletedAt: new Date(),
      } as Partial<InferInsertModel<TTable>>)
      .where(eq(schema.id, id))
      .run();
  },

  async findAll(): Promise<TEntity[]> {
    const records = await db.select().from(schema).all();
    return records.map((record) =>
      mapper.toEntity(record as InferSelectModel<TTable>)
    );
  },
});
