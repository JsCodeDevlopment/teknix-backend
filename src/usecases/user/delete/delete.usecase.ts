import { User } from "../../../domain/user/entity/user.entity";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { NotFoundError } from "../../errors/not.found.request.error";
import { Usecase } from "../../usecase";
import { DeleteUserInputDto } from "./dto/delete.input.dto";
import { DeleteUserOutputDto } from "./dto/delete.output.dto";

export class DeleteUserUsecase
  implements Usecase<DeleteUserInputDto, DeleteUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new DeleteUserUsecase(userGateway);
  }

  public async execute({
    id,
  }: DeleteUserInputDto): Promise<DeleteUserOutputDto> {
    const aUser = await this.userGateway.listById(id);

    if (!aUser) throw new NotFoundError("User not found");

    await this.userGateway.delete(aUser.id);

    const output = this.presentOutput(aUser);

    return output;
  }

  private presentOutput(user: User): DeleteUserOutputDto {
    const output: DeleteUserOutputDto = {
      id: user.id,
    };

    return output;
  }
}
