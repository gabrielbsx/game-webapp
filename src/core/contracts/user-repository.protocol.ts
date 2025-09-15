import type { User } from "../entity/user.ts";
import type { RepositoryContract } from "./repository.protocol.ts";

export type UserRepositoryContract = {
  getUserById(userId: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
} & RepositoryContract<User>;
