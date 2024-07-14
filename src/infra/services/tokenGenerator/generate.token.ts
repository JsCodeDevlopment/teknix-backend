import jwt from 'jsonwebtoken';
import { TokenGenerator } from './token.generator.jwt';

const SECRET_KEY = process.env.JWT_SECRET || 'your-secret-key';

export class JwtTokenGenerator implements TokenGenerator {
  generate(payload: object): string {
    return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
  }

  verify(token: string): object | null {
    try {
      return jwt.verify(token, SECRET_KEY) as object;
    } catch {
      return null;
    }
  }
}