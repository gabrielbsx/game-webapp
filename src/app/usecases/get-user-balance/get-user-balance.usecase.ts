import {
  badRequest,
  ok,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.js";
import { userRepository } from "@/infra/database/repository/user.repository.js";

export const getUserBalance = async ({
  // request,
  authenticatedUser,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { id: userId } = authenticatedUser!;

  const user = await userRepository.getUserById(userId);

  if (!user) {
    return badRequest("User not found");
  }

  const { balance } = user;

  return ok({ balance });
};
