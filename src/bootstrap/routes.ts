import { createUser } from "@/app/usecases/create-user/create-user.usecase.ts";
import { updatePassword } from "@/app/usecases/update-password/update-password.usecase.ts";
import { fastifyWrapper } from "@/infra/http/fastify.ts";
import type { FastifyInstance } from "fastify";

export const routes = (app: FastifyInstance) => {
  // User routes
  app.post("/users", fastifyWrapper(createUser));
  app.put("/users", fastifyWrapper(updatePassword));

  return app;
};
