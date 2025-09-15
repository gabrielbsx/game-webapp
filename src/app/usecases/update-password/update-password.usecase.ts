import { validateDto } from "@/infra/validation/validate-dto.ts";
import { updatePasswordSchemaValidation } from "./update-password.validation.ts";
import type { UpdatePasswordDto } from "./update-password.dto.ts";
import {
  conflict,
  noContent,
  notFound,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.contract.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";
import { cryptography } from "@/infra/cryptography/bcrypt.cryptography.ts";
import { gameAccountRepository } from "@/infra/database/fs/repository/game-account.repository.ts";

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

  if (!gameAccountRepository.isUsernameExists(user.username)) {
    return conflict("An error occurred");
  }

  const passwordHashed = await cryptography.hash(password);

  const isCurrentPasswordValid = await cryptography.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    return conflict("An error occurred");
  }

  await userRepository.update(user.id, {
    password: passwordHashed,
  });

  return noContent();
};
