import {
  isGoNext,
  type HttpMiddlewareResponseContract,
  type HttpRequestContract,
} from "@/app/contracts/http.contract.ts";
import { HttpException } from "@/core/errors/generic/http.exception.ts";
import type { FastifyRequest, FastifyReply } from "fastify";

export const fastifyMiddlewareWrapper =
  (
    middleware: (
      request: HttpRequestContract
    ) => Promise<HttpMiddlewareResponseContract>
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const response = await middleware({
        headers: request.headers,
        request: request.body,
        authenticatedUser: request.user,
        setAuthenticatedUser: (user) => {
          request.user = user;
        },
      });

      if (isGoNext(response)) {
        return;
      }

      return reply.status(response.statusCode).send(response.data);
    } catch (error) {
      request.log.error(error);

      if (error instanceof HttpException) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
