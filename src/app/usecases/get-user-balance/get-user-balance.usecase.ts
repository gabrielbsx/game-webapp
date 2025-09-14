import { getUserById } from "@/infra/database/repository/user.repository.ts";
import {
  badRequest,
  ok,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.ts";

export const getUserBalance = async ({
  // request,
  authenticatedUser,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { id: userId } = authenticatedUser!;

  const isUserExists = await getUserById(userId);

  if (!isUserExists) {
    return badRequest("User not found");
  }

  return ok({ balance: 0 });
};
