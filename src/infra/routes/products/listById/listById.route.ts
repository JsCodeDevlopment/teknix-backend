import { Request, Response } from "express";
import { ListProductByIdInputDto } from "../../../../usecases/product/listById/dto/listById.input.dto";
import { ListProductByIdUsecase } from "../../../../usecases/product/listById/listById.usecase";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { ListProductByIdOutputDto } from "../../../../usecases/product/listById/dto/listById.output";
import { ListProductByIdResponseDto } from "./dto/listById.dto";

export class ListProductByIdRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly listProductByIdService: ListProductByIdUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(
    listProductByIdService: ListProductByIdUsecase
  ): ListProductByIdRoute {
    return new ListProductByIdRoute(
      "/products/:id",
      listProductByIdService,
      HttpMethod.GET
    );
  }

  public getHandler() {
    return async (req: Request, res: Response) => {
      const input: ListProductByIdInputDto = {
        id: req.params.id,
      };

      const output: ListProductByIdOutputDto =
        await this.listProductByIdService.execute(input);

      const response = this.present(output);

      res.status(200).json(response).send();
    };
  }

  private present(input: ListProductByIdOutputDto): ListProductByIdResponseDto {
    const response: ListProductByIdResponseDto = {
      product: {
        id: input.product.id,
        name: input.product.name,
        price: input.product.price,
        quantity: input.product.quantity,
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
}