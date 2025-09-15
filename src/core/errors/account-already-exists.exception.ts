import { ConflictException } from "./generic/conflict.exception.ts";

export class AccountAlreadyExistsException extends ConflictException {
  constructor(message?: string) {
    super(message || "Account already exists");
    this.name = "AccountAlreadyExistsException";
  }
}
