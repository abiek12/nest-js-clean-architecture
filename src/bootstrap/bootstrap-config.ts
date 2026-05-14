import { Logger } from '@nestjs/common';
import { envSchema } from '../config/env/env.schema';
import { VaultService } from '../config/vault/vault.service';

const logger = new Logger('Bootstrap');

export const vaultService = new VaultService();

export async function bootstrapConfig(): Promise<void> {
  // 1. Validate .env first
  const envResult = envSchema.safeParse(process.env);
  if (!envResult.success) {
    logger.error('Invalid .env configuration');
    logger.error(envResult.error.flatten().fieldErrors);
    throw new Error('Environment validation failed');
  }

  logger.log('.env validated successfully');

  // 2. Load + validate Vault secrets
  await vaultService.sync();
}
