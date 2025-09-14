import { validateDto } from "@/shared/utilities/validate-dto.js";
import { updatePasswordSchemaValidation } from "./update-password.validation.js";
import type { UpdatePasswordDto } from "./update-password.dto.js";
import { db } from "@/infra/database/db.js";
import { usersTable } from "@/infra/database/schema/user.schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import {
  conflict,
  noContent,
  notFound,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.js";

export const updatePassword = async ({
  request,
  authenticatedUser,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { id: userId } = authenticatedUser!;

  const { currentPassword, password } = await validateDto<UpdatePasswordDto>(
    request,
    updatePasswordSchemaValidation
  );

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .get();

  if (!user) {
    return notFound("User not found");
  }

  const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt());

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    return conflict("An error occurred");
  }

  await db
    .update(usersTable)
    .set({ password: passwordHashed })
    .where(eq(usersTable.id, user.id));

  return noContent();
};
