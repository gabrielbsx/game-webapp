import type { Antifraud } from "../entity/antifraud.ts";
import type { RepositoryContract } from "./repository.contract.ts";

export type AntifraudRepositoryContract = {
} & RepositoryContract<Antifraud>;
