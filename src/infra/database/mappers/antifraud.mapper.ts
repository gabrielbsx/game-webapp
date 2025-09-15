import type { Antifraud } from "@/core/entity/antifraud.js";
import type { antifraudTable } from "../../schema/antifraud.schema.js";
import type { RepositoryMapper } from "../abstract.repository.js";
import type { InferSelectModel } from "drizzle-orm";

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
    updatedAt: dbModel.updatedAt ? new Date(dbModel.updatedAt) : null,
    deletedAt: dbModel.deletedAt ? new Date(dbModel.deletedAt) : null,
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
};
