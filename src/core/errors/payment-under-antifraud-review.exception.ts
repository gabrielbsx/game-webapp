import { ConflictException } from "./generic/conflict.exception.ts";

export class PaymentUnderAntifraudReviewException extends ConflictException {
  constructor(message = "Payment under antifraud review") {
    super(message);
    this.name = "PaymentUnderAntifraudReviewException";
  }
}
