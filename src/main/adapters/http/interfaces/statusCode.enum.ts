export type StatusCode =
  | 200
  | 201
  | 204
  | 400
  | 401
  | 403
  | 404
  | 408
  | 409
  | 500;

export const statusCode = {
  OK: 200 as StatusCode,
  CREATED: 201 as StatusCode,
  NO_CONTENT: 204 as StatusCode,
  BAD_REQUEST: 400 as StatusCode,
  UNAUTHORIZED: 401 as StatusCode,
  FORBIDDEN: 403 as StatusCode,
  NOT_FOUND: 404 as StatusCode,
  REQUEST_TIMEOUT: 408 as StatusCode,
  CONFLICT: 409 as StatusCode,
  INTERNAL_SERVER_ERROR: 500 as StatusCode,
} as const;
