import { defineConfig } from "vitest/config";
import { config } from "dotenv";

config();

export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    typecheck: {
      enabled: true,
    },
  },
});
