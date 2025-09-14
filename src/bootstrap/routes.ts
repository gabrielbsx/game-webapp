import { createUser } from "@/app/usecases/create-user/create-user.usecase.js";
import { updatePassword } from "@/app/usecases/update-password/update-password.usecase.js";
import { fastifyControllerWrapper } from "@/infra/http/fastify/controller.js";
import type { FastifyInstance } from "fastify";

export const routes = (app: FastifyInstance) => {
  // User route
  app.post("/users", fastifyControllerWrapper(createUser));
  app.put("/users", fastifyControllerWrapper(updatePassword));
};
