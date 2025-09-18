import type { Antifraud } from "../entities/antifraud.ts";
import type { RepositoryContract } from "./repository.contract.ts";

export type AntifraudRepositoryContract = {} & RepositoryContract<Antifraud>;
