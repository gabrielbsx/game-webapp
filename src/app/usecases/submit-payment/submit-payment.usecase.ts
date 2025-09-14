import { validateDto } from "@/shared/utilities/validate-dto.js";
import { type SubmitPaymentDto } from "./submit-payment.dto.js";
import { submitPaymentSchemaValidation } from "./submit-payment.validation.js";
import {
  ok,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.protocol.js";

export const submitPayment = async ({
  request,
  authenticatedUser,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { id: _userId } = authenticatedUser!;

  const _submitPaymentDto = validateDto<SubmitPaymentDto>(
    request,
    submitPaymentSchemaValidation
  );

  // TODO: request to get KYC

  /**
   * Payload:
   * qrcode: (pix)
   * app_link: (checkout)
   * ...
   */
  return ok("Payment submitted successfully");
};
