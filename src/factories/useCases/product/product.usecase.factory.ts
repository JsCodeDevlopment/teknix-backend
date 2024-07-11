import { ProductRepository } from "../../../infra/repositories/product/product.repository";
import { CreateProductUsecase } from "../../../usecases/product/create/create.usecase";
import { DeleteProductUsecase } from "../../../usecases/product/delete/delete.usecase";
import { ListProductUsecase } from "../../../usecases/product/list/list.usecase";
import { ListProductByIdUsecase } from "../../../usecases/product/listById/listById.usecase";
import { UpdateProductUsecase } from "../../../usecases/product/update/update.usecase";

export function createProductUseCases(repository: ProductRepository) {
  return {
    createProductUsecase: CreateProductUsecase.create(repository),
    deleteProductUsecase: DeleteProductUsecase.create(repository),
    listProductUsecase: ListProductUsecase.create(repository),
    listProductByIdUsecase: ListProductByIdUsecase.create(repository),
    updateProductUsecase: UpdateProductUsecase.create(repository),
  };
}
