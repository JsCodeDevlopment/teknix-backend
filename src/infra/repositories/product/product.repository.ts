import { PrismaClient } from "@prisma/client";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { Product } from "../../../domain/product/entity/product.entity";

export class ProductRepository implements ProductGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new ProductRepository(prismaClient);
  }

  public async create(product: Product): Promise<void> {
    const data = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      image: product.image,
    };

    await this.prismaClient.product.create({ data });
  }

  public async list(): Promise<Product[]> {
    const products = await this.prismaClient.product.findMany();

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
    const product = await this.prismaClient.product.findUnique({
      where: { id },
    });

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

    await this.prismaClient.product.update({
      where: { id: product.id },
      data,
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prismaClient.product.delete({ where: { id } });
  }
}
