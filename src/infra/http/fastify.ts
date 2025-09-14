import type {
  HttpRequestContract,
  HttpResponseContract,
} from "@/app/contracts/http.protocol.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export const fastifyWrapper =
  (fn: (request: HttpRequestContract) => Promise<HttpResponseContract>) =>
  async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const response = await fn({ request });
      return reply.status(response.statusCode).send(response.data);
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({ error: "Internal Server Error" });
    }
  };
