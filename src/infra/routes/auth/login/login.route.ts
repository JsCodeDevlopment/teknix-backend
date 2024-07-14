import { NextFunction, Request, Response } from "express";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";
import { LoginUsecase } from "../../../../usecases/auth/login/login";
import { LoginInputDto } from "../../../../usecases/auth/login/dto/create.input.dto";
import { LoginOutputDto } from "../../../../usecases/auth/login/dto/create.output.dto";

export class LoginRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly loginUsecase: LoginUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(loginUsecase: LoginUsecase): LoginRoute {
    return new LoginRoute("/login", loginUsecase, HttpMethod.POST);
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { email, password } = req.body;

        const input: LoginInputDto = {
          email,
          password,
        };

        const output: LoginOutputDto =
          await this.loginUsecase.execute(input);

        const response = this.present(output);

        res.status(StatusCode.CREATED).json(response);
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: LoginOutputDto): LoginOutputDto {
    const response: LoginOutputDto = {
      token: input.token,
      user: input.user,
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
