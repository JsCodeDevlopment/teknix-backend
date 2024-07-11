import { Request, Response } from "express";
import { DeleteProductUsecase } from "../../../../usecases/product/delete/delete.usecase";
import { HTTPMethod, HttpMethod, Route } from "../../../../main/api/route";
import { DeleteProductInputDto } from "../../../../usecases/product/delete/dto/delete.input.dto";
import { DeleteProductOutputDto } from "../../../../usecases/product/delete/dto/delete.output.dto";
import { DeleteProductResponseDto } from "./dto/delete.dto";

export class DeleteProductRoute implements Route {
  private constructor(
    private readonly path: string,
    private readonly deleteProductService: DeleteProductUsecase,
    private readonly method: HTTPMethod
  ) {}

  public static create(
    deleteProductService: DeleteProductUsecase
  ): DeleteProductRoute {
    return new DeleteProductRoute(
      "/products/:id",
      deleteProductService,
      HttpMethod.DELETE
    );
  }

  public getHandler() {
    return async (req: Request, res: Response) => {
      const { id } = req.params;

      const input: DeleteProductInputDto = {
        id,
      };

      const output: DeleteProductOutputDto =
        await this.deleteProductService.execute(input);

      const response = this.present(output);

      res.status(200).json(response).send();
    };
  }

  private present(input: DeleteProductResponseDto): DeleteProductResponseDto {
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
}