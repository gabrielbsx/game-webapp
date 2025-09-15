import { validateDto } from "@/infra/validation/validate-dto.ts";
import { type IncomingPaymentDto } from "./incoming-payment.dto.ts";
import { incomingPaymentSchemaValidation } from "./incoming-payment.validation.ts";
import {
  conflict,
  notFound,
  ok,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.contract.ts";
import { PaymentStatus } from "@/core/entity/payment.ts";
import { AntifraudStatus } from "@/core/entity/antifraud.ts";
import { antifraudRepository } from "@/infra/database/repository/antifraud.repository.ts";
import { userRepository } from "@/infra/database/repository/user.repository.ts";
import { paymentRepository } from "@/infra/database/sqlite/repository/payment.repository.ts";
import { gameAccountRepository } from "@/infra/database/fs/repository/game-account.repository.ts";

export const incomingPayment = async ({
  request,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const incomingPaymentDto = await validateDto<IncomingPaymentDto>(
    request,
    incomingPaymentSchemaValidation
  );

  const payment = await paymentRepository.findByIdOrThrow(
    incomingPaymentDto.externalReference
  );

  const user = await userRepository.findByIdOrThrow(payment.userId);

  if (payment.underAntifraudReview) {
    return conflict("Payment under antifraud review");
  }

  if (
    payment.status === PaymentStatus.COMPLETED &&
    incomingPaymentDto.status === PaymentStatus.REFUNDED
  ) {
    // TODO: antifraud
    await handleAntifraud(payment.id, user.id);
    return ok("Payment refunded");
  }

  if (payment.status !== PaymentStatus.PENDING) {
    return conflict("Payment already processed");
  }

  if (payment.amount !== incomingPaymentDto.amount) {
    return conflict("Payment amount mismatch");
  }

  const behavior = {
    [PaymentStatus.REFUNDED]: () => handleAntifraud(payment.id, user.id),
    [PaymentStatus.COMPLETED]: () =>
      completePayment(payment.id, user.username, payment.amount),

    [PaymentStatus.FAILED]: async () =>
      paymentRepository.update(payment.id, {
        status: PaymentStatus.FAILED,
        updatedAt: new Date(),
      }),
  };

  await behavior[payment.status as keyof typeof behavior]();

  if (!(await gameAccountRepository.isUsernameExists(user.username))) {
    return notFound("User not found in game");
  }

  return ok("Payment verified");
};

const completePayment = async (
  paymentId: string,
  username: string,
  amount: number
) => {
  await gameAccountRepository.addCash(username, amount);

  await paymentRepository.update(paymentId, {
    status: PaymentStatus.COMPLETED,
    updatedAt: new Date(),
  });
};

const handleAntifraud = async (paymentId: string, userId: string) => {
  await paymentRepository.update(paymentId, {
    status: PaymentStatus.REFUNDED,
    underAntifraudReview: true,
    updatedAt: new Date(),
  });

  await antifraudRepository.create({
    paymentId: paymentId,
    status: AntifraudStatus.REJECTED,
    reviewedAt: new Date(),
    reviewedBy: "system",
    reason: "Refunded payment",
  });

  await userRepository.update(userId, {
    inAnalysis: true,
    updatedAt: new Date(),
  });
};
