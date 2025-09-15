import { eq } from "drizzle-orm";
import { usersTable } from "../schema/user.schema.ts";
import { makeRepository } from "./abstract.repository.ts";
import { userMapper } from "../mappers/user.mapper.ts";
import type { UserRepositoryContract } from "@/core/contracts/user-repository.contract.ts";
import { db } from "../db.ts";

export const userRepository: UserRepositoryContract = {
  ...makeRepository(usersTable, userMapper),

  async getUserByUsername(username: string) {
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .get();

    return user ? userMapper.toEntity(user) : null;
  },
};
