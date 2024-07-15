import { StatusCode } from "../../main/adapters/http/interfaces/statusCode.enum";
import { ApiError } from "./api.error";

export class UnauthorizedError extends ApiError {

  constructor( message: string) {
    super(StatusCode.UNAUTHORIZED, message);
    this.name = "BadRequestError";
  }
}
