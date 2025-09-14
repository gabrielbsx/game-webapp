import { createUser } from "@/app/usecases/create-user/create-user.usecase.ts";
import { updatePassword } from "@/app/usecases/update-password/update-password.usecase.ts";
import { fastifyControllerWrapper } from "@/infra/http/fastify/controller.ts";
import type { FastifyInstance } from "fastify";

export const routes = (app: FastifyInstance) => {
  // User routes
  app.post("/users", fastifyControllerWrapper(createUser));
  app.put("/users", fastifyControllerWrapper(updatePassword));

  return app;
};
