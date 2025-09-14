import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { paymentsTable } from "./payment.schema.js";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
  inAnalysis: text("in_analysis")
    .notNull()
    .$defaultFn(() => "false")
    .$type<"true" | "false">(),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  payments: many(paymentsTable),
}));
