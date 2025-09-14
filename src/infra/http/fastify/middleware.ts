import type { HttpRequestContract } from "@/app/contracts/http.protocol.ts";
import type { FastifyRequest, FastifyReply } from "fastify";

export const fastifyMiddlewareWrapper =
  (middleware: (request: HttpRequestContract) => Promise<void>) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await middleware({
        headers: request.headers,
        request: request.body,
        authenticatedUser: request.user,
        setAuthenticatedUser: (user) => {
          request.user = user;
        },
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
