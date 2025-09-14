import z from "zod";

export const updatePasswordSchemaValidation = z.object({
  password: z
    .string()
    .min(6)
    .max(12)
    .regex(/^[a-zA-Z0-9_]+$/),
  currentPassword: z
    .string()
    .min(6)
    .max(12)
    .regex(/^[a-zA-Z0-9_]+$/),
});
