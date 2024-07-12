import { User } from "../entity/user.entity";

export interface UserGateway {
  create(user: User): Promise<void>;
  list(): Promise<User[]>;
}