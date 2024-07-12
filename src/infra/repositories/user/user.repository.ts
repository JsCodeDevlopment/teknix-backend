import { PrismaClient } from "@prisma/client";
import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { User } from "../../../domain/user/entity/user.entity";

export class UserRepository implements UserGateway {
  private constructor(private readonly prismaClient: PrismaClient) {}

  public static create(prismaClient: PrismaClient) {
    return new UserRepository(prismaClient);
  }

  public async create(user: User): Promise<void> {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await this.prismaClient.user.create({ data });
  }

  public async list(): Promise<User[]> {
    const users = await this.prismaClient.user.findMany();

    return users.map((user) =>
      User.with({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        isVerified: user.isVerified,
        verificationToken: user.verificationToken ?? "",
      })
    );
  }

  public async listById(id: string): Promise<User> {
    const user = await this.prismaClient.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new Error("User not found");
    }

    return User.with({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
      isVerified: user.isVerified,
      verificationToken: user.verificationToken ?? "",
    });
  }

  public async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: { id },
    });
  }
}
