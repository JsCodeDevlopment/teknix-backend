import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { BadRequestError } from "../../errors/bad.request.error";
import { NotFoundError } from "../../errors/not.found.request.error";
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
    description,
    image,
  }: UpdateProductInputDto): Promise<UpdateProductOutputDto> {
    if (!id) throw new BadRequestError("Id not found.");
    
    if (!name && !price && !description && !image)
      throw new BadRequestError(
        "Some of the information was no longer received."
      );

    const productExist = await this.productGateway.listById(id);

    if (!productExist) throw new NotFoundError("Product not found.");

    const updatedProduct = Product.with({
      id: productExist.id,
      name: name || productExist.name,
      price: price || productExist.price,
      description: description || productExist.description,
      image: image || productExist.image,
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
