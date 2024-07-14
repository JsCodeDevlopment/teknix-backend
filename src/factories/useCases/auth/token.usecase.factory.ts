import { TokenGenerator } from "../../../infra/services/tokenGenerator/token.generator.jwt";
import { GenerateTokenUsecase } from "../../../usecases/auth/generateToken/generate";

export function tokenUserUseCases(tokenGenerate: TokenGenerator) {
  return {
    generateTokenUsecase: GenerateTokenUsecase.create(tokenGenerate),
  };
}
