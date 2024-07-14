import { UserRepository } from "../../../infra/repositories/user/user.repository";
import { BcryptPasswordEncryptor } from "../../../infra/services/encryptor/bcrypt.encryptor";
import { JwtTokenGenerator } from "../../../infra/services/tokenGenerator/generate.token";
import { BadRequestError } from "../../errors/bad.request.error";
import { Usecase } from "../../usecase";
import { LoginInputDto } from "./dto/create.input.dto";
import { LoginOutputDto } from "./dto/create.output.dto";

export class LoginUsecase implements Usecase<LoginInputDto, LoginOutputDto> {
  private constructor(
    private readonly userRepository: UserRepository,
    private readonly hashService: BcryptPasswordEncryptor,
    private readonly jwtService: JwtTokenGenerator
  ) {}

  public static create(
    userRepository: UserRepository,
    hashService: BcryptPasswordEncryptor,
    jwtService: JwtTokenGenerator
  ) {
    return new LoginUsecase(userRepository, hashService, jwtService);
  }

  public async execute({
    email,
    password,
  }: LoginInputDto): Promise<LoginOutputDto> {
    if (!email || !password) {
      throw new BadRequestError("Email and password are required");
    }

    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new BadRequestError("User not found");
    }

    const isPasswordValid = await this.hashService.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      throw new BadRequestError("Invalid password");
    }

    const token = this.jwtService.generate({ id: user.id });

    const data = {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };

    return data;
  }
}
