import { NextFunction, Request, Response } from "express";
import { UpdateProductInputDto } from "../../../../usecases/product/update/dto/update.input.dto";
import { UpdateProductOutputDto } from "../../../../usecases/product/update/dto/update.output.dto";
import { UpdateProductUsecase } from "../../../../usecases/product/update/update.usecase";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { UpdateProductResponseDto } from "./dto/update.dto";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";

export class UpdateProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly updateProductService: UpdateProductUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(
    updateProductService: UpdateProductUsecase
  ): UpdateProductRoute {
    return new UpdateProductRoute(
      "/products/:id",
      updateProductService,
      HttpMethod.PUT
    );
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { id } = req.params;
        const { name, price, description, image } = req.body;

        const input: UpdateProductInputDto = {
          id,
          name,
          price,
          description,
          image,
        };

        const output: UpdateProductOutputDto =
          await this.updateProductService.execute(input);

        const response = this.present(output);

        res.status(StatusCode.OK).json(response).send();
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: UpdateProductResponseDto): UpdateProductResponseDto {
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
