import { validation } from "@/infra/validation/validate-dto.ts";
import z from "zod";
import type { SubmitPaymentDto } from "./submit-payment.dto.ts";

const submitPaymentSchemaValidation = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),

  payer: z.object({
    document: z.string().min(11).max(14),
    name: z.string().min(2).max(100),
  }),
});

export const submitPaymentValidation = validation<SubmitPaymentDto>(
  submitPaymentSchemaValidation
);
