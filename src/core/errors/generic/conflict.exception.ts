import { HttpException } from "./http.exception.ts";

export class ConflictException extends HttpException {
  constructor(message: string) {
    super(message);
    this.statusCode = 409;
    this.name = "ConflictException";
  }
}
