import { NextFunction, Request, Response } from "express";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { ListUserByIdResponseDto } from "./dto/listById.dto";
import { ListUserByIdUsecase } from "../../../../usecases/user/listById/listById.usecase";
import { ListUserByIdInputDto } from "../../../../usecases/user/listById/dto/listById.input.dto";
import { ListUserByIdOutputDto } from "../../../../usecases/user/listById/dto/listById.output";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";

export class ListUserByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly listUserByIdService: ListUserByIdUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(
    listUserByIdService: ListUserByIdUsecase
  ): ListUserByIdRoute {
    return new ListUserByIdRoute(
      "/users/list/:id",
      listUserByIdService,
      HttpMethod.GET
    );
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const input: ListUserByIdInputDto = {
          id: req.params.id,
        };

        const output: ListUserByIdOutputDto =
          await this.listUserByIdService.execute(input);

        const response = this.present(output);

        res.status(StatusCode.OK).json(response).send();
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: ListUserByIdOutputDto): ListUserByIdResponseDto {
    const response: ListUserByIdResponseDto = {
      user: {
        id: input.user.id,
        name: input.user.name,
        email: input.user.email,
        isVerified: input.user.isVerified,
        verificationToken: input.user.verificationToken,
      },
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
