import type { IncomingPaymentDto } from "@/app/usecases/incoming-payment/incoming-payment.dto.js";

export const mercadoPagoToIncomingPaymentDto = (
  _data: unknown
): IncomingPaymentDto => ({
  amount: 10,
  externalReference: "",
  status: "pending",
});
