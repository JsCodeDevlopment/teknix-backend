import { CreateProductUsecase } from "../../../usecases/product/create/create.usecase";
import { DeleteProductUsecase } from "../../../usecases/product/delete/delete.usecase";
import { ListProductUsecase } from "../../../usecases/product/list/list.usecase";
import { ListProductByIdUsecase } from "../../../usecases/product/listById/listById.usecase";
import { UpdateProductUsecase } from "../../../usecases/product/update/update.usecase";

import { CreateProductRoute } from "../../../infra/routes/products/create/create.route";
import { DeleteProductRoute } from "../../../infra/routes/products/delete/delete.route";
import { ListProductRoute } from "../../../infra/routes/products/list/list.route";
import { ListProductByIdRoute } from "../../../infra/routes/products/listById/listById.route";
import { UpdateProductRoute } from "../../../infra/routes/products/update/update.route";

export function createProductRoutes(useCases: {
  createProductUsecase: CreateProductUsecase;
  deleteProductUsecase: DeleteProductUsecase;
  listProductUsecase: ListProductUsecase;
  listProductByIdUsecase: ListProductByIdUsecase;
  updateProductUsecase: UpdateProductUsecase;
}) {
  return [
    CreateProductRoute.create(useCases.createProductUsecase),
    ListProductRoute.create(useCases.listProductUsecase),
    ListProductByIdRoute.create(useCases.listProductByIdUsecase),
    UpdateProductRoute.create(useCases.updateProductUsecase),
    DeleteProductRoute.create(useCases.deleteProductUsecase),
  ];
}
