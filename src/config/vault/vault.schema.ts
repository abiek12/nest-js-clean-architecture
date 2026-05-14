import { z } from 'zod';

export const vaultSchema = z.object({
  PORT: z.string().regex(/^\d+$/, 'PORT must be numeric'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
});

export type VaultConfig = z.infer<typeof vaultSchema>;
