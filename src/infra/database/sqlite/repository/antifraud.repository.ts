import { antifraudTable } from "../schema/antifraud.schema.ts";
import { makeRepository } from "./abstract.repository.ts";
import { antifraudMapper } from "../mappers/antifraud.mapper.ts";

export const antifraudRepository = {
  ...makeRepository(antifraudTable, antifraudMapper),
};
