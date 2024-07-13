import { NextFunction, Request, Response } from "express";
import { ListProductUsecase } from "../../../../usecases/product/list/list.usecase";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { ListProductResponseDto } from "./dto/list.dto";
import { ListProductOutputDto } from "../../../../usecases/product/list/dto/list.output.dto";
import { StatusCode } from "../../../../main/adapters/http/interfaces/statusCode.enum";

export class ListProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly listProductService: ListProductUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(
    listProductService: ListProductUsecase
  ): ListProductRoute {
    return new ListProductRoute(
      "/products",
      listProductService,
      HttpMethod.GET
    );
  }

  public getHandler() {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const output: ListProductOutputDto =
          await this.listProductService.execute();

        const response = this.present(output);

        res.status(StatusCode.OK).json(response).send();
      } catch (error) {
        next(error);
      }
    };
  }

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.product.map((prod) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        description: prod.description,
        image: prod.image,
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
