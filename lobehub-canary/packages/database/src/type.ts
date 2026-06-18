import type { NeonDatabase } from 'drizzle-orm/neon-serverless';

import type * as schema from './schemas';

export type AetherHubDatabaseSchema = typeof schema;

export type AetherHubDatabase = NeonDatabase<AetherHubDatabaseSchema>;

export type Transaction = Parameters<Parameters<AetherHubDatabase['transaction']>[0]>[0];
