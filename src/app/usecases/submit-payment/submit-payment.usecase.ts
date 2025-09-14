import { ok } from "@/shared/responses/index.ts";
import { validateDto } from "@/shared/utilities/validate-dto.ts";
import type { FastifyAuthenticatedRequest, FastifyReply } from "fastify";
import { type SubmitPaymentDto } from "./submit-payment.dto.ts";
import { submitPaymentSchemaValidation } from "./submit-payment.validation.ts";

export const submitPayment = async (
  request: FastifyAuthenticatedRequest,
  reply: FastifyReply
) => {
  const { id: _userId } = request.user;

  const _submitPaymentDto = validateDto<SubmitPaymentDto>(
    request.body,
    submitPaymentSchemaValidation
  );

  // TODO: request to get KYC

  /**
   * Payload:
   * qrcode: (pix)
   * app_link: (checkout)
   * ...
   */
  return ok(reply, "Payment submitted successfully");
};
