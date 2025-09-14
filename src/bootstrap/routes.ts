import { createUser } from "@/app/usecases/create-user/create-user.usecase.ts";
import { updatePassword } from "@/app/usecases/update-password/update-password.usecase.ts";
import type { FastifyInstance } from "fastify";

export const routes = (app: FastifyInstance) => {
  // User routes
  app.post("/users", createUser);
  app.put("/users", updatePassword);

  return app;
};
