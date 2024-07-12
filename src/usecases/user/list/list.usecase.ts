import { Product } from "../../../domain/product/entity/product.entity";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { User } from "../../../domain/user/entity/user.entity";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { Usecase } from "../../usecase";
import { ListUserInputDto } from "./dto/list.input.dto";
import { ListUserOutputDto } from "./dto/list.output.dto";

export class ListUserUsecase
  implements Usecase<ListUserInputDto, ListUserOutputDto>
{
  private constructor(private readonly userGateway: UserGateway) {}

  public static create(userGateway: UserGateway) {
    return new ListUserUsecase(userGateway);
  }

  public async execute(): Promise<ListUserOutputDto> {
    const aUser = await this.userGateway.list();

    const output = this.presentOutput(aUser);

    return output;
  }

  private presentOutput(products: User[]): ListUserOutputDto {
    const output: ListUserOutputDto = {
      users: products.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        isVerified: user.isVerified,
        verificationToken: user.verificationToken,
      })),
    };

    return output;
  }
}