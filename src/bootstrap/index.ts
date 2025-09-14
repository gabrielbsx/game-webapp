import Fastify from "fastify";
import { routes } from "./routes.ts";
import { middlewares } from "./middlewares.ts";

const bootstrap = async () => {
  const app = Fastify({
    logger: true,
  });

  routes(app);
  middlewares(app);

  await app.listen({ port: 3000 });
};

bootstrap().catch(console.error);
