import { HttpException } from "./http.exception.ts";

export class InternalErrorException extends HttpException {
  constructor(message?: string) {
    super(message || "Internal server error");
    this.name = "InternalErrorException";
  }
}
