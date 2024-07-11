import { NextFunction, Request, Response } from "express";

export type HTTPMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
  GET: "get" as HTTPMethod,
  POST: "post" as HTTPMethod,
  PUT: "put" as HTTPMethod,
  DELETE: "delete" as HTTPMethod,
} as const;

export interface Route {
  getHandler(): (req: Request, res: Response) => Promise<void>;
  getPath(): string;
  getMethod(): HTTPMethod;
  getMiddlewares(): Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}
