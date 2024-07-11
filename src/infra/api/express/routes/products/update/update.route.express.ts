import { Request, Response } from "express";
import { UpdateProductInputDto } from "../../../../../../usecases/product/update/dto/update.input.dto";
import { UpdateProductOutputDto } from "../../../../../../usecases/product/update/dto/update.output.dto";
import { UpdateProductUsecase } from "../../../../../../usecases/product/update/update.usecase";
import { HTTPMethod, HttpMethod, Route } from "../../route";
import { UpdateProductResponseDto } from "./dto/update.dto";

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
    return async (req: Request, res: Response) => {
      const { id } = req.params;
      const { name, price } = req.body;

      const input: UpdateProductInputDto = {
        id,
        name,
        price,
      };

      const output: UpdateProductOutputDto =
        await this.updateProductService.execute(input);

      const response = this.present(output);

      res.status(200).json(response).send();
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
}
