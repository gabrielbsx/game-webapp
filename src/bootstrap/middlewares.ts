import { authenticationMiddleware } from "@/app/middlewares/authentication.middleware.ts";
import { fastifyMiddlewareWrapper } from "@/infra/http/fastify/middleware.ts";
import type { FastifyInstance } from "fastify";

export const middlewares = (app: FastifyInstance) => {
  app.addHook("onRequest", fastifyMiddlewareWrapper(authenticationMiddleware));
};
