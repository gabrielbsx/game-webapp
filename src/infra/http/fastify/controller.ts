import type {
  HttpRequestContract,
  HttpResponseContract,
} from "@/app/contracts/http.contract.ts";
import { HttpException } from "@/core/errors/generic/http.exception.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export const fastifyControllerWrapper =
  (
    controller: (request: HttpRequestContract) => Promise<HttpResponseContract>
  ) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const response = await controller({
        request: request.body,
        headers: request.headers,
        authenticatedUser: request.user,
        setAuthenticatedUser: (user) => {
          request.user = user;
        },
      });

      return reply.status(response.statusCode).send(response.data);
    } catch (error) {
      request.log.error(error);

      if (error instanceof HttpException) {
        return reply.status(error.statusCode).send({ error: error.message });
      }

      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
