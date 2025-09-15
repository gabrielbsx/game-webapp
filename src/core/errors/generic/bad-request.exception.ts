import { HttpException } from "./http.exception.ts";

export class BadRequestException extends HttpException {
  constructor() {
    super("Bad Request");
    this.statusCode = 400;
    this.name = "BadRequestException";
  }
}
