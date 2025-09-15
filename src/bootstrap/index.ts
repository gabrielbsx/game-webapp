import Fastify from "fastify";
import fastifyPrintRoutes from "fastify-print-routes";
import { routes } from "./routes.ts";
import { middlewares } from "./middlewares.ts";

const bootstrap = async () => {
  const app = Fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  await app.register(fastifyPrintRoutes);

  routes(app);
  middlewares(app);

  await app.listen({ port: 3000 });
};

bootstrap().catch(console.error);
