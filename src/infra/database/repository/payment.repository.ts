import { paymentMapper } from "../mappers/payment.mapper.ts";
import { paymentsTable } from "../schema/payment.schema.ts";
import { makeRepository } from "./abstract.repository.ts";

export const paymentRepository = {
  ...makeRepository(paymentsTable, paymentMapper),
};
