import type { ValidationContract } from "@/app/contracts/validation.contract.ts";
import { BadRequestException } from "@/core/errors/generic/bad-request.exception.ts";
import { ZodObject } from "zod";

export const validation = <T>(schema: ZodObject): ValidationContract<T> => ({
  async validate(dto: unknown): Promise<T> {
    const result = await schema.safeParseAsync(dto);

    if (!result.success) {
      throw new BadRequestException(result.error.message);
    }

    return result.data as T;
  },
});
