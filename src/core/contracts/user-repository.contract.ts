import type { User } from "../entity/user.ts";
import type { RepositoryContract } from "./repository.contract.ts";

export type UserRepositoryContract = {
  getUserByUsername(username: string): Promise<User | null>;
} & RepositoryContract<User>;
