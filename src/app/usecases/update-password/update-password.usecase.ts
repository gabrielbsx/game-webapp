import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { updatePasswordSchemaValidation } from "./update-password.validation.ts";
import type { UpdatePasswordDto } from "./update-password.dto.ts";
import { db } from "@/infra/database/db.ts";
import { usersTable } from "@/infra/database/schema/user.schema.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import {
  conflict,
  noContent,
  notFound,
  type HttpRequestContract,
} from "@/app/contracts/http.protocol.ts";

export const updatePassword = async ({
  request,
  user: authenticatedUser,
}: HttpRequestContract) => {
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
