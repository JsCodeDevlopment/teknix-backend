import { User } from "../../../domain/user/entity/user.entity";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { NotFoundError } from "../../errors/not.found.request.error";
import { Usecase } from "../../usecase";
import { ListUserByIdInputDto } from "./dto/listById.input.dto";
import { ListUserByIdOutputDto } from "./dto/listById.output";

export class ListUserByIdUsecase
  implements Usecase<ListUserByIdInputDto, ListUserByIdOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new ListUserByIdUsecase(userGateway);
  }

  public async execute(input: ListUserByIdInputDto): Promise<ListUserByIdOutputDto> {
    const aUser = await this.userGateway.listById(input.id);

    if (!aUser) {
      throw new NotFoundError("User not found");
    }

    const output = this.presentOutput(aUser);

    return output;
  }

  private presentOutput(user: User): ListUserByIdOutputDto {
    const output: ListUserByIdOutputDto = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        verificationToken: user.verificationToken,
      },
    };

    return output;
  }
}