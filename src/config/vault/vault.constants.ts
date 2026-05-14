export const VAULT_SECRET_KEYS = ['PORT', 'NODE_ENV'] as const;

export type VaultSecretKey = (typeof VAULT_SECRET_KEYS)[number];
