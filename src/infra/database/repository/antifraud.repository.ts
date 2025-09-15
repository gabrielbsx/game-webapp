import { antifraudTable } from "../schema/antifraud.schema.js";
import { makeRepository } from "./abstract.repository.js";
import { antifraudMapper } from "../mappers/antifraud.mapper.js";

export const antifraudRepository = {
  ...makeRepository(antifraudTable, antifraudMapper),
};
