export class HttpException extends Error {
  statusCode: number = 500;

  constructor(message: string) {
    super(message);
    this.name = "HttpException";
  }
}
