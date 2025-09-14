export const PaymentStatus = {
  PENDING: "pending",
  COMPLETED: "completed",
  REFUNDED: "refunded",
  FAILED: "failed",
} as const;

export type PaymentStatusType =
  (typeof PaymentStatus)[keyof typeof PaymentStatus];
