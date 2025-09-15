import { ConflictException } from "./generic/conflict.exception.ts";

export class PaymentAmountMismatchException extends ConflictException {
  constructor(message?: string) {
    super(message || "Payment amount mismatch");
    this.name = "PaymentAmountMismatchException";
  }
}
