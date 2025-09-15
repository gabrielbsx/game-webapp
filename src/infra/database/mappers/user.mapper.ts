import type { User } from "@/core/entity/user.ts";
import type { InferSelectModel } from "drizzle-orm";
import type { usersTable } from "../schema/user.schema.ts";
import type { RepositoryMapper } from "../repository/abstract.repository.ts";

export const userMapper: RepositoryMapper<typeof usersTable, User> = {
  toEntity: (dbModel: InferSelectModel<typeof usersTable>): User => ({
    id: dbModel.id,
    name: dbModel.name,
    email: dbModel.email,
    username: dbModel.username,
    password: dbModel.password,
    balance: dbModel.balance ?? 0,
    inAnalysis: dbModel.inAnalysis === "true",
    createdAt: new Date(dbModel.createdAt),
    updatedAt: dbModel.updatedAt ? new Date(dbModel.updatedAt) : null,
    deletedAt: dbModel.deletedAt ? new Date(dbModel.deletedAt) : null,
  }),

  toDatabase: (domainModel: User) => ({
    id: domainModel.id,
    name: domainModel.name,
    email: domainModel.email,
    username: domainModel.username,
    password: domainModel.password,
    balance: domainModel.balance,
    inAnalysis: domainModel.inAnalysis ? "true" : "false",
    createdAt: domainModel.createdAt.toISOString(),
    updatedAt: domainModel.updatedAt
      ? domainModel.updatedAt.toISOString()
      : null,
    deletedAt: domainModel.deletedAt
      ? domainModel.deletedAt.toISOString()
      : null,
  }),
};
