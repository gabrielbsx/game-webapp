import Fastify from "fastify";
import { routes } from "./routes.js";
import { middlewares } from "./middlewares.js";

const bootstrap = async () => {
  console.log("Starting server...");

  const app = Fastify({
    logger: true,
  });

  console.log("Registering middlewares and routes...");
  routes(app);

  console.log("Registering middlewares...");
  middlewares(app);

  console.log("Starting server on port 3000...");

  await app.listen({ port: 3000 });
};

bootstrap().catch(console.error);
