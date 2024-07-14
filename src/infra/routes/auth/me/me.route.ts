import { NextFunction, Request, Response } from "express";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";
import { UserRepository } from "../../../repositories/user/user.repository";
import { ListUserByIdOutputDto } from "../../../../usecases/user/listById/dto/listById.output";
import { authMiddleware } from "../../../../main/middlewares/auth.middlewares";

export class MeRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly userRepository: UserRepository,
    private readonly method: HTTPMethod
  ) {}

  public static create(userRepository: UserRepository): MeRoute {
    return new MeRoute("/me", userRepository, HttpMethod.GET);
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = (req as any).user;

        const user = await this.userRepository.listById(id);
        const output: ListUserByIdOutputDto = this.present({ user });

        res.status(StatusCode.OK).json(output);
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: ListUserByIdOutputDto): ListUserByIdOutputDto {
    const response: ListUserByIdOutputDto = {
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
    return [authMiddleware];
  }
}
