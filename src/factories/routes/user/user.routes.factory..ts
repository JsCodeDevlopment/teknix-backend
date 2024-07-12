import { CreateUserUsecase } from "../../../usecases/user/create/create.usecase";
import { ListUserUsecase } from "../../../usecases/user/list/list.usecase";
import { ListUserByIdUsecase } from "../../../usecases/user/listById/listById.usecase";
import { DeleteUserUsecase } from "../../../usecases/user/delete/delete.usecase";

import { ListUserRoute } from "../../../infra/routes/user/list/list.route";
import { CreateUserRoute } from "../../../infra/routes/user/create/create.route";
import { ListUserByIdRoute } from "../../../infra/routes/user/listById/listById.route";
import { DeleteUserRoute } from "../../../infra/routes/user/delete/delete.route";

export function createUserRoutes(useCases: {
  createUserUsecase: CreateUserUsecase;
  listUserUsecase: ListUserUsecase;
  listUserByIdUsecase: ListUserByIdUsecase;
  deleteUserUsecase: DeleteUserUsecase;
}) {
  return [
    CreateUserRoute.create(useCases.createUserUsecase),
    ListUserRoute.create(useCases.listUserUsecase),
    ListUserByIdRoute.create(useCases.listUserByIdUsecase),
    DeleteUserRoute.create(useCases.deleteUserUsecase),
  ];
}
