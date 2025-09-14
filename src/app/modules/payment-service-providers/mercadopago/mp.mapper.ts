import type { IncomingPaymentDto } from "@/app/usecases/incoming-payment/incoming-payment.dto.ts";

export const mercadoPagoToIncomingPaymentDto = (
  _data: unknown
): IncomingPaymentDto => ({
  amount: 10,
  externalReference: "",
  status: "pending",
});
