import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { CreateUserUsecase } from "../../../usecases/user/create/create.usecase";
import { DeleteUserUsecase } from "../../../usecases/user/delete/delete.usecase";
import { ListUserUsecase } from "../../../usecases/user/list/list.usecase";
import { ListUserByIdUsecase } from "../../../usecases/user/listById/listById.usecase";

export function createUserUseCases(repository: UserRepository) {
  return {
    createUserUsecase: CreateUserUsecase.create(repository),
    listUserUsecase: ListUserUsecase.create(repository),
    listUserByIdUsecase: ListUserByIdUsecase.create(repository),
    deleteUserUsecase: DeleteUserUsecase.create(repository),
  };
}