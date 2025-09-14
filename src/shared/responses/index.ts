import type { FastifyReply } from "fastify";

export const ok = <T>(reply: FastifyReply, data: T) =>
  reply.status(200).send(data);

export const created = <T>(reply: FastifyReply, data: T) =>
  reply.status(201).send(data);

export const noContent = (reply: FastifyReply) => reply.status(204).send();

export const badRequest = (reply: FastifyReply, message: string) =>
  reply.status(400).send({ error: message });

export const unauthorized = (reply: FastifyReply, message: string) =>
  reply.status(401).send({ error: message });

export const notFound = (reply: FastifyReply, message: string) =>
  reply.status(404).send({ error: message });

export const conflict = (reply: FastifyReply, message: string) =>
  reply.status(409).send({ error: message });

export const internalServerError = (reply: FastifyReply, message: string) =>
  reply.status(500).send({ error: message });
