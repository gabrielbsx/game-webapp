import { getUserById } from "@/infra/database/repository/user.repository.ts";
import jwt from "jsonwebtoken";
import {
  unauthorized,
  type HttpRequestContract,
} from "../contracts/http.protocol.ts";

export const authenticationMiddleware = async ({
  headers,
  setAuthenticatedUser,
}: HttpRequestContract) => {
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

    if (!(await getUserById(decoded.sub))) {
      return unauthorized("Unauthorized");
    }

    setAuthenticatedUser({
      id: decoded.sub,
    });
  } catch (error) {
    console.error(error);
    return unauthorized("Unauthorized");
  }
};
