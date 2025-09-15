import { submitPaymentValidation } from "./submit-payment.validation.ts";
import {
  ok,
  type HttpRequestContract,
  type HttpResponseContract,
} from "@/app/contracts/http.contract.ts";

export const submitPayment = async ({
  request,
  authenticatedUser,
}: HttpRequestContract): Promise<HttpResponseContract> => {
  const { id: _userId } = authenticatedUser!;

  const _submitPaymentDto = await submitPaymentValidation.validate(request);

  // TODO: request to get KYC

  /**
   * Payload:
   * qrcode: (pix)
   * app_link: (checkout)
   * ...
   */
  return ok("Payment submitted successfully");
};
