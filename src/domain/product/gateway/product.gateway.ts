import { Product } from "../entity/product.entity";

export interface ProductGateway {
  create(product: Product): Promise<void>;
  listById(id: string): Promise<Product>;
  list(): Promise<Product[]>;
  update(product: Product): Promise<void>;
  delete(id: string): Promise<void>;
}
