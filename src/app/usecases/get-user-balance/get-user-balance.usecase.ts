import { getUserById } from "@/infra/database/repository/user.repository.ts";
import {
  badRequest,
  type HttpRequestContract,
} from "@/app/contracts/http.protocol.ts";

export const getUserBalance = async ({
  // request,
  user,
}: HttpRequestContract) => {
  const { id: userId } = user!;

  const isUserExists = await getUserById(userId);

  if (!isUserExists) {
    return badRequest("User not found");
  }
};
