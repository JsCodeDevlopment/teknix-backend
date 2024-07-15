import { NextFunction, Request, Response } from "express";
import { CreateProductUsecase } from "../../../../usecases/product/create/create.usecase";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { CreateProductResponseDto } from "./dto/create.dto";
import { CreateProductInputDto } from "../../../../usecases/product/create/dto/create.input.dto";
import { CreateProductOutputDto } from "../../../../usecases/product/create/dto/create.output.dto";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";
import { authMiddleware } from "../../../../main/middlewares/auth.middlewares";

export class CreateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly createProductService: CreateProductUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(
    createProductService: CreateProductUsecase
  ): CreateProductRoute {
    return new CreateProductRoute(
      "/products",
      createProductService,
      HttpMethod.POST
    );
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { name, price, description, image } = req.body;

        const input: CreateProductInputDto = {
          name,
          price,
          description,
          image,
        };

        const output: CreateProductOutputDto =
          await this.createProductService.execute(input);

        const response = this.present(output);

        res.status(StatusCode.CREATED).json(response);
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: CreateProductResponseDto): CreateProductResponseDto {
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
    return [authMiddleware];
  }
}
