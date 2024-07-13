import { StatusCode } from "../../main/adapters/http/interfaces/statusCode.enum";

export class ApiError extends Error {
  readonly statusCode: StatusCode;

  constructor(statusCode: StatusCode, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}
