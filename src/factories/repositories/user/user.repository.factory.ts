import { UserRepository } from "../../../infra/repositories/user/user.repository";

export function createUserRepository() {
  return UserRepository.create();
}
