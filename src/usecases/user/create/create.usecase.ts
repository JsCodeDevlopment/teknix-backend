import { User } from "../../../domain/user/entity/user.entity";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { BadRequestError } from "../../errors/bad.request.error";
import { Usecase } from "../../usecase";
import { CreateUserInputDto } from "./dto/create.input.dto";
import { CreateUserOutputDto } from "./dto/create.output.dto";

export class CreateUserUsecase
  implements Usecase<CreateUserInputDto, CreateUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new CreateUserUsecase(userGateway);
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

    const aUser = User.create(name, email, password);

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
