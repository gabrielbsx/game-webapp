import {
  ok,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.contract.ts";
import { userRepository } from "@/infra/database/sqlite/repository/user.repository.ts";

export const getUserBalance = async ({
  // request,
  authenticatedUser,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { id: userId } = authenticatedUser!;

  const user = await userRepository.findByIdOrThrow(userId);

  const { balance } = user;

  return ok({ balance });
};
