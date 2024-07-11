import { UserProps } from "../interfaces/user.props";

export class User {
  private constructor(private readonly props: UserProps) {
    this.validate();
  }

  public static create(name: string, email: string, password: string, role: string): User {
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      email,
      password,
      role,
      isVerified: false,
      verificationToken: crypto.randomUUID().toString(),
    });
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  private validate() {
    if (this.props.quantity < 0) {
      throw new Error("Product quantity cannot be negative");
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

  public get quantity() {
    return this.props.quantity;
  }

  public addQuantity(quantity: number) {
    this.props.quantity += quantity;
  }

  public removeQuantity(quantity: number) {
    this.props.quantity -= quantity;
  }
}
