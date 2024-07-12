import { ProductProps } from "../interfaces/product.props";

export class Product {
  private constructor(private readonly props: ProductProps) {
    this.validate();
  }

  public static create(
    name: string,
    price: number,
    description: string,
    image: string
  ): Product {
    return new Product({
      id: crypto.randomUUID().toString(),
      name,
      description,
      image,
      price,
    });
  }

  public static with(props: ProductProps) {
    return new Product(props);
  }

  private validate() {
    if (this.props.name === "" || this.props.price === 0) {
      throw new Error("Product name is required and price must be greater than 0.");
    }
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get price() {
    return this.props.price;
  }

  public get image() {
    return this.props.image;
  }

  public get description() {
    return this.props.description;
  }
}
