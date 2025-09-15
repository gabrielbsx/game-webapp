import { ConflictException } from "./generic/conflict.exception.ts";

export class PaymentAlreadyProcessedException extends ConflictException {
  constructor(message?: string) {
    super(message || "Payment already processed");
    this.name = "PaymentAlreadyProcessedException";
  }
}
