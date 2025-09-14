import type { FastifyRequest } from "fastify";

declare module "fastify" {
  export interface CustomFastifyRequest extends FastifyRequest {
    user?: { id: string };
  }

  export interface FastifyAuthenticatedRequest extends CustomFastifyRequest {
    user: { id: string };
  }
}
