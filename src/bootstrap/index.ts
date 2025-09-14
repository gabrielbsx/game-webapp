import Fastify from "fastify";
import { routes } from "./routes.ts";

const bootstrap = async () => {
  const app = Fastify({
    logger: true,
  });

  routes(app);

  await app.listen({ port: 3000 });
};

bootstrap().catch(console.error);
