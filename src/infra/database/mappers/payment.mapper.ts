import type { InferSelectModel } from "drizzle-orm";
import type { RepositoryMapper } from "../repository/abstract.repository.ts";
import type { paymentsTable } from "../schema/payment.schema.ts";
import type { Payment } from "@/core/entity/payment.ts";

export const paymentMapper: RepositoryMapper<typeof paymentsTable, Payment> = {
  toEntity: (dbModel: InferSelectModel<typeof paymentsTable>): Payment => ({
    id: dbModel.id,
    amount: dbModel.amount,
    status: dbModel.status as Payment["status"],
    userId: dbModel.userId,
    currency: dbModel.currency,
    externalReference: dbModel.externalReference,
    underAntifraudReview: dbModel.underAntifraudReview,
    paymentProviderReferenceId: dbModel.paymentProviderReferenceId ?? null,
    processedAt: dbModel.processedAt ? new Date(dbModel.processedAt) : null,
    createdAt: new Date(dbModel.createdAt),
    updatedAt: dbModel.updatedAt ? new Date(dbModel.updatedAt) : null,
    deletedAt: dbModel.deletedAt ? new Date(dbModel.deletedAt) : null,
  }),

  toDatabase: (domainModel: Payment) => ({
    id: domainModel.id,
    amount: domainModel.amount,
    currency: domainModel.currency,
    status: domainModel.status,
    userId: domainModel.userId,
    externalReference: domainModel.externalReference,
    paymentProviderReferenceId: domainModel.paymentProviderReferenceId ?? null,
    underAntifraudReview: domainModel.underAntifraudReview,
    processedAt: domainModel.processedAt
      ? domainModel.processedAt.toISOString()
      : null,
    createdAt: domainModel.createdAt.toISOString(),
    updatedAt: domainModel.updatedAt
      ? domainModel.updatedAt.toISOString()
      : null,
    deletedAt: domainModel.deletedAt
      ? domainModel.deletedAt.toISOString()
      : null,
  }),
};
