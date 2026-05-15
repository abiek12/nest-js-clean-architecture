import { z } from 'zod';

export const vaultSchema = z.object({
  PORT: z.string().regex(/^\d+$/, 'PORT must be numeric'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  REQUEST_BODY_LIMIT: z.string().default('10mb'),
  CORS_ORIGINS: z.string().default(''),
});

export type VaultConfig = z.infer<typeof vaultSchema>;
