import type { User } from "../entity/user.js";
import type { RepositoryContract } from "./repository.protocol.js";

export type UserRepositoryContract = {
  getUserById(userId: string): Promise<User | null>;
  getUserByUsername(username: string): Promise<User | null>;
} & RepositoryContract<User>;
