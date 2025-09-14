import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { type IncomingPaymentDto } from "./incoming-payment.dto.ts";
import { incomingPaymentSchemaValidation } from "./incoming-payment.validation.ts";
import { isUsernameExistsInGame } from "@/core/behavior/is-username-exists-ingame.ts";
import { db } from "@/infra/database/db.ts";
import { paymentsTable } from "@/infra/database/schema/payment.schema.ts";
import { eq } from "drizzle-orm";
import { usersTable } from "@/infra/database/schema/user.schema.ts";
import { PaymentStatus } from "@/core/entity/payment-status.ts";
import { writeFileSync } from "fs";
import { randomUUID } from "crypto";
import { AntifraudStatus } from "@/core/entity/antifraud-status.ts";
import { antifraudTable } from "@/infra/database/schema/antifraud.schema.ts";
import {
  conflict,
  notFound,
  ok,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.ts";

export const incomingPayment = async ({
  request,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const incomingPaymentDto = await validateDto<IncomingPaymentDto>(
    request,
    incomingPaymentSchemaValidation
  );

  const payment = await db
    .select()
    .from(paymentsTable)
    .innerJoin(usersTable, eq(usersTable.id, paymentsTable.userId))
    .where(eq(paymentsTable.id, incomingPaymentDto.externalReference))
    .get();

  if (!payment) {
    return notFound("Payment not found");
  }

  if (payment.payments.underAntifraudReview) {
    return conflict("Payment under antifraud review");
  }

  if (
    payment.payments.status === PaymentStatus.COMPLETED &&
    incomingPaymentDto.status === PaymentStatus.REFUNDED
  ) {
    // TODO: antifraud
    await db
      .update(paymentsTable)
      .set({
        status: PaymentStatus.REFUNDED,
        underAntifraudReview: true,
      })
      .where(eq(paymentsTable.id, payment.payments.id))
      .run();

    await db
      .insert(antifraudTable)
      .values({
        paymentId: payment.payments.id,
        status: AntifraudStatus.REJECTED,
        antifraudReviewedAt: new Date().toISOString(),
        antifraudReviewedBy: "system",
        antifraudReason: "Refunded payment",
      })
      .run();

    await db
      .update(usersTable)
      .set({
        inAnalysis: "true",
      })
      .where(eq(usersTable.id, payment.users.id))
      .run();

    return ok("Payment refunded");
  }

  if (payment.payments.status !== PaymentStatus.PENDING) {
    return conflict("Payment already processed");
  }

  if (payment.payments.amount !== incomingPaymentDto.amount) {
    return conflict("Payment amount mismatch");
  }

  const behavior = {
    [PaymentStatus.PENDING]: async () => null,
    [PaymentStatus.REFUNDED]: async () => {
      // TODO: antifraud
      await db
        .update(paymentsTable)
        .set({
          status: PaymentStatus.REFUNDED,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(paymentsTable.id, payment.payments.id))
        .run();
    },
    [PaymentStatus.COMPLETED]: async () => {
      const importCash = `${
        process.env.GAME_IMPORT_CASH_PATH
      }/${randomUUID()}.txt`;

      writeFileSync(
        importCash,
        `${payment.users.username} ${payment.payments.amount}`
      );

      await db
        .update(paymentsTable)
        .set({
          status: PaymentStatus.COMPLETED,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(paymentsTable.id, payment.payments.id))
        .run();
    },
    [PaymentStatus.FAILED]: async () =>
      db
        .update(paymentsTable)
        .set({
          status: PaymentStatus.FAILED,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(paymentsTable.id, payment.payments.id))
        .run(),
  };

  await behavior[payment.payments.status]();

  if (!isUsernameExistsInGame(payment.users.username)) {
    return notFound("User not found in game");
  }

  return ok("Payment verified");
};
