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
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.ts";
import { isUsernameExistsInGame } from "@/core/behavior/is-username-exists-ingame.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";

export const updatePassword = async ({
  request,
  authenticatedUser,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { id: userId } = authenticatedUser!;

  const { currentPassword, password } = await validateDto<UpdatePasswordDto>(
    request,
    updatePasswordSchemaValidation
  );

  const user = await userRepository.getUserById(userId);

  if (!user) {
    return notFound("User not found");
  }

  if (!isUsernameExistsInGame(user.username)) {
    return conflict("An error occurred");
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
