import { ZodObject } from "zod";

export const validateDto = async <T = unknown>(
  dto: unknown,
  schema: ZodObject
): Promise<T> => {
  const result = await schema.safeParseAsync(dto);

  if (!result.success) {
    throw new Error("Invalid DTO");
  }

  return result.data as T;
};
