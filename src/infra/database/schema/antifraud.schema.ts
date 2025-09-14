import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import type { AntifraudStatusType } from "@/core/entity/antifraud-status.js";
import { paymentsTable } from "./payment.schema.js";

export const antifraudTable = sqliteTable("antifraud", {
  id: text("id")
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  status: text("status").$type<AntifraudStatusType>(),
  paymentId: text("payment_id").notNull(),

  // Antifraud stuffs
  antifraudReason: text("antifraud_reason"),
  antifraudReviewedAt: text("antifraud_reviewed_at"),
  antifraudReviewedBy: text("antifraud_reviewed_by"),

  // Timestamps
  createdAt: text("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const antifraudRelations = relations(antifraudTable, ({ one }) => ({
  payment: one(paymentsTable, {
    fields: [antifraudTable.paymentId],
    references: [paymentsTable.id],
  }),
}));
