import type { Payment } from "../entity/payment.ts";
import type { RepositoryContract } from "./repository.contract.ts";

export type PaymentRepositoryContract = {
  findByExternalReference: (
    externalReference: string
  ) => Promise<Payment | null>;

  findByExternalReferenceOrThrow: (
    externalReference: string
  ) => Promise<Payment>;
} & RepositoryContract<Payment>;
