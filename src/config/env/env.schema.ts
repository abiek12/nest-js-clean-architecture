import { z } from 'zod';

export const envSchema = z.object({
  VAULT_ADDR: z.url('VAULT_ADDR must be a valid URL'),
  VAULT_TOKEN: z.string().min(1, 'VAULT_TOKEN is required'),
});

export type EnvConfig = z.infer<typeof envSchema>;
