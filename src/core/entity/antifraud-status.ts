export const AntifraudStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type AntifraudStatusType =
  (typeof AntifraudStatus)[keyof typeof AntifraudStatus];
