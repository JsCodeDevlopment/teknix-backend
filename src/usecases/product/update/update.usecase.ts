import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Usecase } from "../../usecase";
import { UpdateProductInputDto } from "./dto/update.input.dto";
import { UpdateProductOutputDto } from "./dto/update.output.dto";

export class UpdateProductUsecase
  implements Usecase<UpdateProductInputDto, UpdateProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new UpdateProductUsecase(productGateway);
  }

  public async execute({
    id,
    name,
    price,
  }: UpdateProductInputDto): Promise<UpdateProductOutputDto> {
    const productExist = await this.productGateway.listById(id);
    
    if (!productExist) throw new Error("Product not found");

    const updatedProduct = Product.with({
      id: productExist.id,
      name: name || productExist.name,
      price: price || productExist.price,
      quantity: productExist.quantity,
    });

    await this.productGateway.update(updatedProduct);

    const output = this.presentOutput(updatedProduct);

    return output;
  }

  private presentOutput(product: Product): UpdateProductOutputDto {
    const output: UpdateProductOutputDto = {
      id: product.id,
    };

    return output;
  }
}
