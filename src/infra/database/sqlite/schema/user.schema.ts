import { randomUUID } from "crypto";
import { relations } from "drizzle-orm";
import { int, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { paymentsTable } from "./payment.schema.ts";

export const usersTable = sqliteTable("users", {
  id: text("id")
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  balance: real("balance")
    .notNull()
    .$defaultFn(() => 0),
  createdAt: text("created_at")
    .notNull()
    .$default(() => new Date().toISOString()),
  inAnalysis: int("in_analysis", { mode: "boolean" })
    .notNull()
    .$defaultFn(() => false),
  updatedAt: text("updated_at"),
  deletedAt: text("deleted_at"),
});

export const userRelations = relations(usersTable, ({ many }) => ({
  payment: many(paymentsTable),
}));
