import type { Entity } from "./entity.ts";

export const PaymentStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  REFUNDED: "refunded",
  FAILED: "failed",
} as const;

export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];

export type Payment = Readonly<{
  status: PaymentStatusType;
  // user: User;
  userId: string;
  amount: number;
  currency: string;
  externalReference: string;
  underAntifraudReview: boolean;
  paymentProviderReferenceId: string | null;
  processedAt: Date | null;
}> &
  Entity;
