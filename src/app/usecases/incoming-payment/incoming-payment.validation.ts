import { zodValidation } from "@/infra/validation/zod-validation.ts";
import z from "zod";
import type { IncomingPaymentDto } from "./incoming-payment.dto.ts";

const incomingPaymentSchemaValidation = z.object({
  amount: z.number().positive(),
  status: z.enum(["pending", "completed", "refunded", "failed"]),
  externalReference: z.string().min(1).max(255),
});

export const incomingPaymentValidation = zodValidation<IncomingPaymentDto>(
  incomingPaymentSchemaValidation
);
