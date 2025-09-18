import type { User } from "../entities/user.ts";
import type {
  ExtendableIgnorableKeys,
  RepositoryContract,
} from "./repository.contract.ts";

export type UserExtraIgnorableKerys = "balance" | "inAnalysis";

export type UserRepositoryContract<
  Extra extends keyof User = UserExtraIgnorableKerys
> = {
  getUserByUsername(username: string): Promise<User | null>;
} & RepositoryContract<User, ExtendableIgnorableKeys<User, Extra>>;
