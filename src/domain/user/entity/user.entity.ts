import { UserProps } from "../interfaces/user.props";

export class User {
  private constructor(private readonly props: UserProps) {
    this.validate();
  }

  public static create(
    name: string,
    email: string,
    password: string,
  ): User {
    return new User({
      id: crypto.randomUUID().toString(),
      name,
      email,
      password,
      isVerified: false,
      verificationToken: crypto.randomUUID().toString(),
    });
  }

  public static with(props: UserProps) {
    return new User(props);
  }

  private validate() {
    if (
      this.props.name === "" ||
      this.props.email === "" ||
      this.props.password === ""
    ) {
      throw new Error("Name, email & password is required");
    }
  }

  public get id() {
    return this.props.id;
  }

  public get name() {
    return this.props.name;
  }

  public get email() {
    return this.props.email;
  }

  public get password() {
    return this.props.password;
  }

  public get isVerified() {
    return this.props.isVerified;
  }

  public get verificationToken() {
    return this.props.verificationToken;
  }
}
