import { zodValidation } from "@/infra/validation/zod-validation.ts";
import z from "zod";
import type { CreateUserDto } from "./create-user.dto.ts";

const createUserSchemaValidation = z.object({
  name: z.string().min(2),
  email: z.email(),
  username: z
    .string()
    .min(4)
    .max(10)
    .regex(/^[a-zA-Z0-9_]+$/),
  password: z
    .string()
    .min(6)
    .max(12)
    .regex(/^[a-zA-Z0-9_]+$/),
});

export const createUserValidation = zodValidation<CreateUserDto>(
  createUserSchemaValidation
);
