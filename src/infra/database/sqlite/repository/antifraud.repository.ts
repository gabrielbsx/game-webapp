import { antifraudTable } from "../schema/antifraud.schema.ts";
import { makeRepository } from "./abstract.repository.ts";
import { antifraudMapper } from "../mappers/antifraud.mapper.ts";
import type { AntifraudRepositoryContract } from "@/core/contracts/antifraud-repository.contract.ts";

export const antifraudRepository: AntifraudRepositoryContract = {
  ...makeRepository(antifraudTable, antifraudMapper),
};
