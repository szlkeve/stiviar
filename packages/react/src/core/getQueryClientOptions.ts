import { ApiError } from "./errors";

export function getQueryClientOptions() {
  return {
    defaultOptions: {
      queries: {
        retry: (failureCount: number, error: Error) => {
          if (error instanceof ApiError) return false;
          return failureCount < 3;
        },
      },
    },
  };
}
