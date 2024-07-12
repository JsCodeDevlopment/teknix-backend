import { Request, Response } from "express";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { ListUserByIdResponseDto } from "./dto/listById.dto";
import { ListUserByIdUsecase } from "../../../../usecases/user/listById/listById.usecase";
import { ListUserByIdInputDto } from "../../../../usecases/user/listById/dto/listById.input.dto";
import { ListUserByIdOutputDto } from "../../../../usecases/user/listById/dto/listById.output";

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
      "/users/:id",
      listUserByIdService,
      HttpMethod.GET
    );
  }

  public getHandler() {
    return async (req: Request, res: Response) => {
      const input: ListUserByIdInputDto = {
        id: req.params.id,
      };

      const output: ListUserByIdOutputDto =
        await this.listUserByIdService.execute(input);

      const response = this.present(output);

      res.status(200).json(response).send();
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