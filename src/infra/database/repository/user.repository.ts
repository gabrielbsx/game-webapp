import { eq } from "drizzle-orm";
import { db } from "../db.js";
import { usersTable } from "../schema/user.schema.js";

export const getUserById = async (userId: string) =>
  db.select().from(usersTable).where(eq(usersTable.id, userId)).get();

export const getUserByUsername = async (username: string) =>
  db.select().from(usersTable).where(eq(usersTable.username, username)).get();
