import type { Entity } from "./entity.js";
import type { User } from "./user.js";

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
  user: User;
  amount: number;
  externalReference: string;
  processedAt: Date | null;
}> &
  Entity;
