import { NextFunction, Response, Request } from "express";
import { StatusCode } from "../adapters/http/interfaces/statusCode.enum";
import { JwtTokenGenerator } from "../../infra/services/tokenGenerator/generate.token";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const jwt = new JwtTokenGenerator();
  try {
    const { authorization } = req.headers;

    const token = extractTokenFromHeader(authorization);

    if (!token) {
      res
        .status(StatusCode.UNAUTHORIZED)
        .json({ error: "Token invalid or not provided" });
      return;
    }

    const payload = await jwt.verify(token);

    (req as any).user = { id: (payload as { id: string }).id };

    next();
  } catch (error) {
    res.status(401).json({ error: "Token invalid or not provided" });
  }
}

function extractTokenFromHeader(authorization?: string): string | undefined {
  const [type, token] = authorization?.split(" ") ?? [];
  return type === "Bearer" ? token : undefined;
}
