import { LoginRoute } from "../../../infra/routes/auth/login/login.route";

import { LoginUsecase } from "../../../usecases/auth/login/login";

export function loginRoutes(useCases: { loginUsecase: LoginUsecase }) {
  return [LoginRoute.create(useCases.loginUsecase)];
}
