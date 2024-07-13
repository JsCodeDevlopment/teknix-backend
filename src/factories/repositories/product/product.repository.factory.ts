import { ProductRepository } from "../../../infra/repositories/product/product.repository";

export function createProductRepository() {
  return ProductRepository.create();
}
