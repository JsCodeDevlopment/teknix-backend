import { NextFunction, Request, Response } from "express";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { CreateUserResponseDto } from "./dto/create.dto";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";
import { CreateUserInputDto } from "../../../../usecases/user/create/dto/create.input.dto";
import { CreateUserOutputDto } from "../../../../usecases/user/create/dto/create.output.dto";
import { CreateUserUsecase } from "../../../../usecases/user/create/create.usecase";

export class CreateUserRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly createUserService: CreateUserUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(createUserService: CreateUserUsecase): CreateUserRoute {
    return new CreateUserRoute("/users/create", createUserService, HttpMethod.POST);
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, email, password } = req.body;

        const input: CreateUserInputDto = {
          name,
          email,
          password,
        };

        const output: CreateUserOutputDto =
          await this.createUserService.execute(input);

        const response = this.present(output);

        res.status(StatusCode.CREATED).json(response);
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: CreateUserResponseDto): CreateUserResponseDto {
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
