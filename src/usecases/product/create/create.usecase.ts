import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Usecase } from "../../usecase";
import { CreateProductInputDto } from "./dto/create.input.dto";
import { CreateProductOutputDto } from "./dto/create.output.dto";

export class CreateProductUsecase
  implements Usecase<CreateProductInputDto, CreateProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new CreateProductUsecase(productGateway);
  }

  public async execute({
    name,
    price,
    description,
    image,
  }: CreateProductInputDto): Promise<CreateProductOutputDto> {
    const aProduct = Product.create(name, price, description, image);

    await this.productGateway.create(aProduct);

    const output = this.presentOutput(aProduct);

    return output;
  }

  private presentOutput(product: Product): CreateProductOutputDto {
    const output: CreateProductOutputDto = {
      id: product.id,
    };

    return output;
  }
}
