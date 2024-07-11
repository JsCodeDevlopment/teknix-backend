import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Usecase } from "../../usecase";
import { ListProductByIdInputDto } from "./dto/listById.input.dto";
import { ListProductByIdOutputDto } from "./dto/listById.output";

export class ListProductByIdUsecase
  implements Usecase<ListProductByIdInputDto, ListProductByIdOutputDto>
{
  private constructor(private readonly productGateway: ProductGateway) {}

  public static create(productGateway: ProductGateway) {
    return new ListProductByIdUsecase(productGateway);
  }

  public async execute(input: ListProductByIdInputDto): Promise<ListProductByIdOutputDto> {
    const aProduct = await this.productGateway.listById(input.id);

    const output = this.presentOutput(aProduct);

    return output;
  }

  private presentOutput(product: Product): ListProductByIdOutputDto {
    const output: ListProductByIdOutputDto = {
      product: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: product.quantity,
      },
    };

    return output;
  }
}