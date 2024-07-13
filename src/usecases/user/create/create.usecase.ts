import { User } from "../../../domain/user/entity/user.entity";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { PasswordEncryptor } from "../../../infra/services/Encryptor/password.encryptor";
import { BadRequestError } from "../../errors/bad.request.error";
import { Usecase } from "../../usecase";
import { CreateUserInputDto } from "./dto/create.input.dto";
import { CreateUserOutputDto } from "./dto/create.output.dto";

export class CreateUserUsecase
  implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
  private constructor(
    private readonly userGateway: UserGateway,
    private readonly passwordEncryptor: PasswordEncryptor
  ) {}

  public static create(
    userGateway: UserGateway,
    passwordEncryptor: PasswordEncryptor
  ) {
    return new CreateUserUsecase(userGateway, passwordEncryptor);
  }

  public async execute({
    name,
    email,
    password,
  }: CreateUserInputDto): Promise<CreateUserOutputDto> {
    if (!name || !email || !password) {
      throw new BadRequestError(
        "Some of the information was no longer received."
      );
    }

    const existingUser = await this.userGateway.findByEmail(email);
    if (existingUser) throw new BadRequestError("Email already in use.");

    const hashedPassword = await this.passwordEncryptor.encrypt(password);

    const aUser = User.create(name, email, hashedPassword);

    await this.userGateway.create(aUser);

    const output = this.presentOutput(aUser);

    return output;
  }

  private presentOutput(product: User): CreateUserOutputDto {
    const output: CreateUserOutputDto = {
      id: product.id,
    };

    return output;
  }
}
