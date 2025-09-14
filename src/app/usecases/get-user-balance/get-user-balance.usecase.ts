import type { FastifyAuthenticatedRequest, FastifyReply } from "fastify";
import { getUserById } from "@/infra/database/repository/user.repository.ts";
import { badRequest } from "@/shared/responses/index.ts";

export const getUserBalance = async (
  request: FastifyAuthenticatedRequest,
  reply: FastifyReply
) => {
  const { id: userId } = request.user;

  const isUserExists = await getUserById(userId);

  if (!isUserExists) {
    return badRequest(reply, "User not found");
  }
};
