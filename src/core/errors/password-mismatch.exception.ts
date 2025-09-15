import { ConflictException } from "./generic/conflict.exception.ts";

export class PasswordMismatchException extends ConflictException {
  constructor(message?: string) {
    super(message ?? "Password mismatch");
    this.name = "PasswordMismatchException";
  }
}
