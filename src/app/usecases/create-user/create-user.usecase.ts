import bcrypt from "bcrypt";
import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { type CreateUserDto } from "./create-user.dto.ts";
import { createUserSchemaValidation } from "./create-user.validation.ts";
import { isUsernameExistsInGame } from "@/core/behavior/is-username-exists-ingame.ts";
import {
  badRequest,
  created,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";
import { randomUUID } from "crypto";

const makeUser = (data: CreateUserDto) => ({
  ...data,
  id: randomUUID(),
  balance: 0,
  inAnalysis: false,
  createdAt: new Date(),
  deletedAt: null,
  updatedAt: null,
});

export const createUser = async ({
  request,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { name, email, username, password } = await validateDto<CreateUserDto>(
    request,
    createUserSchemaValidation
  );

  if (
    isUsernameExistsInGame(username) ||
    (await userRepository.getUserByUsername(username))
  ) {
    return badRequest("Account already exists");
  }

  const salt = await bcrypt.genSalt();

  const passwordHashed = await bcrypt.hash(password, salt);

  const userCreated = await userRepository.create(
    makeUser({
      name,
      email,
      username,
      password: passwordHashed,
    })
  );

  return created({ id: userCreated.id });
};
