import z from "zod";

export const submitPaymentSchemaValidation = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3),

  payer: z.object({
    document: z.string().min(11).max(14),
    name: z.string().min(2).max(100),
  }),
});
