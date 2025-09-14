import z from "zod";

export const incomingPaymentSchemaValidation = z.object({
  amount: z.number().positive(),
  status: z.enum(["pending", "completed", "refunded", "failed"]),
  externalReference: z.string().min(1).max(255),
});
