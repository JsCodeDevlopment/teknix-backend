import { User } from "../entity/user.entity";

export interface UserGateway {
  create(user: User): Promise<void>;
  list(): Promise<User[]>;
  listById(id: string): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  delete(id: string): Promise<void>;
}
