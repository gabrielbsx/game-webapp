import { HttpException } from "./http.exception.ts";

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(message);
    this.statusCode = 404;
    this.name = "NotFoundException";
  }
}
