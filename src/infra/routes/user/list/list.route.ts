import { NextFunction, Request, Response } from "express";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { ListUserResponseDto } from "./dto/list.dto";
import { ListUserUsecase } from "../../../../usecases/user/list/list.usecase";
import { ListUserOutputDto } from "../../../../usecases/user/list/dto/list.output.dto";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";

export class ListUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly listUserService: ListUserUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(listUserService: ListUserUsecase): ListUserRoute {
    return new ListUserRoute("/users", listUserService, HttpMethod.GET);
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const output: ListUserOutputDto = await this.listUserService.execute();

        const response = this.present(output);

        res.status(StatusCode.OK).json(response).send();
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: ListUserOutputDto): ListUserResponseDto {
    const response: ListUserResponseDto = {
      users: input.users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        verificationToken: user.verificationToken,
      })),
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
