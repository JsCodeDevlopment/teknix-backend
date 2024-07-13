import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Product } from "../../../domain/product/entity/product.entity";
import { ProductModel } from "../../sequelize/models/product/product.model";

export class ProductRepository implements ProductGateway {
  public static create(): ProductRepository {
    return new ProductRepository();
  }

  public async create(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    };

    await ProductModel.create(data);
  }

  public async list(): Promise<Product[]> {
    const products = await ProductModel.findAll();

    return products.map((prod) =>
      Product.with({
        id: prod.id,
        name: prod.name,
        price: prod.price,
        description: prod.description,
        image: prod.image,
      })
    );
  }

  public async listById(id: string): Promise<Product> {
    const product = await ProductModel.findByPk(id);

    if (!product) {
      throw new Error("Product not found");
    }

    return Product.with({
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    });
  }

  public async update(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    };

    await ProductModel.update(data, { where: { id: product.id } });
  }

  public async delete(id: string): Promise<void> {
    await ProductModel.destroy({ where: { id } });
  }
}
