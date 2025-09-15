import jwt from "jsonwebtoken";
import {
  goNext,
  unauthorized,
  type HttpMiddlewareResponseContract,
  type HttpRequestContract,
} from "../contracts/http.contract.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";

export const authenticationMiddleware = async ({
  headers,
  setAuthenticatedUser,
}: HttpRequestContract): Promise<HttpMiddlewareResponseContract> => {
  try {
    const authHeader = String(headers.authorization);

    if (!authHeader) {
      return unauthorized("Unauthorized");
    }

    const [, token] = authHeader.split(" ");

    if (!token) {
      return unauthorized("Unauthorized");
    }

    const decoded = jwt.decode(token);

    if (!decoded || typeof decoded === "string" || !decoded.sub) {
      return unauthorized("Unauthorized");
    }

    if (!(await userRepository.getUserById(decoded.sub))) {
      return unauthorized("Unauthorized");
    }

    setAuthenticatedUser({
      id: decoded.sub,
    });

    return goNext();
  } catch (error) {
    console.error(error);
    return unauthorized("Unauthorized");
  }
};
