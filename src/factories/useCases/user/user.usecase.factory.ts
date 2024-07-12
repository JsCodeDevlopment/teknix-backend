import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { CreateUserUsecase } from "../../../usecases/user/create/create.usecase";
import { ListUserUsecase } from "../../../usecases/user/list/list.usecase";

export function createUserUseCases(repository: UserRepository) {
  return {
    createUserUsecase: CreateUserUsecase.create(repository),
    listUserUsecase: ListUserUsecase.create(repository),
  };
}