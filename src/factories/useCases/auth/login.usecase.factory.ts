import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { BcryptPasswordEncryptor } from "../../../infra/services/encryptor/bcrypt.encryptor";
import { JwtTokenGenerator } from "../../../infra/services/tokenGenerator/generate.token";
import { LoginUsecase } from "../../../usecases/auth/login/login";

export function loginUserUseCases(
  userRepository: UserRepository,
  hashService: BcryptPasswordEncryptor,
  jwtService: JwtTokenGenerator
) {
  return {
    loginUsecase: LoginUsecase.create(userRepository, hashService, jwtService),
  };
}
