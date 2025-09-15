import { HttpException } from "./http.exception.ts";

export class UnauthorizedException extends HttpException {
  constructor(message?: string) {
    super(message || "Unauthorized");
    this.statusCode = 401;
    this.name = "UnauthorizedException";
  }
}
