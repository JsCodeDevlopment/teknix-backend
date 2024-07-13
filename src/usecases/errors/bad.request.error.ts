import { StatusCode } from "../../main/adapters/http/interfaces/statusCode.enum";
import { ApiError } from "./api.error";

export class BadRequestError extends ApiError {

  constructor( message: string) {
    super(StatusCode.BAD_REQUEST, message);
    this.name = "BadRequestError";
  }
}
