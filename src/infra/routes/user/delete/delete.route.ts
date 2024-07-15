import { NextFunction, Request, Response } from "express";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { DeleteUserResponseDto } from "./dto/delete.dto";
import { DeleteUserUsecase } from "../../../../usecases/user/delete/delete.usecase";
import { DeleteUserInputDto } from "../../../../usecases/user/delete/dto/delete.input.dto";
import { DeleteUserOutputDto } from "../../../../usecases/user/delete/dto/delete.output.dto";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";

export class DeleteUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly deleteUserService: DeleteUserUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(deleteUserService: DeleteUserUsecase): DeleteUserRoute {
    return new DeleteUserRoute(
      "/users/delete/:id",
      deleteUserService,
      HttpMethod.DELETE
    );
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;

        const input: DeleteUserInputDto = {
          id,
        };

        const output: DeleteUserOutputDto =
          await this.deleteUserService.execute(input);

        const response = this.present(output);

        res.status(StatusCode.OK).json(response).send();
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: DeleteUserResponseDto): DeleteUserResponseDto {
    const response = {
      id: input.id,
    };
    return response;
  }

  public getPath() {
    return this.path;
  }

  public getMethod() {
    return this.method;
  }

  public getMiddlewares() {
    return [];
  }
}
