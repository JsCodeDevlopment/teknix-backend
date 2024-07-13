import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { NotFoundError } from "../../errors/not.found.request.error";
import { Usecase } from "../../usecase";
import { DeleteProductInputDto } from "./dto/delete.input.dto";
import { DeleteProductOutputDto } from "./dto/delete.output.dto";

export class DeleteProductUsecase
  implements Usecase<DeleteProductInputDto, DeleteProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new DeleteProductUsecase(productGateway);
  }

  public async execute({
    id,
  }: DeleteProductInputDto): Promise<DeleteProductOutputDto> {
    const aProduct = await this.productGateway.listById(id);

    if (!aProduct) throw new NotFoundError("Product not found");

    await this.productGateway.delete(aProduct.id);

    const output = this.presentOutput(aProduct);

    return output;
  }

  private presentOutput(product: Product): DeleteProductOutputDto {
    const output: DeleteProductOutputDto = {
      id: product.id,
    };

    return output;
  }
}
