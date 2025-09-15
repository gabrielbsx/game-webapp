import { eq } from "drizzle-orm";
import { db } from "../db.ts";
import { usersTable } from "../schema/user.schema.ts";
import { makeRepository } from "./abstract.repository.ts";
import { userMapper } from "../mappers/user.mapper.ts";
import type { UserRepositoryContract } from "@/core/contracts/user-repository.contract.ts";

export const userRepository: UserRepositoryContract = {
  ...makeRepository(usersTable, userMapper),

  async getUserById(userId: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))
      .get();

    if (!user) return null;

    return userMapper.toEntity(user);
  },

  async getUserByUsername(username: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .get();

    return user ? userMapper.toEntity(user) : null;
  },
};
