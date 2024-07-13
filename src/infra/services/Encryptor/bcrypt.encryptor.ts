import bcrypt from 'bcrypt';
import { PasswordEncryptor } from './password.encryptor';

export class BcryptPasswordEncryptor implements PasswordEncryptor {
  private readonly saltRounds = 10;

  async encrypt(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}