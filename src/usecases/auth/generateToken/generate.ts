import { TokenGenerator } from "../../../infra/services/tokenGenerator/token.generator.jwt";
import { Usecase } from "../../usecase";
import { GenerateTokenInputDto } from "./dto/generate.input.dto";

export class GenerateTokenUsecase
  implements Usecase<GenerateTokenInputDto, string>
{
  private constructor(private readonly tokenGenerate: TokenGenerator) {}

  public static create(tokenGenerate: TokenGenerator) {
    return new GenerateTokenUsecase(tokenGenerate);
  }

  public async execute({
    payload,
  }: GenerateTokenInputDto): Promise<string> {
    return this.tokenGenerate.generate(payload);
  }
}
