import { StatusCode } from "../../main/adapters/http/interfaces/statusCode.enum";
import { ApiError } from "./api.error";

export class NotFoundError extends ApiError {

  constructor( message: string) {
    super(StatusCode.NOT_FOUND, message);
    this.name = "BadRequestError";
  }
}
