import type {
  HttpMiddlewareContract,
  HttpRequestContract,
} from "@/app/contracts/http.protocol.ts";
import type { FastifyRequest, FastifyReply } from "fastify";

export const fastifyMiddlewareWrapper =
  (
    middleware: (
      request: HttpRequestContract
    ) => Promise<HttpMiddlewareContract>
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

      if ("next" in response && response.next) {
        return;
      }

      if ("statusCode" in response && response.statusCode && response.data) {
        return reply.status(response.statusCode).send(response.data);
      }

      return reply.status(500).send({ error: "Internal Server Error" });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
