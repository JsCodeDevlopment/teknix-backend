import { UserGateway } from "../../../domain/user/gateway/user.gateway";
import { User } from "../../../domain/user/entity/user.entity";
import { UserModel } from "../../sequelize/models/user/user.model";

export class UserRepository implements UserGateway {
  public static create(): UserRepository {
    return new UserRepository();
  }

  public async create(user: User): Promise<void> {
    const data = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
    };

    await UserModel.create(data);
  }

  public async findByEmail(email: string): Promise<User | null> {
    const users = await UserModel.findOne({ where: { email } });
    
    if (!users) return null;

    return User.with({
      id: users.id,
      name: users.name,
      email: users.email,
      password: users.password,
      isVerified: users.isVerified,
      verificationToken: users.verificationToken ?? "",
    });
  }

  public async list(): Promise<User[]> {
    const users = await UserModel.findAll();

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
    const user = await UserModel.findByPk(id);

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
    await UserModel.destroy({
      where: { id },
    });
  }
}
