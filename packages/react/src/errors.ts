import { ErrorCode, ErrorDefinitions } from "./ErrorDefinitions";

export class ApiError extends Error {
  readonly code: ErrorCode;
  readonly status?: number;
  readonly cause?: unknown;

  constructor(
    code: ErrorCode,
    options?: { status?: number; cause?: unknown; message?: string },
  ) {
    super(options?.message ?? ErrorDefinitions[code]);
    this.name = "ApiError";
    this.code = code;
    this.status = options?.status;
    this.cause = options?.cause;
  }
}
