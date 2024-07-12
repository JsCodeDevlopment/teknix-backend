import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Usecase } from "../../usecase";
import { ListProductInputDto } from "./dto/list.input.dto";
import { ListProductOutputDto } from "./dto/list.output.dto";

export class ListProductUsecase
  implements Usecase<ListProductInputDto, ListProductOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new ListProductUsecase(productGateway);
  }

  public async execute(): Promise<ListProductOutputDto> {
    const aProducts = await this.productGateway.list();

    const output = this.presentOutput(aProducts);

    return output;
  }

  private presentOutput(products: Product[]): ListProductOutputDto {
    const output: ListProductOutputDto = {
      product: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
        description: product.description,
        image: product.image,
      })),
    };

    return output;
  }
}