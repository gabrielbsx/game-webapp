import type { Antifraud } from "@/core/entity/antifraud.ts";
import type { InferSelectModel } from "drizzle-orm";
import type { RepositoryMapper } from "../repository/abstract.repository.ts";
import type { antifraudTable } from "../schema/antifraud.schema.ts";

export const antifraudMapper: RepositoryMapper<
  typeof antifraudTable,
  Antifraud
> = {
  toEntity: (dbModel: InferSelectModel<typeof antifraudTable>): Antifraud => ({
    id: dbModel.id,
    reason: dbModel.antifraudReason,
    reviewedAt: dbModel.antifraudReviewedAt
      ? new Date(dbModel.antifraudReviewedAt)
      : null,
    status: dbModel.status as Antifraud["status"],
    paymentId: dbModel.paymentId,
    reviewedBy: dbModel.antifraudReviewedBy,
    createdAt: new Date(dbModel.createdAt),
    updatedAt: dbModel.updatedAt ? new Date(dbModel.updatedAt) : undefined,
    deletedAt: dbModel.deletedAt ? new Date(dbModel.deletedAt) : undefined,
  }),

  toDatabase: (domainModel: Antifraud) => ({
    id: domainModel.id,
    antifraudReason: domainModel.reason,
    antifraudReviewedAt: domainModel.reviewedAt
      ? domainModel.reviewedAt.toISOString()
      : null,
    status: domainModel.status,
    paymentId: domainModel.paymentId,
    antifraudReviewedBy: domainModel.reviewedBy,
    createdAt: domainModel.createdAt.toISOString(),
    updatedAt: domainModel.updatedAt
      ? domainModel.updatedAt.toISOString()
      : null,
    deletedAt: domainModel.deletedAt
      ? domainModel.deletedAt.toISOString()
      : null,
  }),

  toDatabasePartial: (
    domainModel: Partial<Antifraud>
  ): Partial<InferSelectModel<typeof antifraudTable>> => {
    const dbModel: Partial<InferSelectModel<typeof antifraudTable>> = {};
    if (domainModel.id !== undefined) dbModel.id = domainModel.id;
    if (domainModel.reason !== undefined)
      dbModel.antifraudReason = domainModel.reason;
    if (domainModel.reviewedAt !== undefined)
      dbModel.antifraudReviewedAt = domainModel.reviewedAt
        ? domainModel.reviewedAt.toISOString()
        : null;
    if (domainModel.status !== undefined) dbModel.status = domainModel.status;
    if (domainModel.paymentId !== undefined)
      dbModel.paymentId = domainModel.paymentId;
    if (domainModel.reviewedBy !== undefined)
      dbModel.antifraudReviewedBy = domainModel.reviewedBy;
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
