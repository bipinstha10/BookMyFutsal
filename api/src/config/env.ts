import "dotenv/config";
import type ms from "ms";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    PORT: z.coerce.number().default(3000),
    HOST: z.string().default("0.0.0.0"),
    DATABASE_CONNECTION_URL: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_EXPIRY: z.custom<ms.StringValue>(),
    REFRESH_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_EXPIRY: z.custom<ms.StringValue>(),
  },

  // Required: tells it where to read env vars from
  runtimeEnv: process.env,

  // Optional: skip validation during build (useful for CI/CD)
  skipValidation: false,

  // Optional: makes empty strings count as undefined
  emptyStringAsUndefined: true,
});
