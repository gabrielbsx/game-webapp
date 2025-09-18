import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { usersTable } from "../schema/user.schema.ts";
import type { RepositoryMapper } from "../repository/abstract.repository.ts";
import type { User } from "@/core/entities/user.ts";

export const userMapper: RepositoryMapper<typeof usersTable, User> = {
  toEntity: (dbModel: InferSelectModel<typeof usersTable>): User => ({
    id: dbModel.id,
    name: dbModel.name,
    email: dbModel.email,
    username: dbModel.username,
    password: dbModel.password,
    balance: dbModel.balance ?? 0,
    inAnalysis: dbModel.inAnalysis,
    createdAt: new Date(dbModel.createdAt),
    updatedAt: dbModel.updatedAt ? new Date(dbModel.updatedAt) : undefined,
    deletedAt: dbModel.deletedAt ? new Date(dbModel.deletedAt) : undefined,
  }),

  toDatabase: (domainModel: User): InferInsertModel<typeof usersTable> => ({
    id: domainModel.id,
    name: domainModel.name,
    email: domainModel.email,
    username: domainModel.username,
    password: domainModel.password,
    balance: domainModel.balance,
    inAnalysis: domainModel.inAnalysis,
    createdAt: domainModel.createdAt.toISOString(),
    updatedAt: domainModel.updatedAt
      ? domainModel.updatedAt.toISOString()
      : null,
    deletedAt: domainModel.deletedAt
      ? domainModel.deletedAt.toISOString()
      : null,
  }),

  toDatabasePartial: (
    domainModel: Partial<User>
  ): Partial<InferSelectModel<typeof usersTable>> => {
    const dbModel: Partial<InferSelectModel<typeof usersTable>> = {};
    if (domainModel.id !== undefined) dbModel.id = domainModel.id;
    if (domainModel.name !== undefined) dbModel.name = domainModel.name;
    if (domainModel.email !== undefined) dbModel.email = domainModel.email;
    if (domainModel.username !== undefined)
      dbModel.username = domainModel.username;
    if (domainModel.password !== undefined)
      dbModel.password = domainModel.password;
    if (domainModel.balance !== undefined)
      dbModel.balance = domainModel.balance;
    if (domainModel.inAnalysis !== undefined)
      dbModel.inAnalysis = domainModel.inAnalysis;
    if (domainModel.createdAt !== undefined)
      dbModel.createdAt = domainModel.createdAt.toISOString();
    if (domainModel.updatedAt !== undefined)
      dbModel.updatedAt = domainModel.updatedAt
        ? domainModel.updatedAt.toISOString()
        : null;
    if (domainModel.deletedAt !== undefined)
      dbModel.deletedAt = domainModel.deletedAt
        ? domainModel.deletedAt.toISOString()
        : null;
    return dbModel;
  },
};
