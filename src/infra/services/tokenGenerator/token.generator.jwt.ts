export interface TokenGenerator {
  generate(payload: { [key: string]: string }): string;
  verify(token: string): object | null;
}
