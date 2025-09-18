import type { Entity } from "./entity.ts";

export const AntifraudStatus = {
  PENDING: "pending",
  APPROVED: "approved",
  REJECTED: "rejected",
} as const;

export type AntifraudStatusType =
  (typeof AntifraudStatus)[keyof typeof AntifraudStatus];

export type Antifraud = Readonly<{
  status: AntifraudStatusType;
  paymentId: string;
  reason: string | null;
  reviewedAt: Date | null;
  reviewedBy: string | null;
}> &
  Entity;
