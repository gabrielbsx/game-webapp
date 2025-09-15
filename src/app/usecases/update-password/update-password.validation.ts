import { zodValidation } from "@/infra/validation/zod-validation.ts";
import z from "zod";
import type { UpdatePasswordDto } from "./update-password.dto.ts";

const updatePasswordSchemaValidation = z.object({
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

export const updatePasswordValidation = zodValidation<UpdatePasswordDto>(
  updatePasswordSchemaValidation
);
