import bcrypt from "bcrypt";
import type { FastifyReply, FastifyRequest } from "fastify";
import { db } from "@/infra/database/db.ts";
import { usersTable } from "@/infra/database/schema/user.schema.ts";
import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { type CreateUserDto } from "./create-user.dto.ts";
import { createUserSchemaValidation } from "./create-user.validation.ts";
import { isUsernameExistsInGame } from "@/core/behavior/is-username-exists-ingame.ts";
import {
  badRequest,
  created,
  internalServerError,
} from "@/shared/responses/index.ts";
import { getUserByUsername } from "@/infra/database/repository/user.repository.ts";

export const createUser = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { name, email, username, password } = await validateDto<CreateUserDto>(
    request.body,
    createUserSchemaValidation
  );

  if (isUsernameExistsInGame(username) || (await getUserByUsername(username))) {
    return badRequest(reply, "Account already exists");
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
    return internalServerError(reply, "An error occurred");
  }

  return created(reply, { id: userCreated.insertedId });
};
