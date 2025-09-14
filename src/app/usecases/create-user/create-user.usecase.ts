import bcrypt from "bcrypt";
import { db } from "@/infra/database/db.ts";
import { usersTable } from "@/infra/database/schema/user.schema.ts";
import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { type CreateUserDto } from "./create-user.dto.ts";
import { createUserSchemaValidation } from "./create-user.validation.ts";
import { isUsernameExistsInGame } from "@/core/behavior/is-username-exists-ingame.ts";
import { getUserByUsername } from "@/infra/database/repository/user.repository.ts";
import {
  badRequest,
  created,
  internalServerError,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.ts";

export const createUser = async ({
  request,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { name, email, username, password } = await validateDto<CreateUserDto>(
    request,
    createUserSchemaValidation
  );

  if (isUsernameExistsInGame(username) || (await getUserByUsername(username))) {
    return badRequest("Account already exists");
  }

  const salt = await bcrypt.genSalt();

  const passwordHashed = await bcrypt.hash(password, salt);

  const userCreated = await db
    .insert(usersTable)
    .values({
      name,
      email,
      username,
      password: passwordHashed,
    })
    .returning({ insertedId: usersTable.id })
    .get();

  if (!userCreated) {
    return internalServerError("An error occurred");
  }

  return created({ id: userCreated.insertedId });
};
