import { createUserValidation } from "./create-user.validation.ts";
import {
  created,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.contract.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";
import { cryptography } from "@/infra/cryptography/bcrypt.cryptography.ts";
import { gameAccountRepository } from "@/infra/database/fs/repository/game-account.repository.ts";
import { AccountAlreadyExistsException } from "@/core/errors/account-already-exists.exception.ts";

export const createUser = async ({
  request,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { name, email, username, password } =
    await createUserValidation.validate(request);

  if (
    (await gameAccountRepository.isUsernameExists(username)) ||
    (await userRepository.getUserByUsername(username))
  ) {
    throw new AccountAlreadyExistsException();
  }

  const passwordHashed = await cryptography.hash(password);

  const userCreated = await userRepository.create({
    name,
    email,
    username,
    password: passwordHashed,
  });

  return created({ id: userCreated.id });
};
