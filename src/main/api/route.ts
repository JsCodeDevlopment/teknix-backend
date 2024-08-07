import { NextFunction, Request, Response } from "express";

export type HTTPMethod = "get" | "post" | "put" | "delete";

export const HttpMethod = {
  GET: "get" as HTTPMethod,
  POST: "post" as HTTPMethod,
  PUT: "put" as HTTPMethod,
  DELETE: "delete" as HTTPMethod,
} as const;

// export type HttpMethod = typeof HttpMethod[keyof typeof HttpMethod];

export interface Route {
  getHandler(): (req: Request, res: Response, next: NextFunction) => Promise<void>;
  getPath(): string;
  getMethod(): HTTPMethod;
  getMiddlewares(): Array<
    (req: Request, res: Response, next: NextFunction) => void
  >;
}
