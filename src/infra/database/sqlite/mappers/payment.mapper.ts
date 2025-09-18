import type { InferSelectModel } from "drizzle-orm";
import type { RepositoryMapper } from "../repository/abstract.repository.ts";
import type { paymentsTable } from "../schema/payment.schema.ts";
import type { Payment } from "@/core/entities/payment.ts";

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
    updatedAt: dbModel.updatedAt ? new Date(dbModel.updatedAt) : undefined,
    deletedAt: dbModel.deletedAt ? new Date(dbModel.deletedAt) : undefined,
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

  toDatabasePartial: (
    domainModel: Partial<Payment>
  ): Partial<InferSelectModel<typeof paymentsTable>> => {
    const dbModel: Partial<InferSelectModel<typeof paymentsTable>> = {};
    if (domainModel.id !== undefined) dbModel.id = domainModel.id;
    if (domainModel.amount !== undefined) dbModel.amount = domainModel.amount;
    if (domainModel.currency !== undefined)
      dbModel.currency = domainModel.currency;
    if (domainModel.status !== undefined) dbModel.status = domainModel.status;
    if (domainModel.userId !== undefined) dbModel.userId = domainModel.userId;
    if (domainModel.externalReference !== undefined)
      dbModel.externalReference = domainModel.externalReference;
    if (domainModel.paymentProviderReferenceId !== undefined)
      dbModel.paymentProviderReferenceId =
        domainModel.paymentProviderReferenceId ?? null;
    if (domainModel.underAntifraudReview !== undefined)
      dbModel.underAntifraudReview = domainModel.underAntifraudReview;
    if (domainModel.processedAt !== undefined)
      dbModel.processedAt = domainModel.processedAt
        ? domainModel.processedAt.toISOString()
        : null;
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
