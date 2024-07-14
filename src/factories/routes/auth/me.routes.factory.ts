import { UserRepository } from "../../../infra/repositories/user/user.repository";

import { MeRoute } from "../../../infra/routes/auth/me/me.route";

export function MeRoutes(userRepository: UserRepository) {
  return [MeRoute.create(userRepository)];
}
