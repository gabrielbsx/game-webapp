import jwt from "jsonwebtoken";
import {
  goNext,
  type HttpMiddlewareResponseContract,
  type HttpRequestContract,
} from "../contracts/http.contract.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";
import { UnauthorizedException } from "@/core/errors/generic/unauthorized.exception.ts";

export const authenticationMiddleware = async ({
  headers,
  setAuthenticatedUser,
}: HttpRequestContract): Promise<HttpMiddlewareResponseContract> => {
  if (!headers?.authorization) {
    throw new UnauthorizedException();
  }

  const authHeader = String(headers.authorization);

  if (!authHeader) {
    throw new UnauthorizedException();
  }

  const [, token] = authHeader.split(" ");

  if (!token) {
    throw new UnauthorizedException();
  }

  const decoded = jwt.decode(token);

  if (!decoded || typeof decoded === "string" || !decoded.sub) {
    throw new UnauthorizedException();
  }

  await userRepository.findByIdOrThrow(decoded.sub);

  setAuthenticatedUser({
    id: decoded.sub,
  });

  return goNext();
};
