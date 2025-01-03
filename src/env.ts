import { createEnv } from "@t3-oss/env-core";
import { config } from "dotenv";
import { z } from "zod";

config();
export const env = createEnv({
  server: {
    DATABASE_URL: z.string().url(),
    BETTER_AUTH_SECRET: z.string().min(1),
    PORT: z.string().min(1),
    BETTER_AUTH_URL: z.string().url(),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: false,
});
