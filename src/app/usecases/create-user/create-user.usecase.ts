import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { type CreateUserDto } from "./create-user.dto.ts";
import { createUserSchemaValidation } from "./create-user.validation.ts";
import { isUsernameExistsInGame } from "@/core/behavior/is-username-exists-ingame.ts";
import {
  badRequest,
  created,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.contract.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";
import { cryptography } from "@/infra/cryptography/bcrypt.cryptography.ts";

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

  const passwordHashed = await cryptography.hash(password);

  const userCreated = await userRepository.create({
    name,
    email,
    username,
    password: passwordHashed,
    balance: 0,
    inAnalysis: false,
  });

  return created({ id: userCreated.id });
};
