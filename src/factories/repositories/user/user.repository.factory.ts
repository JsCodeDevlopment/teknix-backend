import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { prisma } from "../../../package/prisma/prisma";

export function createUserRepository() {
  return UserRepository.create(prisma);
}
