import type { PaymentRepositoryContract } from "@/core/contracts/payment-repository.contract.ts";
import { paymentMapper } from "../mappers/payment.mapper.ts";
import { paymentsTable } from "../schema/payment.schema.ts";
import { makeRepository } from "./abstract.repository.ts";
import { db } from "../db.ts";
import { eq } from "drizzle-orm";
import { PaymentNotFoundException } from "@/core/errors/payment-not-found.exception.ts";

export const paymentRepository: PaymentRepositoryContract = {
  ...makeRepository(paymentsTable, paymentMapper),

  async findByExternalReference(externalReference: string) {
    const payment = await db
      .select()
      .from(paymentsTable)
      .where(eq(paymentsTable.externalReference, externalReference))
      .get();

    return payment ? paymentMapper.toEntity(payment) : null;
  },

  async findByExternalReferenceOrThrow(externalReference: string) {
    const payment = await this.findByExternalReference(externalReference);

    if (!payment) {
      throw new PaymentNotFoundException(
        `Payment not found: ${externalReference}`
      );
    }

    return payment;
  },
};
