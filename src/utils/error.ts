import type { StatusCode } from "hono/utils/http-status";

export type StatusError = StatusCode;

export const error = {
  SUCCESS_CODE: 200 as const,
  CLIENT_ERROR_CODE: 400 as const,
  CLIENT_UNAUTHED_CODE: 401 as const,
  INTERNAL_SERVER_ERROR_CODE: 500 as const,
};

export type ErrorType = typeof error;
