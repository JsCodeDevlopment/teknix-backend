import { CreateUserUsecase } from "../../../usecases/user/create/create.usecase";
import { ListUserUsecase } from "../../../usecases/user/list/list.usecase";

import { ListUserRoute } from "../../../infra/routes/user/list/list.route";
import { CreateUserRoute } from "../../../infra/routes/user/create/create.route";

export function createUserRoutes(useCases: {
  createUserUsecase: CreateUserUsecase;
  listUserUsecase: ListUserUsecase;
}) {
  return [
    CreateUserRoute.create(useCases.createUserUsecase),
    ListUserRoute.create(useCases.listUserUsecase),
  ];
}
