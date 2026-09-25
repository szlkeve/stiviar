export const ErrorDefinitions = {
  NETWORK_ERROR: "Failed to reach the server",
  HTTP_ERROR: "Request failed",
  VALIDATION_ERROR: "Response did not match the expected schema",
  UNKNOWN_ERROR: "An unexpected error occurred",

  // add new ones here, nothing else changes
  RATE_LIMITED: "Too many requests",
} as const;

export type ErrorCode = keyof typeof ErrorDefinitions;
