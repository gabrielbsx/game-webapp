import type { FastifyAuthenticatedRequest, FastifyReply } from "fastify";
import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { updatePasswordSchemaValidation } from "./update-password.validation.ts";
import type { UpdatePasswordDto } from "./update-password.dto.ts";
import { db } from "@/infra/database/db.ts";
import { usersTable } from "@/infra/database/schema/user.schema.ts";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const updatePassword = async (
  request: FastifyAuthenticatedRequest,
  reply: FastifyReply
) => {
  const { id: userId } = request.user;

  const { currentPassword, password } = await validateDto<UpdatePasswordDto>(
    request.body,
    updatePasswordSchemaValidation
  );

  const user = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, userId))
    .get();

  if (!user) {
    return reply.status(404).send({ error: "User not found" });
  }

  const passwordHashed = await bcrypt.hash(password, await bcrypt.genSalt());

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password
  );

  if (!isCurrentPasswordValid) {
    return reply.status(401).send({ error: "An error occurred" });
  }

  await db
    .update(usersTable)
    .set({ password: passwordHashed })
    .where(eq(usersTable.id, user.id));

  return reply.status(204).send();
};
