import { authenticationMiddleware } from "@/app/middlewares/authentication.middleware.js";
import { fastifyMiddlewareWrapper } from "@/infra/http/fastify/middleware.js";
import type { FastifyInstance } from "fastify";

export const middlewares = (app: FastifyInstance) => {
  app.addHook("onRequest", fastifyMiddlewareWrapper(authenticationMiddleware));
};
