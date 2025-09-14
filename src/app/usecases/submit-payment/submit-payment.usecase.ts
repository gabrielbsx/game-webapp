import { validateDto } from "@/shared/utilities/validate-dto.ts";
import { type SubmitPaymentDto } from "./submit-payment.dto.ts";
import { submitPaymentSchemaValidation } from "./submit-payment.validation.ts";
import { ok, type HttpRequestContract } from "@/app/contracts/http.protocol.ts";

export const submitPayment = async ({ request, user }: HttpRequestContract) => {
  const { id: _userId } = user!;

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
