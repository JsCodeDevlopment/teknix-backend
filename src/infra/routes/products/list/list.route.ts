import { Request, Response } from "express";
import { ListProductUsecase } from "../../../../usecases/product/list/list.usecase";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { ListProductResponseDto } from "./dto/list.dto";
import { ListProductOutputDto } from "../../../../usecases/product/list/dto/list.output.dto";

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
    return async (req: Request, res: Response) => {
      const output: ListProductOutputDto =
        await this.listProductService.execute();

      const response = this.present(output);

      res.status(200).json(response).send();
    };
  }

  private present(input: ListProductOutputDto): ListProductResponseDto {
    const response: ListProductResponseDto = {
      products: input.product.map((prod) => ({
        id: prod.id,
        name: prod.name,
        price: prod.price,
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