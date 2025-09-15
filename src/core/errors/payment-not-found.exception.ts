import { NotFoundException } from "./generic/not-found.exception.ts";

export class PaymentNotFoundException extends NotFoundException {
  constructor(message?: string) {
    super(message || "Payment not found");
    this.name = "PaymentNotFoundException";
  }
}
