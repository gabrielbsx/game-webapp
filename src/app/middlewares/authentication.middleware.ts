import { getUserById } from "@/infra/database/repository/user.repository.ts";
import { unauthorized } from "@/shared/responses/index.ts";
import type { CustomFastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

export const authenticationMiddleware = async (
  request: CustomFastifyRequest,
  reply: FastifyReply
) => {
  try {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      return unauthorized(reply, "Unauthorized");
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return unauthorized(reply, "Unauthorized");
    }

    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string" || !decoded.sub) {
      return unauthorized(reply, "Unauthorized");
    }

    if (!(await getUserById(decoded.sub))) {
      return unauthorized(reply, "Unauthorized");
    }

    request.user = { id: decoded.sub };
  } catch (error) {
    request.log.error(error);
    return unauthorized(reply, "Unauthorized");
  }
};
