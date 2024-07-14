import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { PasswordEncryptor } from "../../../infra/services/encryptor/password.encryptor";
import { CreateUserUsecase } from "../../../usecases/user/create/create.usecase";
import { DeleteUserUsecase } from "../../../usecases/user/delete/delete.usecase";
import { ListUserUsecase } from "../../../usecases/user/list/list.usecase";
import { ListUserByIdUsecase } from "../../../usecases/user/listById/listById.usecase";

export function createUserUseCases(
  repository: UserRepository,
  passwordEncryptor: PasswordEncryptor
) {
  return {
    createUserUsecase: CreateUserUsecase.create(repository, passwordEncryptor),
    listUserUsecase: ListUserUsecase.create(repository),
    listUserByIdUsecase: ListUserByIdUsecase.create(repository),
    deleteUserUsecase: DeleteUserUsecase.create(repository),
  };
}
