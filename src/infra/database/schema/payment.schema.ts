import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { sqliteTable, text, real, int } from "drizzle-orm/sqlite-core";
import { usersTable } from "./user.schema.js";
import { type PaymentStatusType } from "@/core/entity/payment-status.js";
import { antifraudTable } from "./antifraud.schema.js";

export const paymentsTable = sqliteTable("payments", {
  id: text("id")
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  amount: real("amount").notNull(),
  currency: real("currency").notNull(),
  status: text("status").$type<PaymentStatusType>().notNull(),
  paymentProviderReferenceId: text("psp_reference_id"),
  userId: text("user_id").notNull(),

  // Antifraud stuffs
  underAntifraudReview: int("under_antifraud_review", {
    mode: "boolean",
  })
    .notNull()
    .$defaultFn(() => false),

  // Timestamps
  createdAt: text("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const paymentRelations = relations(paymentsTable, ({ one, many }) => ({
  user: one(usersTable, {
    fields: [paymentsTable.userId],
    references: [usersTable.id],
  }),
  antifraud: many(antifraudTable),
}));
